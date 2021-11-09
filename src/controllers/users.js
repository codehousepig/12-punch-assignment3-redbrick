import userRepo from "../repositories/users";

const signup = async (req, res, next) => {
  //회원가입
  try {
    if(!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: 'Bad request',
      });
    } 
    const user = await userRepo.findByEmail(req.body.email);
    if (!user) {
      let params = {
        email: req.body.email,
        password : req.body.password
      };
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


export default { signup, login };
