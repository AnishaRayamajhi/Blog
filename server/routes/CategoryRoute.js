import express from "express";
import { createCategory, displayCategory , deleteCategory, updateCategory, displayAllCategory} from "../controller/CategoryController.js";

const router= express.Router();

//Create category
router.post('/addCategory', createCategory);

//Display single category
router.get('/displayCategory/:id', displayCategory);

//Display all category
router.get('/displayAllCategory', displayAllCategory);

//Delete category
router.delete('/deleteCategory/:id', deleteCategory);

//Update
router.patch('/updateCategory/:id', updateCategory);


export default router;