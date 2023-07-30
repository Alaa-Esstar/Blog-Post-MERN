const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const { json } = require("express");
const fs = require("fs");
const path = require("path");

// Create
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Update
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username == req.body.username) {
            try {
                // Check if the photo is updated
                const previousPhoto = post.photo;
                const updatedPostData = { ...req.body };
                if (req.body.photo) {
                    updatedPostData.photo = req.body.photo;
                }

                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: updatedPostData,
                }, { new: true });

                if (req.body.photo && previousPhoto !== updatedPost.photo) {
                    const photoPath = path.join(__dirname, "../images/", previousPhoto);

                    // Check if the file exists in the directory
                    if (fs.existsSync(photoPath)) {
                        fs.unlinkSync(photoPath);
                    } else {
                        console.log("File not found in the directory:", previousPhoto);
                        // Handle any additional logic here (e.g., update the database to remove the photo reference)
                    }
                }

                res.status(200).json(updatedPost)

            } catch (err) {
            }
        } else {
            res.status(401).json('you can update only your post!')
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

// Delete
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                // Check if the photo exists in the images/ directory
                if (post.photo) {
                    const photoPath = path.join(__dirname, "../images/", post.photo);

                    // Check if the file exists in the directory
                    if (fs.existsSync(photoPath)) {
                        fs.unlinkSync(photoPath);
                    } else {
                        console.log("File not found in the directory:", post.photo);
                        // Handle any additional logic here (e.g., update the database to remove the photo reference)
                    }
                }
                await Post.findByIdAndDelete(post.id);
                res.status(200).json("Post has been deleted...")
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("you can delete only your posts!")
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
})

// get all posts
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username })
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName]
                }
            })
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
})

// update posts username when updating user
router.put("/update-username/:username", async (req, res) => {
    try {
        const { username } = req.params;
        const { username: newUsername } = req.body;
        console.log("username", username)
        console.log("body", req.body)
        console.log("body", req.params)


        // Update username in the posts collection where username matches
        await Post.updateMany({ username }, { $set: { username: newUsername } });

        res.status(200).json({ message: "Username updated in posts successfully!" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;