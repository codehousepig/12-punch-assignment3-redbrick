import jwt from "jsonwebtoken";

const createToken = (id) => {
    const payload = {
      userId: id,
    };
    const secret = "redbrick";
    const expiresin = 36000000;
    const token = jwt.sign(payload, secret, {
      expiresIn: expiresin,
    });
    return token;
  };

export default createToken;