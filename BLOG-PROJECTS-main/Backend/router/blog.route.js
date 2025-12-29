import express from 'express';
import blogController from "../controller/blog.controller.js";
import { authMiddleware, authorizeRoles } from '../middleware/middleWares.js';
const blogRouter = express.Router();

blogRouter.get("/", authMiddleware, blogController.getAllpost);
blogRouter.post("/", authMiddleware, authorizeRoles("admin", "user"), blogController.createPost);
blogRouter.put("/:id", blogController.updatePost);
blogRouter.delete("/:id", blogController.deletePost);


export default blogRouter;
