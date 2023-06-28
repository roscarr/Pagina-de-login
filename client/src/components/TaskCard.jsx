import { Link } from "react-router-dom"
import { useTask } from "../context/TasksContext"


function TaskCard({id,title,description,date}) {
    const {deleteTask}=useTask()
  return (
    <div className=" bg-zinc-800 max-w-md w-full p-10 rounded-md">
   <header className=" flex justify-between">
   <h1 className=" text-2xl font-bold">{title}</h1>
    <div className=" flex gap-2  items-center">
        <Link to={`/tasks/${id}`}
        className=" bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >Edit</Link >
        <button onClick={()=>deleteTask(id)}
        className=" bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >Delete</button>
    </div>
   </header>
    <p className=" text-slate-300">{description}</p>
    <p className=" text-slate-300">{date}</p>
 </div>
  )
}

export default TaskCard