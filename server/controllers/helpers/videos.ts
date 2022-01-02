import axios from 'axios';
import { KEY, URL_YOUTUBE_API } from '../../config';
import { Video, VideoByChannel } from '../../types/Video';

export const getChannelVideosFunction = async (playlistId: string) => {
  let response: any;
  const videos: Array<Video> = [];
  try {
    do {
      response = await axios.get(`${URL_YOUTUBE_API}/playlistItems`, {
        params: {
          key: KEY,
          part: 'id,snippet',
          maxResults: 50,
          playlistId: playlistId,
          pageToken: response?.data?.nextPageToken
            ? response.data.nextPageToken
            : '',
        },
      });

      videos.push(
        ...response.data.items.map((item: VideoByChannel) => {
          return {
            id: item.snippet.resourceId.videoId,
            channelId: item.snippet.channelId,
            channelTitle: item.snippet.channelTitle,
            title: item.snippet.title,
            publishedAt: item.snippet.publishedAt,
            image: item.snippet.thumbnails.default.url,
            imageHigh: item.snippet.thumbnails.high.url,
          } as Video;
        })
      );
    } while (response.data.nextPageToken);
  } catch (error) {
    throw { message: 'Server error', status: 500 };
  }

  if (videos.length === 0) {
    throw { message: "Channel hasn't got any videos.", status: 404 };
  } else {
    return videos;
  }
};
