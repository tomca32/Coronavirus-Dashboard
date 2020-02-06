var request = require('request');
var cheerio = require('cheerio');
var rp = require('request-promise');

var options = {
    uri: "https://bnonews.com/index.php/2020/01/the-latest-coronavirus-cases/",
    transform: function (body) {
        return cheerio.load(body);
    }
};
var holder = []

    function scrapeEvery10Minutes() {
        rp(options)
        .then(function ($) {
            var data = {
                chineseData: [
                ],
                chineseSources: [
                ],
                chineseRegionsData: [
                ],
                chineseRegionsSources: [
                ],
                internationalData: [
                ]
            }
           
        
                const timelineData = $("#mvp-content-main > ul")
                    .toArray()
                    .map(element => $(element).text());
                            
        
                    day1 = $("#mvp-content-main > ul:nth-child(17) > li > a")
                    .toArray()
                    .map(element => $(element).attr("href"));
        
                    const timelineDates = $("#mvp-content-main > h4")
                    .toArray()
                    .map(element => $(element).text());
        
                    timelineDates.pop();

                    var timelineDataSplitArray = []
        
                    for (let index = 0; index < timelineData.length; index++) {
                        timelineDataSplitArray.push(timelineData[index].split(" (Source)"));
                        //timelineDataSplitArray[index][index].trim()
                    }
        
                    for (let index = 0; index < timelineDataSplitArray.length; index++) {
                        timelineDataSplitArray[index].pop()
                    }
        
                    var timelineArray = []
                    var timelineArrayDates = []
                    var timelineArraySources = []
        
                    for (let index = 0; index < timelineDataSplitArray.length; index++) {
                        timelineArray[index] = timelineDataSplitArray[index].map(str => str.trim().slice(7));
        
                        timelineArrayDates[index] = timelineDataSplitArray[index].map(str => str.trim().slice(0, 5));
                    }
        
        
                    timelineArray.shift();
                    timelineArray.shift();

                    timelineArrayDates.shift();
                
                //Chinese data
                const chineseDataStats = $("#mvp-content-main > table.wp-block-table > tbody > tr > td:not(:last-child)")
                    .toArray()
                    .map(element => $(element).text());
        
                const quickFacts = $("#mvp-content-main > table.wp-block-table.aligncenter.is-style-stripes > tbody > tr:last-child > td:nth-child(4)")
                    .toArray()
                    .map(element => $(element).text());
        
                const quickFactsData = quickFacts[0].split(/[^\d,]/)
                    .filter(str => str.trim() !== '');

                    const chineseSourcesData = $("#mvp-content-main > table.wp-block-table > tbody > tr > td:nth-child(5) > a")
                    .toArray()
                    .map(element => $(element).attr("href"));
        
                for (i = 0; i < chineseDataStats.length * (chineseDataStats.length + 10); i++) {
                    data.chineseData.push(chineseDataStats.splice(0, 4));
                    
                    const victims = data.chineseData[i][3].trim()
                        .split(', ')
                        .map(num => {
                            return num.replace(/\D/g, '');
                        });
                    data.chineseData[i][3] = victims;
                    }
        
                const mainlandChinaQuery = (element) => element[0] === 'MAINLAND CHINA';
                var mainlandChinaIndex = data.chineseData.findIndex(mainlandChinaQuery);
        
                const regionsQuery = (element) => element[0] === 'REGIONS';
                var regionsIndex = data.chineseData.findIndex(regionsQuery);
        
                const internationalQuery = (element) => element[0] === 'INTERNATIONAL';
                var internationalIndex = data.chineseData.findIndex(internationalQuery);
        
                var mainlandChinaData = data.chineseData.slice(Number(mainlandChinaIndex + 1), Number(regionsIndex - 1));
                var mainlandChinaSources = chineseSourcesData.slice(Number(mainlandChinaIndex), Number(regionsIndex - 2));

        
                var regionData = data.chineseData.slice(Number(regionsIndex + 1), Number(internationalIndex - 1));
                var regionsSources = chineseSourcesData.slice(Number(regionsIndex), Number(internationalIndex - 2));
        
                var internationalData = data.chineseData.slice(Number(internationalIndex + 1), data.chineseData.length - 1);
                var internationalSources = chineseSourcesData.slice(Number(internationalIndex - 3), data.chineseData.length);

                internationalSources.shift()
                console.table(internationalData)
                console.table(internationalSources)

                // var internationalAndRegions = []
                // var regionsHolder = regionsData
                // internationalAndRegions.push(internationalData);
                // internationalAndRegions.concat(regionsData);

                // console.log(internationalAndRegions)

        
                var totalCases = 0;
                var internationalCases = 0;
                //console.table(data.chineseData)
                for (let index = 0; index < mainlandChinaData.length; index++) {
                    totalCases += Number(mainlandChinaData[index][1].replace(/\D/g, ''));
                }
        
                for (let index = 0; index < regionData.length; index++) {
                    totalCases += Number(regionData[index][1].replace(/\D/g, ''));
                }
        
                for (let index = 0; index < internationalData.length; index++) {
                    totalCases += Number(internationalData[index][1].replace(/\D/g, ''));
                }
        
                for (let index = 0; index < regionData.length; index++) {
                    internationalCases += Number(regionData[index][1].replace(/\D/g, ''));
                }
        
                for (let index = 0; index < internationalData.length; index++) {
                    internationalCases += Number(internationalData[index][1].replace(/\D/g, ''));
                }

                var totalDead = 0;
        
                for (let index = 0; index < mainlandChinaData.length; index++) {
                    totalDead += Number(mainlandChinaData[index][2].replace(/\D/g, ''));
                }
        
                for (let index = 0; index < regionData.length; index++) {
                    totalDead += Number(regionData[index][2].replace(/\D/g, ''));
                }
        
                for (let index = 0; index < internationalData.length; index++) {
                    totalDead += Number(internationalData[index][2].replace(/\D/g, ''));
                }
        
                function numberWithCommas(x) {
                        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                    totalDead = numberWithCommas(totalDead);
        
                    totalCases = numberWithCommas(totalCases);
        
                    //console.table(totalDead)
                    var totalCountries = internationalData.length + 1;
    
                // const mongoose = require('mongoose');
                // const uri = `mongodb+srv://avischiffmann:hdXCcFJLmiVRU7ig@coronavirus-if5xt.mongodb.net/test?retryWrites=true&w=majority`
        
                // mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        
                // const mainlandChinaStatsModel = require("./models/mainlandChina");
        
                // const mainlandChinaStats = new mainlandChinaStatsModel({
                //     maindlandChinaArray: mainlandChinaData,
                //     chinaRegionsArray: regionData,
                //     internationalArray: internationalData,
                //     sources: mainlandChinaSources,
                //     regionsSources: regionsSources,
                //     internationalSources: internationalSources,
                //     quickFactsData: quickFactsData,
                //     totalConfirmed: totalCases,
                //     totalDead: totalDead,
                //     totalCountries: internationalData.length + 1,
                //     timelineDataSplitArray: timelineArray,
                //     timelineDates: timelineDates,
                //     timelineArrayDates: timelineArrayDates,
                //     timelineDataSources: timelineDataSources
                // })
        
                // mainlandChinaStats.save().then(result => {
                //     console.log(result)
                //     console.log("saved to database")
                // }).catch(error => console.log(error));
        
                // console.table(regionData);
        
                // console.table(internationalData);
                holder = [data, mainlandChinaData, regionData, internationalData, mainlandChinaSources, regionsSources, internationalSources, totalCases, totalDead, totalCountries, timelineArray, timelineDates, timelineArrayDates, day1, quickFactsData, internationalCases];
            })
        .catch(function (err) {
            console.log("There has been an error web scraping, default to the database.")
        });        
        setTimeout(scrapeEvery10Minutes, 600000);
     }
     

     scrapeEvery10Minutes();



const mongoose = require('mongoose');
var express = require('express');
var app = express();
app.set("view engine", "ejs");
    // const uri = `[REDACTED]`
    // mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // const mainlandChinaStatsModel = require("./models/mainlandChina");

    app.get('/data', async (req, res) => {
        // mainlandChinaStatsModel.findOne().sort({_id: -1}).exec(function(err, result) {
        //     if (err) { console.log(err) }
        //     })
        res.render('data', { mainlandData: holder[1], mainlandChinaSources: holder[4], regionsData: holder[2], regionsSources: holder[5], internationalData: holder[3], internationalSources: holder[6], quickFactsData: holder[14], totalConfirmed: holder[7], totalDead: holder[8], totalCountries: holder[9], internationalCases: holder[15] });
    });

    app.get('/', async (req, res) => {
        res.render('data', { mainlandData: holder[1], mainlandChinaSources: holder[4], regionsData: holder[2], regionsSources: holder[5], internationalData: holder[3], internationalSources: holder[6], quickFactsData: holder[14], totalConfirmed: holder[7], totalDead: holder[8], totalCountries: holder[9], internationalCases: holder[15] });

    });

    app.get('/timeline', async (req, res) => {
        // console.log(holder[13]);
        // console.log(holder[12]);
            res.render('timeline', { timelineDataSplitArray: holder[10], timelineDates: holder[11], timelineArrayDates: holder[12], timelineDataSources: holder[13] });

    });
    app.get('/prevention', async (req, res) => {
        res.render('prevention');
    });
    app.get('/about', async (req, res) => {
        res.render('about');
    });
    app.get('/map', async (req, res) => {
        res.render('map');
    });
    app.get('/wiki', async (req, res) => {
        res.render('wiki');
    });
    app.get('/faq', async (req, res) => {
        res.render('faq');
    });
app.listen(process.env.PORT || 4000);
console.log("Listening on port: " + 4000);