import mongoose, {Document} from "mongoose";

export interface Review extends Document{
    _id: number;
    movieId: number;
    author: string;
    content: string;
    createdAt: string;
}

const ReviewSchema = new mongoose.Schema({
    _id: {type: Number, required: true},
    movieId: {type: Number, required: true},
    author: {type: String, required: true},
    content: {type: String, required: true},
    createdAt: {type: String, required: true},
})

export default mongoose.model<Review>('Review', ReviewSchema);