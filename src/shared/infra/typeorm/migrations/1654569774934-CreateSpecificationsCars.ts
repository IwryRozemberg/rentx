import { MigrationInterface, PrimaryColumn, QueryRunner, Table } from "typeorm";

export class CreateSpecificationsCars1654569774934
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "specifications_cars",
        columns: [
          { name: "car_id", type: "uuid" },
          { name: "specification_id", type: "uuid" },
          { name: "created_at", type: "timestamp", default: "now()" },
        ],
        foreignKeys: [
          {
            name: "FK_specificationsCars_specifications",
            referencedTableName: "specifications",
            referencedColumnNames: ["id"],
            columnNames: ["specification_id"],
          },
          {
            name: "FK_specificationsCars_cars",
            referencedTableName: "cars",
            referencedColumnNames: ["id"],
            columnNames: ["car_id"],
          },
        ],
      }),
    );

    await queryRunner.createPrimaryKey("specifications_cars", [
      "car_id",
      "specification_id",
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropPrimaryKey("specifications_cars");
    await queryRunner.dropTable("specifications_cars");
  }
}
