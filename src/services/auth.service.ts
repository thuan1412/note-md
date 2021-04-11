import {injectable, /* inject, */ BindingScope, Provider} from '@loopback/core';

/*
 * Fix the service type. Possible options can be:
 * - import {Auth} from 'your-module';
 * - export type Auth = string;
 * - export interface Auth {}
 */
export type Auth = unknown;

@injectable({scope: BindingScope.TRANSIENT})
export class AuthProvider implements Provider<Auth> {
  constructor(/* Add @inject to inject parameters */) {}

  value() {
    // Add your implementation here
    throw new Error('To be implemented');
  }
}
