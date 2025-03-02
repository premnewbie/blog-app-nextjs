import BlogOverview from "../components/blog-overview";
import { BASE_API_URL } from "../utils/constants";

async function fetchListOfBlogs(){
    try {
        const apiResponse = await fetch(`${BASE_API_URL}/api/get-blogs`,{
            method: 'GET',
            cache: 'no-store'
        })

        const result = await apiResponse.json();
    
        return result?.data
    } catch (error) {
        throw new Error(error)
    }
}

export default async function Blogs(){

    const blogList = await fetchListOfBlogs();

    return (
        <BlogOverview blogList={blogList} />
    )
}