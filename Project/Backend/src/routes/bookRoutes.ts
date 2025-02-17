import express from "express";
import { getAllBooks, getBookById, addBook, updateBook, deleteBook } from "../controllers/bookController";

const router = express.Router();

// 📚 ดึงข้อมูลหนังสือทั้งหมด
router.get("/", getAllBooks);

// 🔍 ดึงข้อมูลหนังสือแบบระบุ ID
router.get("/:id", getBookById);

// ➕ เพิ่มหนังสือใหม่
router.post("/", addBook);

// ✏️ แก้ไขข้อมูลหนังสือ
router.put("/:id", updateBook);

// ❌ ลบหนังสือ
router.delete("/:id", deleteBook);

export default router;
