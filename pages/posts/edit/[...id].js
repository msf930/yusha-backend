import Layout from "@/components/Layout";
import {useRouter} from "next/router";

export default function EditPostPage(){
    const router = useRouter();
    console.log({router});
    return(
        <Layout>
            edit product form here
        </Layout>
    );
}