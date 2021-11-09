import jwt from "jsonwebtoken";
import userRepo from "../repositories/users.js";

export default async (req, res, next) => {
  try {
    if (
      req.path.indexOf("/login") == -1 &&
      req.path.indexOf("/signup") == -1
    ) {
      console.log('=========================================')
      console.log(req.headers.authorization);
      console.log('=========================================')
      console.log(req.cookies.accesstoken);
      console.log('=========================================')

      if (req.headers.authorization || req.cookies.accesstoken) {
        let id;
        const secret = "redbrick";
        let userJwt;
        if (req.headers.authorization) {
          userJwt = req.cookies.accesstoken;
        } else {
          userJwt = req.headers.authorization.split(" ")[1];
        }
        jwt.verify(
            userJwt,
            secret,
          (err, payload) => {
            if (err) {
              return res.status(401).json({ message: 'Wrong token', }); //토큰 에러

            }
            id = payload.userId;
          }
        );
        const user = await userRepo.findById(id);
        if (!user) {
          return res.status(401).json({ message: 'Unauthorized', }); //유저 정보 없음
        }

        req.user = user;
      } else {
        return res.status(401).json({ message: 'Unauthorized', }); //토큰 누락
      }
    }

    next();
  } catch (e) {
    next(e);
  }
};
