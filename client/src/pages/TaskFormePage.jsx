import { useForm } from 'react-hook-form'
import { useTask } from '../context/TasksContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'


dayjs.extend(utc)
function TaskFormePage() {
  
  const  {register,handleSubmit,setValue}= useForm()
  const {tasks,createTask,getTask,updateTask}=useTask()
  const navigate=useNavigate()
  const params=useParams()
  useEffect(()=>{
    async function loadTask() {
      if(params.id){
        const task=await getTask(params.id)
        console.log(task);
        setValue('title',task.title)
        setValue('description',task.description)
        setValue('date',dayjs.utc(task.date).format('YYYY-MM-DD'))
      }
    }
    loadTask()
  },[])
  const onSubmit=handleSubmit((data)=>{
    const dataValid={
      ...data,
      date:data.date?dayjs.utc(data.date).format():dayjs.utc().format()
    }

    if (params.id) {
      updateTask(params.id,dataValid)
    }else{
      createTask(dataValid);
    }
    navigate('/tasks')
  })
  return (
   <div className='flex items-center justify-center h-[calc(100vh-100px)]'>
<div className=' bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">title</label>
        <input type="text" placeholder="title" 
        {...register('title')}
        autoFocus
        className=' w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        />
        <label htmlFor="description">description</label>
        <textarea  rows="3" placeholder="description"
         {...register('description')}
         className=' w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        ></textarea>
        <label htmlFor="date">date</label>
        <input type="date" {...register('date')} 
        className=' w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        />
        <button className=' bg-indigo-500 px-3 py-2 rounded-md'>
          Save
        </button>
      </form>
    </div>
   </div>
  )
}

export default TaskFormePage