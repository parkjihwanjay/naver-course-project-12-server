import { Request, Response } from 'express';
import * as express from 'express';
import { User, findUserByEmail } from '@/CustomUser';
import { Board } from '@/board';
import { BoardUser } from '@/boardUser';

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
    // const user = await User.findOneOrFail(email);
    const board = new Board();
    board.imgUrl = imgUrl;
    const newBoard = await board.save();
    console.log(newBoard);

    const user = new User();
    user.email = 'cc6656@naver.com';
    user.id = 'asdf';
    user.boards = [newBoard];
    const newUser = await user.save();

    const boardUser = new BoardUser();
    boardUser.board = newBoard;
    boardUser.user = newUser;
    const newBoardUser = await boardUser.save();
    console.log(newBoardUser);

    // res.json(result);
    res.json({});
  } catch (e) {
    console.log(e);
    res.status(400).json({ e });
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
    const target = await Board.findOneOrFail(boardId);

    const { imgUrl, lists } = req.body;
    if (imgUrl) target.imgUrl = imgUrl;
    if (lists) target.lists = lists;

    const result = await target.save();
    res.json(result);
  } catch (e) {
    res.status(400).json(e);
  }
});
export default router;
