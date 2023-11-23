import { AccessToken } from "livekit-server-sdk";
const createToken = (roomName, participantName) => {
    const apiKey = process.env.LK_API_KEY;
    const apiSecret = process.env.LK_API_SECRET;
    const at = new AccessToken(apiKey, apiSecret, {
        identity: participantName
    });

    at.addGrant({ roomJoin: true, room: roomName });
    console.log(at.toJwt())
    return at.toJwt();
}

export {
    createToken
}