import userRepo from "../repositories/users";
import createToken from "../utils/accessToken";
import bcrypt from "bcrypt";

//비밀번호 암호화
const hash = async (plainText) => {
  const saltOrRounds = 10;
  return await bcrypt.hash(plainText.toString(), saltOrRounds);
};

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

//로그인 사이트 이동
const loginSite = async (req, res, next) => {
  console.log('login site worked 1`2')
  try {
    console.log('login site worked 1`2')
    const dirName = '/home/tech/coding/wanted/12-punch-assignment3-redbrick/front/login.html'
    res.sendFile(dirName)
  }
  catch (e) {
    console.log(e)
  }
}

//로그인
const login = async (req, res, next) => {
  console.log('login', req.body)
  try {  
    res.send(req.body.email)

    const user = await userRepo.findByEmail(req.body.email);
    if (!user) {
      return res.status(401).json({
        message: 'Wrong Email',
      });
    }else{
       // 비밀번호 compare
       const match = await bcrypt.compare(req.body.password, user.password);
       if (!match) {
         return res.status(401).json({
           message: 'Wrong Password',
         });
       }
      const token = createToken(user.id);
      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
      };
      return res.status(200).json({
        token,
        data: userData,
      });
    }

  } catch (e) {
    next(e);
  }
};

//리스트 조회
const getList = async (req, res, next) => {
  try {
    const data = await userRepo.all(req.query);

    return res.status(200).json({
      data,
    });
  } catch (e) {
    next(e);
  }
};

 //단건 조회
const getOne = async (req, res, next) => {

  try {    
    const data = await userRepo.findById(req.params.id);
    
    return res.status(200).json({
      data,
    });
  } catch (e) {
    next(e);
  }
};

//수정
const patch = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    let newPassword = await bcrypt.hash(req.body.password, salt);
  
    let params = {
      password: newPassword
    };    
   
    await userRepo.update(req.params.id, params);
    
    return res.status(200).json({ message: 'OK' });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

//삭제
const del = async (req, res, next) => {
  try {
    const user = await userRepo.findById(req.params.id); 
    // const user = await userRepo.findById(req.user.id); 
    //회원정보 crud에서는 req.user.id로 user접근이 가능하므로 본인확인 필요 없지만 game관련은 글쓴이 본인확인이 필요함
    
    if(!user) {
      return res.status(401).json({
        message: `User with ID: ${req.params.id} not found`,
      });  
    }else{
      await userRepo.deleteUser(req.params.id);
      return res.status(201).json({ message: 'OK' });
    }
   
  } catch (e) {
    next(e);
  }
};



export default { signup, login, loginSite, getList, getOne, patch, del };
