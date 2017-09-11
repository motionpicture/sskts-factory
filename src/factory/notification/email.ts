/**
 * email notification factory
 * Eメール通知ファクトリー
 * @namespace notification.email
 */

import * as _ from 'underscore';
import * as validator from 'validator';

import ArgumentError from '../../error/argument';
import ArgumentNullError from '../../error/argumentNull';

import * as NotificationFactory from '../notification';
import NotificationGroup from '../notificationGroup';

/**
 * email notification data interface
 * Eメール通知データインターフェース
 * @export
 * @interface
 * @memberof notification.email
 */
export interface IData {
    /**
     * 送信元メールアドレス
     */
    // tslint:disable-next-line:no-reserved-keywords
    from: string;
    /**
     * 送信先メールアドレス
     */
    to: string;
    /**
     * 件名
     */
    subject: string;
    /**
     * 本文
     */
    content: string;
    /**
     * 送信予定日時(nullの場合はなるはやで送信)
     */
    send_at?: Date;
}

/**
 * email notification interface
 * Eメール通知インターフェース
 * @export
 * @interface
 * @memberof notification.email
 */
export interface INotification extends NotificationFactory.INotification {
    data: IData;
}

/**
 * create email notification object
 * Eメール通知オブジェクトを作成する
 * @export
 * @function
 * @memberof notification.email
 */
export function create(params: {
    id: string,
    data: IData
}): INotification {
    if (_.isEmpty(params.data.from)) throw new ArgumentNullError('from');
    if (_.isEmpty(params.data.to)) throw new ArgumentNullError('to');
    if (_.isEmpty(params.data.subject)) throw new ArgumentNullError('subject');
    if (_.isEmpty(params.data.content)) throw new ArgumentNullError('content');

    if (!validator.isEmail(params.data.from)) throw new ArgumentError('from', 'from should be email');
    if (!validator.isEmail(params.data.to)) throw new ArgumentError('to', 'to should be email');

    if (params.data.send_at !== undefined) {
        if (!_.isDate(params.data.send_at)) throw new ArgumentError('send_at', 'send_at should be Date');
    }

    // tslint:disable-next-line:no-suspicious-comment
    // TODO sendgridの仕様上72時間後までしか設定できないのでバリデーション追加するかもしれない

    return {
        id: params.id,
        group: NotificationGroup.EMAIL,
        data: params.data
    };
}
