const express = require('express');
const Lessons = require('../models/dbHelpers');

const router = express.Router()

router.post('/', (req,res) =>{
    Lessons.add(req.body)
    .then(lesson=>{
        res.status(200).json(lesson);
    })
    .catch(error =>{
        res.status(500).json({ message: "cant add lesson"});
    });
});

router.get('/', (req,res) =>{
    Lessons.find()
    .then(Lessons =>{
        res.status(200).json(Lessons)
    })
    .catch(error =>{
        res.status(500).json({ message: "cant get lessons"})
    })
})

router.get('/:id', (req,res) =>{
    const {id} = req.params;
    Lessons.findById(id)
    .then(lesson =>{
        if(lesson){
            res.status(200).json(lesson)
        }
        else{
            res.status(404).json({ message: "cant find specific id"})
        }
  
    })
    .catch(error =>{
        res.status(500).json({ message: "function didnt work"})
    })
})

router.delete('/:id', (req,res)=>{
    const {id} = req.params
    Lessons.remove(id)
    .then(count =>{
        if(count > 0){
            res.status(200).json({ message: "successfully deleted the lesson."})
        }
        else{
            res.status(404).json({ message: "cant find the id"})
        }
    })
    .catch(error =>{
        res.status(500).json({ message:" remove function doesnt work"})
    })
})

router.patch('/:id', (req,res) =>{
    const {id} = req.params
    const changes = req.body
    Lessons.update(id, changes)
    .then(lesson=> {
        if(lesson){
            res.status(200).json(lesson)
        }else {
            res.status(404).json({ message:" cant find the id"})
        }
    })
    .catch(error =>{
        res.status(500).json({ message:" functiın doesnt work"})

    })

router.post("/:id/messages", (req,res) =>{
    const {id} = req.params;
    const msg = req.body;
    if(!msg.lesson_id){
      msg["lesson_id"] = parseInt(id,10)
    }
    Lessons.findById(id)
    .then(lesson =>{
        if(!lesson){
            res.status(404).json({ message:" id cant be found"})
        }   
        if(!msg.sender || !msg.text){
            res
            .status(400).
            json({ message: "must provide sender end text "})
        }
        
        Lessons.addMessage(msg, id)
        .then(message =>{
            if(message){
                res.status(200).json(message)
            }
        })
        .catch(error =>{
            res.status(500).json({ message:" function doesnt work"})
        })
    })
    .catch(error =>{
        res.status(500).json({ message:"function doesnt work 2"})
    })

})
})
router.get('/:id/messages', (req,res)=>{
    const {id} = req.params;
    Lessons.findLessonMessages(id)
    .then(Lessons =>{
        res.status(200).json({Lessons})
    }) 
    .catch(error =>{
        res.status(500).json({ message:" error retrieving messages"});
        })
});
module.exports = router;