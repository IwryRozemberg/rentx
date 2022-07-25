import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Car } from "./Car";

@Entity("cars_image")
export class CarImage {
  @PrimaryColumn()
  id: string;

  @Column({ name: "car_id" })
  carId: string;

  @Column({ name: "image_name" })
  imageName: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => Car)
  @JoinColumn({ name: "car_id" })
  car: Car;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
