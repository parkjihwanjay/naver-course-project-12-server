import { Board } from '@/board';
import { List } from '@/list';
import { Card } from '@/card';
import { User } from '@/CustomUser';
import { Label } from '@/label';
import { NextFunction, request, Request, Response } from 'express';
import { checkEmptyObject } from '../utils/object';

export const boardAuthCheck = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!checkEmptyObject(req.params)) return next();
    const { auth } = req;
    if (!auth) throw new Error('no user');
    next();
  } catch (e) {
    next(e);
  }
};

export const listAuthCheck = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!checkEmptyObject(req.params)) return next();
    const { auth } = req;
    const listId = req.params.id;
    const list = await List.findOneOrFail(listId);
    const { board } = list;
    const targetBoard = auth.boards.find((el) => el.id === board.id);
    if (!targetBoard) throw new Error('no authorization');
    req.list = list;
    next();
  } catch (e) {
    next(e);
  }
};

export const cardAuthCheck = async (err: Error, req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!checkEmptyObject(req.params)) return next();

    const { auth } = req;
    const cardId = req.params.id;
    const card = await Card.findOneOrFail(cardId);
    req.card = card;

    const { listId } = req.body;
    if (!listId) return next();

    const list = await List.findOneOrFail(listId);
    const owner = list.board.users.find((user) => user.email === auth.email);
    if (!owner) throw new Error('no authorization');
    next();
  } catch (e) {
    next(e);
  }
};

export const labelAuthCheck = async (err: Error, req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!checkEmptyObject(request.params)) return next();

    const labelId = req.params.id;
    const label = await Label.findOneOrFail(labelId);

    req.label = label;

    const { boardId } = req.body;
    if (!boardId) return next();

    const { auth } = req;
    const board = await Board.findOneOrFail(boardId);
    const owner = board.users.find((user) => user.email === auth.email);
    if (!owner) throw new Error('no authorization');
    next();
  } catch (e) {
    next(e);
  }
};
