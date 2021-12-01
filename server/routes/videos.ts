import { Router } from 'express';
import {
  getVideosByKeyWord,
  getVideoById,
  getVideoComments,
} from '../controllers/videos';

const router = Router();

router.get('/getByKeyWord/:keyWord', getVideosByKeyWord);

router.get('/getById/:id', getVideoById);

router.get('/getComments/:videoId', getVideoComments);

export default router;
