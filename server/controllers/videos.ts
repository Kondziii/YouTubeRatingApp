import { CommentThreadItem } from './../types/Comment';
import { CommentThread, Comment } from '../types/Comment';
import { VideoBySearch, VideoById, Video } from './../types/Video';
import axios from 'axios';
import { KEY, URL_YOUTUBE_API } from '../config';
import { RequestHandler } from 'express';

export const getVideosByKeyWord: RequestHandler = async (req, res, next) => {
  const params = req.params as { keyWord: string };
  let response;

  try {
    response = await axios.get(`${URL_YOUTUBE_API}/search`, {
      params: {
        key: KEY,
        part: 'snippet',
        maxResults: 25,
        type: 'video',
        q: params.keyWord,
      },
    });
  } catch (error) {
    next({ message: 'Server error', status: 500 });
  }

  if (!response || response.data.items.length === 0) {
    next({ message: 'Video has not be found!', status: 404 });
  } else {
    res.json(
      response.data.items.map((item: VideoBySearch) => {
        return {
          id: item.id.videoId,
          channelId: item.snippet.channelId,
          channelTitle: item.snippet.channelTitle,
          title: item.snippet.title,
          publishedAt: item.snippet.publishedAt,
          image: item.snippet.thumbnails.default.url,
        } as Video;
      })
    );
  }
};

export const getVideoById: RequestHandler = async (req, res, next) => {
  const params = req.params as { id: string };
  const query = req.query as { part: string };
  let response;

  try {
    response = await axios.get(`${URL_YOUTUBE_API}/videos`, {
      params: {
        key: KEY,
        part: query.part || 'snippet',
        maxResults: 25,
        id: params.id,
      },
    });
  } catch (error) {
    next({ message: 'Server error', status: 500 });
  }

  if (!response || response.data.items.length === 0) {
    next({ message: 'Video has not be found!', status: 404 });
  } else {
    res.json(
      response.data.items.map((item: VideoById) => {
        return {
          id: item.id,
          channelId: item.snippet.channelId,
          channelTitle: item.snippet.channelTitle,
          title: item.snippet.title,
          publishedAt: item.snippet.publishedAt,
          image: item.snippet.thumbnails.default.url,
          statistics: query.part?.includes('statistics') && item.statistics,
        } as Video;
      })
    );
  }
};

export const getVideoComments: RequestHandler = async (req, res, next) => {
  const params = req.params as { videoId: string };
  let response: any;
  const comments = [];

  try {
    do {
      response = await axios.get(`${URL_YOUTUBE_API}/commentThreads`, {
        params: {
          key: KEY,
          part: 'snippet,replies',
          maxResults: 100,
          videoId: params.videoId,
          pageToken: response?.data?.nextPageToken
            ? response.data.nextPageToken
            : '',
        },
      });

      comments.push(
        ...response.data.items.map((item: CommentThread) => {
          return [
            {
              text: item.snippet.topLevelComment.snippet.textOriginal.replace(
                '\n',
                ' '
              ),
              authorId:
                item.snippet.topLevelComment.snippet.authorChannelId.value,
            } as Comment,
            item.replies?.comments.map((comment: CommentThreadItem) => {
              return {
                text: comment.snippet.textOriginal.replace('\n', ' '),
                authorId: comment.snippet.authorChannelId.value,
              };
            }),
          ];
        })
      );
    } while (response.data.nextPageToken);
  } catch (error) {
    next({ message: 'Server error', status: 500 });
  }

  if (comments.length === 0) {
    next({ message: "Video hasn't got any comments.", status: 404 });
  } else {
    res.json(comments.flat(2));
  }
};
