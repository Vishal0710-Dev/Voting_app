const express = require('express')
const app = express();
const db = require('./db');
 require('dotenv').config();


const bodyParser = require('body-parser');
app.use(bodyParser.json());

 const PORT = process.env.PORT || 3000;

const {jwtAuthMiddleware} = require('./jwt');


const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

function isVotingAllowed(){
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    return currentHour>= 9 && currentHour < 18;

}

function checkVotingTime(req, res, next) {
    if(!isVotingAllowed()) {
        return res.status(403).json({ error: 'Voting is only allowed between 9 AM and 6 PM'})
    }
    next();
}

app.use('/user', userRoutes);

app.use('/candidate', jwtAuthMiddleware, candidateRoutes);


app.listen(PORT, ()=>{
    console.log('listening on port 3000');
})