import jwt from "jsonwebtoken";
import userRepo from "../repositories/users.js";

export default async (req, res, next) => {
  try {
    if (
      req.path.indexOf("/login") == -1 &&
      req.path.indexOf("/signup") == -1
    ) {
      if (req.headers.authorization) {
        let id;
        const secret = "redbrick";
        jwt.verify(
            req.headers.authorization.split(" ")[1],
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
