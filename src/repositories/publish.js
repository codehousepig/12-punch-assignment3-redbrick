const Publish = require('../models/publish');
const Like = require('../models/like');

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
        .sort({createDate: -1}) // 만들어진 순서로 내림차순
        .skip((Number(params.offset) - 1) * params.limit)
        .limit(Number(params.limit));

    return getAllPublish;
};

// 단건 조회 & 조회수 카운트
const getOne = async (publish_id) => {
    const getOnePublish = await Publish.findOne({_id: publish_id});    
    return getOnePublish;    
};

// 추가(저장)
const create = async (params) => {
    const result = new Publish(params);
    return result.save();
};

const upload = async (params) => {
    const getOnePublish = await Publish.findOne({name: params.name});
    console.log(getOnePublish);
    if (getOnePublish === null) {
        create(params);
    } else {
        console.log(getOnePublish._id.toString());
        const publish_id = getOnePublish._id.toString();
        update(publish_id, params);
    }
};

// 수정
const update = async (publish_id, params) => {
    const result = await Publish.findByIdAndUpdate(publish_id, params);
    return result;
};

// 삭제
const remove = async (removeId) => {
    const result = await Publish.remove({_id: removeId});
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
        result.save();
        return getOne(params.publish_id);
    } else {
        return getOne(params.publish_id);
    }
};

// 좋아요수 카운트
const likeCount = async (publish_id) => {
    const getOneLikeCount = await Like.count({publish_id: publish_id});
    return getOneLikeCount;
}
module.exports = {getAll, getOne, upload, create, update, remove, plus, likeCount};