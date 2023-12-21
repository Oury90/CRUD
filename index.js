import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const server_url = "http://localhost:3000";
const port = 4000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());


app.get("/", async(req, res) =>{
    const response = await axios.get(server_url);
    const data = response.data;
    console.log(data);
    res.render("index.ejs", {
        dataJoke: data
    });
})

app.get("/form", (req, res) =>{
    res.render("form.ejs");
})

// post a new joke
app.post("/post", async(req, res) =>{

    try {
        const response = await axios.post(`${server_url}/posts`, req.body);
        const data = response.data;
        console.log(data);
        res.redirect("/");
    } catch (error) {
        console.error();
    }
   
})
// edit post

app.get("/posts/:id", async(req, rs) =>{
    const response = await axios.get(`${server_url}/posts/${req.params.id}`);
    const data  = response.data;
    console.log(data.joke);
    
})

app.listen(port, () =>{
    console.log(`This server is running on port ${port}`);
})