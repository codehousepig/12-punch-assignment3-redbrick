const express = require('express');
const router = express.Router();
const User = require('../controllers/users');

/* 회원 */
router.route('/signup').post(User.signup); //회원가입
// router.route('/login').post(User.login); //로그인

/* 예시api */
// router.route('/list').get(User.getList); //리스트 조회
// router.route('/:id').get(User.getOne); //단건 조회
// router.route("/:id").patch(User.put); //수정
// router.route("/:id").delete(Board.del); //삭제

module.exports = router;
