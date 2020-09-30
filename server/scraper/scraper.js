// Scrapes from inbounds Disc Golf inFlight Guide
// Writes psql commands to insert all discs to the postgres database


const axios = require('axios');
const cheerio = require('cheerio');

const getPostTitles = async () => {
	try {
		const { data } = await axios.get(
			'http://www.inboundsdiscgolf.com/content/?page_id=431'
		);
		const $ = cheerio.load(data);
        const discs = [];
        
        var j;
        var i;

        for (i=1; i < 1000; i++){
            const disc = [];
            for (j = 1; j < 7; j++) {
                $("#inFlightGuide > tbody > tr:nth-child(" + i + ") > td:nth-child(" + j + ")").each((_idx, el) => {
                disc [j - 1] = $(el).text();
            });
        }
        discs.push(disc)
    }

		return discs;
	} catch (error) {
		throw error;
	}
};

    var i = 0;
    var discsToAdd = [];
    discs = getPostTitles().then((discs) => 
        {
            for (i = 0; i < 1000; i++) {
                console.log("INSERT INTO discs (mold,manufacturer,distance,turn,fade,type) VALUES ('" + discs[i][0] + "','" + discs[i][1] + "'," + discs[i][3].slice(0,3) + ',' + discs[i][4].replace('%','') + "," + discs[i][5].replace('%','') + ",'" + discs[i][2] + "');");
            }

    //console.log(discs)

        }
        );