import { Response } from "express";
import { task, taskEither } from "fp-ts";
import { left, right, TaskEither } from "fp-ts/lib/TaskEither";
import { Failure, matchPrismaError } from "../errors";
import { failureResponse } from "../failureResponse";

export const prismaAction = (prisma: Function): TaskEither<Failure, any> =>
  taskEither.tryCatch(
    async () => await prisma(),
    (error) => matchPrismaError(error),
  );





export const hasData  = (e: any, failure: Failure )
  : TaskEither<Failure, any>  => 
  (e === null || e === undefined) ? left( failure )
        : right(e)
