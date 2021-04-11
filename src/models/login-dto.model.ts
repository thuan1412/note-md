import {Model, model, property} from '@loopback/repository';

@model()
export class LoginDto extends Model {
  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  constructor(data?: Partial<LoginDto>) {
    super(data);
  }
}

export interface LoginDtoRelations {
  // describe navigational properties here
}

export type LoginDtoWithRelations = LoginDto & LoginDtoRelations;
