import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CgProfile } from "react-icons/cg";
import { FaComment } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Input } from "@/components/ui/input";
import CreateComment from "./_components/CreateComment";
const SinglePostPage = async ({ params }: { params: { id: number } }) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${params.id}`
  );
  return (
    <div className="flex justify-center mt-5">
      <div className="mb-4">
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {" "}
              <div className="flex items-center gap-2">
                <CgProfile size={30} /> {data?.user?.name}
              </div>
              <div className="bg-sky-400 w-[100px] flex p-1 rounded-md">
                {data?.tags.map((da: any) => (
                  <div>
                    <span className="text-[15px]  ">{da.name},</span>
                  </div>
                ))}
              </div>
            </CardTitle>
            <CardDescription>{data?.title}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{data.content}</p>
          </CardContent>
          <CardFooter>
            <div>
              <div>
                <div className="flex items-center gap-2 text-center">
                  {data?.comments.length}
                  <FaComment />
                </div>
                <div>
                  <CreateComment postId={params.id} />
                </div>
              </div>
              <div className="mt-4 flex flex-col justify-center">
                {data?.comments?.map((da: any) => {
                  return (
                    <div className="shadow-md w-[450px] mb-3">
                      <div className="flex items-center gap-2">
                        <CgProfile size={30} /> {da?.user?.name}
                      </div>
                      <h1>{da.content}</h1>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SinglePostPage;
