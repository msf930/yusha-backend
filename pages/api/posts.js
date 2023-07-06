import {Post} from "@/models/Post";
import {mongooseConnect} from "@/lib/mongoose";


export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();

    if (method === 'GET') {
        if(req.query?.id){
            res.json(await Post.findOne({_id:req.query.id}));
        } else {
            res.json(await Post.find());
        }
    }

    if (method === 'POST') {
        const {image,date,topic,tags,title,author,body,summary,link} = req.body;
        const postDoc = await Post.create({
            image,date,topic,tags,title,author,body,summary,link
        })
        res.json(postDoc);
    }
    if (method === 'PUT') {
        const {image,date,topic,tags,title,author,body,summary,link,_id} = req.body;
        await Post.updateOne({_id}, {image,date,topic,tags,title,author,body,summary,link});
        res.json(true);
    }

    if(method === 'DELETE'){
        if(req.query?.id){
            await Post.deleteOne({_id:req.query?.id});
            res.json(true);
        }
    }
}