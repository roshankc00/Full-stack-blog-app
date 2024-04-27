"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "@/components/cards/PostCard";

export default function Home() {
  const [allData, setallData] = useState([]);
  const getAllPosts = async () => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/`
    );

    setallData(data?.data);
    console.log(data);
  };
  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {allData &&
          allData.length > 0 &&
          allData.map((da: any, index) => {
            return <PostCard data={da} key={da.id} />;
          })}
      </div>
    </>
  );
}
