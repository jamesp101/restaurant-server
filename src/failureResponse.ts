import { Response } from "express";
import { pipe } from "fp-ts/lib/function";
import { match } from "ts-pattern";
import {
  Failure,
  ProductNotFoundFailure,
  UserNotFoundFailure,
} from "./errors";

export function failureResponse(failure: Failure, res: Response) {
  pipe (
    match(failure.constructor)
      .when(
        () => UserNotFoundFailure,
        () => ({ message: "User not found!", code: 404 , error: failure.error,}),
      )
      .when(
        () => ProductNotFoundFailure,
        () => ({ message: "Product not found!", code: 404 }),
      )
      .otherwise(() => ({ message: "General error", code: 500 })), 
      //send
    (e)=> res.status(e.code).send({error: e}),
  )
}

/* const response  =  (failure: Failure) :  =>{
  switch (failure.constructor) {
    case UserNotFoundFailure:
      return {error: {message:'User Not Found!', type : UserNotFoundFailure}}
    case ProductNotFoundFailure:
      return {error: {message:'Product not found!', type : UserNotFoundFailure}}
    default :
      return {error: {message:'General error', type : failure.error}}
  }
} */
