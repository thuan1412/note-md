import {Model, model, property} from '@loopback/repository';

@model()
export class RegisterDto extends Model {
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

  @property({
    type: 'string',
  })
  firstName?: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<RegisterDto>) {
    super(data);
  }
}

export interface RegisterDtoRelations {
  // describe navigational properties here
}

export type RegisterDtoWithRelations = RegisterDto & RegisterDtoRelations;
