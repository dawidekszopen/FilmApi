import express, {Request, Response} from "express";
import MovieModel, {Movie} from '../models/Movie'

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

router.post("/:id", async(req: Request, res: Response) => {
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
export default router;

