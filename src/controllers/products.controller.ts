import { PrismaClient } from "@prisma/client";
import { Request , Response} from "express";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import { failureResponse } from "../failureResponse";
import { prismaAction } from "./controller";


const prisma = new PrismaClient();

export const create = (req: Request , res: Response) => null
export const findAll = (req: Request , res: Response) => 

  pipe(
    prismaAction(() =>
      prisma.product.findMany()
    ),
    TE.match(
      (l) => failureResponse(l, res),
      (r) => res.status(200).send(r),
    ),
  )();
export const findById = (req: Request , res: Response) => null
export const remove = (req: Request , res: Response) => null
export const update = (req: Request , res: Response) => null