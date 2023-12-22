import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

let numId = 3;

// const data = new Date().toLocaleTimeString();


let posts = [
  // {
  //   "id":1,
  //   "quote": "Derive happiness in oneself from a good day's work, from illuminating the fog that surrounds us.",
  //   "author": "Henri Matisse",
  //   "category": "happiness"
  // },
  // {
  //   "id": 2,
  //   "quote": "There can be no happiness if the things we believe in are different from the things we do.",
  //   "author": "Freya Stark",
  //   "category": "happiness"
  // },
  // {
  //   "id": 3,
  //   "quote": "Man's only true happiness is to live in hope of something to be won by him. Reverence something to be worshipped by him, and love something to be cherished by him, forever.",
  //   "author": "John Ruskin",
  //   "category": "happiness"
  // }

  {
    id:1,
    quote: "Derive happiness in oneself from a good day's work, from illuminating the fog that surrounds us.",
    author: "Henri Matisse",
    category: "happiness"
  },
  {
    id: 2,
    quote: "There can be no happiness if the things we believe in are different from the things we do.",
    author: "Freya Stark",
    category: "happiness"
  },
  {
    id: 3,
    quote: "Man's only true happiness is to live in hope of something to be won by him. Reverence something to be worshipped by him, and love something to be cherished by him, forever.",
    author: "John Ruskin",
    category: "happiness"
  }
];

// get all posts
app.get("/", (req, res) =>{
  res.json(posts);
})

// get a specifique post
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});
// new posts

app.post("/posts", (req, res) =>{
  const newId = numId +1;
  const newPost = {
    id: newId,
    quote: req.body.quote,
    author: req.body.author,
    category: req.body.category
  }
  numId= newPost;
  posts.push(newPost);
  res.json(newPost);
})
// Edit the post
app.patch("/posts/:id", (req, res) =>{
  const id = parseInt(req.params.id);
  const postEdit = posts.find((post) => post.id ===id);
  if(!postEdit) return res.status(400).json({message: "Post not found"});

  if(req.body.quote) postEdit.quote = req.body.quote;
  if(req.body.author) postEdit.author = req.body.author;
  if(req.body.category) postEdit.category = req.body.category;
  res.json(postEdit);
})

// delete post
app.delete("/posts/:id", (req, res) =>{
  const id = parseInt(req.params.id);
  const index = posts.findIndex((post) => post.id = id);
  if(index === -1) return res.status(500).json({message: "Post not deleted"});
  posts.splice(index, 1);
  res.json({message: "Post deleted"});
})





app.listen(port, () =>{
  console.log(`This server is running on port http://localhost:${port}`);
})