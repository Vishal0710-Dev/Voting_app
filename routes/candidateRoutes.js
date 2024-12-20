const express = require('express');
const router = express.Router();
const User = require('../models/candidate');
const{jwtAuthMiddleware, generateToken} = require('../jwt');
 const Candidate = require('../models/candidate');

 const checkAdminRole = async (userID) =>{
    try{
        const user = await User.findById(userID);
        if(userRole == 'admin'){
            return true;
        }
    } catch(err){
        return false;
    }

 }
router.post('/', jwtAuthMiddleware, async (req, res) =>{
    try{

        const userData = req.user;
        const userID = userData.id;
        if(! await checkAdminRole(req.user.id))
            return res.status(403).json({message: 'user has not admin role'});
        
        const data = req.body


        const newCandidate = new Candidate(data);
        const response = await newCandidate.save();
        console.log('data saved');

        res.status(200).json({response: response});
    
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
        
    }
})



router.put('/:candidateID', jwtAuthMiddleware, async(req, res)=>{
    try{
        if(!checkAdminRole(req.user.id))
            return res.status(404).json({message: 'user does not have admin role'});
        
        const candidateId = req.params.candidateID;
        const updatedCandidateData = req.body;

        const response = await candidate.findByIdAndUpdate(candidateID, updatedCandidateData,
            {
                new: true,
                runValidators: true,


       } )
       if(!response) {
        return res.status(403).json({error: 'Candidate not found'});
       }

       console.log('candidate data updated');
       res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});

    }
    })





    router.delete('/:candidateID', jwtAuthMiddleware, async(req, res)=>{
        try{
            if(!checkAdminRole(req.user.id))
                return res.status(403).json({message: 'user does not have admin role'});
            
            const candidateId = req.params.candidateID;
            
    
            const response = await candidate.findByIdAndDelete(candidateID);
                
           if(!response) {
            return res.status(404).json({error: 'Candidate not found'});
           }
    
           console.log('candidate deleted');
           res.status(200).json(response);
        }catch(err){
            console.log(err);
            res.status(500).json({error: 'Internal Server Error'});
    
        }

})


router.post('/vote/:candidateID', jwtAuthMiddleware, async (req, res)=>{
    candidateID = req.params.candidateID;
    userId = req.user.id;

    try{
        const candidate = await Candidate.findById(candidateID);
        if(!candidate){
          return res.status(404).json({ message: 'Candidate not found'});

        
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: 'user not found'});
        }
        if(user.isVoted){
         res.status(400).json({ message: 'you have already voted '});

        }
        if(user.role == 'admin'){
            res.status(403).json({message: 'admin is not allowed'});
        }


        candidate.votes.push({user: userID})
        candidate.voteCount++;
        await candidate.save();


        user.isVoted = true;
        await user.save();

        res.status(200).json({ message: 'Vote recorded successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});

    }


});

router.get('/vote/count', async (req, res) => {
    try{
        const candidate = await Candidate.find().sort({voteCount: 'desc'});

        const voterecord = candidate.map((data)=>{
            return{
                party: data.party,
                count: data.voteCount
            }
        });
        return res

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});        
    }
})



module.exports = router;