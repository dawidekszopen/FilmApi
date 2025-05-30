import express, {Request, Response} from "express";
import ReviewModel, {Review} from '../models/Review'

const router = express.Router();

router.put("/:id", async(req: Request, res: Response) => {
    try{
        const {id} = req.params;

        const updatedReview: Review|null = await ReviewModel.findByIdAndUpdate(id, req.body, {new:true})
        if(!updatedReview){
            res.status(404).json({error: "no review founded"})
            return;
        }
        res.json({message: `updated review`, movie: updatedReview});

    }catch(err){
        res.status(500).json({error: "Error with updating review ", err});
    }
})

router.delete("/:id", async(req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const deletedReview = await ReviewModel.findByIdAndDelete(id);
        if(!deletedReview){
            res.status(404).json({error: "no review founded"})
            return
        }
        res.json({message: `Deleted review: ${deletedReview}`});
    }catch(err){
        const error = err instanceof Error ? err : new Error("unknown error")
        res.status(500).json({error:`Error with deleting review ${error.message}`});
    }
})
export default router;

