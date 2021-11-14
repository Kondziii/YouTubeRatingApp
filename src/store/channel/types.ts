import { ChannelBasic } from '@/types/Channel';

export interface ChannelState {
  channels: ChannelBasic[];
  isModalVisible: boolean;
}
