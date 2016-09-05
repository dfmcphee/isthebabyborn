var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

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

module.exports = config[env];
