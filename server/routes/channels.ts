import { Router } from 'express';
import {
  getChannelsByKeyWord,
  getChannelsById,
  getVideos,
} from '../controllers/channels';

const router = Router();

router.get('/getByKeyWord/:keyWord', getChannelsByKeyWord);

router.get('/getById/:id', getChannelsById);

router.get('/getVideos/:playlistId', getVideos);

export default router;
