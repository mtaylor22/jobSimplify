var http = require('http');
var keys = require('../keys').keys;

module.exports = {
    test: function(){
        console.log("Indeed loaded");
    },
    pull: function(query, callback){
    //  pulls 25
        var url = 'http://api.indeed.com/ads/apisearch?publisher='+keys.indeed+'&q='+query+'&l=austin%2C+tx&sort=&radius=&st=&jt=&start=&limit=25&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2&format=json';
        http.get(url, function(res) {
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                var data = JSON.parse(body);
                var jobs = [];
                data.results.forEach(function(result){
                    jobs.push({'title':result.jobtitle, 'company':result.company, 'date':new Date(result.date), 'location': result.formattedLocation, 'src': 'indeed'})
                });
                callback(jobs);
            });
        }).on('error', function(e) {
            console.log("Got error: ", e);
        });
    }
};