import bookshelfSetup from 'bookshelf';

import knex from './knex';

const bookshelf = bookshelfSetup(knex);

export default bookshelf;
