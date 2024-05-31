import {useEffect, useState} from "react";
// import styles from "@/app/styles/categoryList.module.css";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";


interface Category{
    id:string,
    name:string
}


const CategoryList: React.FC = () => {
   const[categories,setCategories]=useState<Category[]>([])
useEffect(()=>{
async function getCategories(){
    await axios.get("https://apiblog.peymagen.com/api/category/")
    .then((item)=>setCategories(item.data.data))

   

}
getCategories()

},[]) 
console.log(categories);

  return (
   <div className="flex flex-row  px-16 my-20 gap-20">

{  categories?categories.map((item)=>{
    return(

<div className="flex flex-row  justify-center w-60 h-24 shadow-lg rounded-[8px] hover:shadow-2xl transition-all duration-300"  key={item.id}> 
    <div className="flex flex-row w-full items-center px-5 gap-14">
        <Image src="/logo.webp" alt="cat-logo" width={32} height={32}/>
     <span className="font-semibold text-xl">{item.name}</span>
        
    </div>
</div>

)
}):
<span>No data found!!</span>
}
   </div>
  );
};

export default CategoryList;
