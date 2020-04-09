const dbPath = process.env.DB_PATH || '../db'; // TODO more sensiblle default
const league = process.env.LEAGUE || 'development';

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: `${dbPath}/db.${league}.sqlite`,
    logging: false
  },
  test: {
    dialect: 'sqlite',
    storage: `${dbPath}/db.${league}.sqlite`,
    logging: false
  },
  production: {
    dialect: 'sqlite',
    storage: `${dbPath}/db.${league}.sqlite`,
    logging: false
  }
}