import { match, P }from 'ts-pattern';

export interface IInternalFailure {}
export interface IClientFailure {}

export class InternalFailure implements IInternalFailure {
  error?: any;
  constructor(error?: any) {
    this.error = error;
  }
}

export class RetriveFromDatabaseFailure implements  IInternalFailure {
  error?: any;
  constructor(error?: any) {
    this.error = error;
  }
}
export class RequestJsonFormatFailure implements  IClientFailure{
  error?: any;
  constructor(error?: any) {
    this.error = error;
  }
}
export class InsertToDatabaseFailure implements IInternalFailure {
  error?: any;
  constructor(error?: any) {
    this.error = error;
  }
}
export class RequestArgumentFailure implements IClientFailure {
  error?: any;
  constructor(error?: any) {
    this.error = error;
  }
}

export class RequestBodyFailuire implements IClientFailure{
  error?: any;
  constructor(error?: any) {
    this.error = error;
  }
}

export class UserNotFoundFailure {
  error?: any;
  constructor(error?: any) {
    this.error = error;
  }
}

export class ProductNotFoundFailure {
  error?: any;
  constructor(error?: any) {
    this.error = error;
  }
}
export class OrderNotFoundFailure {
  error?: any;
  constructor(error?: any) {
    this.error = error;
  }
}


export function matchPrismaError(error: any) : Failure{
  console.error(error)
  return match(error)
    .with( { code: 'P2003',"clientVersion": P._ ,meta : {field_name: 'Order_userId_fkey (index)'}}, ()=> new UserNotFoundFailure(error))
    .with( { code: 'P2003',"clientVersion": P._ ,meta : {field_name: 'OrderDetails_productId_fkey (index)'}}, ()=> new ProductNotFoundFailure(error))
    .otherwise( ()=> new InternalFailure (error));

}

export type Failure = 
  | RequestJsonFormatFailure
  | RetriveFromDatabaseFailure
  | InsertToDatabaseFailure
  | RequestArgumentFailure
  | UserNotFoundFailure
  | ProductNotFoundFailure


export type ClientFailure =
  | RequestArgumentFailure
  | RequestJsonFormatFailure


function responseFailure (failure: Failure) {
    
}