import {UserService} from '@loopback/authentication';
import {injectable, /* inject, */ BindingScope, Provider} from '@loopback/core';
import {repository} from '@loopback/repository';
import {securityId, UserProfile} from '@loopback/security';
import {User, UserCredentials} from '../models';
import {UserRepository} from '../repositories';

/*
 * Fix the service type. Possible options can be:
 * - import {AuthService} from 'your-module';
 * - export type AuthService = string;
 * - export interface AuthService {}
 */

export type Credentials12 = {
  username: string;
  password: string;
};

@injectable({scope: BindingScope.TRANSIENT})
export class AuthServiceProvider implements UserService<User, Credentials12> {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  async verifyCredentials(credentials: Credentials12): Promise<User> {
    const user = await this.userRepository.findOne();
    if (!user) {
      throw new Error('not');
    }
    return user;
  }

  convertToUserProfile(user: User): UserProfile {
    console.log('conver to profile -', user);
    return {
      [securityId]: '1',
      id: 1,
      name: 'thuan',
    };
  }

  value() {
    // Add your implementation here
    throw new Error('To be implemented');
  }
}
