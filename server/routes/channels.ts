import { Router } from 'express';
import {
  getChannelsByKeyWord,
  getChannelsById,
  getVideos,
  getChannelSentiment,
} from '../controllers/channels';

const router = Router();

router.get('/getByKeyWord/:keyWord', getChannelsByKeyWord);
router.get('/getById/:id', getChannelsById);
router.get('/getVideos/:playlistId', getVideos);
router.get('/getSentiment/:playlistId', getChannelSentiment);

export default router;
