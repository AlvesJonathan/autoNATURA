/// <reference types="cypress" />
//import faker from 'faker'

context('Cadastrar usuário com o preenchimento de todos os campos.', () => {

  beforeEach(function () {
    cy.visit('/')
    cy.clearCookies()
    //Pegando os dados necessarios
    cy.fixture('dados.json').as('dados').then(() => { })
    //Pegando os conteudos do site para validação
    cy.fixture('conteudo.json').as('cont').then(() => { })

  })

  it('Realizar novo cadastro', function () {
    //Tentativa de gerar dados aleátorios
    /*const nome = faker.name.findName()
    const sobrenome = faker.name.lastName()
    const email = faker.internet.email()*/

    //Acessando o site
    cy.visit('cadastre-se')
      .wait(this.dados.break)
      .get('#onetrust-accept-btn-handler').click()
      .url().should('eq', this.dados.urlCadastro)

    //Preenchendo nome
    cy.get('[name="firstName"]')
      .should('be.visible')
      .type(this.dados.nome)

    //Preenchendo sobrenome
    cy.get('[name="lastName"]')
      .should('be.visible')
      .type(this.dados.sobrenome)

    //Preenchendo e-mail
    cy.get('[name="email"]')
      .should('be.visible')
      .type(this.dados.email)

    //Verificando o checkbox marcado para receber e-mail
    cy.get('#receiveNewsLetter').should('be.checked')
      .get('.MuiBox-root').contains(this.cont.recebEmail).should('be.visible')

    //Preenchendo a senha
    cy.get('#password-field')
      .should('be.visible')
      .type(this.dados.senha)
      //Ferificando os dados da senha
      .get('.MuiBox-root').contains(this.cont.especial).should('be.visible')
      .get('.MuiBox-root').contains(this.cont.numero).should('be.visible')
      .get('.MuiBox-root').contains(this.cont.ltMaiuscula).should('be.visible')
      .get('.MuiBox-root').contains(this.cont.ltMinuscula).should('be.visible')
      .get('.MuiBox-root').contains(this.cont.minCaracteres).should('be.visible')

    //Preenchendo a confirmação da senha
    cy.get('#confirmPassword-field')
      .should('be.visible')
      .type(this.dados.senha)

    //Preenchendo o CPF
    cy.get('[name="cpf"]')
      .should('be.visible')
      .type(this.dados.cpf)

    //Preenchendo a data de nascimento
    cy.get('[name="dateOfBirth"]')
      .should('be.visible')
      .type(this.dados.dtNascimento)

    //Selecionando o Genero
    cy.get('[name="gender"]')
      .check('noSpecify')

    //Preenchendo o Celular
    cy.get('[name="homePhone"]')
      .should('be.visible')
      .type(this.dados.telefone)

    //Verificando o checkbox marcado para receber SMS
    cy.get('[name="receiveNewsLetter"]').should('be.checked')
      .get('.MuiTypography-root').contains(this.cont.recebSMS).should('be.visible')

    //Verificando o checkbox marcado para disponibilizar as informações
    cy.get('[name="infContOptIn"]').should('be.checked')
      .get('.MuiTypography-root').contains(this.cont.consultBeleza).should('be.visible')

    //Marcando o checkbox para confirmar maior idade
    cy.get('#acceptedterms').check()
      .get('.MuiTypography-root').contains(this.cont.maiorIdade).should('be.visible')

    //Salvando o cadastro
    cy.get('.MuiButton-label')
      .contains('Criar Conta').click()
      .wait(this.dados.longBreak)
  });

})