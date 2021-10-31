import { ChannelBasic, ChannelWithStats } from '@/types/Channel';

export interface ChannelState {
  channels: ChannelBasic | ChannelWithStats[] | unknown;
}
