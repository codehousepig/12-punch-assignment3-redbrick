const Publish = require('../schemas/publish');
const Like = require('../schemas/like');
const mongoose = require('mongoose');

// 목록 조회
const getAll = async (params) => {
    // 사용자 혹은 게임 검색
    let where = {};
    if (params.name != undefined) {
        where.name = new RegExp(params.name, 'i');
    }
    if (params.game != undefined) {
        where.game = new RegExp(params.game, 'i');
    }

    // 조건을 확인한 뒤 나온 결과값을 페이징
    const getAllPublish = await Publish.find(where)
        .skip(Number(params.offset) - 1)
        .limit(Number(params.limit));

    return getAllPublish;
};

// 단건 조회 & 조회수 카운트
const getOne = async (publish_id) => {
    const result = await Publish.findByIdAndUpdate({_id: publish_id});
    const pView = result.view + 1;
    await Publish.findByIdAndUpdate(publish_id, {view: pView});
    return result;
};

// 추가(저장)
const create = async (params) => {
    const result = new Publish(params);
    return result.save();
};

// 수정
const update = async (publish_id, params) => {
    const result = await Publish.findByIdAndUpdate(publish_id, params);
    return result;
};

// 삭제
const remove = async (removeId) => {
    const result = await Publish.remove({id: removeId});
    return result;
};

// 좋아요 추가
const plus = async (params) => {
    const isExist = await Like.findOne({
        user_id: params.user_id,
        publish_id: params.publish_id
    });
    console.log(isExist);
    if (!isExist) {
        const result = new Like(params);
        return result.save();
    } else {
        return "Exist";
    }
};

// 좋아요수 카운트
const likeCount = async (publish_id) => {
    const getOneLikeCount = await Like.count({publish_id: publish_id});
    return getOneLikeCount;
}
module.exports = {getAll, getOne, create, update, remove, plus, likeCount};