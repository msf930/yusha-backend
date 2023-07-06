import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import PostForm from "@/components/PostForm";

export default function EditPostPage(){
    const [postInfo, setPostInfo] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
        if(!id) {
            return;
        }
        axios.get('/api/posts?id='+id).then(response => {
            setPostInfo(response.data);
        });
    }, [id]);
    return(
        <Layout>
            <h1>Edit Post</h1>
            {postInfo && (
                <PostForm {...postInfo} />
            )}
        </Layout>
    );
}