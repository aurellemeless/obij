
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8001;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.send('Obij API Server');
})

app.get('/meals', (req, res) => {
  let meals = [
        {
            "id":1,
            "name" : "Garba",
            "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "image" : "/images/1.png",
            "price" : 5000
        },
        {
            "id":2,
            "name" : "Placali",
            "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "image" : "/images/2.png",
            "price" : 5000
        },
        {
            "id":3,
            "name" : "Foufou",
            "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "image" : "/images/3.png",
            "price" : 5000
        },
        {
            "id":4,
            "name" : "Erour",
            "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "image" : "/images/4.png",
            "price" : 2000
        },
        {
            "id":5,
            "name" : "Doknon",
            "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "image" : "/images/5.png",
            "price" : 10000
        },
        {
            "id":6,
            "name" : "Djolof",
            "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "image" : "/images/6.png",
            "price" : 4000
        }
    ];
  
    res.json(meals);

});

app.get('/meals/:id', (req, res) => {

       res.send({});
    
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})