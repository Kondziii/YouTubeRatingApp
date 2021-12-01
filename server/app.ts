import { Exception } from './types/Exception';
import express from 'express';
import bodyParser from 'body-parser';
import channelRoutes from './routes/channels';
import videoRoutes from './routes/videos';
import { Request, Response, NextFunction } from 'express';

const app = express();
app.use(bodyParser.json());

app.use('/channels', channelRoutes);
app.use('/videos', videoRoutes);

app.use((err: Exception, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status).json({ error: err.message });
});

app.listen(3000, () => console.log('Server is listening on port 3000...'));