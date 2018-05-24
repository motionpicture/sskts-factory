import * as pecorinoFactory from '@motionpicture/pecorino-factory';

import * as ActionFactory from '../../../action';
import ActionType from '../../../actionType';
import { ITransaction } from '../../../transaction/placeOrder';
import * as AuthorizeActionFactory from '../../authorize';

export type IAgent = ActionFactory.IParticipant;
export type IRecipient = ActionFactory.IParticipant;

export enum ObjectType {
    PecorinoAward = 'PecorinoAward'
}

/**
 * オーソリ対象インターフェース
 */
export interface IObject {
    typeOf: ObjectType;
    transactionId: string;
    amount: number;
}

export type IPecorinoTransaction = pecorinoFactory.transaction.deposit.ITransaction;

export interface IResult {
    price: number;
    amount: number;
    pecorinoTransaction: IPecorinoTransaction;
    pecorinoEndpoint: string;
}

export type IPurpose = ITransaction;

export type IError = any;

/**
 * Pecorino賞金承認アクション属性インターフェース
 */
export interface IAttributes extends AuthorizeActionFactory.IAttributes<IObject, IResult> {
    typeOf: ActionType.AuthorizeAction;
    object: IObject;
    agent: IAgent;
    recipient: IRecipient;
    purpose: IPurpose;
}

/**
 * Pecorino賞金承認アクションインターフェース
 * 注文取引のインセンティブとしてポイントを付与する場合に使用されます。
 */
export type IAction = ActionFactory.IAction<IAttributes>;