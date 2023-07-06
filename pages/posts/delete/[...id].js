import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";

export default function  DeletePostPage() {
    const [postInfo, setPostInfo] = useState();
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/api/posts?id='+id).then(response => {
            setPostInfo(response.data);
        });
    }, [id]);
    function goBack(){
        router.push('/posts');
    }
    async function deletePost(){
       await axios.delete('/api/posts?id='+id);
        goBack();
    }
    return(
        <Layout>
            <h1 >Do you really want to delete: "{postInfo?.title}"?</h1>
            <div className="flex gap-2">
                <button className="btn-red" onClick={deletePost}>Yes</button>
                <button className="btn-default" onClick={goBack}>No</button>
            </div>
        </Layout>
    );
}