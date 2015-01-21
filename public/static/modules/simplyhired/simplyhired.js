var http = require('http');
var keys = require('../keys').keys;
var request = require('request');
module.exports = {
    test: function(){
        console.log("SimplyHired loaded");
    },
    pull: function(query, callback){
    //  pulls 25
        var url = 'http://www.simplyhired.com/search?q=python&l=Austin%2C+TX&fdb=1';
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var jobs = [];
                data = body.match(/<div class="job"[\s\S]*?<!--job-->/gm);
                data.forEach(function(job){
                    var title = job.match(/itemprop="title">(.*?)<\/a>/)[1];
                    var company = job.match(/company".*?>(.*?)<\/h4>/)[1];
                    var time = job.match(/span class="ago">(.*?)<\/span>/)[1];
                    var location = job.match(/jobLocation">(.*?)<\/span>/)[1];
                    jobs.push({'title':title, 'company':company, 'date':time, 'location': location, 'src': 'simplyHired'})
                });
                callback(jobs);
            }
        });
    }
};