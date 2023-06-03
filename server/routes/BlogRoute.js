import express from 'express';
import { createBlog, deleteBlog, displayBlog } from '../controller/BlogController.js';
import multer from 'multer';

const router= express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });

  const upload = multer({ storage });

//Create a Blog
router.post('/createBlog', upload.single('image'), createBlog);

//Display a Blog
router.get('/displayBlog', displayBlog);

//Delete a Blog
router.delete('/deleteBlog/:id', deleteBlog);

export default router;
