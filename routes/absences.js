var express = require('express');
var router = express.Router();
var hbs = require('hbs');
var moment = require('moment');


// TODO faire un middleware de toute la partie date!!!!
var uneDate;
if(uneDate===undefined){
  uneDate = moment();
}
//var uneDate = moment("07-01-2017", "MM-DD-YYYY");


/* GET home page. */
router.get('/', function(req, res, next) {
  var test = req.query.mois;
  if(req.query.mois=='plus') {
    uneDate.month(uneDate.month()+1);
  } else if(req.query.mois=='minus') {
    uneDate.month(uneDate.month()-1);
  }
  uneDate.locale('fr');
  var labelMois = uneDate.format("MMMM YYYY");
  labelMois = labelMois.charAt(0).toUpperCase() + labelMois.slice(1);
  res.render('absences', { labelMois: labelMois , uneDate: uneDate });
});

hbs.registerHelper('listeDate', function(uneDate) {
  var out = "";
  var nbJrDansLeMois = parseInt(uneDate.endOf("month").format("DD"));
  for(var i=1; i < nbJrDansLeMois+1; i++) {
    out = out + "<th colspan=\"2\">"+ i + "</th>" ;
  }
  return out;
});


hbs.registerHelper('listeMatinApresMidi', function(uneDate) {
  var out = "";
  var nbJrDansLeMois = parseInt(uneDate.endOf("month").format("DD"));
  for(var i=1; i < nbJrDansLeMois+1; i++) {
    out = out + "<td>M</td><td>A</td>" ;
  }
  return out;
});

module.exports = router;