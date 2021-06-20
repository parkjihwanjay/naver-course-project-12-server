import { Request, Response } from 'express';
import * as express from 'express';
import { Card } from '@/card';
import { List } from '@/list';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { listId } = req.body;
    const result = await Card.findByList(listId);
    res.json(result);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { listId, card } = req.body;
  const { title, content, date } = card;
  try {
    const newCard = new Card();
    const list = await List.findOne({ id: listId });
    newCard.list = list;
    newCard.title = title;
    newCard.content = content;
    newCard.date = date;
    const result = await newCard.save();
    res.json(result);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const cardId = Number(req.params.id);
  try {
    const card = await Card.findOneOrFail({ id: cardId });
    res.json(card);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const cardId = Number(req.params.id);
  try {
    const result = await Card.delete(cardId);
    res.json(result);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const cardId = req.params.id;
    const target = await Card.findOneOrFail(cardId);
    const { title, content, date, labels } = req.body;

    if (title) target.title = title;
    if (content) target.content = content;
    if (date) target.date = date;
    if (labels) target.labels = labels;

    const result = await target.save();

    res.json(result);
  } catch (e) {
    res.status(400).json(e);
  }
});

export default router;
