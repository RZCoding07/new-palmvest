// import pg from 'pg';
// import postgres from 'postgres';
// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';
// dotenv.config();

// const connectionString = process.env.DATABASE_URL;

// const sql = postgres(connectionString, {
//   transform: {
//     column: {
//       from: pg.types.getTypeParser(pg.types.builtins.TIMESTAMPTZ, val => new Date(val)) // default
//     }
//   }
// });

// const db_master = new Sequelize(connectionString, {
//   logging: false,
//   protocol: 'postgres',
//   dialectModule: pg,
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false
//     },
//     useUTC: false, // important to disable UTC handling
//   },
//   timezone: '+07:00', // WIB
// });

// export { sql, db_master };




import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export const db_master = new Sequelize(
  process.env.MASTER_DB_NAME,
  process.env.MASTER_DB_USER,
  process.env.MASTER_DB_PASSWORD,
  {
    host: process.env.MASTER_DB_HOST,
    port: process.env.MASTER_DB_PORT,
    dialect: process.env.MASTER_DB_DIALECT,
    dialectModule: mysql2,
  }
);
