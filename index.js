import express from "express";
import bodyParser from "body-parser";
import axios from "axios";


const app = express();
const URL = "http://localhost:4000";
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static("public"));



app.get("/", async(req, res) =>{
    try {
        const response = await axios.get(`${URL}`);
        const data = response.data;
        res.render("index.ejs",{
            posts:data
        });
    } catch (error) {
        console.log(error);
    }
});

app.get("/new", (req, res) =>{
    res.render("form.ejs");
});

app.get("/edit/:id", async(req, res) =>{
    try {
        const response = await axios.get(`${URL}/posts/${req.params.id}`);
        const data = response.data;
        res.render("form.ejs", {
            post: data
        });
    } catch (error) {
        console.log(error);
    }
})

app.post("/api/posts", async(req, res) =>{
    try {
        const response = await axios.post(`${URL}/posts`, req.body);
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
})

app.post("/api/posts/:id", async(req, res) =>{
    try {
        const response = await axios.patch(`${URL}/posts/${req.params.id}`, req.body);
        console.log(response.data);
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
})

app.get("/api/delete/:id", async(req, res) =>{
    await axios.delete(`${URL}/posts/${req.params.id}`);
    res.redirect("/");
})

app.listen(port, () =>{
    console.log(`This server is ruinning on port ${port}`);
})