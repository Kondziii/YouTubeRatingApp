import Video, { VideoFullInfo } from '@/types/Video';

interface VideoState {
  videos: Video[] | null;
  isModalVisible: boolean;
  confirmedVideo: VideoFullInfo | null;
  isInfoModalVisible: boolean;
}

export default VideoState;
