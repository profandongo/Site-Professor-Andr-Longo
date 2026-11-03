import {sqliteTable,text,integer} from 'drizzle-orm/sqlite-core';
export const classrooms=sqliteTable('classrooms',{id:text('id').primaryKey(),name:text('name').notNull(),data:text('data').notNull(),version:integer('version').notNull().default(0)});
export const settings=sqliteTable('settings',{id:text('id').primaryKey(),value:text('value').notNull()});
