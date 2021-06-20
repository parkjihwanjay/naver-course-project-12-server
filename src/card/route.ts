import { Request, Response } from 'express';
import * as express from 'express';
import { Card } from '@/card';
import { List } from '@/list';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { listId } = req.body;
    const result = await Card.findByList(listId);
    res.json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

router.post('/', async (req: Request, res: Response) => {
  console.log(req);
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
    console.log(e);
    res.status(400).json(e);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const cardId = Number(req.params.id);
  console.log('id:', cardId);
  try {
    const card = await Card.findOneOrFail({ id: cardId });
    console.log(card);

    res.json(card);
  } catch (e) {
    console.log(e);
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
    const result = await Card.updateCard(cardId, req.body);

    res.json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

export default router;
