import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("categories")
export class Category {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  // @OneToMany(() => Car, car => car.category)
  // cars: Car[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
