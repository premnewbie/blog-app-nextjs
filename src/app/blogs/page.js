import BlogOverview from "../components/blog-overview";
import { BASE_API_URL } from "../utils/constants";

async function fetchListOfBlogs() {
    try {
        const apiResponse = await fetch(`${BASE_API_URL}/api/get-blogs`, {
            method: 'GET',
            cache: 'no-store'
        });
        const result = await apiResponse.json();
        return result?.data;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getStaticProps() {
    if (!BASE_API_URL) {
        return { props: { blogList: [] } };  // Fallback if the API URL is missing
    }

    const blogList = await fetchListOfBlogs();
    return {
        props: {
            blogList
        },
        revalidate: 60  // Re-fetch the data every 60 seconds in the background
    };
}

export default function Blogs({ blogList }) {
    return <BlogOverview blogList={blogList} />;
}
