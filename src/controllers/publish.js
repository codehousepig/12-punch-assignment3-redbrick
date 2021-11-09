const sPublish = require('../repositories/publish');
import likeRepo from "../repositories/like";
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
        res.status(200).json({getAllPublish});
    } catch (e) { next(e) };
};

// 단건 조회 & 좋아요 추가
const getOne = async (req, res, next) => {
    const publish_id = new mongoose.mongo.ObjectId(req.params.id);


    // console.log(req.query.like);
    // like 에 회원 ID 가 있으면 확인 후 좋아요 추가
    // if (!(req.query.like === undefined)) {
    //     const user_id = new mongoose.mongo.ObjectId(req.query.like);
    //     let params = {
    //         user_id: user_id,
    //         publish_id: publish_id
    //     };
    //     const result = await sPublish.plus(params);
    //     return res.status(200).json({result});
    // }
    // like 에 회원 ID 가 없으면 단순 조회
    // else {
        const puslish = await sPublish.getOne(publish_id);

        if(!puslish) {
            return res.status(401).json({
              message: `Puslish with ID: ${req.params.id} not found`,
            });  
         }
        const like =  await sPublish.likeCount(publish_id);
        const pView = puslish.view + 1;
        
        await sPublish.update(publish_id, {view: pView});
        const result = {
            "_id": puslish._id,
            "name": puslish.name,
            "game": puslish.game,
            "view": puslish.view,
            "createDate": puslish.createDate,
            "updateDate": puslish.updateDate,
            "Like": like
        };

        return res.status(200).json({result});
    // }
};

// 업로드 - 처음이면 등록, 있던 이름이면 수정
const upload = async (req, res, next) => {
    let params = {
        user_id: req.body.user_id,
        name: req.body.name,
        game: req.body.game,
        view: 0,
        updateDate: Date.now(),
    };
    console.log(params);
    await sPublish.upload(params);
    res.status(200).json({message: 'upload OK'});
};

// 좋아요
const like = async (req, res, next) => {
    let params = {
        user_id: req.user._id,
        publish_id: req.body.publish_id
    };

    const like = await likeRepo.findByParam(params);
    if(!like){
        await likeRepo.store(params);
    }else{
        await likeRepo.deleteLike(like);
    }    
    return res.status(200).json({ message: 'Like OK' });   
};


// 삭제
const remove = async (req, res, next) => {
    const removeId = req.params.id;
    await sPublish.remove(removeId);
    return res.status(200).json({ message: ' Delete OK' });
};

module.exports = {getAll, getOne, upload, remove, like};