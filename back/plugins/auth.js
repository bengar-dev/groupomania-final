const jwt = require("jsonwebtoken");

const checkTokenUserId = (reqheaders) => {
  const headers = reqheaders.split(" ")[1];
  const decodedToken = jwt.verify(headers, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;
  return userId;
};

const checkHeaders = (reqheaders) => {
  if (reqheaders == undefined) return false;
  else {
    const headers = reqheaders.split(" ")[1];
    const decodedToken = jwt.verify(headers, process.env.TOKEN_KEY);
    const userId = decodedToken.userId;
    return true
  }
};

module.exports = {
  checkTokenUserId,
  checkHeaders,
};
