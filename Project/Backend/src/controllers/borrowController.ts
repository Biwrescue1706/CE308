import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const borrowBook = async (req: Request, res: Response) => {
  const { userId, bookId } = req.body;
  const borrowDate = new Date();

  const borrow = await prisma.borrow.create({
    data: { userId, bookId, borrowDate },
  });

  res.json(borrow);
};

export const returnBook = async (req: Request, res: Response) => {
  const { borrowId } = req.body;
  const returnDate = new Date();

  const borrow = await prisma.borrow.update({
    where: { id: borrowId },
    data: { returnDate },
  });

  res.json(borrow);
};
