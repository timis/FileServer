var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/foo', function(req, res, next) {
  // res.send('respond with a resource');
  res.json([{
  	id: 1,
  	username: "samsepi0l"
  }, {
  	id: 2,
  	username: "D0loresH4ze"
  }]);
});

router.post("/reg", function(req,res,next) {
  console.log(req.body);
  res.json({
    success: true
  });
})

module.exports = router;
