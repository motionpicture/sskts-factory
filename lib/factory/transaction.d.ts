import { IExtendId } from './autoGenerated';
import * as TaskFactory from './task';
import TransactionStatusType from './transactionStatusType';
import TransactionTasksExportationStatus from './transactionTasksExportationStatus';
import TransactionType from './transactionType';
export declare type ITransaction = IExtendId<IAttributes>;
/**
 * transaction interface
 * 取引インターフェース
 * @export
 * @interface
 * @memberof transaction
 */
export interface IAttributes {
    /**
     * 取引タイプ
     */
    typeOf: TransactionType;
    /**
     * 取引状態
     */
    status: TransactionStatusType;
    /**
     * 取引主体
     */
    agent: any;
    /**
     * 取引結果
     */
    result?: any;
    /**
     * 取引エラー
     */
    error?: any;
    /**
     * 取引対象
     */
    object?: any;
    /**
     * 取引進行期限
     */
    expires: Date;
    /**
     * 取引開始日時
     */
    startDate?: Date;
    /**
     * 取引終了日時
     */
    endDate?: Date;
    /**
     * タスクエクスポート日時
     */
    tasksExportedAt?: Date;
    /**
     * タスクエクスポート状態
     */
    tasksExportationStatus: TransactionTasksExportationStatus;
    /**
     * タスクリスト
     */
    tasks: TaskFactory.ITask[];
}
/**
 * 取引を作成する
 * @export
 * @function
 * @returns {ITransaction} 取引
 * @memberof transaction
 */
export declare function createAttributes(params: {
    typeOf: TransactionType;
    status: TransactionStatusType;
    agent: any;
    result?: any;
    error?: any;
    object?: any;
    expires: Date;
    startDate?: Date;
    endDate?: Date;
    tasksExportedAt?: Date;
    tasksExportationStatus?: TransactionTasksExportationStatus;
    tasks?: TaskFactory.ITask[];
}): IAttributes;