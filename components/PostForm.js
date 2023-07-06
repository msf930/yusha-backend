import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import Spinner from "@/components/Spinner";

export default function  PostForm({
    _id,
    image:existingImage,
    date:existingDate,
    topic:existingTopic,
    tags:existingTags,
    title:existingTitle,
    author:existingAuthor,
    body:existingBody,
    summary:existingSummary,
    link:existingLink,
    }) {
    const [image,setImage] = useState(existingImage || []);
    const [date,setDate] = useState(existingDate || new Date().toString());
    const [topic,setTopic] = useState(existingTopic || "");
    const [tags,setTags] = useState(existingTags || "");
    const [title,setTitle] = useState(existingTitle || "");
    const [author,setAuthor] = useState(existingAuthor || "");
    const [body,setBody] = useState(existingBody || "");
    const [summary,setSummary] = useState(existingSummary || "");
    const [link,setLink] = useState(existingLink || "");
    const [goToPosts,setGoToPosts] = useState(false);
    const [isUploading,setIsUploading] = useState(false);
    const router = useRouter();
    async function savePost(ev){
        ev.preventDefault();
        const data = {image,date,topic,tags,title,author,body,summary,link};
        if(_id) {
            await axios.put('/api/posts', {...data,_id});
        } else {
            await axios.post('/api/posts', data);
        }
        setGoToPosts(true);
    }
    if (goToPosts) {
        router.push('/posts');
    }
    async function uploadImage(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files){
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            setImage(oldImage => {
                return [...oldImage, ...res.data.links];
            });
            setIsUploading(false);
        }
    }
    return(

            <form onSubmit={savePost}>
                <label>Image</label>
                <div className="mb-2 flex flex-wrap gap-2">
                    {!!image?.length && image.map(link => (
                        <div key={link} className="inline-block h-24">
                            <img src={link} alt=""/>
                        </div>
                    ))}
                    {isUploading && (
                        <div className="h-24 flex items-center">
                            <Spinner />
                        </div>
                    )}

                    {!image?.length && (
                        <label className="w-32 h-32 border flex flex-col items-center justify-center gap-1 rounded-lg cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                            </svg>
                            <div>
                                Upload
                            </div>
                            <input type="file" className="hidden" onChange={uploadImage}/>
                        </label>
                    )}
                </div>
                {!date &&
                (<label>Date</label>)
                }
                {date &&
                    (<label>Post date set to: {date}</label>)}
                <input
                    type="date"
                    //placeholder="month day year ex. May 12 2023"
                    value={date}
                    onChange={ev => setDate(ev.target.value)}/>
                <label>
                    Topic / Category
                </label>
                <input
                    type="text"
                    placeholder="Topic"
                    value={topic}
                    onChange={ev => setTopic(ev.target.value)}/>
                <label>
                    Tags - Use * to seperate tags
                </label>
                <input
                    type="text"
                    placeholder="Tags"
                    value={tags}
                    onChange={ev => setTags(ev.target.value)}/>
                <label>
                    Post Title
                </label>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}/>
                <label>
                    Author Name
                </label>
                <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={ev => setAuthor(ev.target.value)}/>
                <label>
                    Body - use * to make a new paragraph
                </label>
                <textarea
                    placeholder="Body"
                    value={body}
                    onChange={ev => setBody(ev.target.value)}></textarea>
                <label>
                    Summary
                </label>
                <textarea
                    placeholder="Summary"
                    value={summary}
                    onChange={ev => setSummary(ev.target.value)}></textarea>
                <label>
                    Link
                </label>
                <input
                    type="text"
                    placeholder="Link"
                    value={link}
                    onChange={ev => setLink(ev.target.value)}/>
                <button
                    className="btn-primary"
                    type="submit">
                    Save
                </button>
            </form>

    );
}