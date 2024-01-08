import pkg from "jsonwebtoken";

const { sign, verify } = pkg;
const bcryptRounds = 10;
const tokenUID = "livefeed-firestore-authentication-token-uid";


export const createJwtToken = (id) => {
  try {
		//creating token with userid
		const token =  sign({id: id}, tokenUID, {
			expiresIn: "1h"
		})
    return token;
  } catch (e) {
		console.log(e);
		return `Error while creating token: ${e}`
	}
};

export const verifyToken = (token) => {
	return verify(token, tokenUID);
}