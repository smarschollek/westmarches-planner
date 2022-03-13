import mongoose from 'mongoose';
import { Place } from './place-types';

const placeSchema = new mongoose.Schema<Place>({
	name: String,
	description: String,
	imageGuid: String
});

export const PlaceModel = mongoose.models.Place as mongoose.Model<Place, {}, {}, {}> || mongoose.model<Place>('Place', placeSchema);