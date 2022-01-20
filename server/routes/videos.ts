import { Router } from 'express';
import {
  getVideosByKeyWord,
  getVideoById,
  getVideoComments,
  getVideoSentiment,
} from '../controllers/videos';

const router = Router();

router.get('/getByKeyWord/:keyWord', getVideosByKeyWord);
router.get('/getById/:id', getVideoById);
router.get('/getComments/:videoId', getVideoComments);
router.get('/getSentiment/:videoId', getVideoSentiment);

export default router;
