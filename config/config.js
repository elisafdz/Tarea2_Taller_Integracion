const config = {
  default: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD || 'clave123',
    dialect: process.env.DB_DIALECT || 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || '127.0.0.1',
  },
  development: {
    database: process.env.DB_NAME || 'server',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD || 'clave123',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DB_DIALECT || 'postgres',
  },
  test: {
    extend: 'default',
    database: 'iic2513template_test',
  },
  production: {
    extend: 'default',
    use_env_variable: 'DATABASE_URL',
    dialect: "postgres",
    dialectOptions: {
      ssl: {
          require: true,
          rejectUnauthorized: false
      }
  }
}
  }

  
  Object.keys(config).forEach((configKey) => {
    const configValue = config[configKey];
    if (configValue.extend) {
      config[configKey] = { ...config[configValue.extend], ...configValue };
    }
  });
  
  module.exports = config;