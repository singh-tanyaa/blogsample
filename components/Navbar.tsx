"use client";
import { CircleChevronLeft, Search } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface Link {
  route: string;
  name: string;
}

const links: Link[] = [
  { route: "/", name: "Home" },
  { route: "/blogs", name: "Blogs" },
  { route: "/about", name: "About" },
  { route: "/signup", name: "Sign Up" },
  { route: "/login", name: "Login" },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row lg:px-48 gap-20 lg:justify-center justify-around lg:gap-48 items-center py-8 ">
      <div className="logo">
        <Image
          src="/Logo.png"
          alt="logo"
          height={20}
          width={90}
          className="object-contain"
        />
      </div>
      <ul className="flex gap-16 leading-loose font-semibold max-[968px]:hidden">
        {links.map((item) => (
          <li
            key={item.route}
            className={`hover:scale-x-110 duration-300 transition-all ease-out ${
              pathname === item.route && "border-b-2 border-[#2563EB]"
            }`}
          >
            <a href={item.route}>{item.name}</a>
          </li>
        ))}
      </ul>

      <div className="bg-[#f4f4f5] pr-3 shadow-md flex flex-row items-center rounded-lg">
        <input type="text" className="px-5 py-2 bg-[#f4f4f5] border-none outline-none" placeholder="Search"/>
        <Search size={17}  className="cursor-pointer"/>
      </div>

      <div className="flex lg:hidden">
      <CircleChevronLeft size={17} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
