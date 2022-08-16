import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { IOrder } from "../interfaces/IOrder";
import { taskEither } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import {
  Failure,
  matchPrismaError,
  OrderNotFoundFailure,
  RequestBodyFailuire,
} from "../errors";
import { failureResponse } from "../failureResponse";
import { hasData, prismaAction } from "./controller";

const prisma = new PrismaClient();

/// Create
export const create = (req: Request, res: Response) =>
  pipe(
    TE.right(req.body),
    TE.chain(bodyAsOrder),
    TE.chain(IOrderToPrisma),
    TE.chain(insert),
    TE.match(
      (l) => failureResponse(l, res),
      (r) => res.status(200).send(r),
    ),
  )();

function insert(order: any): TE.TaskEither<Failure, any> {
  return taskEither.tryCatch(
    async () => await prisma.order.create({ data: order, include: {orderDetails: {include : {product: true}}} }),
    (error) => matchPrismaError(error),
  );
}

const bodyAsOrder = (body: any): TE.TaskEither<Failure, IOrder> =>
  taskEither.tryCatch(
    async () => body as IOrder,
    (error) => new RequestBodyFailuire(error),
  );

const IOrderToPrisma = (body: IOrder): TE.TaskEither<Failure, any> =>
  taskEither.tryCatch(
    async () => ({
      userId: body.userId,
      status: body.status,
      orderDetails: {
        create: body.orderDetails,
      },
    }),
    (error) => new RequestBodyFailuire(error),
  );

/// Search
export const findAll = (_: Request, res: Response) =>
  pipe(
    prismaAction(() =>
      prisma.order.findMany({
        include: { orderDetails: { include: { product: true } } },
      })
    ),
    TE.match(
      (l) => failureResponse(l, res),
      (r) => res.status(200).send(r),
    ),
  )();

export const findById = (req: Request, res: Response) =>
  pipe(
    prismaAction(() =>
      prisma.order.findUnique({
        where: { id: parseInt(req.params.id ?? 0) },
        include: { orderDetails: { include: { product: true } } },
      })
    ),
    TE.chain((i) => hasData(i, new OrderNotFoundFailure())),
    TE.match(
      (l) => failureResponse(l, res),
      (r) => res.send(r),
    ),
  )();

export const update = (req: Request, res: Response) =>
  pipe(
    prismaAction(() =>
      prisma.order.update({
        where: { id: parseInt(req.params.id ?? 0) },
        data: req.body,
      })
    ),
    TE.match(
      (l) => failureResponse(l, res),
      (r) => res.send(r),
    ),
  )();

export const remove = (req: Request, res: Response) =>
  pipe(
    prismaAction(() =>
      prisma.order.delete({
        where: { id: parseInt(req.params.id ?? 0) },
      })
    ),
    TE.match(
      (l) => failureResponse(l, res),
      (r) => res.send(r),
    ),
  )();


