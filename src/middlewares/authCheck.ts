import { Board } from '@/board';
import { List } from '@/list';
import { Card } from '@/card';
import { User } from '@/user';
import { Label } from '@/label';
import { NextFunction, request, Request, Response } from 'express';

export const boardAuthCheck = async (err: Error, req: Request, res: Response, next: NextFunction): void => {
  try {
    const { email } = req.user;
    const user = await User.findOneOrFail(email);
    if (!req.params) {
      // if no params, no need to check authorization.
      next();
    }
    const boardId = req.params.id;
    const board = await Board.findOneOrFail(boardId);
    if (board.users.indexOf(user) < 0) {
      throw new Error('no authorization');
    }
    next();
  } catch (e) {
    next(e);
  }
};

export const listAuthCheck = async (err: Error, req: Request, res: Response, next: NextFunction): void => {
  try {
    const { email } = req.user;
    const user = await User.findOneOrFail(email);

    if (!request.params) {
      // get all list of a board
      const { boardId } = req.body;
      const board = await Board.findOneOrFail(boardId);
      if (board.users.indexOf(user) < 0) {
        throw new Error('no authorization');
      }
    }
    const listId = req.params.id;
    const list = await List.findOneOrFail(listId);
    const { board } = list;
    if (board.users.indexOf(user) < 0) {
      throw new Error('no authorization');
    }
    next();
  } catch (e) {
    next(e);
  }
};

export const cardAuthCheck = async (err: Error, req: Request, res: Response, next: NextFunction): void => {
  try {
    const { email } = req.user;
    const user = await User.findOneOrFail(email);

    if (!request.params) {
      // get all card or create new card of a list
      const { listId } = req.body;
      const list = await List.findOneOrFail(listId);
      if (list.board.users.indexOf(user) < 0) {
        throw new Error('no authorization');
      }
    }
    const cardId = req.params.id;
    const card = await Card.findOneOrFail(cardId);
    const { board } = card.list;
    if (board.users.indexOf(user) < 0) {
      throw new Error('no authorization');
    }
    next();
  } catch (e) {
    next(e);
  }
};

export const labelAuthCheck = async (err: Error, req: Request, res: Response, next: NextFunction): void => {
  try {
    const { email } = req.user;
    const user = await User.findOneOrFail(email);

    if (!request.params) {
      // get all label or create new label of a board
      const { boardId } = req.body;
      const board = await Board.findOneOrFail(boardId);
      if (board.users.indexOf(user) < 0) {
        throw new Error('no authorization');
      }
    }
    const labelId = req.params.id;
    const label = await Label.findOneOrFail(labelId);
    const { board } = label;
    if (board.users.indexOf(user) < 0) {
      throw new Error('no authorization');
    }
    next();
  } catch (e) {
    next(e);
  }
};