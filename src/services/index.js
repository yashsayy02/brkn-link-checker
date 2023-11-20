import * as cheerio from 'cheerio'
import axios from 'axios';

export async function getURLs(){

    try{
        const response = await axios.get("http://localhost:3000");
        const $ = await cheerio.load(response.data);

        const links = [];
        $("a").each((index, element) => {
            const href = $(element).attr("href");
            if (href) {
                links.push(href);
            }
        });
        return links;
        return response;
    }catch(error){
        console.log(error)
    }
    
}

/* export async function checkURL(links){
   const results = await Promise.all(
    links.map(async(link) => {
        try{
            
            const response = await axios.post("/api/checklinks", {urlLink: link})
            return {link, status: response.status}
        }catch(error){
            return {link, status: 404}
        }
    })
   )
   console.log(results)
} */

