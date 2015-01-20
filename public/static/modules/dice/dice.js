/**
 * Created by Mitchell Taylor on 1/12/2015.
 */
var http = require('http');

module.exports = {
    test: function(){
        console.log("Dice loaded");
    },
    pull: function(query, callback){
    //  pulls 25
        var url = 'http://service.dice.com/api/rest/jobsearch/v1/simple.json?text='+query+'&city=Austin,+TX';
        http.get(url, function(res) {
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                var data = JSON.parse(body);
                var jobs = [];
                data.resultItemList.forEach(function(result){
                    jobs.push({'title':result.jobTitle, 'company':result.company, 'date':new Date(result.date), 'location': result.location, 'src': 'dice'})
                });
                callback(jobs);
            });
        }).on('error', function(e) {
            console.log("Got error: ", e);
        });
    }
};