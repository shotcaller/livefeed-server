import express from 'express';
import { createToken } from '../services/livekitToken.service.js';

const getLivekitToken = (req, res, next) => {
    try {
        // const roomName  = req.body.roomName;
        // const participantName = req.body.participantName??"shotcaller";
        const roomName = "quickstart-room";
        const participantName = "shotcaller"
        res.json(createToken(roomName, participantName));
    }
    catch (err) {
        console.log("Error while generating livekit token", err.message);
        next(err);
    }
}

export {
    getLivekitToken
}