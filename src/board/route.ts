import { Request, Response } from 'express';
import * as express from 'express';
import { User, findUserByEmail } from '@/user';
import { Board } from '@/board';
import { BoardUser } from '@/boardUser';

const router = express.Router();

// 특정 user의 board read
router.get('/', async (req: Request, res: Response) => {
  try {
    // const { email } = req.body;
    // const user = await User.findOneOrFail({ email });
    const user = await findUserByEmail(req.user.id);
    const { boards } = user;
    res.json(boards);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { email, board } = req.body;
    const { imgUrl } = board;
    const user = await User.findOneOrFail({ email });
    const newBoard = new Board();
    newBoard.imgUrl = imgUrl;
    newBoard.users.push(user);
    const result = await newBoard.save();

    const boardUser = new BoardUser();
    boardUser.boardId = result.id;
    boardUser.userEmail = user.email;
    boardUser.status = 'read';
    await boardUser.save();

    res.json(result);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const boardId = req.params.id;
    const result = await Board.findOneOrFail(boardId);
    res.json(result);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const boardId = req.params.id;

    await Board.delete(boardId);

    res.json();
  } catch (e) {
    res.status(400).json(e);
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const boardId = req.params.id;
    const data = req.body;
    const target = await Board.findOneOrFail(boardId);
    const result = await target.save(data);
    res.json(result);
  } catch (e) {
    res.status(400).json(e);
  }
});
export default router;
