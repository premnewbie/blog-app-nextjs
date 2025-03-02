import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";


export async function GET(){
    try {
        await connectToDB();

        const extractAllBlogs = await Blog.find({});
        
        if(extractAllBlogs){
            return NextResponse.json({
                success: true,
                data: extractAllBlogs,
                message: "Successfully fetched all blogs"
            })
        }else{
            return NextResponse.json({
                success: false,
                message: "Something went wrong in else block! Please try later"
            })
        }

    } catch (error) {
        console.log("Error in the get-blogs function:",error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong in catch Block! Please try later"
        })
    }
}