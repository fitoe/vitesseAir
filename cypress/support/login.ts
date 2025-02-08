/// <reference types="cypress" />
// 自定义用户登陆命令，仅用于参考
// 用户列表
interface User {
  username: string
  password: string
  nickname: string
}

const account: User = { username: 'username', password: 'password', nickname: 'nickname' } // 用户信息

// 用户登录过程
const host = 'http://127.0.0.1:3000'

Cypress.Commands.add('Login', (user: User) => {
  cy.clearAllLocalStorage()
  cy.visit('/pages/usercenter/index')
  cy.get('#username').then((text) => {
    if (text.text() === '请登录' || text.text() !== user.nickname) {
      cy.visit('/pages/login')
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login').click()
      cy.hash().should('eq', '#/')
      cy.visit('/pages/usercenter/index')
      cy.get('#username').should('have.text', user.nickname)
      cy.getAllLocalStorage().then((result) => {
        cy.writeFile(`cypress/fixtures/${user.username}.json`, result[host])
      })
    }
  })
})

// 用户登录
Cypress.Commands.add('Login', () => cy.Login(account))

// 还原登录状态
Cypress.Commands.add('Restore', (user: User) => {
  cy.fixture(user.username).then((storage) => {
    Object.keys(storage).map(x => window.localStorage.setItem(x, storage[x]))
  })
  cy.visit('')
})

Cypress.Commands.add('Restore', () => cy.Restore(account))
