import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import {
  create,
  findAll,
  findById,
  remove,
  update,
} from "../controllers/products.controller";
const router = Router();
const prisma = new PrismaClient();

router.get("/:id", (req, res) => findById(req, res));
router.get("/", (req, res) => findAll(req, res));
router.post("/", (req, res) => create(req, res));
router.put("/:id", (req, res) => update(req, res));
router.delete("/:id", (req, res) => remove(req, res));

export default router;

