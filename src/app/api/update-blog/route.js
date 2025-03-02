import connectToDB from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const EditBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function PUT(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const getBlogId = searchParams.get("id");

    if (!getBlogId) {
      return NextResponse.json({
        success: false,
        message: "Blog id is required",
      });
    }

    const extractBlogData = await req.json();
    const {title,description} = extractBlogData;

    const { error } = EditBlog.validate({
      title,
      description,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const UpdatedBlogItem = await Blog.findByIdAndUpdate(
      getBlogId,
      extractBlogData,
      {
        new: true,
      }
    );
    if (UpdatedBlogItem) {
      return NextResponse.json({
        success: true,
        message: "Blog Updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong in else block ! Please try again",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong in catch block ! Please try again",
    });
  }
}
