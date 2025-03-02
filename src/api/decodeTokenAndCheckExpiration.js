import { jwtDecode } from "jwt-decode";

const decodeTokenAndCheckExpiration = (token) => {
  try {
    const decodedToken = jwtDecode(token);

    if (decodedToken) {
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        localStorage.removeItem("rftoken");

        return {
          isValid: false,
          error: "Token has expired",
        };
      }
      return {
        isValid: true,
        decodedToken,
      };
    } else {
      return {
        isValid: false,
        error: "Invalid token, Please login again",
      };
    }
  } catch (error) {
    return {
      isValid: false,
      error: "Error decoding token",
    };
  }
};

export default decodeTokenAndCheckExpiration;

