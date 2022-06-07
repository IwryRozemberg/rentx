import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCars1653204622450 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cars",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "daily_rate",
            type: "numeric",
          },
          {
            name: "available",
            type: "boolean",
            default: true,
          },
          {
            name: "license_plate",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "fine_amount",
            type: "numeric",
          },
          {
            name: "brand",
            type: "varchar",
          },
          {
            name: "category_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "fk_category_cars",
            referencedTableName: "categories",
            referencedColumnNames: ["id"],
            columnNames: ["category_id"],
          },
        ],
      }),
      true,
    );

    // await queryRunner.createForeignKey(
    //   "cars",
    //   new TableForeignKey({
    //     name: "fk_cars_category",
    //     columnNames: ["category_id"],
    //     referencedColumnNames: ["id"],
    //     referencedTableName: "categories",
    //   }),
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropForeignKey("cars", "fk_cars_category");
    await queryRunner.dropTable("cars");
  }
}
