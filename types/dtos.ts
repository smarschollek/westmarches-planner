import { ObjectId } from 'mongodb';

export type Place = {
    _id: ObjectId,
    name: string,
    description?: string
    imageGuid: string
    questCount: number
}

export type PlaceWithQuests = Place & {
    quests?: Quest[]
}

export type Quest = {
    _id: ObjectId
    description: string
    imageGuid: string
    name: string
    place: string
    questState: string
    creatorId: number
}