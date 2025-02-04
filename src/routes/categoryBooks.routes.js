import { Router } from "express"
import categoryBookController from "../controllers/categoryBooks.controllers.js"

const router = Router()

router.get("/", categoryBookController.getAllCategories)
router.get("/:id_category_book", categoryBookController.getCategoryById)
router.post("/addCategory", categoryBookController.addCategory)
router.put("/:id_category_book", categoryBookController.updateCategory)
router.delete("/:id_category_book", categoryBookController.deleteCategory)

export default router
