const mongoose = require('mongoose');

module.exports = (databaseURL) =>{
    mongoose.connect(databaseURL,err=>{
        if(err) return console.error(err);
        console.log('connected!');
    });
};