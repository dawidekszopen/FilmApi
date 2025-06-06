import express, {Request, Response} from "express";
import MovieModel, {Movie} from '../models/Movie'
import ReviewModel, {Review} from "../models/Review";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try{
        const movies: Array<Movie> = await MovieModel.find();
        res.json(movies);
    } catch(err){
        res.status(500).json({error: `Error with getting movies ${err}`});
    }
})

router.post("/", async(req: Request, res: Response) => {
    try{
        const newMovie: Movie | null = new MovieModel(req.body);
        await newMovie.save();
        res.status(201).json({message: `Added new movie: ${newMovie}`});

    }catch(err){
        res.status(500).json({error: "Error with addning movie ", err});
    }
})

router.get("/:id", async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const movies: Array<Movie> = await MovieModel.find({_id: id});
        res.json(movies);
    } catch(err){
        res.status(500).json({error: `Error with getting movies ${err}`});
    }
})

router.put("/:id", async(req: Request, res: Response) => {
    try{
        const {id} = req.params;

        const updatedMovie: Movie|null = await MovieModel.findByIdAndUpdate(id, req.body, {new:true})
        if(!updatedMovie){
            res.status(404).json({error: "no movie founded"})
            return;
        }
        res.json({message: `updated movie`, movie: updatedMovie});

    }catch(err){
        res.status(500).json({error: "Error with updating movie ", err});
    }
})

router.delete("/:id", async(req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const deletedMovie = await MovieModel.findByIdAndDelete(id);
        if(!deletedMovie){
            res.status(404).json({error: "no movie founded"})
            return
        }
        res.json({message: `Deleted movie: ${deletedMovie}`});
    }catch(err){
        const error = err instanceof Error ? err : new Error("unknown error")
        res.status(500).json({error:`Error with deleting movie${error.message}`});
    }
})

router.get("/:id/reviews", async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const review: Array<Review> = await ReviewModel.find({movieId: id});
        res.json(review);
    } catch(err){
        res.status(500).json({error: `Error with getting review ${err}`});
    }
})

router.post("/:id/reviews", async(req: Request, res: Response) => {
    try{
        const {_id, author, content} = req.body;

        const {id} = req.params;



        const currentData = new Date();
        const createdAt: string = `${currentData.toDateString()} ${currentData.getHours()}:${currentData.getMinutes()}`;

        const newReview: Review | null = new ReviewModel({_id, movieId: id, author, content, createdAt});
        await newReview.save();
        res.status(201).json({message: `Added new movie: ${newReview}`});

    }catch(err){
        res.status(500).json({error: "Error with addning movie ", err});
    }
})
export default router;

