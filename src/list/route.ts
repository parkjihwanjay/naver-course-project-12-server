import { Request, Response } from 'express';
import * as express from 'express';
import { List } from '@/list';
import { Board } from '@/board';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { boardId } = req.body;
    const result = await List.findByBoard(boardId);
    res.json(result);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { boardId, title } = req.body;
  try {
    const newList = new List();
    const board = await Board.findOne({ id: boardId });
    newList.board = board;
    newList.title = title;
    const result = await newList.save();
    const list = await List.getAllNested(result.id);
    res.json(list);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const listId = Number(req.params.id);
  try {
    const list = await List.findOneOrFail({ id: listId });

    res.json(list);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const listId = Number(req.params.id);
  try {
    const result = await List.delete(listId);
    if (!result.affected) {
      throw new Error('delete fail');
    }
    res.json(result);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const listId = req.params.id;
    const target = await List.findOneOrFail(listId);
    const { title, cards } = req.body;
    if (title) target.title = title;
    if (cards) target.cards = cards;
    const result = await target.save();
    res.json(result);
  } catch (e) {
    res.status(400).json(e);
  }
});

export default router;
