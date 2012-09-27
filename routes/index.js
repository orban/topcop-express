
/*
 * GET home page.
 */

exports.display = function(err, res) {
    return Rating.find(function (err, returnedRatings) {
        if (!err) {
            res.render( 'index',
                        {title: "TopCop",
                        ratings: returnedRatings})
        } else {
            return console.log(err);
        }
    });
};
