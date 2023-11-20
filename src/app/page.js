"use client"
import React,{useState, useEffect} from "react";
import { checkURL, getURLs } from "@/services";
import axios from "axios";

export default function Home() {
  const [links, setLinks] = useState();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [dataFetch, setDataFetch] = useState(false);

  const checkBrokenLinks = async() => {

      setLoading(false);
      setDataFetch(true);
      const results = await axios.post('/api/checklinks', {pageURL: url})
      // const results = await fetch("/api/checklinks", {
      //     method: "POST",
      //     body: JSON.stringify({
      //         pageURL: "http://google.com"
      //     }),
      // });

      console.log("results are fetched");
      console.log(results.data);
      
      setLinks(results.data);
      setDataFetch(false);
      setLoading(true);
  }

  

  return (
      <>
          <div className="p-2 text-center font-extrabold text-6xl orange_gradient mt-20 mb-14">
              Broken Link Checker Tool
          </div>

          <div className="border-0 text-center mb-10">
              <input
                  type="text"
                  id="name"
                  name="name"
                  value={url}
                  placeholder="Enter a URL (https://www.example.com)"
                  onChange={(e) => setUrl(e.target.value)}
                  className="border-2  w-2/3 border-orange-400 p-2 pl-6 2xl:w-2/5"
              ></input>
              <button
                  className="border-orange-400 p-2 border-2 mx-auto ml-3 orange_gradient font-semibold"
                  onClick={checkBrokenLinks}
              >
                  Search
              </button>
          </div>

          {dataFetch && !loading && (
              <div className="text-center font-bold text-2xl ">
                  Loading... (may take a few minutes)
              </div>
          )}

          <div className="text-center border-0">
              {loading && (
                  <div className="text-start max-h-96 overflow-y-scroll p-4 border-2 border-orange-400 inline-block w-3/4 2xl:w-2/5 sm:w-3/4">
                      <div className="font-bold text-slate-500">
                          RESULTS:{" "}
                          <div className="inline-block w-4 h-4 bg-red-500 ml-6"></div>
                          <span className="ml-1">broken link (404)</span>
                          <div className="inline-block w-4 h-4 bg-green-500 ml-6"></div>
                          <span className="ml-1">active link (200)</span>
                      </div>
                      {links.length === 0 ? (
                          <p>No Links Detected</p>
                      ) : (
                          links.map((link, index) => (
                              <div
                                  key={index}
                                  className={`text-green-500 ${
                                      link.status === 200
                                          ? "text-green-500"
                                          : "text-red-600"
                                  } text-lg font-semibold`}
                              >
                                  <span className="mr-2">
                                      status: {link.status},
                                  </span>
                                  <span>{link.link}</span>
                              </div>
                          ))
                      )}
                  </div>
              )}
          </div>
      </>
  );
}
