"use client";

import { useEffect, useState } from "react";
import AddNewBlog from "../add-new-blog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Label } from "@radix-ui/react-label";

const initialBlogFormData = {
  title: "",
  description: "",
};

export default function BlogOverview({ blogList }) {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);
  const [editBlogId,setEditBlogId] = useState(null);

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  const handleSaveBlogData = async () => {
    setLoading(true);
    try {
      const apiResponse = await fetch("api/add-blog", {
        method: "POST",
        body: JSON.stringify(blogFormData),
      });
      const result = await apiResponse.json();
      if (result?.success) {
        setOpenBlogDialog(false);
        setBlogFormData(initialBlogFormData);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      setBlogFormData(initialBlogFormData);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const apiResponse = await fetch(`api/delete-blog?id=${id}`, {
        method: "DELETE",
      });
      const result = await apiResponse.json();
      if (result?.success) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBlogData = async (id) => {
    setLoading(true);
    try {
      const apiResponse = await fetch(`api/update-blog?id=${id}`, {
        method: "PUT",
        body: JSON.stringify(blogFormData),
      });
      const result = await apiResponse.json();
      if (result?.success) {
        setOpenBlogDialog(false);
        router.refresh();
      }
      console.log(result)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  function handleEdit(blog){
    setEditBlogId(blog?._id);
    setBlogFormData({
      title: blog?.title,
      description: blog?.description
    })
    setOpenBlogDialog(true);
  }

  return (
    <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-8">
      <div>
        <AddNewBlog
          openBlogDialog={openBlogDialog}
          setOpenBlogDialog={setOpenBlogDialog}
          loading={loading}
          setLoading={setLoading}
          blogFormData={blogFormData}
          setBlogFormData={setBlogFormData}
          handleSaveBlogData={handleSaveBlogData}
          handleUpdateBlogData={handleUpdateBlogData}
          editBlogId={editBlogId}
          setEditBlogId={setEditBlogId}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {blogList && blogList.length > 0 ? (
          blogList.map((blog) => (
            <Card className="p-5" key={blog.title}>
              <CardContent>
                <CardTitle className="mb-5">{blog?.title}</CardTitle>
                <CardDescription>{blog?.description}</CardDescription>
                <div className="mt-5 flex gap-5 items-center">
                  <Button onClick={() => handleEdit(blog)}>Edit</Button>
                  <Button onClick={() => handleDelete(blog?._id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Label className='text-3xl font-extrabold'>No Blog found! Please add one</Label>
        )}
      </div>
    </div>
  );
}
