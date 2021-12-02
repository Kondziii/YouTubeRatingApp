import { Video } from '@/types/Video';

interface VideoState {
  videos: Video[] | null;
  isModalVisible: boolean;
  confirmedVideo: Video | null;
  isInfoModalVisible: boolean;
}

export default VideoState;
