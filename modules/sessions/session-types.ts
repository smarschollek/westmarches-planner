import { DayAndTime } from '../common/common-types';

export type GameSession = {
    _id?: string,
    date: DayAndTime,
    creator: string,
    players: SessionParticipant[]
}

export type TimeProposition = {
    name: string,
    times: DayAndTime[]
}

export type SessionParticipant = {
    name: string
    character : {
        name: string,
        class: string,
        level: number
    }
}