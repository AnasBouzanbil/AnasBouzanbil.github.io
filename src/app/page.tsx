"use client";

import React, { useState } from "react";

import NavBar from "./NavBar/NavBar";
import { Blog } from "./Articles/Blog";
import { Resume } from "./Resume/Resume";
import About from "./About/About";
import SideBar from "./SideBar/SideBar";
import {Contact} from "./Contact/Contact";

function App() {
  const [currentPage, setCurrentPage] = useState('about')
  return (
    <>
    <h1 className="h1"><span className="span">I will do anything for fun or money.</span> </h1>
      <main>
          <SideBar/>
        <div className="main-content">
        <NavBar setCurrentPage={setCurrentPage} currentPage={currentPage}/>
    {currentPage === 'about' && <About/>}
    {currentPage === 'resume' && <Resume  />}
    {currentPage === 'blog' && <Blog />}
    {currentPage === 'contact' && <Contact  setCurrentPage={setCurrentPage} />}
        </div>
      </main>
    </>
  );
}

export default App;
