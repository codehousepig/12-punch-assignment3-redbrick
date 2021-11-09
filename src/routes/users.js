import express from "express";
const router = express.Router();
import User from "../controllers/users";

/* 회원 */
router.route('/signup').post(User.signup); //회원가입
router.route('/login').post(User.login); //로그인
router.route('/login').get(User.loginSite); //로그인

/* 예시api */
router.route('/list').get(User.getList); //리스트 조회
router.route('/:id').get(User.getOne); //단건 조회
router.route("/:id").patch(User.patch); //수정
router.route("/:id").delete(User.del); //삭제

export default  router;
