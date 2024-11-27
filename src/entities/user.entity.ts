import { Exclude } from "class-transformer";
import { Role } from "src/common/enums/role.enum";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "varchar", length: 100 })
  username: string;

  @Column({ type: "varchar", length: 30 })
  firstname: string;

  @Column({ type: "varchar", length: 30 })
  lastname: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @Column({ type: "varchar", length: 10, nullable: true })
  gender: string;

  @Column({ type: "date", nullable: true })
  dob: Date | null;

  @Exclude()
  @Column({ type: "varchar" })  
  password: string;

  @Column({ type: "int", nullable: true  })
  phone: number;

  @Column({ default: false })
  isActive: Boolean;

  @Column({ type: "varchar" })
  activationToken: string;

  @Column()
  CreatedAt: Date;

  @Column()
  role: string;
}
