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
      userName:"John Doe",
      avatar:"https://www.flaticon.com/free-icon/boy_1999625?term=avatar&page=1&position=16&origin=search&related_id=1999625"
    },
    {
        id:2,
        userName:"Will Smith",
        avatar:"https://www.flaticon.com/free-icon/man_4140061?term=avatar&page=1&position=32&origin=search&related_id=4140061"
    },
    {
        id:3,
        userName:"Aly Hany",
        avatar:"https://www.flaticon.com/free-icon/man_2202112?term=avatar&page=1&position=2&origin=search&related_id=2202112"
    }

];
app.get('/news/getAll',(req,res)=>{
res.json(news);
})
app.post('/news/add',(req,res)=>{
news.push(req.body);
})


app.listen(3004, () => {
    console.log("Server is running on port 3004");
});