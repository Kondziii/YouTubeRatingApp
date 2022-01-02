const KEY = 'AIzaSyALK2EYQ3V0O0BurtTbPBxv4gqHAb0MX7c';
const URL_YOUTUBE_API = 'https://youtube.googleapis.com/youtube/v3';
const HOSTNAME = 'localhost';
const PORT = 3000;

// for video
const BASIC_SENTIMENT_THRESHOLD = 0.05;
const SENTIMENT_THRESHOLD = 0.475;
const COMMENT_COUNT_SENTIMENT_PRIVILEGE = 100;
const SENTIMENT_PRIVILEGE = 0.005;
const PRIVILEGE_THRESHOLD = 0.4;

//for channel
export const CHANNEL_BASIC_SENTIMENT_THRESHOLD = 0.05;
export const CHANNEL_SENTIMENT_THRESHOLD = 0.475;
export const CHANNEL_COUNT_VIDEOS_PRIVILEGE = 20;
export const CHANNEL_SENTIMENT_PRIVILEGE = 0.05;
export const CHANNEL_PRIVILEGE_THRESHOLD = 0.4;

export {
  KEY,
  URL_YOUTUBE_API,
  HOSTNAME,
  PORT,
  SENTIMENT_THRESHOLD,
  COMMENT_COUNT_SENTIMENT_PRIVILEGE,
  SENTIMENT_PRIVILEGE,
  PRIVILEGE_THRESHOLD,
  BASIC_SENTIMENT_THRESHOLD,
};
