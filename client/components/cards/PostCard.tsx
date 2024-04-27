import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaComment } from "react-icons/fa";
type Props = {
  data: any;
};
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function PostCard({ data }: Props) {
  return (
    <div>
      <div className="mb-4">
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {" "}
              <div className="flex items-center gap-2">
                <CgProfile size={30} /> {data?.user?.name}
              </div>
              <div>
                {data?.tags.map((da: any) => (
                  <div>
                    <h1 className="text-[15px] bg-sky-300 w-[100px] p-1 rounded-md">
                      {" "}
                      {da.name},
                    </h1>
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
              <div className="flex items-center gap-2 text-center">
                {data?.comments.length}
                <FaComment />
              </div>
              <div className="mt-4 flex flex-col justify-center">
                {data?.comments?.map((da: any) => {
                  return (
                    <div className="shadow-md w-[450px]">
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
}

export default PostCard;
