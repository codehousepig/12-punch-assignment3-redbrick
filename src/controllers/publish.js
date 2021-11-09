const Publish = require('../schemas/publish');
const sPublish = require('../service/publish');
const Like = require('../schemas/like');
const mongoose = require('mongoose');

// 목록 조회
const getAll = async (req, res, next) => {
    let params = {
        name: req.query.name,
        game: req.query.game,
        limit: req.query.limit || 5,
        offset: req.query.offset || 1,
    }

    try {
        const getAllPublish = await sPublish.getAll(params);
        return res.status(200).json({getAllPublish});
    } catch (e) { next(e) };
};

// 단건 조회 & 좋아요 추가
const getOne = async (req, res, next) => {
    const publish_id = new mongoose.mongo.ObjectId(req.params.id);
    
    // like 에 회원 ID 가 없으면 단순 조회
    if (req.query.like === undefined) {
        const getOnePublish = await sPublish.getOne(publish_id);
        const getOneLikeCount = await sPublish.likeCount(publish_id);
        const data = {
            "_id": getOnePublish._id,
            "name": getOnePublish.name,
            "game": getOnePublish.game,
            "view": getOnePublish.view,
            "createDate": getOnePublish.createDate,
            "updateDate": getOnePublish.updateDate,
            "Like": getOneLikeCount
        }
        res.json(data);
    }
    // like 에 회원 ID 가 있으면 확인 후 좋아요 추가
    else {
        const user_id = new mongoose.mongo.ObjectId(req.query.like);
        let params = {
            user_id: user_id,
            publish_id: publish_id
        }
        const getOnePublish = await sPublish.getOne(publish_id);
        const plusLike = await sPublish.plus(params);

        res.json(getOnePublish);
    }
};

// 추가(저장)
const create = async (req, res, next) => {
    let params = {
        name: req.body.name,
        game: req.body.game,
        view: 0,
    };
    const createPublish = sPublish.create(params);
    res.json(createPublish);
};

// 수정
const update = async (req, res, next) => {
    const publish_id = req.params.id;
    let params = {
        name: req.body.name,
        game: req.body.game,
        updateDate: Date.now(),
    };
    const updatePublish = sPublish.update(publish_id, params);
    res.json(updatePublish);
};

// 삭제
const remove = async (req, res, next) => {
    const removeId = req.params.id;
    await sPublish.remove(removeId);
    res.json('Delete');
};

module.exports = {getAll, getOne, create, update, remove};