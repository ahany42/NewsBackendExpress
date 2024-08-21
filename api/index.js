const express = require("express");
const cors = require("cors"); 
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 3004;

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
    avatar:"https://i.ibb.co/KLcQKYv/image.png"
},
{   id:4,
    userName: "Jane",
    avatar:"https://i.ibb.co/vj2dBQr/144-1448593-avatar-icon-teacher-avatar.png"

}
];
let news = [
  {
    id:1,
    title: "Summer Camp Registration",
    body: "Register now for our summer football camp! Limited spots available for an intensive training experience.",
    date: "15-07-2024",
    postedBy:2
  },
  {
    id:2,
    title: "Friendly Match Announcement",
    body: "Come watch our academy players compete in a friendly match against a local club. Event details inside.",
    date: "30-07-2024",
    postedBy:1
  },
  {
    id:3,
    title: "New Football Academy Opens",
    body: "Our new football academy opens its doors to young talents. Join us to develop your skills with the best coaches.",
    date: "19-08-2024",
    postedBy:4
  },
  {
    id:4,
    title: "New Football Academy Opens",
    body: "Our new football academy opens its doors to young talents. Join us to develop your skills with the best coaches.",
    date: "19-08-2024",
    postedBy:3
  }
  
];

let newsLock = false;

app.get('/', (req, res) => {
    res.write("Apis are working");
    res.end();
});

// Users APIs
app.get('/users/getAll', (req, res) => {
    res.json(users);
});
app.get('/users/loggedInUser', (req, res) => {
    res.json(users[2]);
});
app.post('/users/add', (req, res) => {
    news.push(req.body);
});

// News APIs
app.get('/news/getAll', (req, res) => {
    res.json(news);
});
app.get('/news/myNews/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const myNews = news.filter(newsItem => newsItem.postedBy === id);
    res.json(myNews);
});
app.get('/news/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const desiredNews = news.find(newsItem => newsItem.id === id);
    res.json(desiredNews);
});
app.post('/news/add', (req, res) => {
    if (!req.body || !req.body.title || !req.body.body) {
        return res.status(400).json({ message: 'Invalid news item' });
    }
    if (newsLock) {
        return res.status(503).json({ message: 'Server busy, try again later' });
    }
    newsLock = true;

    try {
        news.push(req.body);
        res.status(201).json({ message: 'News item added successfully' });
    } finally {
        newsLock = false;
    }
});
app.delete('/news/delete/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID parameter' });
    }

    const index = news.findIndex(newsItem => newsItem.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'News item not found' });
    }

    news.splice(index, 1);
    res.status(200).json({ message: 'News item deleted successfully' });
});
app.patch('/news/edit/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updates = req.body;
    const updatedNews = news.find(newsItem => newsItem.id === id);

    if (!updatedNews) {
        return res.status(404).send('Item not found');
    }

    Object.assign(updatedNews, updates);
    res.status(200).json(updatedNews);
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
module.exports = app;
