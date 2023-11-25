import { createToken } from '../services/livekitToken.service.js';

const getLivekitToken = (req, res, next) => {
    try {
        const roomName  = req.query.roomName;
        const userName = req.query.userName;
        
        if(roomName && userName)
            res.json(createToken(roomName, userName));
        else
            throw new Error("Missing room ID or user ID in request.")
    }
    catch (err) {
        console.log("Error while generating livekit token", err.message);
        next(err);
    }
}

export {
    getLivekitToken
}