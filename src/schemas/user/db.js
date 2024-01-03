import { hash } from "bcrypt";
import { createJwtToken, initializeDb } from "../_db.js";
import { v4 } from "uuid";

const db = await initializeDb();
const usersRef = db.collection("users");
const bcryptRounds = 10;

export const getUsers = async () => {
  const users = await usersRef.get();
  if (users.empty) return null;
  else {
    return getDataList(users);
  }
};

export const loginUser = async ({ userid, password }) => {
  try {
    let token = "";
    let match = await usersRef
      .where("userid", "==", userid)
      .where("password", "==", password)
      .get();
    if (match.empty) throw Error("Incorrect username or password");
    const [matchedUser] = getDataList(match);
    if (matchedUser.id) token = createJwtToken(matchedUser.id);
    //if user is found and credentials matched
    return {
      success: matchedUser.id ? true : false,
      token: matchedUser.id ? token : null,
      user: matchedUser.id ? matchedUser : null,
    };
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
};

export const registerUser = async ({ userid, password, name }) => {
  try {
    const hashedPassword = await hash(password, bcryptRounds);
    const id = v4()
    let token = "";
    await usersRef.doc(userid).set({
      id,
      userid,
      password: hashedPassword,
      name,
    });
    const userObj = (await usersRef.doc(userid).get()).data();
    if (userObj.id) token = createJwtToken(userObj.id);
    return {
      success: userObj.id ? true : false,
      token: userObj.id ? token : null,
      user: userObj.id ? userObj : null,
    };
  } catch (e) {
    console.log(e);
    return e.message;
  }
};

/** Helper functions */
const getDataList = (dbResponse) => {
  let data = [];
  dbResponse.forEach((res) => data.push(res.data()));
  return data;
};
