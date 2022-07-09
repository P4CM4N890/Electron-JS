var dataStore = require('nedb');

let db = new dataStore({filename: 'db/people.db', autoload: true});

exports.addPerson = function(firstName, lastName, email){
    var person = {
        firstName: firstName,
        lastName: lastName,
        email: email
    };

    db.insert(person, function(err, newObject){

    });
};

exports.getPeople = function(act){
    db.find({}, function(err, people){
        if(people){
            act(people);
        }
    });
};

exports.deletePerson = function(id){
    db.remove({_id : id}, {}, function(err, numberDelete){

    });
};