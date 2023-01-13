require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { connection } = require('./Configs/config');
const { moviesRouter } = require('./Routes/movies.router');
const { heroRouter } = require('./Routes/heroes.router');

const app = express();
app.use(express.json());
app.use(cors());

app.use("/movies", moviesRouter);
app.use("/heroes", heroRouter);

app.get('/', (req, res) => {
    res.send('Welcome in Movie App!');
});


app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connected to DB")
    } catch (err) {
        console.log("Error while connecting to Db")
        console.log(err);
    }
    console.log(`Server is running on ${process.env.port} port`)
});


