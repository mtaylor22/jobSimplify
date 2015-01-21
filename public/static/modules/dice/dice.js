/**
 * Created by Mitchell Taylor on 1/12/2015.
 */
var request = require('request');

module.exports = {
    test: function(){
        console.log("Dice loaded");
    },
    pull: function(query, callback){
    //  pulls 25
        var url = 'http://service.dice.com/api/rest/jobsearch/v1/simple.json?text='+query+'&city=Austin,+TX';
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                var jobs = [];
                data.resultItemList.forEach(function (result) {
                    jobs.push({'title': result.jobTitle, 'company': result.company, 'date': new Date(result.date), 'location': result.location, 'src': 'dice'})
                });
                callback(jobs);
            }
        });
    }
};