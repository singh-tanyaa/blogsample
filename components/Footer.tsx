import React from 'react'
import '../app/globals.css'
import Link from 'next/link'
type Props = {}

const Footer = () => {
    return (
      <div>
         <footer
       
      >
        <div className="container">
          <div className="about">
            <h3>About</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Consectetur possimus sed praesentium! Et sunt, distinctio veniam
              ullam, nesciunt ex laudantium quidem error sint, eum explicabo.
            </p>
            <p>
              <span>Email:</span>pj@gmail.com
            </p>
            <p>
              <span>Phone:</span>0123987123
            </p>
          </div>
          <div className="quick_links">
            <h3>Quick Links</h3>
            <ul>
            <li><Link href={"/"}>Home</Link></li>
            <li>
              <Link href={"/about"}>About</Link></li>
            <li> <Link href={"/blogs"}>Blogs</Link></li>
            {/* <li>Dashboard</li> */}
               
             
              {/* <Link href={"/dashboard"}>Dashboard</Link> */}
            </ul>
          </div>
          <div className="categories">
            <h3>Categories</h3>
            <ul>
              <li>Lifestyle</li>
              <li>Technology</li>
              <li>Sports</li>
              <li>Travel</li>
              <li>Business</li>
              <li>Economy</li>
            </ul>
          </div>
          <div className="news_letter">
            <div>
              <h3>Weekly Newletter</h3>
              <p>Get blog articles and offer via email</p>
            </div>
            <div>
              <input type="text" placeholder={`Your Email`} />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="logo">Meta <span>BLOG</span></div>
          
        </div>
      </footer>
      </div>
    )
  }

export default Footer