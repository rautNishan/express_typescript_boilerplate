import { Repository } from "typeorm";
import { BaseRepository } from "../../../common/database/base/repository/base.repository";
import { UserEntity } from "../entity/user.entity";

export class UserRepository extends BaseRepository<UserEntity> {
  constructor(private readonly repo: Repository<UserEntity>) {
    super(repo);
  }
}
