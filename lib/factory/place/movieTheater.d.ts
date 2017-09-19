/**
 * 劇場ファクトリー
 *
 * @namespace place.movieTheater
 */
import * as COA from '@motionpicture/coa-service';
import IMultilingualString from '../multilingualString';
import * as PlaceFactory from '../place';
/**
 * 場所としての座席インターフェース
 */
export interface ISeat extends PlaceFactory.IPlace {
    /**
     * 枝番号
     * COAの座席コードにあたります。
     */
    branchCode: string;
}
/**
 * 上映セクションインターフェース
 */
export interface IScreeningRoomSection extends PlaceFactory.IPlace {
    /**
     * 座席リスト
     */
    containsPlace: ISeat[];
    /**
     * 枝番号
     * COAのセクションコードにあたります。
     */
    branchCode: string;
}
/**
 * 場所としての上映室インターフェース
 */
export interface IScreeningRoom extends PlaceFactory.IPlace {
    /**
     * 上映セクションリスト
     */
    containsPlace: IScreeningRoomSection[];
    /**
     * 枝番号
     * COAのスクリーンコードにあたります。
     */
    branchCode: string;
    /**
     * 上映室名称
     */
    name: IMultilingualString;
}
/**
 * place interface without screening room
 * @export
 * @interface
 * @memberof place.movieTheater
 */
export interface IPlaceWithoutScreeningRoom extends PlaceFactory.IPlace {
    identifier: string;
    /**
     * スクリーン数
     */
    screenCount: number;
    /**
     * 枝番号
     * COAの劇場コードにあたります。
     */
    branchCode: string;
    /**
     * 劇場名称
     */
    name: IMultilingualString;
    /**
     * 劇場名称(カナ)
     */
    kanaName: string;
    /**
     * 劇場住所
     */
    address?: IMultilingualString;
    /**
     * 電話番号
     */
    telephone: string;
}
/**
 * 劇場施設インターフェース
 */
export declare type IPlace = IPlaceWithoutScreeningRoom & {
    /**
     * 上映室リスト
     */
    containsPlace: IScreeningRoom[];
};
/**
 * COAのマスター抽出結果から作成する
 *
 * @param {COA.services.master.TheaterResult} theaterFromCOA
 * @param {COA.services.master.IScreenResult[]} screensFromCOA
 * @returns {IPlace}
 * @memberof place.movieTheater
 */
export declare function createFromCOA(theaterFromCOA: COA.services.master.ITheaterResult, screensFromCOA: COA.services.master.IScreenResult[]): IPlace;
/**
 * COAのスクリーン抽出結果から上映室を作成する
 *
 * @param {COA.services.master.ScreenResult} screenFromCOA
 * @returns {IScreeningRoom}
 * @memberof place.movieTheater
 */
export declare function createScreeningRoomFromCOA(screenFromCOA: COA.services.master.IScreenResult): IScreeningRoom;