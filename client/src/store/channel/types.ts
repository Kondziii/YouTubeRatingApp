import { Channel } from '@/types/Channel';

export interface ChannelState {
  channels: Channel[];
  isModalVisible: boolean;
  confirmedChannel: Channel | null;
  isInfoModalVisible: boolean;
}
