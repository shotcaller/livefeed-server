import { AccessToken } from "livekit-server-sdk";
const createToken = (roomName, userName) => {
    const apiKey = process.env.LK_API_KEY;
    const apiSecret = process.env.LK_API_SECRET;
    const at = new AccessToken(apiKey, apiSecret, {
        identity: userName
    });

    at.addGrant({ roomJoin: true, room: roomName });
    console.log(at.toJwt())
    return at.toJwt();
}

export {
    createToken
}