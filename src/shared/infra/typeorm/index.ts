import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host,
    }),
  );
};

// 2º
// interface IOptions {
//   host: string;
// }

// getConnectionOptions().then(options => {
//   const newOptions = options as IOptions;
//   // newOptions.host = "localhost";
//   newOptions.host = "database";
//   createConnection({
//     ...options,
//   });
// });

// 1ª
// import { DataSource } from "typeorm";

// import { Category } from "../modules/cars/model/Category";

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   port: 5432,
//   host: "database",
//   //  host: "localhost",
//   username: "postgres",
//   password: "lk22642",
//   database: "rentx",
//   synchronize: true,
//   logging: false,
//   entities: [Category],
//   migrations: ["./src/database/migrations/*.ts"],
//   subscribers: [],
//   uuidExtension: "uuid-ossp",
// });

// export const categoryRepository = AppDataSource.getRepository(Category);
