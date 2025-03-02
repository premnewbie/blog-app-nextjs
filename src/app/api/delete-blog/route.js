import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";


export async function DELETE(req){
    try {
        await connectToDB();

        const {searchParams} = new URL(req.url);
        const getBlogId = searchParams.get('id');
        
        if(!getBlogId){
            return NextResponse.json({
                success: false,
                message: "Blog id is required"
            })
        }

        const blogToBeDeleted = await Blog.findByIdAndDelete(getBlogId);
        
        if(blogToBeDeleted){
            return NextResponse.json({
                success: true,
                message: "Successfully Deleted the blog"
            })
        }else{
            return NextResponse.json({
                success: false,
                message: "Something went wrong in else block! Please try later"
            })
        }

    } catch (error) {
        console.log("Error in the delete-blog function:",error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong in catch Block! Please try later"
        })
    }
}