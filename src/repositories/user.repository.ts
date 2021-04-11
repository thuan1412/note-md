import {Getter, inject} from '@loopback/core';
import {
  DataObject,
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  Options,
  repository,
} from '@loopback/repository';
import {PgDataSource} from '../datasources';
import {User, UserCredentials, UserRelations} from '../models';
import {UserCredentialsRepository} from './user-credentials.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public userCredentials: HasOneRepositoryFactory<
    UserCredentials,
    typeof User.prototype.id
  >;
  constructor(
    @inject('datasources.pg') dataSource: PgDataSource,
    @repository.getter('UserCredentialsRepository')
    getUserCredentials: Getter<UserCredentialsRepository>,
  ) {
    super(User, dataSource);
    this.userCredentials = this.createHasOneRepositoryFactoryFor(
      'user_credentials',
      getUserCredentials,
    );
  }

  async create(userDto: DataObject<User>, options?: Options): Promise<User> {
    const user = await super.create(userDto, options);
    const creds = new UserCredentials({
      hash_password: '123',
    });

    await this.userCredentials(user.id).create(creds);
    return user;
  }
}
