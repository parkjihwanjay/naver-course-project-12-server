import { Request, Response } from 'express';
import * as express from 'express';
import { User, findUserByEmail } from '@/CustomUser';
import { Board } from '@/board';
// import { BoardUser } from '@/boardUser';

const router = express.Router();

// 특정 user의 board read
router.get('/', async (req: Request, res: Response) => {
  try {
    const user = await findUserByEmail(req.auth.email);
    const { boards } = user;
    res.json(boards);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { imgUrl } = req.body;
    const board = new Board();
    board.imgUrl = imgUrl;
    const newBoard = await board.save();

    const user = new User();
    user.email = 'cc6656@naver.com';
    user.id = 'asdf';
    user.boards = [newBoard];
    await user.save();

    res.json({ board: newBoard });
  } catch (e) {
    res.status(400).json({ e });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { auth } = req;
    const boardId = req.params.id;
    const board = await Board.getAllNested(+boardId);
    console.log(board);
    const index = auth.boards.findIndex((el) => el.id === board.id);
    if (index < 0) throw new Error('no authorization');
    res.json(board);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { board } = req;
    await board.remove();
    res.json();
  } catch (e) {
    res.status(400).json(e);
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { imgUrl, lists } = req.body;
    const boardId = req.params.id;
    const board = await Board.getAllNested(+boardId);
    if (imgUrl) board.imgUrl = imgUrl;
    if (lists) board.lists = lists;
    const result = await board.save();
    res.json(result);
  } catch (e) {
    res.status(400).json(e);
  }
});
export default router;
