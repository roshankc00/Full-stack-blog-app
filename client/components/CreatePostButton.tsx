import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import { useRouter } from "next/navigation";

interface IOptions {
  tag: string;
  value: string;
}

function CreatePostButton() {
  const router = useRouter();
  const { userId, token,isLogedInStatus } = useSelector((state: IRootState) => state.auth);
  const [open, setopen] = useState(false);
  const [allCategories, setallCategories] = useState([]);
  const [allTags, setallTags] = useState([]);
  const [data, setData] = useState({
    title: "",
    content: "",
    category: null,
    tags: [],
  });
  const handleSubmit = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/`,
        {
          ...data,
          user: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("post  Posted successfully");
      router.refresh();
    } catch (error) {
      toast.error("unable to Post  the blog");
    }
  };

  const getAllCategories = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/categories/`
    );
    const data = response?.data?.map((da: any) => ({
      value: da.id,
      label: da.name,
    }));
    setallCategories(data);
  };

  const handleTagChange = (selectedOptions: any) => {
    const selectedTagIds = selectedOptions.map((option: any) => option.value);
    setData((prevData) => ({
      ...prevData,
      tags: selectedTagIds,
    }));
  };

  const getAllTags = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tags/`
    );
    const data = response?.data?.map((da: any) => ({
      value: da.id,
      label: da.name,
    }));
    setallTags(data);
  };

  useEffect(() => {
    getAllCategories();
    getAllTags();
  }, []);

  const handleCategoryChange = (selectedOption: any) => {
    setData((prevData) => ({
      ...prevData,
      category: selectedOption.value,
    }));
  };
  return (
    <div className="h-2 w-[450px]">
      <Dialog open={open}>
        <DialogTrigger>
          <Button className="w-[400px] mt-3 mb-3" onClick={() => setopen(true)}>
            Create Post
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2">SignupUser</DialogTitle>
            <DialogDescription>
              <Input
                className="border border-black text-black font-semibold"
                placeholder="Enter the Title"
                value={data.title}
                onChange={(e: any) => {
                  e.preventDefault();
                  setData({ ...data, title: e.target.value });
                }}
              />
              <Input
                className="border mt-3 border-black text-black font-semibold"
                placeholder="Enter the content"
                value={data.content}
                onChange={(e: any) => {
                  e.preventDefault();
                  setData({ ...data, content: e.target.value });
                }}
              />
              {allTags && allTags?.length > 0 && (
                <div className="mt-3">
                  <Select
                    options={allTags}
                    isMulti
                    value={allTags.filter((option: IOptions) =>
                      data.tags.includes(option.value as never)
                    )}
                    onChange={handleTagChange}
                  />
                </div>
              )}

              {allCategories && allCategories.length > 0 && (
                <Select
                  options={allCategories}
                  className="mt-3 mb-3"
                  value={allCategories.find(
                    (option: any) => option.value === data.category
                  )}
                  onChange={handleCategoryChange}
                />
              )}
              <div className="flex items-center">
                <Button
                  variant="destructive"
                  className=" w-[230px]"
                  onClick={(e) => {
                    setopen(false);
                  }}
                >
                  Close
                </Button>
                <Button
                  className="ms-2 w-[230px]"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                    setopen(false);
                  }}
                >
                  {" "}
                  Create
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreatePostButton;
