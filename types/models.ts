import { ObjectId } from 'mongodb';

export type PlaceModel = {
    _id: ObjectId,
    name: string,
    description?: string
    imageGuid: string
    questCount: number
}

export type User = {
    _id: ObjectId,
    name: string,
    email: string,
    isAdmin: boolean,
    isGamemaster: boolean
    subscribesQuests: ObjectId[]
}