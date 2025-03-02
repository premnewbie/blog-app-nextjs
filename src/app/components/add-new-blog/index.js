"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddNewBlog({
  openBlogDialog,
  setOpenBlogDialog,
  loading,
  setLoading,
  blogFormData,
  setBlogFormData,
  handleSaveBlogData,
  handleUpdateBlogData,
  editBlogId,
  setEditBlogId
}) 
{
  return (
    <>
      <div>
        <Button
          onClick={() => setOpenBlogDialog(true)}
          className="cursor-pointer"
        >
          Add New Blog Section
        </Button>
      </div>
      <Dialog
        open={openBlogDialog}
        onOpenChange={() => {
          setOpenBlogDialog(false);
          setBlogFormData({
            title: "",
            description: "",
          });
          setEditBlogId(null)
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editBlogId? "Edit Blog":"Add New Blog"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                name="title"
                placeholder="Enter blog title"
                value={blogFormData.title}
                onChange={(e) =>
                  setBlogFormData({ ...blogFormData, title: e.target.value })
                }
                id="title"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <Input
                name="description"
                value={blogFormData.description}
                onChange={(e) =>
                  setBlogFormData({
                    ...blogFormData,
                    description: e.target.value,
                  })
                }
                id="description"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            {!editBlogId? <Button type="button" onClick={handleSaveBlogData}>
              {loading ? "Saving Changes" : "Save Changes"}
            </Button>:
            <Button type="button" onClick={() => handleUpdateBlogData(editBlogId)}>
              {loading ? "Updating Changes" : "Update Changes"}
            </Button>}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
