import Task from '../models/task.models.js'

export const getTasks=async(req,res)=>{
    try {
        const tasks= await Task.find({user:req.user.id}).populate('user')
        return res.json(tasks)
    } catch (error) {
       return res.status(404).json({message:'Something went wrong'})   
    }
}
export const getTask=async(req,res)=>{
   try {
     const task= await Task.findById(req.params.id).populate('user')
      if(!task)return res.status(404).json({message:'Task no found'})
      res.json(task)
   } catch (error) {
    return res.status(404).json({message:'Task no Found'})
   }
}
export const createTask=async(req,res)=>{
    try {
        const {title,description,date}=req.body 
        const newTask=new Task({
            title,
            description,
            date,
            user:req.user.id
        })
        const saveTask= await newTask.save()
        res.json(saveTask)
    } catch (error) {
        return res.status(404).json({message:'Something went wrong'})
    }
}
export const updateTask=async(req,res)=>{
    try {
        const task= await Task.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!task)return res.status(404).json({message:'task no found'})
        res.json(task)
    } catch (error) {
        return res.status(404).json({message:'task no found'})
    }
}
export const deleteTask=async(req,res)=>{
    try {
        const task= await Task.findByIdAndDelete(req.params.id)
        if(!task)return res.status(404).json({message:'task no found'})
        res.sendStatus(204)
    } catch (error) {
        return res.status(404).json({message:'Task no found'})
    }
}