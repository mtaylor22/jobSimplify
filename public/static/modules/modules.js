/**
 * Created by Mitchell Taylor on 1/12/2015.
 */
var modules = {};
var loaded = false;
module.exports = {
    installed: ['indeed', 'dice', 'simplyhired'],
    modules: {},
    load: function(){
        this.installed.forEach(function(mod){
            modules[mod] = require('../modules/'+mod+'/'+mod);
            modules[mod].test();
        });
        loaded = true;
        return this;
    },
    query: function(term){
        if (!loaded) throw "Modules not loaded";
        var pullCount = 0;
        var goal = this.installed.length;
        var jobs = [];
        this.installed.forEach(function(mod){
            modules[mod].pull("Python", function(data){
                jobs.push.apply(jobs, data);
                pullCount+=1;
                if (pullCount == goal) {
                    console.log(jobs);
                }
            });
        });
    }
};