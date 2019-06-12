const express = require('express');
const router = express.Router();
var ogs = require('open-graph-scraper');

//Metadata tags with open-graph-scrapper
router.post('/', (req, res)=>{
    var url = req.body.url;

    var options = {'url': url}
    ogs(options, function(error, result, response){
      console.log(error);
      res.json(result)
    })
})




module.exports = router;