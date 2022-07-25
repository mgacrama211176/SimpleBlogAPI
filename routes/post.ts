import express from 'express';
import Post from '../models/PostModel.js';

const router = express.Router();

//Creating post
router.post('/', async (request, response) => {
  const newPost = await Post(request.body);
  try {
    const savePost = await newPost.save();
    response.status(200).json({ message: `Post added` });
  } catch (err) {
    response.status(500).json({ message: `error` });
  }
});

//Updating Post
router.put('/:id', async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);
    if (post.username === request.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          request.params.id,
          {
            $set: request.body,
          },
          { new: true }
        );
        response.status(200).json({ message: `post updated` });
      } catch (err) {
        response.status(500), json(err);
      }
    } else {
      response.status(401).json({ message: `Not your post` });
    }
  } catch (err) {
    response.status(500).json(err);
  }
});

//Deleting Post
router.delete('/:id', async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);
    if (post.username === request.body.username) {
      try {
        await post.delete();
        response.status(200).json({ message: `post deleted` });
      } catch (err) {
        response.status(500), json(err);
      }
    } else {
      response.status(401).json({ message: `Not your post` });
    }
  } catch (err) {
    response.status(500).json(err);
  }
});

//Get posts
router.get('/:id', async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);
    response.status(200).json(post);
  } catch (err) {
    response.status(500).json(err);
  }
});

//get all posts
router.get('/', async (request, response) => {
  const username = request.query.user;
  const category = request.query.category;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username: username });
    } else if (category) {
      posts = await Post.find({
        category: {
          $in: [category],
        },
      });
    } else {
      posts = await Post.find();
    }
    response.status(200).json(posts);
  } catch (err) {
    response.status(500).json(err);
  }
});

export default router;
