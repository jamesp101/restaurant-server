import { OrderDetail } from "./IOrderDetail";

export interface IOrder {
  id?: string,
  status: "COMPLETED" | "INPROGRESS" | "CANCELLED",
  orderDetails: OrderDetail[] ,
  userId: number,
}