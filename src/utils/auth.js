import pkg from "jsonwebtoken";

const { sign, verify } = pkg;


export const createJwtToken = (id) => {
  try {
		//creating token with userid
		const token =  sign({id: id}, process.env.JWT_SECRET, {
			expiresIn: "1h"
		})
    return token;
  } catch (e) {
		console.log(e);
	}
};

export const verifyToken = (token) => {
	return verify(token, process.env.JWT_SECRET);
}