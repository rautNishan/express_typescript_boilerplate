import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

export class DataBaseBaseEntity extends BaseEntity {
  @Generated()
  @PrimaryColumn({
    type: "bigint",
  })
  id: number;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  createdAt: Date;

  @DeleteDateColumn({ type: "timestamptz", name: "deleted_at" })
  deletedAt: Date | null;

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
  updatedAt: Date;
}
