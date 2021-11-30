export class EmailInUseError extends Error {
  constructor () {
    super('Email is alredy in use')
    this.name = 'EmailInUseError'
  }
}
