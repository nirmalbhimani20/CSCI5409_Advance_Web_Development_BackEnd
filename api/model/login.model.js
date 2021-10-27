const db = require('../../config/db');

const Login = function(user) {
    this.email = user.email;
    this.password = user.password;
};

Login.checkUser = (entered_email, result) => {
    const query = "SELECT * FROM user where email='"+entered_email+"' && active=1";
    console.log(query);
    db.query("SELECT * FROM user where email='"+entered_email+"' && active=1", (err, res) => {
      if (err) {
        console.log("error in Login: ", err);
        result(err, null);
        return;
      }
      if(res.length){
        console.log("user Found and Active:", res[0]);
        result(null, res[0]);
        return;
      }
      console.log("User does not exist or is not activated yet");
      result(null,0);
    });
}


module.exports = Login;