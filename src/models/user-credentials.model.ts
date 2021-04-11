import {belongsTo, Entity, model, property} from '@loopback/repository';
import {User, UserWithRelations} from './user.model';

@model({
  name: 'user_credentials',
  settings: {
    foreignKeys: {
      fk_user_credentials_user: {
        name: 'fk_user_credentials_user',
        entity: 'User',
        entityKey: 'id',
        foreignKey: 'user_id',
      },
    },
  },
})
export class UserCredentials extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: false,
  })
  hash_password: string;

  @belongsTo(
    () => User,
    {name: 'user_id'},
    {
      name: 'user_id',
      require: true,
    },
  )
  userId: number;

  constructor(data?: Partial<UserCredentials>) {
    super(data);
  }
}

export interface UserCredentialsRelations {
  user: UserWithRelations;
}

export type UserCredentialsWithRelations = UserCredentials &
  UserCredentialsRelations;
