const sPublish = require('../service/publish');
const mongoose = require('mongoose');
const { verifyAccessToken, generateAccessToken } = require('../utils/accessToken');

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
        res.status(200).json({getAllPublish});
    } catch (e) { next(e) };
};

// 단건 조회 & 좋아요 추가
const getOne = async (req, res, next) => {
    const publish_id = new mongoose.mongo.ObjectId(req.params.id);

    // like 에 회원 ID 가 있으면 확인 후 좋아요 추가
    if (!(req.query.like === undefined)) {
        const user_id = new mongoose.mongo.ObjectId(req.query.like);
        let params = {
            user_id: user_id,
            publish_id: publish_id
        };
        const result = await sPublish.plus(params);
        return res.status(200).json({result});
    }
    // like 에 회원 ID 가 없으면 단순 조회
    else {
        const result = await sPublish.getOne(publish_id);
        return res.status(200).json({result});
    }
};

// 추가(저장)
const create = async (req, res, next) => {
    let params = {
        user_id: req.body.user_id,
        name: req.body.name,
        game: req.body.game,
        view: 0,
    };
    await sPublish.create(params);
    res.status(200).json({ message: 'Create OK' });
};

// 수정
const update = async (req, res, next) => {
    const publish_id = req.params.id;
    let params = {
        name: req.body.name,
        game: req.body.game,
        updateDate: Date.now(),
    };
    await sPublish.update(publish_id, params);
    res.status(200).json({message: 'Update OK'});
};

// 삭제
const remove = async (req, res, next) => {
    const removeId = req.params.id;
    await sPublish.remove(removeId);
    return res.status(200).json({ message: ' Delete OK' });
};

module.exports = {getAll, getOne, create, update, remove};