import { ChannelBasic, ChannelFullInfo } from '@/types/Channel';

export interface ChannelState {
  channels: ChannelBasic[];
  isModalVisible: boolean;
  confirmedChannel: ChannelFullInfo | null;
  isInfoModalVisible: boolean;
}
