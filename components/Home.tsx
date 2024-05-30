"use client";

import axios from "axios";
import { BookOpenText, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import CategoryList from "./CategoryList";


interface Blog {
  category: string;
  id: string;
  is: boolean;
  title: string;
  description: string;
  contact: string;
  subcategory?: string;
  verify: boolean;
  verifyBy?: string;
}

const HomePage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>();
  useEffect(() => {
    async function getBlogs() {
      await axios
        .get("https://apiblog.peymagen.com/api/blog/")
        .then((items) => setBlogs(items.data.data));
    }
    getBlogs();
  }, []);

  return (
    <div className="w-full flex flex-col items-center lg:px-48 px-14 my-10">
      <section className="w-full flex justify-center relative">
        <img src="/banner.png" alt="Banner" className="w-full " />
        <div className="absolute bottom-[1%] left-[5%] py-10 rounded-lg flex flex-col items-center bg-transparent w-1/4 backdrop-blur-xl    ">
          <div className="w-full flex flex-col items-center gap-2">
            <span className="lg:w-24 w-auto px-2 h-5 text-center rounded-md bg-[#4b6bfb] text-xs    text-white">
              Technology
            </span>
            <span className="text-white font-semibold text-[16px] lg:text-[32px] text-center">
              The Impact of Technology on the Workplace
            </span>
          </div>
        </div>
      </section>
      {/* component call */}

      <CategoryList/>

      <section className="w-full flex flex-col items-center gap-16 justify-center lg:px-48 px-14 lg:my-32 my-24">
        <div className="flex items-center justify-start w-full">
          <span className="font-bold leading-relaxed text-xl border-b-2 border-[#2563EB]">
            Latest Posts
          </span>
          :
        </div>

        <div className="flex flex-wrap gap-10">
          {blogs &&
            blogs?.slice(0, 10).map((item) => {
              return (
                <>
                  <div
                    className="shadow-lg flex flex-col w-[250px] rounded-md h-[350px]"
                    key={item.id}
                  >
                    <div className="h-1/2">
                      <img
                        src="/blg-image-1.png"
                        alt="blog-image"
                        className="w-full object-cover"
                      />
                    </div>

                    <div className="mt-8 flex flex-col px-5">
                      <div className="flex flex-col items-start gap-2 w-full">
                        <span className="text-[#4b6bfb] w-auto text-center h-5 bg-[#f6f7ff]  text-xs capitalize leading-relaxed rounded-md px-2">
                          {item.category}
                        </span>
                        <span className="text-sm capitalize font-semibold ">
                          {item.title}
                        </span>
                        <span className="text-sm capitalize font-medium ">
                          {item.description}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-row justify-center w-full px-5 mt-5 group">
                      <a href={`/blog/${item.id}`}>
                        <button className="w-auto flex py-1 rounded-[5px] text-white px-2 text-sm bg-[#4b6bfb] hover:scale-110 ease-out duration-500 transition-all gap-4 items-center">
                          Read More
                          <BookOpenText
                            size={18}
                            className="hidden group-hover:block transition-all duration-300 ease-linear"
                          />
                        </button>
                      </a>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
        <div className="flex h-10">
          <button className="border border-gray-400 hover:border-none py-2 px-3 duration-500 hover:bg-[#4b6bfb] ease-linear hover:text-white">
            <a href="/blogs">View More</a>
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

