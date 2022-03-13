import { ObjectId } from 'mongodb';

export interface Place {
    _id: ObjectId
    name: string,
    description: string
    imageGuid: string
}