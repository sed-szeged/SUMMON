const bcrypt = require('bcryptjs');

module.exports = insertAdmin = async function(admin) {
  if (admin.password !== admin.confirmPassword) {
    console.log('password didnt match');
  } else {
    try {
      var MongoClient = require('mongodb').MongoClient;
      var url = 'mongodb://localhost:27017/';

      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        const dbo = db.db('iotdataset');

        bcrypt.hash(admin.password, 10, (err, hash) => {
          const newAdmin = {
            name: admin.name,
            email: admin.email,
            password: hash,
            isSuperUser: true
          };
          dbo.collection('admins').insertOne(newAdmin, (err, res) => {
            if (err) throw err;
            console.log('New admin was inserted...');
            db.close();
          });
        });
      });
    } catch (error) {
      console.error('Error connecting to db');
      console.error(error);
    }
  }
};
