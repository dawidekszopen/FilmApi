import mongoose, {Document} from "mongoose";

export interface Movie extends Document{
    _id: number;
    title: string;
    releaseYear: number;
    genre: string;
    director: string;
    cast: Array<string>;
    rating: number;
    description: string;
}

const MovieSchema = new mongoose.Schema({
    _id: {type: Number, required: true},
    title: {type: String, required: true},
    releaseYear: {type: Number, required: true},
    genre: {type: String, required: true},
    director: {type: String, required: true},
    cast: {type: Array<string>, required: true},
    rating: {type: Number, required: false},
    description: {type: String, required: false},
})

export default mongoose.model<Movie>('Movie', MovieSchema);