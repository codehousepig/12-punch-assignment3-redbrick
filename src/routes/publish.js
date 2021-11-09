const express = require('express');
const router = express.Router();
const Publish = require('../schemas/publish');
const mongoose = require('mongoose');

router.get('/', async (req, res, next) => {
    let params = {
        name: req.query.name,
        game: req.query.game,
        limit: req.query.limit || 5,
        offset: req.query.offset || 1,
    }

    let where = {};
    if (params.name != undefined) {
        where.name = new RegExp(params.name, 'i');
    }
    if (params.game != undefined) {
        where.game = new RegExp(params.game, 'i');
    }
    const getAllPublish = await Publish.find(where)
        .skip(Number(params.offset)-1)
        .limit(Number(params.limit));

    res.json(getAllPublish);
});

// 단건 조회
router.get('/:id', async (req, res, next) => {
    const _id = req.params.id;
    const getOnePublish = await Publish.findOne({_id: new mongoose.mongo.ObjectId(_id)});
    res.json(getOnePublish);
})

// 추가(저장)
router.post('/', async (req, res, next) => {
    let params = {
        name: req.body.name,
        game: req.body.game,
        view: 0,
    };
    console.log(params);
    const createPublish = new Publish(params);
    const result = createPublish.save();
    res.json(result);
});

// 수정
router.patch('/:id', async (req, res, next) => {
    const _id = req.params.id;
    let params = {
        name: req.body.name,
        game: req.body.game,
        updateDate: Date.now(),
    };
    const updatePublish = await Publish.findByIdAndUpdate(_id, params);
    res.json(updatePublish);
});

// 삭제
router.delete('/:id', async (req, res, next) => {
    const _id = req.params.id;
    await Publish.remove({id: _id});
    res.json('Delete');
});

module.exports = router;