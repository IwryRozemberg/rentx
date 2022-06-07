import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");
  const passwordHash = await hash("admin", 8);
  const id = uuidV4();

  await connection.query(
    `INSERT INTO users (id, name, email, password, is_admin, driver_license) VALUES
    (
      '${id}',
      'ADMINISTRATOR',
      'admin@rentx.com.br',
      '${passwordHash}',
      true,
      'C'
    );
    `,
  );

  await connection.close();
}

create().then(() => console.log("User admin created!!!"));
