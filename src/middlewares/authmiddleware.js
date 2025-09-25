const jwt = require("jsonwebtoken");
const { jwt: jwtConfig, universityJwt } = require("../config/env");
const ApiError = require("../utils/ApiError");
const { token } = require("morgan");

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization || req.headers.Authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, "No token provided");
      }
      console.log("Authorization Header:", authHeader);

      const token = authHeader.split(" ")[1];
      console.log("Extracted Token:", token);
      
      // Log the token parts for debugging
      const tokenParts = token.split('.');
      console.log("Token Header:", Buffer.from(tokenParts[0], 'base64').toString());
      console.log("Token Payload:", Buffer.from(tokenParts[1], 'base64').toString());
      
      console.log("JWT Config Secret:", jwtConfig.secret);
      
      try {
        const decoded = jwt.verify(token, jwtConfig.secret);
        console.log("Decoded JWT:", decoded);
        
        req.user = decoded;
        
        if (roles.length && !roles.includes(decoded.role)) {
          console.log("Role mismatch. Required:", roles, "Got:", decoded.role);
          throw new ApiError(403, "Forbidden: Insufficient permissions");
        }
        
        next();
      } catch (jwtError) {
        console.error("JWT Verification Error:", jwtError.message);
        throw new ApiError(401, `Token verification failed: ${jwtError.message}`);
      }
    } catch (err) {
      console.error("Auth Error:", err.message);
      next(new ApiError(401, err.message || "Unauthorized"));
    }
  };
};

const verifyUniversityToken = async (req, res, next) => {
  try {
    const univeristyToken = req.headers.authorization || req.headers.Authorization;
    const token = univeristyToken.split(" ")[1];
    
    if (!token) {
      throw new ApiError(401, 'University token is required');
    }
    const tokenParts = token.split('.');
    console.log("Token Header:", Buffer.from(tokenParts[0], 'base64').toString());
    console.log("Token Payload:", Buffer.from(tokenParts[1], 'base64').toString());

    console.log("Verifying university token:", token);

    console.log("University JWT Public Key:", universityJwt.publicKey);

    // Verify using the same JWT secret
    const decoded = jwt.verify(token, universityJwt.publicKey);

    console.log("Decoded university token:", decoded);
    
    // Verify if the token is from university
    if (decoded.role !== 'PlacementAdmin') {
      throw new ApiError(403, 'Invalid token role');
    }

    console.log("University token verified successfully");

    // Add university info to request
    req.university = {
      id: decoded.userId,
      role: decoded.role,
      universityId: decoded.universityId
    };

    
    next();
  } catch (error) {
    console.error("University token verification error:", error.message);
    next(new ApiError(401, 'Invalid university token'));
  }
};


module.exports = {
  authMiddleware,
  verifyUniversityToken
};
