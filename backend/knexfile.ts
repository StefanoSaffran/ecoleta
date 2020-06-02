import path from 'path';

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(
      __dirname,
      'src',
      'shared',
      'infra',
      'sqlite',
      'database.sqlite',
    ),
  },
  migrations: {
    directory: path.resolve(
      __dirname,
      'src',
      'shared',
      'infra',
      'sqlite',
      'migrations',
    ),
  },
  seeds: {
    directory: path.resolve(
      __dirname,
      'src',
      'shared',
      'infra',
      'sqlite',
      'seeds',
    ),
  },
  useNullAsDefault: true,
};
