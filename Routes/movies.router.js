const e = require('express');
const { Router } = require('express');
const { MovieModel } = require('../Models/movie.model');
const moviesRouter = Router();

moviesRouter.get('/', async (req, res) => {
    let { title, rating, q, order, sort, page = 1, limit = 10 } = req.query;
    // console.log(page, limit, typeof(page), typeof(limit))
    try {
        if (title) {
            let movies = await MovieModel.find({ title });
            res.send(movies);
        }
        else if (rating) {
            let movies = await MovieModel.find({ rating });
            res.send(movies);
        }
        else if (rating && title) {
            let movies = await MovieModel.find({ rating, title });
            res.send(movies);
        }
        else if (q && !sort) {
            console.log(q)
            let movies = await MovieModel.find({ title: { $regex: `${q}`, $options: "six" } });
            res.send(movies);
        }
        else if (q && sort) {
            if (order === "asc") {
                let movies = await MovieModel.aggregate([{ $sort: { sort: 1 } }]);
                res.send(movies);
            } else if (order === "desc") {
                let movies = await MovieModel.aggregate([{ $sort: { sort: -1 } }]);
                res.send(movies);
            } else {
                let movies = await MovieModel.find();
                res.send(movies);
            }
        }
        //pagination;
        else if (page) {
            if (Number(page) === 1) {
                let movies = await MovieModel.find().skip(0).limit(+limit);
                res.send(movies);
            } else {
                // console.log(limit, typeof (limit));
                let s = Number(page) * Number(limit) - Number(limit);
                // console.log(s, typeof (s))
                let movies = await MovieModel.find().skip(s).limit(+limit);
                res.send(movies);
            }
        }
        else {
            if (order === "asc") {
                let movies = await MovieModel.aggregate([{ $sort: { rating: 1 } }]);
                res.send(movies);
            } else if (order === "desc") {
                let movies = await MovieModel.aggregate([{ $sort: { rating: -1 } }]);
                res.send(movies);
            } else {
                let movies = await MovieModel.find();
                res.send(movies);
            }
        }
    } catch (err) {
        console.log(err);
        res.status(404).send({ "Error": "Somthing went wrong" });
    }
});

moviesRouter.post('/post', async (req, res) => {
    const data = req.body;
    try {
        const movie = new MovieModel(data);
        await movie.save();
        console.log(movie);
        res.status(200).send("Succefully added movie");
    } catch (err) {
        console.log(err);
        res.status(404).send({ "Error": err });
    }
});

moviesRouter.put('/put/:id', async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        await MovieModel.findByIdAndUpdate({ _id: id }, payload);
        res.send(`Changed successfully movie whose id id ${id}`);
    } catch (err) {
        console.log(err);
        res.status(404).send({ "Error": err.message });
    }
});

moviesRouter.patch('/patch/:id', async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        await MovieModel.findByIdAndUpdate({ _id: id }, payload);
        res.send(`updated successfully movie whose id id ${id}`);
    } catch (err) {
        console.log(err);
        res.status(404).send({ "Error": err.message });
    }
});

moviesRouter.delete('/delete:id', async (req, res) => { //delete/:id also do in this way
    const { id } = req.params;
    // console.log(id)
    try {
        await MovieModel.findByIdAndDelete({ _id: id });
        res.send(`Deleted successfully movie whose id id ${id}`);
    } catch (err) {
        console.log(err);
        res.status(404).send({ "Error": err.message });
    }
});
module.exports = { moviesRouter };