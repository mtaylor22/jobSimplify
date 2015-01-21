var keys = require('../keys').keys;
var request = require('request');
module.exports = {
    test: function(){
        console.log("Glassdoor loaded");
    },
    pull: function(query, callback){
    //  pulls 25
        var url = 'http://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=python&sc.keyword=python&locT=C&locId=1139761';
        request(url, function (error, response, body) {
            console.log(body);
            if (!error && response.statusCode == 200) {
                console.log(body);
                var jobs = [];
                data = body.match(/class="jobListing.*?<\/div> <\/div> <\/div>/g);
                console.log(data);
//                data.results.forEach(function(result){
//                    jobs.push({'title':result.jobtitle, 'company':result.company, 'date':new Date(result.date), 'location': result.formattedLocation, 'src': 'indeed'})
//                });
                callback(jobs);
            }
        });
    }
};