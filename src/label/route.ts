import { Request, Response } from 'express';
import * as express from 'express';
import { Label } from '@/label';
import { Board } from '@/board';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { boardId } = req.body;
    const result = await Label.findByBoard(boardId);
    res.json(result);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { boardId, title } = req.body;
  try {
    const newLabel = new Label();
    const board = await Board.findOne({ id: boardId });
    newLabel.board = board;
    newLabel.title = title;
    const result = await newLabel.save();
    res.json(result);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const labelId = +req.params.id;
  try {
    const label = await Label.findOneOrFail({ id: labelId });
    res.json(label);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const labelId = Number(req.params.id);
  try {
    const result = await Label.delete(labelId);
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
    const labelId = req.params.id;
    const result = await Label.updateLabel(labelId, req.body);
    if (!result.affected) {
      throw new Error('update fail');
    }
    res.json(result);
  } catch (e) {
    res.status(400).json(e);
  }
});

export default router;
