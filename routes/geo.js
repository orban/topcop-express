
/*
 * POST geo coords, report nearby coords within maxDistance.
 */


exports.findNearby = function(req, res){
  console.log(req.body);

  Rating.findNearStatic(req.body, function (err, docs){
	  if (!err){
	  res.json(docs);
  } else {
	  console.log(err);
  }
  });
  //console.log(nearbyRatings);
  //res.send(nearbyRatings);
};

exports.findAll = function(req, res) {	
	Rating.findAllStatic(req, function(err, docs){
		if (!err) {
			res.json(docs);
		} else {
			console.log(err);
		}
	});
}