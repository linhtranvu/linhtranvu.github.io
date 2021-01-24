/*
  Change username and password to any username and password you want
  You can make beautiful login form by changing htmlForm code, or use fs.readFileSync to read from external html.
  In case you want to rewrite authentication and user 3rd party authentication system (oAuth, Twitter...), uncomment tokenValidate function and rewrite
*/
var username = "user"; //Username for Dashboard authentication
var password = "123456"; //Password for Dashboard authentication
var htmlForm = '<form >Username: <input name="username" type="text"><br>Password: <input name="password"  type="text"><br><input type="submit" value="Submit"></form>';

function dashboardAuth(req, res, next) {
  var req_username = req.query.username;
  var req_password = req.query.password;

  var url = req.originalUrl;
  // console.log(url);.split("/")

  if (url[3] === '/' && url[4] !== undefined && url[4] !== '#' && url[4] !== '?') {
   // if (url[2][0] !== undefined && url[2][0] !== '#' && url[4] !== '?') {

	// console.log("Already has login with socket!");
    return next();
  }
  

  if(req_username == undefined || req_password == undefined){
	 console.log('Undefined');
    res.writeHeader(200, {"Content-Type": "text/html"})
    res.write(htmlForm);
    return res.end();	  
  }
  
  if(req_username == username && req_password == password){
	  // console.log('login success');
	  return next();
  }else{
      console.log("invalid password to access dashboard");
      res.writeHeader(200, {"Content-Type": "text/html"})
      res.write(htmlForm);
      return res.end();	 
      // return res.status(401).end();
  }


  /*
  tokenValidate(username, token).then(function(result) {
    if (result) {
      return next();
    } else {
      console.log("invalid token to access dashboard");
      return res.status(401).end();
    }
  });
  */

}


/*
var when = require("when");
 var request = require("request");

function tokenValidate (username, token) {
  return when.promise(function(resolve) {
    request.post(
      {
        url: "http://cloudred.cc/api/user/validate",
        form: {
          username: username,
          token: token,
        },
      },
      function(err, res, body) {
        console.log(err, body);
        try {
          var result = JSON.parse(body)
          if (result.success) {
            resolve(true);
          } else {
            resolve(false);
          }
        } catch (e) {
          console.log("parse res body:", body, "failed");
          resolve(false);
        }
      }
    )
  });
}
*/


module.exports = dashboardAuth;