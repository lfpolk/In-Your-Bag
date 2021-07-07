// Scrapes from inbounds Disc Golf inFlight Guide
// Writes psql commands to insert all discs to the postgres database
// This program is used to write SQL queries to the command linnne to be copied and pasted directly to psql to enter all discs to database


const axios = require('axios');
const cheerio = require('cheerio');

const getDiscs = async () => {
    console.log('Finna fetch')
	try {
		const { data } = await axios.get(
			'http://www.inboundsdiscgolf.com/content/?page_id=431'
        );
        console.log('Fetched')
		const $ = cheerio.load(data);
        const discs = [];
        
        var j;
        var i;
        var k = 0;


        for (i=1000; i < 1050; i++){

            const disc = [];
            for (j = 1; j < 7; j++) {
                $("#inFlightGuide > tbody > tr:nth-child(" + i + ") > td:nth-child(" + j + ")").each((_idx, el) => {
                disc [j - 1] = $(el).text();
            });
        }
        console.log(disc[0] + ' pushed ' + k++)
        discs.push(disc)
    }

		return discs;
	} catch (error) {
		throw error;
	}
};

    var i = 0;
    var discsToAdd = [];
    discs = getDiscs().then((discs) => 
        {
            for (i = 0; i < 49; i++) {
                console.log("INSERT INTO discs (mold,manufacturer,distance,turn,fade,type) VALUES ('" + discs[i][0] + "','" + discs[i][1] + "'," + discs[i][3].slice(0,3) + ',' + discs[i][4].replace('%','') + "," + discs[i][5].replace('%','') + ",'" + discs[i][2] + "');");
            }

    //console.log(discs)

        }
        );