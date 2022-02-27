import { ObjectId } from 'mongodb';

export type PlaceModel = {
    _id: ObjectId,
    name: string,
    description?: string
    imageGuid: string
    questCount: number
}