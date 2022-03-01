import mongoose from 'mongoose';

export interface Place {
    _id: string
    name: string,
    description: string
    imageGuid: string
}

const placeSchema = new mongoose.Schema<Place>({
	name: String,
	description: String,
	imageGuid: String
});

export const PlaceModel = mongoose.models.Place as mongoose.Model<Place, {}, {}, {}> || mongoose.model<Place>('Place', placeSchema);