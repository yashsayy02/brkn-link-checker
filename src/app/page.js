"use client"
import React,{useState, useEffect} from "react";
import { checkURL, getURLs } from "@/services";
import axios from "axios";

export default function Home() {
  const [links, setLinks] = useState();

  // useEffect(() => {
  //   const response = getURLs().then((result) => setData(result));
  //   //checkURL();
  // }, [])

  const checkBrokenLinks = async() => {
      //fetch Links
      //   const response = getURLs().then(async(result) => {
      //     setLinks(result);
      //     if(links){
      //       const response = await axios.post('/api/checklinks', {urlLinks: links})
      //     }else{
      //       console.log("hi")
      //     }
      //   });

      const result = await axios.post('/api/checklinks', {pageURL: "www.axampl.com"})

      console.log("results are fetched");
      console.log(result);
  }

  

  return (
      <>
          <div className="border-4 p-2">Broken Link Checker Tool</div>
          <button className="border-2 bg-black text-white" onClick={checkBrokenLinks}>check</button>
          <div className='p-4'>
            <a href='https://www.google.com'>google</a><br></br>
            <a href="https://www.google.com/yash">google</a><br></br>
            <a href="https://www.google.com">google</a><br></br>

            {links && links.map((link, index) => (
              <div key={index}>
                {link}
              </div>
            ))}


          </div>
      </>
  );
}
