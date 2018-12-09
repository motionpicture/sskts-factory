import { IExtendId } from './autoGenerated';
import { IIdentifier } from './person';
import PersonType from './personType';
import SortType from './sortType';
import TransactionStatusType from './transactionStatusType';
import TransactionTasksExportationStatus from './transactionTasksExportationStatus';
import TransactionType from './transactionType';

export type ITransaction<T extends TransactionType, TAgent, TObject, TResult> = IExtendId<IAttributes<T, TAgent, TObject, TResult>>;
/**
 * transaction interface
 * 取引インターフェース
 */
export interface IAttributes<T extends TransactionType, TAgent, TObject, TResult> {
    /**
     * 取引タイプ
     */
    typeOf: T;
    /**
     * 取引状態
     */
    status: TransactionStatusType;
    /**
     * 取引主体
     */
    agent: TAgent;
    /**
     * 取引結果
     */
    result?: TResult;
    /**
     * 取引エラー
     */
    error?: any;
    /**
     * 取引対象
     */
    object?: TObject;
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
     * 事後に発生するアクション
     */
    potentialActions?: any;
}
/**
 * ソート条件インターフェース
 */
export interface ISortOrder {
    startDate?: SortType;
    endDate?: SortType;
    status?: SortType;
}
export interface ISearchConditions<T extends TransactionType> {
    limit?: number;
    page?: number;
    sort?: ISortOrder;
    /**
     * 取引タイプ
     */
    typeOf: T;
    /**
     * IDリスト
     */
    ids?: string[];
    /**
     * ステータスリスト
     */
    statuses?: TransactionStatusType[];
    /**
     * 開始日時(から)
     */
    startFrom?: Date;
    /**
     * 開始日時(まで)
     */
    startThrough?: Date;
    /**
     * 終了日時(から)
     */
    endFrom?: Date;
    /**
     * 終了日時(まで)
     */
    endThrough?: Date;
    agent?: {
        typeOf: PersonType;
        ids?: string[];
        identifiers?: IIdentifier;
    };
}
