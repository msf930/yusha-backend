import PostForm from "@/components/PostForm";
import Layout from "@/components/Layout";

export default function NewPost() {
    return (
        <Layout>
            <h1>New Post!</h1>
            <PostForm />
        </Layout>
    );
}