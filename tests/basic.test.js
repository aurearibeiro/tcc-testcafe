import { Selector } from "testcafe";

fixture`Testes usando testcafe`
  .page`https://siteseguro.inatel.br/PortalAcademico/WebLogin.aspx?ReturnUrl=%2fPortalacademico`.beforeEach(
  async (t) => {
    await t
      .click(authType)
      .click(authTypeOption.withText("Por Curso e Matricula"))
      .expect(authType.value)
      .eql("2")

      .click(course)
      .click(courseOption.withText("Engenharia de Controle e Automação"))
      .expect(course.value)
      .eql("24")

      .typeText(
        "#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_tbMatricula",
        "99999"
      )
      .typeText("#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_Password", "119922")
      .click("#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_LoginButton");

    const form = Selector("#ctl00_Corpo_UCModeloAvaliacaoPU1_lblAvaliacao");

    if (await form.exists) {
      await t
        .click("#ctl00_Corpo_UCModeloAvaliacaoPU1_GridDados_ctl02_rdbOpcao_0")
        .click("#ctl00_Corpo_UCModeloAvaliacaoPU1_GridDados_ctl03_rdbOpcao_1")
        .click("#ctl00_Corpo_UCModeloAvaliacaoPU1_GridDados_ctl04_rdbOpcao_4")
        .click("#ctl00_Corpo_UCModeloAvaliacaoPU1_GridDados_ctl05_rdbOpcao_1")
        .click("#ctl00_Corpo_UCModeloAvaliacaoPU1_GridDados_ctl06_rdbOpcao_1")
        .click("#ctl00_Corpo_UCModeloAvaliacaoPU1_GridDados_ctl07_rdbOpcao_2")
        .click("#ctl00_Corpo_UCModeloAvaliacaoPU1_btnConfirmar1")
        .click("#ctl00_Corpo_UCModeloAvaliacaoPU1_Button3");
    }
  }
);

const authType = Selector(
  "#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_dropTipoAutenticacao"
);
const course = Selector(
  "#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_dropSubCurso"
);
const req = Selector("#ctl00_Corpo_dropProcesso");

const authTypeOption = authType.find("option");
const courseOption = course.find("option");
const reqOption = req.find("option");

test(`1- Histórico acadêmico: Verificar a exibição da tabela`, async (t) => {
  await t
    .click("#ctl00_Corpo_HyperLink5")
    .expect(Selector("th").nth(0).innerText)
    .eql("Sigla")
    .expect(Selector("th").nth(1).innerText)
    .eql("Descrição da Disciplina")
    .expect(Selector("th").nth(2).innerText)
    .eql("Nota")
    .expect(Selector("th").nth(3).innerText)
    .eql("Ano/Semestre");
});

test(`2- Atividades complementares: Verificar exibição da mensagem`, async (t) => {
  await t
    .click("#ctl00_Corpo_HyperLink3")

    .expect(Selector("#ctl00_Corpo_UCNotas1_lblErro").innerText)
    .eql(
      "Você não está matriculado em turmas que possuem atividades complementares !!!"
    );
});

test(`3- Pedidos (notas): Verificar exibição da mensagem`, async (t) => {
  await t
    .click("#ctl00_Corpo_HyperLink6")

    .expect(Selector("#ctl00_Corpo_lblErro").innerText)
    .eql("Não existem pedidos de notas a serem solicitados !!!");
});

test(`4- Consulta de pedidos (notas): Verificar exibição da mensagem`, async (t) => {
  await t
    .click("#ctl00_Corpo_HyperLink13")

    .expect(
      Selector("#ctl00_Corpo_UCConsultaPedidosNotas1_lblErroConsultaPedidos")
        .innerText
    )
    .eql("Não existem Pedidos referentes à Notas a serem consultados.");
});

test(`5- Requerimentos: Verificar requerimentos existentes`, async (t) => {
  await t
    .click("#ctl00_Corpo_HyperLink15")
    .click(req)
    .click(reqOption.withText("Requerimento de Desistência de Disciplinas"))
    .expect(req.value)
    .eql("1")

    .click(req)
    .click(reqOption.withText("Requerimento de Pedido de PVS"))
    .expect(req.value)
    .eql("4");
});

test(`6- Nota de estágio: Verificar exibição da tabela`, async (t) => {
  await t
    .click("#ctl00_Corpo_HyperLink14")

    .expect(Selector("th").nth(0).innerText)
    .eql("Sigla")
    .expect(Selector("th").nth(1).innerText)
    .eql("Descrição da Disciplina")
    .expect(Selector("th").nth(2).innerText)
    .eql("Nota")
    .expect(Selector("th").nth(3).innerText)
    .eql("Ano/Semestre")

    .expect(
      Selector("#ctl00_Corpo_UCNotaEstagio1_notaEstagioGridView td").nth(0)
        .innerText
    )
    .contains("EST1")
    .expect(
      Selector("#ctl00_Corpo_UCNotaEstagio1_notaEstagioGridView td").nth(1)
        .innerText
    )
    .contains("Estágio Supervisionado");
});

test(`7- Quadro de Pré/Co Requisitos: Verificar a exibição das informações`, async (t) => {
  await t
    .click("#ctl00_Corpo_HyperLink28")

    .expect(Selector("tr.SSA_PiscinaLinha td").innerText)
    .contains("Total de Créditos Aprovados")
    .expect(Selector("tr.SSA_PiscinaLinha td").innerText)
    .contains("Total de Créditos Matriculados");
});

test(`8- Tesouraria: Verificar dados`, async (t) => {
  const tableDeb = Selector("#ctl00_Corpo_UCDebitos1_GridBenner th");
  const tableBankDetails = Selector(
    "#MSO_ContentTable table table table table tr td"
  );

  await t
    .click("#ctl00_Corpo_HyperLink17")
    .expect(Selector("#ctl00_Corpo_UCDebitos1_Label4").innerText)
    .eql("Dados Bancários para Pagamento")

    .expect(Selector("#ctl00_Corpo_UCDebitos1_lblDebitos").innerText)
    .eql("Débitos")

    .expect(Selector("#ctl00_Corpo_UCDebitos1_lblCreditos").innerText)
    .eql("Créditos e Devoluções")

    .expect(tableDeb.nth(0).innerText)
    .contains("Histórico")

    .expect(tableDeb.nth(1).innerText)
    .contains("Vencimento")

    .expect(tableDeb.nth(2).innerText)
    .contains("Valor")

    .expect(tableDeb.nth(3).innerText)
    .contains("Multa")

    .expect(tableDeb.nth(4).innerText)
    .contains("Correção")

    .expect(tableDeb.nth(5).innerText)
    .contains("Juros")

    .expect(tableDeb.nth(6).innerText)
    .contains("Total")

    .expect(tableBankDetails.nth(2).innerText)
    .contains("Agência")

    .expect(tableBankDetails.nth(3).innerText)
    .contains("0872-9")

    .expect(tableBankDetails.nth(4).innerText)
    .contains("Conta Corrente:")
    .expect(tableBankDetails.nth(5).innerText)
    .contains("3867-9")

    .expect(tableBankDetails.nth(6).innerText)
    .contains("Titular:")
    .expect(tableBankDetails.nth(7).innerText)
    .contains("Fundação Instituto Nacional de Telecomunicações")

    .expect(tableBankDetails.nth(10).innerText)
    .contains("Identificador Bancário:")
    .expect(tableBankDetails.nth(11).innerText)
    .contains("00012499999-9")

    .expect(tableBankDetails.nth(14).innerText)
    .contains("Chave Pix (CNPJ):")
    .expect(tableBankDetails.nth(15).innerText)
    .contains("24.492.886/0001-04");
});

test(`9- Pedidos de prova presencial`, async (t) => {
  await t.click("#ctl00_Corpo_HyperLink24");

  const element = Selector("#ctl00_Corpo_UCPedidosProvasPresencial1_tvwProvat1")
    .innerText;

  await t
    .click("#ctl00_MenuLateral_UCMenuAcademico10_HyperLink5")
    .expect(element.visible)
    .ok();
});
