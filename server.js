import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let numJokes = 3;

const jokes = [
    {
        "id": 1,
      "joke": "I just got my doctor's test results and I’m really upset. Turns out, I’m not gonna be a doctor.",
      "author": "Diallo Amadou Ourys"
    },
    {
        "id": 2,
      "joke": "I have a joke about chemistry, but I don’t think it’ll get a reaction.",
      "author": "Bah"
    },
    {
        "id": 3,
      "joke": "If a child refuses to nap, are they guilty of resisting a rest?",
      "author": "Barry"
    }
  ];

// get a random joke
app.get("/", (req, res) =>{
    const randomJokes = Math.floor(Math.random() * jokes.length);
    res.json(jokes[randomJokes]);
})
// post some joke in the list jokes
app.post("/posts", (req, res) =>{
    const newId = numJokes +1;
    const newJoke = {
        id: newId,
        joke: req.body.joke,
        author: req.body.author,
    }
    numJokes = newId;
    jokes.push(newJoke);
    res.json(newJoke);

})
// Edit post
app.patch("/posts/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const editJoke = jokes.find((joke) => joke.id === id);
    if(!editJoke) return res.status(400).json({message: "Joke not found"});
    if(req.body.joke) editJoke.joke = req.body.joke;
    if(req.body.author) editJoke.author = req.body.author;
    res.json(editJoke);
})
// Delete joke
app.delete("/posts/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const index = jokes.findIndex((joke) => joke.id === id);
    if(index === -1) return res.status(400).json({message: "Joke not deleted"});
    jokes.splice(index, 1);
    res.json("message deleted")
})


app.listen(port, () =>{
    console.log(`This server is running on port http://localhost:${port}`);
})