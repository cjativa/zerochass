import knex from 'knex';
import { KnexConfiguration } from '../knexfile';
import Config from '../utils/config';

export const Knex = knex(KnexConfiguration[Config.environment]);