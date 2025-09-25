const jwt = require("jsonwebtoken");
const { jwt: jwtConfig } = require("../config/env");

let refreshTokens = []; // Replace with Redis in production

exports.generateTokens = (recruiter, dbName) => {
  console.log("Generating tokens for dbName:", dbName);
  console.log("JWT Config:", jwtConfig);
  console.log("Recruiter Info:", { id: recruiter._id, email: recruiter.email, corporateId: recruiter.corporateId });
  const accessToken = jwt.sign(
    { id: recruiter._id, email: recruiter.email, corporateId: recruiter.corporateId, role: "Recruiter", dbName: dbName },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );

  const refreshToken = jwt.sign(
    { id: recruiter._id,
      dbName: dbName
     },
    jwtConfig.refreshSecret,
    { expiresIn: jwtConfig.refreshExpiresIn }
  )

  refreshTokens.push(refreshToken);

  return { accessToken, refreshToken };
};

exports.verifyAccessToken = (token) => jwt.verify(token, jwtConfig.secret);
exports.verifyRefreshToken = (token) => jwt.verify(token, jwtConfig.refreshSecret);

exports.invalidateRefreshToken = (token) => {
  refreshTokens = refreshTokens.filter((t) => t !== token);
};

exports.isValidRefreshToken = (token) => refreshTokens.includes(token);