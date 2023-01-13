const { Router } = require('express');
const { heroModel } = require('../Models/hero.model');
const heroRouter = Router();

heroRouter.get('/get', async (req, res) => {
    let query = req.query;
    // console.log(query)
    try {
        const heroesDB = await heroModel.find(query);
        res.send(heroesDB);
    } catch (err) {
        console.log(err);
        res.status(404).send({ "Error": "Somthing went wrong" });
    }
});

heroRouter.post('/post', async (req, res) => {
    const data = req.body;
    try {
        const hero = new heroModel(data);
        await hero.save();
        // console.log(hero);
        res.status(200).send("Succefully added hero");
    } catch (err) {
        console.log(err);
        res.status(404).send({ "Error": err });
    }
});

heroRouter.patch('/patch/:id', async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        await heroModel.findByIdAndUpdate({ _id: id }, payload);
        res.send(`updated successfully hero whose id id ${id}`);
    } catch (err) {
        console.log(err);
        res.status(404).send({ "Error": err.message });
    }
});

heroRouter.delete('/delete/:id', async (req, res) => { //delete/:id also do in this way
    const { id } = req.params;
    // console.log(id)
    try {
        await heroModel.findByIdAndDelete({ _id: id });
        res.send(`Deleted successfully hero whose id id ${id}`);
    } catch (err) {
        console.log(err);
        res.status(404).send({ "Error": err.message });
    }
});

module.exports = { heroRouter };