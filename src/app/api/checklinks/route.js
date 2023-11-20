import * as cheerio from "cheerio";
import axios from "axios";

export const POST = async (req) => {
    const {pageURL} = await req.json();

    try{
        const response = await axios.get(
            pageURL
        );
        const $ = cheerio.load(response.data);

        const links = [];

        $('a').each((index, element) => {
            const href = $(element).attr('href');
            if(href){
                links.push(href)
            }
        })

        if(links.length === 0){
            return new Response([]);
        }

        //check for brkn links
        const results = await Promise.all(
            links.map(async(link) => {
                try{
                    const response = await axios.head(link);
                    return {link, status: response.status}
                }catch(error){
                    return {link, status: 404};
                }
            })
        )

        return new Response(JSON.stringify(results));

    }catch(error){
        console.log(error);
        return new Response([]);
    }
};
