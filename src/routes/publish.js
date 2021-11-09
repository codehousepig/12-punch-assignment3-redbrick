const express = require('express');
const router = express.Router();
const ctrlPublish = require('../controllers/publish');

router.route('/').get(ctrlPublish.getAll); // 전체 조회
router.route('/:id').get(ctrlPublish.getOne); // 단건 조회
router.route('/').post(ctrlPublish.upload); // 추가(저장)
router.route('/:id').delete(ctrlPublish.remove); // 삭제
router.route('/like').post(ctrlPublish.like); // 좋아요

module.exports = router;
