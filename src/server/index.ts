import express, { Express, Request, Response } from 'express';
import { config } from './config';
import { render } from './render';
import { getGalaxiesJSON } from '../app/api';

const app: Express = express();

app.use(express.static('dist'));

app.get('*', async (req: Request, res: Response) => {
  try {
    const data = await getGalaxiesJSON();
    const initialProps = {
      galaxies: data,
    };
    res.send(render(req.url, initialProps));
  } catch (error) {
    throw new Error('An error ocurred in galaxias', error);
  }
});

app.get('*', (req: Request, res: Response) => {
  res.send(render(req.url));
});

app.listen(config.PORT, () => {
  console.log(`Listening in http://localhost:${config.PORT}`);
});
