import {
  authenticate,
  TokenService,
  UserService,
} from '@loopback/authentication';
import {
  TokenServiceBindings,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {post, requestBody, response} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {LoginDto, RegisterDto, User} from '../models';
import {UserRepository} from '../repositories';
import {Credentials12} from '../services';

export class AuthController {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository, // @inject(j)
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userServic: UserService<User, Credentials12>,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
  ) {}

  @post('regsiter')
  @response(204, {
    description: 'User register',
  })
  async regsiter(@requestBody() req: RegisterDto): Promise<string> {
    return '1';
  }

  @post('login')
  @response(200, {
    description: 'User login',
  })
  async login(@requestBody() req: LoginDto): Promise<string> {
    // const user = await this.userRepository.findOne();
    const user = await this.userServic.verifyCredentials({
      password: '1',
      username: '1',
    });
    // if (user) {
    // const profile = this.g
    // const token = this.jwtService.generateToken();
    const userProfile = this.userServic.convertToUserProfile(user);
    const token = this.jwtService.generateToken(userProfile);
    return token;
    // }
  }

  @post('me')
  @authenticate('jwt')
  @response(200, {
    description: 'Get user data',
  })
  async me(@requestBody() req: LoginDto): Promise<User | null> {
    const user = await this.userRepository.findOne();
    console.log(this.user);
    return user;
  }
}
