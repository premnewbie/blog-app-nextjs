import BlogOverview from "../components/blog-overview";
import { BASE_API_URL } from "../utils/constants";

async function fetchListOfBlogs() {
    try {
        const apiResponse = await fetch(`${BASE_API_URL}api/get-blogs`, {
            method: 'GET',
            cache: 'no-store',
        });

        const result = await apiResponse.json();
        console.log("Get Blogs:", result?.data);
        return result?.data;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getServerSideProps() {
    if (!BASE_API_URL) {
        return { props: { blogList: [] } };
    }

    try {
        const blogList = await fetchListOfBlogs();

        return {
            props: {
                blogList: blogList || [],
            },
        };
    } catch (error) {
        console.error("Error fetching blog list:", error);
        return { props: { blogList: [] } }; // return empty list on error
    }
}

export default function Blogs({ blogList }) {
    if (!blogList || blogList.length === 0) {
        return <p>No blogs available.</p>;
    }

    return <BlogOverview blogList={blogList} />;
}
