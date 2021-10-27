const db = require('../../config/db');

const Profile = function(user) {
    this.degree1 = user.degree1;
    this.degree2 = user.degree2;
    this.degree3 = user.degree3;
    this.school1 = user.school1;
    this.school2 = user.school2;
    this.school3 = user.school3;
    this.company1 = user.company1;
    this.company2 = user.company2;
    this.company3 = user.company3;
    this.post1 = user.post1;
    this.post2 = user.post2;
    this.post3 = user.post3;
    this.years1 = user.years1;
    this.years2 = user.years2;
    this.years3 = user.years3;
    this.github = user.github;
    this.linkedin = user.linkedin;
    this.contact = user.contact;
};

Profile.displayProfile = (user, result) => {
    const query = "SELECT * FROM userinfo where userId='"+user+"'";
    console.log(query);
    db.query(query, (err, res) => {
      if (err) {
        console.log("error in Displaying Profile Login: ", err);
        result(err, null);
        return;
      }
      if(res.length){
        console.log("Profile retrieved from DB", res[0]);
        result(null, res[0]);
        return;
      }
      console.log("User does not exist");
      result(err,null);
    });
}


module.exports = Profile;