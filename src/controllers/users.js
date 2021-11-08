import userRepo from "../repositories/users";
import bcrypt from "bcrypt";

//비밀번호 암호화
const hash = async (plainText) => {
  const saltOrRounds = 10;
  return await bcrypt.hash(plainText.toString(), saltOrRounds);
};

const signup = async (req, res, next) => {
  //회원가입
  try {
    // console.log(req.body);
    const user = await fnUsers.findByEmail(req.body.email);
    // console.log(user);
    if (!user) {
      let params = {
        email: req.body.email
      };
      params.password = await hash(req.body.password);
      await userRepo.store(params);
      return res.status(200).json({ message: 'OK' });
    } else {
      return res.status(401).json({
        message: 'Wrong Email',
      });
    }
  } catch (e) {
    next(e);
  }
};

//로그인
const login = async (req, res, next) => {
  
};


module.exports = { signup, login };
