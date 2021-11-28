const { Container } = require('inversify');
const BooksRepository = require('./services/BooksRepository');

const myContainer = new Container();

myContainer.bind(BooksRepository).toSelf();

module.exports = myContainer;
