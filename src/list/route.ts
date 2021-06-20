import { Request, Response } from 'express';
import * as express from 'express';
import { List } from '../list';
import { Board } from '../board';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { boardId } = req.body;
    const result = await List.findByBoard(boardId);
    res.json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

router.post('/', async (req: Request, res: Response) => {
  console.log(req);
  const { boardId, title } = req.body;
  try {
    const newList = new List();
    const board = await Board.findOne({ id: boardId });
    newList.board = board;
    newList.title = title;
    const result = await newList.save();
    res.json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const listId = Number(req.params.id);
  console.log('id:', listId);
  try {
    const list = await List.findOneOrFail({ id: listId });
    console.log(list);

    res.json(list);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const listId = Number(req.params.id);
  try {
    const result = await List.delete(listId);
    res.json(result);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const listId = req.params.id;
    const data = await List.updateList(listId, req.body);

    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

export default router;
