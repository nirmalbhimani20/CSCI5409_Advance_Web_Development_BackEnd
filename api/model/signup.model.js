const db = require('../../config/db');

const User = function(user) {
    this.email = user.email;
    this.password = user.password;
    this.firstname = user.firstname; 
    this.lastname = user.lastname;
    this.active = user.active;
};

User.create = (newUser, result) => {
    db.query("INSERT INTO user SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error in signup: ", err);
        result(err, null);
        return;
      }
      console.log("created user: ", { id: res.insertId});
      result(null, { id: res.insertId});
    });
}

User.checkEmail = (entered_email, result)=>{
  db.query("SELECT id FROM user where email='"+entered_email+"'", (err, res) => {
    if (err) {
      console.log("error in signup: ", err);
      result(err, null);
      return;
    }
    if(res.length){
      console.log("user already exists:", res[0]);
      result(null, res[0]);
      return;
    }
    console.log("no existing user found");
    result(null,0);
  });
}

module.exports = User;