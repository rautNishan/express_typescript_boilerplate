import { DeepPartial, Repository } from "typeorm";
import {
  IBaseRepository,
  ICreateOptions,
  IFindAllOptions,
  IFindByIdOptions,
  IFindOneOption,
  IOnlyEntityManager,
  IPaginatedData,
  IUpdateOptions,
} from "../../interfaces/database.interface";
import { DataBaseBaseEntity } from "../entities/base.entity";
import { PAGINATION } from "../../../constants/pagination.constant";

export class BaseRepository<T extends DataBaseBaseEntity>
  implements IBaseRepository<T>
{
  private _repo: Repository<T>;

  constructor(repo: Repository<T>) {
    this._repo = repo;
  }

  async create(
    createData: DeepPartial<T>,
    options?: ICreateOptions
  ): Promise<T> {
    let entityInstance: T;

    if (options?.entityManager) {
      //Since this create new entity instance so first we will create new entity instance
      entityInstance = options.entityManager.create(
        this._repo.target, //This is Entity like
        createData
      );
      //Pass this instance to save method which will insert the instance
      return await options.entityManager.save(entityInstance);
    }
    entityInstance = this._repo.create(createData);
    return await this._repo.save(entityInstance);
  }

  async update(
    updateData: DeepPartial<T>,
    options?: IUpdateOptions
  ): Promise<T> {
    if (options?.entityManager) {
      return await options.entityManager.save(this._repo.target, updateData);
    }
    return await this._repo.save(updateData);
  }

  async getById(id: number, options?: IFindByIdOptions<T>): Promise<T | null> {
    const find: any = {
      ...options?.options,
      where: { id },
    };

    if (options?.withDeleted) {
      find.withDeleted = true;
    }

    if (options?.entityManager) {
      return await options.entityManager.findOne(this._repo.target, find);
    }

    return await this._repo.findOne(find);
  }

  async getOne(options?: IFindOneOption<T>): Promise<T | null> {
    const find: any = {};

    if (options?.withDeleted) {
      find.withDeleted = true;
    }

    if (options?.options?.where) {
      find.where = options.options.where;
    }

    if (options?.entityManager) {
      return await options.entityManager.findOne(this._repo.target, find);
    }

    return this._repo.findOne(find);
  }

  async getAll(
    options?: IFindAllOptions<T> | undefined
  ): Promise<IPaginatedData<T>> {
    //Page Number
    const pageNumber = options?.options?.skip ?? PAGINATION.DEFAULT_PAGE_NUMBER;

    //Limit
    const limit = options?.options?.take ?? PAGINATION.DEFAULT_LIMIT;

    delete options?.options?.take;
    delete options?.options?.skip;

    const findOptions: any = {
      skip: (pageNumber - 1) * limit,
      take: limit,
      ...options?.options,
    };

    if (options?.withDeleted && options.withDeleted) {
      findOptions.withDeleted = true;
    }

    if (options?.entityManager) {
      const count = await options.entityManager.count(
        this._repo.target,
        findOptions
      );
      const data = await options.entityManager.find(
        this._repo.target,
        findOptions
      );
      return {
        _pagination: {
          pageNumber: pageNumber,
          limit: limit,
          totalData: count,
        },
        data: data,
      };
    }

    const data = await this._repo.find(findOptions);
    const count = await this._repo.count(findOptions);
    return {
      _pagination: {
        pageNumber: pageNumber,
        limit: limit,
        totalData: count,
      },
      data: data,
    };
  }

  async softDelete(entity: T, options?: IOnlyEntityManager): Promise<T> {
    entity.deletedAt = new Date();

    if (options?.entityManage) {
      return await options.entityManage.save(this._repo.target, entity);
    }
    return await this._repo.save(entity);
  }

  async restore(entity: T, options?: IOnlyEntityManager): Promise<T> {
    entity.deletedAt = null;
    if (options?.entityManage) {
      return await options.entityManage.save(this._repo.target, entity);
    }
    return await this._repo.save(entity);
  }

  async hardDelete(entity: T, options?: IOnlyEntityManager): Promise<T> {
    if (options?.entityManage) {
      return await options.entityManage.remove(entity);
    }
    return await this._repo.remove(entity);
  }
}
