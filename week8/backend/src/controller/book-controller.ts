import { Request, Response } from "express";
import * as BookService from "../service/book-service";
import { z, ZodError } from "zod";

const BookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    description: z.string().optional(),
    price: z.number().positive("Price must be positive"),
})

export const getBooks = async (_req: Request, res: Response) => {
    const books = await BookService.getAllBooks();
    res.json(books);
}

export const getBook = async (req: Request, res: Response) => {
    const book = await BookService.getBookById(req.params.id);
    if (book) {
        res.json(book)
    }else {
        res.status(404).json({error: "Book not found"});
    }
}

export const createBook = async (req: Request, res: Response) => {
    try {
        const validateData = BookSchema.parse(req.body);
        console.log(validateData);

        const book = await BookService.createBook(validateData);
        res.status(201).json(book);
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({error: error.issues});
        } else if (error instanceof Error) {
            res.status(500).json({error: error.message});
        } else {
            res.status(500).json({error: "Unkown error occurred"});
        }
    }
}

export const updateBook = async (req: Request, res: Response) => {
    try {
        const validateData = BookSchema.partial().parse(req.body);
        const book = await BookService.updateBook(req.params.id, validateData);
        res.json(book);
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({error: error.issues});
        } else if (error instanceof Error) {
            res.status(500).json({error: error.message});
        } else {
            res.status(500).json({error: "Unkown error occurred"});
        }
    }
}

export const deleteBook = async (req: Request, res: Response) => {
    try {
        const book = await BookService.deleteBook(req.params.id);
        res.json(book);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({error: error.message});
        } else {
            res.status(500).json({error: "Unkown error occurred"});
        }
    }
}