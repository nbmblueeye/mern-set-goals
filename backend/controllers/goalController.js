const asyncHandler = require('express-async-handler')
const Goal = require('../models/Goal');

const getGoals = asyncHandler( async(req, res) =>{
    let goals = await Goal.find();
    if(goals.length > 0){
        res.status(200).json(goals);
    }
    res.status(200).json({message: "No goal found"});
})

const getGoal = asyncHandler( async(req, res) =>{
    let goal = await Goal.findById(req.params.goalId);
    if(goal && Object.keys(goal).length > 0){
        res.status(200).json(goal);
    }
    res.status(200).json({message: "No goal found", id: req.params.goalId});
})

const addGoal = asyncHandler( async(req, res) =>{
    let { title, description } = req.body;
    if( !title || !description){
        res.status(400)
        throw new Error('Please provide a title and description');
    }
    let goal = await Goal.create({
        user: req.user,
        title: title,
        description: description
    });
    res.status(201).json(goal);
})

const updateGoal = asyncHandler( async(req, res) =>{
    let isGoalExist = await Goal.findById(req.params.goalId);
    if( !isGoalExist){
        res.status(400)
        throw new Error('Goal does not exist');
    }
    let { title, description } = req.body;
    if( !title || !description){
        res.status(400)
        throw new Error('Please provide a title and description');
    }
    let updatedGoal = await Goal.findByIdAndUpdate(req.params.goalId,{title: title, description: description},{new: true});
    res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler( async(req, res) =>{
    let isGoalExist = await Goal.findById(req.params.goalId);
    if( !isGoalExist){
        res.status(400)
        throw new Error('Goal does not exist');
    }

    let deleteGoal = await Goal.findByIdAndDelete(req.params.goalId);
    res.status(200).json(deleteGoal);
});

module.exports = {
    getGoals,
    getGoal,
    addGoal,
    updateGoal,
    deleteGoal
}