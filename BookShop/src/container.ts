import { Container } from 'inversify';

import BooksRepository from './services/BooksRepository';

const myContainer = new Container();

myContainer.bind(BooksRepository).toSelf();

export default myContainer;
