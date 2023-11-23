import { Router } from 'express';
import { getLivekitToken } from '../controllers/livekitToken.controller.js';
const livekitTokenRouter = Router();

livekitTokenRouter.get("/", getLivekitToken)

export default livekitTokenRouter;