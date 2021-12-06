import { Exception } from './types/Exception';
import express from 'express';
import bodyParser from 'body-parser';
import channelRoutes from './routes/channels';
import videoRoutes from './routes/videos';
import { Request, Response, NextFunction } from 'express';
import { HOSTNAME, PORT } from './config';

const app = express();
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/channels', channelRoutes);
app.use('/videos', videoRoutes);

app.use((err: Exception, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(PORT, HOSTNAME, () =>
  console.log(`Server is available on http://${HOSTNAME}:${PORT}`)
);
