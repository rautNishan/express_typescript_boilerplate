import { EntityManager, FindManyOptions } from "typeorm";

export interface IPaginatedRequest<T> {
  entityManager?: EntityManager;
  options?: FindManyOptions<T>;
  withDeleted?: boolean;
}

export interface IAuthenticatedUser {
  id: string;
  userName: string;
  userRole: string;
  iat: number;
  exp: number;
}
