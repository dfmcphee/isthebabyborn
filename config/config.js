var path = require('path');
var rootPath = path.normalize(__dirname + '/..');
var env = require('node-env-file');
var currentEnv = process.env.NODE_ENV || 'development';
var fs = require('fs');
var envPath = __dirname + '/.env';

if (fs.existsSync(envPath)) {
  env(envPath);
}

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'isthebabyborn'
    },
    port: process.env.PORT || 3000,
    db: 'postgres://localhost/isthebabyborn'
  },

  test: {
    root: rootPath,
    app: {
      name: 'isthebabyborn'
    },
    port: process.env.PORT || 3000,
    db: 'postgres://localhost/isthebabyborn-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'isthebabyborn'
    },
    port: process.env.PORT || 3000,
    db: process.env.DATABASE_URL
  }
};

module.exports = config[currentEnv];
