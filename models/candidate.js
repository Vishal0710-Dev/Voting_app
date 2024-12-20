const mongoose = require('mongoose');
 const bcrypt = require('bcrypt');

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    party: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },

    //
    //for eg:
    // "name":"Narender Modi",
   // "party": "BJP",
   // "age":"71",
   // "votes":[
  // {
  //  "user":"612jhrji355hbhn",
  //  "votedAt":"2024-12-10T:12:07:05"
  // }
    //  ],
     //  "voteCount:1"

    votes:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
                required: true,

            },
            votedAt:{
                type: Date,
                default: Date.now()
            }
        }
    ],
    voteCount: {
        type: Number,
        default: 0
    }

    
});

const candidate = mongoose.model('candidate', candidateSchema);
module.exports = candidate;