import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ name: "driver_license" })
  driverLicense: string;

  @Column({ name: "is_admin" })
  isAdmin: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
