import {Entity, hasOne, model, property} from '@loopback/repository';
import {
  UserCredentials,
  UserCredentialsWithRelations,
} from './user-credentials.model';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @hasOne(() => UserCredentials, {keyTo: 'user_id'})
  user_credentials: UserCredentials;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  credentials: UserCredentialsWithRelations;
}

export type UserWithRelations = User & UserRelations;
