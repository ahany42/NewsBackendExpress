const express = require("express");
const cors = require("cors"); 
const app = express();
app.use(cors());
let news = [
    {
      title: "New Football Academy Opens",
      body: "Our new football academy opens its doors to young talents. Join us to develop your skills with the best coaches.",
      date: "2024-08-19",
      color:"#5B99C2",
      postedBy:3
    },
    {
      title: "Summer Camp Registration",
      body: "Register now for our summer football camp! Limited spots available for an intensive training experience.",
      date: "2024-07-15",
      color:"#1A4870",
      postedBy:2
    },
    {
      title: "Friendly Match Announcement",
      body: "Come watch our academy players compete in a friendly match against a local club. Event details inside.",
      date: "2024-06-30",
      color:"#E7FBE6",
      postedBy:1
    }
  ];
let users = [
    {
      id:1,
      userName:"Alice",
      avatar:"https://i.ibb.co/N7L03bm/woman.png"
    },
    {
        id:2,
        userName:"Will Smith",
        avatar:"https://i.ibb.co/Lk5cqbw/man.png"
    },
    {
        id:3,
        userName:"Aly Hany",
        avatar:"https://i.ibb.co/smfgspT/image.png"
    }

];
//Users Apis
app.get('/users/getAll',(req,res)=>{
    res.json(users);
})
app.get('/users/loggedInUser',(req,res)=>{
    res.json(users[2]);
})
app.post('/users/add',(req,res)=>{
news.push(req.body);
})
//News Apis
app.get('/news/getAll',(req,res)=>{
res.json(news);
})
app.get('/news/myNews/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const myNews=news.filter(news=>news.postedBy===id);
    res.json(myNews);
})
app.post('/news/add',(req,res)=>{
news.push(req.body);
})

app.listen(3004, () => {
    console.log("Server is running on port 3004");
});