import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { CarImage } from "./CarImage";
import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity("cars")
export class Car {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: "daily_rate" })
  dailyRate: number;

  @Column()
  available: boolean;

  @Column({ name: "license_plate" })
  licensePlate: string;

  @Column({ name: "fine_amount" })
  fineAmount: number;

  @Column()
  brand: string;

  @Column({ name: "category_id" })
  categoryId: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => Category, category => category.cars)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: "specifications_cars",
    joinColumns: [{ name: "car_id" }],
    inverseJoinColumns: [{ name: "specification_id" }],
  })
  specifications: Specification[];

  @OneToMany(() => CarImage, carImage => carImage.car)
  @JoinColumn({ referencedColumnName: "car_id" })
  images: CarImage[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.available = true;
    }
  }
}
