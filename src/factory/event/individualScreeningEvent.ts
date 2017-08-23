/**
 * individual screening event factory
 * @namespace factory/event/individualScreeningEvent
 */

import * as COA from '@motionpicture/coa-service';
import * as moment from 'moment';
import * as _ from 'underscore';

import ArgumentError from '../../error/argument';

import CreativeWorkType from '../creativeWorkType';
import * as EventFactory from '../event';
import * as ScreeningEventFactory from '../event/screeningEvent';
import EventStatusType from '../eventStatusType';
import EventType from '../eventType';
import IMultilingualString from '../multilingualString';
import * as MovieTheaterPlaceFactory from '../place/movieTheater';
import PlaceType from '../placeType';

/**
 * search conditions interface
 * @export
 * @interface
 * @memberof factory/event/individualScreeningEvent
 */
export interface ISearchConditions {
    day: string;
    theater: string;
}

/**
 * パフォーマンス在庫状況表現インターフェース
 * 表現を変更する場合、このインターフェースを変更して対応する
 */
export type IItemAvailability = number;

/**
 * 座席数から在庫状況表現を生成する
 *
 * @param {number} numberOfAvailableSeats 空席数
 * @param {number} numberOfAllSeats 全座席数
 * @returns {IItemAvailability} 在庫状況表現
 */
export function createItemAvailability(numberOfAvailableSeats: number, numberOfAllSeats: number): IItemAvailability {
    if (!_.isNumber(numberOfAvailableSeats)) {
        throw new ArgumentError('numberOfAvailableSeats', 'numberOfAvailableSeats should be number');
    }
    if (!_.isNumber(numberOfAllSeats)) {
        throw new ArgumentError('numberOfAllSeats', 'numberOfAllSeats should be number');
    }

    if (numberOfAllSeats === 0) {
        return 0;
    }

    // 残席数より空席率を算出
    // tslint:disable-next-line:no-magic-numbers
    return Math.floor(numberOfAvailableSeats / numberOfAllSeats * 100);
}

/**
 * event offer interface
 * @export
 * @interface
 * @memberof factory/event/individualScreeningEvent
 */
export interface IOffer {
    typeOf: string;
    availability: IItemAvailability;
    url: string;
}

/**
 * event with offer interface
 * @export
 * @interface
 * @memberof factory/event/individualScreeningEvent
 */
export type IEventWithOffer = IEvent & {
    offer: IOffer;
};

/**
 * 個々の上映イベントインターフェース
 * COAのスケジュールに相当します。
 * @export
 * @interface
 * @memberof factory/event/individualScreeningEvent
 */
export interface IEvent extends EventFactory.IEvent {
    /**
     * 上映作品
     */
    workPerformed: {
        /**
         * 作品識別子
         * COAタイトルコードに相当します。
         */
        identifier: string;
        /**
         * 作品原題
         */
        name: string;
        /**
         * 上映時間
         */
        duration: string;
        /**
         * 映倫区分(PG12,R15,R18)
         */
        contentRating: string;
        /**
         * スキーマタイプ
         */
        typeOf: CreativeWorkType
    };
    /**
     * 上映場所
     */
    location: {
        /**
         * スキーマタイプ
         */
        typeOf: PlaceType;
        /**
         * スクリーンコード
         */
        branchCode: string;
        /**
         * スクリーン名称
         */
        name: IMultilingualString;
    };
    /**
     * イベント名称
     */
    name: IMultilingualString;
    /**
     * 開場日時(in ISO 8601 date format)
     */
    doorTime?: Date;
    /**
     * 終了日時(in ISO 8601 date format)
     */
    endDate: Date;
    /**
     * 開始日時(in ISO 8601 date format)
     */
    startDate: Date;
    /**
     * 親イベント
     * COAの劇場作品に相当します。
     */
    superEvent: ScreeningEventFactory.IEvent;
    /**
     * その他COA情報
     */
    coaInfo: {
        theaterCode: string;
        dateJouei: string;
        titleCode: string;
        titleBranchNum: string;
        timeBegin: string;
        screenCode: string;
        /**
         * トレーラー時間
         * トレーラー含む本編以外の時間（分）
         */
        trailerTime: number;
        /**
         * サービス区分
         * 「通常興行」「レイトショー」など
         */
        kbnService: string;
        /**
         * 音響区分
         */
        kbnAcoustic: string;
        /**
         * サービスデイ名称
         * 「映画の日」「レディースデイ」など ※割引区分、割引コード、特定日等の組み合わせで登録するため名称で連携の方が容易
         */
        nameServiceDay: string;
        /**
         * 購入可能枚数
         */
        availableNum: number;
        /**
         * 予約開始日
         * 予約可能になる日付(YYYYMMDD)
         */
        rsvStartDate: string;
        /**
         * 予約終了日
         * 予約終了になる日付(YYYYMMDD)
         */
        rsvEndDate: string;
        /**
         * 先行予約フラグ
         * 先行予約の場合は'1'、それ以外は'0'
         */
        flgEarlyBooking: string;
    };
}

/**
 * create individualScreeningEvent from COA performance
 * @export
 * @function
 * @memberof factory/event/individualScreeningEvent
 */
export function createFromCOA(performanceFromCOA: COA.services.master.IScheduleResult) {
    return (screenRoom: MovieTheaterPlaceFactory.IScreeningRoom, screeningEvent: ScreeningEventFactory.IEvent): IEvent => {
        const identifier = createIdFromCOA({
            screeningEvent: screeningEvent,
            dateJouei: performanceFromCOA.dateJouei,
            screenCode: performanceFromCOA.screenCode,
            timeBegin: performanceFromCOA.timeBegin
        });

        return {
            ...EventFactory.create({
                eventStatus: EventStatusType.EventScheduled,
                typeOf: EventType.IndividualScreeningEvent,
                identifier: identifier,
                name: screeningEvent.name
            }),
            ...{
                workPerformed: screeningEvent.workPerformed,
                location: {
                    typeOf: screenRoom.typeOf,
                    branchCode: screenRoom.branchCode,
                    name: screenRoom.name
                },
                endDate: moment(`${performanceFromCOA.dateJouei} ${performanceFromCOA.timeEnd} +09:00`, 'YYYYMMDD HHmm Z').toDate(),
                startDate: moment(`${performanceFromCOA.dateJouei} ${performanceFromCOA.timeBegin} +09:00`, 'YYYYMMDD HHmm Z').toDate(),
                superEvent: screeningEvent,
                coaInfo: {
                    theaterCode: screeningEvent.location.branchCode,
                    dateJouei: performanceFromCOA.dateJouei,
                    titleCode: performanceFromCOA.titleCode,
                    titleBranchNum: performanceFromCOA.titleBranchNum,
                    timeBegin: performanceFromCOA.timeBegin,
                    screenCode: performanceFromCOA.screenCode,
                    trailerTime: performanceFromCOA.trailerTime,
                    kbnService: performanceFromCOA.kbnService,
                    kbnAcoustic: performanceFromCOA.kbnAcoustic,
                    nameServiceDay: performanceFromCOA.nameServiceDay,
                    availableNum: performanceFromCOA.availableNum,
                    rsvStartDate: performanceFromCOA.rsvStartDate,
                    rsvEndDate: performanceFromCOA.rsvEndDate,
                    flgEarlyBooking: performanceFromCOA.flgEarlyBooking
                }
            }
        };
    };
}

/**
 * create id by COA infos.
 * @export
 * @function
 * @memberof factory/event/individualScreeningEvent
 */
export function createIdFromCOA(args: {
    screeningEvent: ScreeningEventFactory.IEvent,
    dateJouei: string;
    screenCode: string;
    timeBegin: string;
}): string {
    return [
        args.screeningEvent.identifier,
        args.dateJouei,
        args.screenCode,
        args.timeBegin
    ].join('');
}
