import Video from '@/types/Video';

interface VideoState {
  videos: Video[] | null;
  isModalVisible: boolean;
}

export default VideoState;
