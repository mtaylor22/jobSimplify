var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

router.post('/api/gen', function (req, res){
    fs=require('fs');
    var params = JSON.parse(req.body.data);
    console.log('POST: ', req.body);

    Docxtemplater=require('docxtemplater');
    content=fs.readFileSync(__dirname+"/../public/static/cover_letter_template.docx","binary");
    doc=new Docxtemplater(content);
    var company = params.company;
    doc.setData({
        "items":params.items,
        "hiring_manager":params.hiring_manager,
        "job_title": params.job_title,
        "source": params.source,
        "company":company
    });
    doc.render();
    var buf = doc.getZip().generate({type:"nodebuffer"});
    fs.writeFileSync(__dirname+"/../public/static/cover_letters/"+company+"_cover_letter.docx",buf);
    res.json({'success': true});
});
//router.post('/api/gen', function(req, res) {
////    var modules = require('../public/static/modules/modules');
////    modules.load();
////    modules.query("python");')");
//
//});
router.get('/api/item', function (req, res){
    var db = new sqlite3.Database(__dirname+"/../data.db");
    db.all("SELECT * from items ORDER BY keyword", function(err,rows){
        if (err)
            res.json({'success': false});
        else
            res.json({'success': true, 'items': rows});
    });
});
router.post('/api/item', function (req, res){
    var db = new sqlite3.Database(__dirname+"/../data.db");
    db.run("INSERT into items(item,keyword) VALUES ('"+ req.param("item")+"', '"+ req.param('keyword')+"')");
    res.json({'success': true});
});
router.get('/api/', function (req, res){
    res.render('main');
});


module.exports = router;
