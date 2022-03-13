import { DayAndTime, PlayerInfo } from '../common/common-types';

export type GameSession = {
    _id?: string,
    date: DayAndTime,
    questName: string,
    questId: string
    creator: string,
    players: PlayerInfo[]
}

export type TimeProposition = {
    name: string,
    times: DayAndTime[]
}