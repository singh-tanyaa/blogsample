"use client";

import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Blog {
  category: string;
  id: string;
  is: boolean;
  title: string;
  description: string;
  contact: string;
  subcategory?: string;
  verify: boolean;
  verify_by?: string;
}

const Blog: React.FC = () => {
  const [blog, setBlog] = useState<Blog[]>([]);
  const id: string = usePathname();

  useEffect(() => {
    async function getBlogs() {
      await axios
        .get(`https://apiblog.peymagen.com/api${id}`)
        .then((items) => setBlog(items.data.data));
    }
    getBlogs();
  }, []);

  console.log(blog);
  return (
    <div className="flex flex-col items-center lg:px-48 my-16 gap-5">
      {blog &&
        blog.map((item) => {
          return (
            <div key={item.id}>
             <div className="flex flex-row w-full items-center">
             <div className="w-full flex flex-col justify-center items-start gap-3 my-8">
                <span className="bg-[#4b6bfb] w-auto text-center h-7 flex items-center justify-center rounded-[5px]  text-[#f6f7ff]  text-xs capitalize leading-relaxed px-5">
                  {/* {item.category} */}Tech
                </span>
                <span className="font-bold text-[48px]">{item.title}</span>
                <span className="font-normal text-xs px-4 gap-2">-{item.verify_by}</span>
              </div>
             </div>
              <section className="w-full h-[540px] flex-flex-col ">
                <img
                  className="w-full h-full object-contain"
                  src="/blg-image-1.png"
                />
              </section>
              <section className="flex flex-row  my-16 w-full">
                <span className="font-[350] flex flex-wrap">{item.description}</span>
              </section>
            </div>
          );
        })}
    </div>
  );
};

export default Blog;
