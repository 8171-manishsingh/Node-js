import blogModel from "../model/blog.model.js"
const blogController = {
    createPost: async (req, res) => {
        try {
            const { title, content } = req.body
            const userId = req.user.id
            const newPost = new blogModel({ title, content, author: userId });
            await newPost.save();
            res.status(201).json({ message: "Blog post created", post: newPost });
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    getAllpost: async (req, res) => {
        try {
            const posts = await blogModel.find().populate("author", "username email");
            res.status(200).json(posts);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    updatePost: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, content } = req.body;

            const post = await blogModel.findById(id);

            if (!post) return res.status(404).json({ message: "Post not found" });

            post.title = title || post.title;
            post.content = content || post.content;
            await post.save();

            res.status(200).json({ message: "Post updated", post });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    deletePost: async (req, res) => {
        try {
            const { id } = req.params;

            const post = await blogModel.findById(id);
            if (!post) return res.status(404).json({ message: "Post not found" });

            await blogModel.findByIdAndDelete(id);
            res.status(200).json({ message: "Post deleted" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

export default blogController
