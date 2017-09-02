/**
 * credit card authorization factory
 * クレジットカードオーソリファクトリー
 * @namespace factory/authorization/gmo
 */

import * as GMO from '@motionpicture/gmo-service';

import { ActionStatusType, ActionType } from '../../action';
import * as AuthorizeActionFactory from '../authorize';

export interface IAgent {
    typeOf: string;
    id: string;
}

export interface IRecipient {
    typeOf: string;
    id: string;
}

/**
 * オーソリ対象インターフェース
 */
export interface IObject {
    entryTranArgs: GMO.services.credit.IEntryTranArgs;
    execTranArgs: GMO.services.credit.IExecTranArgs;
    payType: GMO.utils.util.PayType;
}

export interface IResult {
    price: number;
    execTranResult: GMO.services.credit.IExecTranResult;
}

/**
 * GMOオーソリインターフェース
 */
export interface IAction extends AuthorizeActionFactory.IAction {
    result: IResult;
    object: IObject;
}

export function create(params: {
    id: string;
    actionStatus: ActionStatusType;
    result: IResult;
    object: IObject;
    agent: IAgent;
    recipient: IRecipient;
    startDate: Date;
    endDate?: Date;
}): IAction {
    return {
        id: params.id,
        actionStatus: params.actionStatus,
        typeOf: ActionType.AuthorizeAction,
        purpose: {
            typeOf: AuthorizeActionFactory.AuthorizeActionPurpose.CreditCard
        },
        result: params.result,
        object: params.object,
        agent: params.agent,
        recipient: params.recipient,
        startDate: params.startDate,
        endDate: params.endDate
    };
}
