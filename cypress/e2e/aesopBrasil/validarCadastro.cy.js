/// <reference types="cypress" />
//import faker from 'faker'

context('Validar o cadastro salvo do usuário', () => {

    beforeEach(function () {
        cy.visit('/')
        cy.clearCookies()
        //Pegando os dados necessarios
        cy.fixture('dados.json').as('dados').then(() => { })
        //Pegando os conteudos do site para validação
        cy.fixture('conteudo.json').as('cont').then(() => { })

    })

    it('Validar cadastro', function () {
        //Acessando a tela de login
        cy.visit('login?redirect=%2F')
            .url().should('eq', this.dados.urlLogin)
            .get('#onetrust-accept-btn-handler').click()
            .wait(this.dados.break)

        //Preenchendo login com o e-mail cadastrado
        cy.get('#login-field')
            .should('be.visible')
            .type(this.dados.email)

        //Preenchendo a senha conforme a cadastrada
        cy.get('#login-password')
            .should('be.visible')
            .type(this.dados.senha)

        //Acessando
        cy.get('.MuiButton-label')
            .contains('Entrar').click()
            .wait(this.dados.longBreak)

        //Acessando os Dados cadastrados
        cy.visit('/meus-dados')
            .url().should('eq', this.dados.urlDados)
            .wait(this.dados.break)

        //Selecionando as opções dos dados pessoais
        cy.get('.MuiTypography-body1')
            .contains('Dados Pessoais').click()

        //Verificando o nome cadastrado
        cy.get('[name="firstName"]')
            .should('have.value', this.dados.nome)

        //Verificando o sobrenome cadastrado
        cy.get('[name="lastName"]')
            .should('have.value', this.dados.sobrenome)

        //Verificando o e-mail cadastrado
        cy.get('[name="email"]')
            .should('have.value', this.dados.email)
    });
})
