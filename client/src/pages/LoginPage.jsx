import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {register,handleSubmit,formState:{errors}}=useForm()
  const {signin,errors:signinErros,isAuthenticated}=useAuth()
  const onSubmit=handleSubmit(data=>{signin(data)})
  const navigate=useNavigate()
  useEffect(()=>{
    if (isAuthenticated) navigate('/tasks')
  },[isAuthenticated])
  return (
    <div className=" flex items-center justify-center h-[calc(100vh-100px)]">
     <div className=" bg-zinc-800 max-w-md p-10 rounded-md w-full">
     {signinErros.map((error, i) => (
        <div className=" bg-red-500 p-2 text-white text-center my-2" key={i}>
          {error}
        </div>
      ))}
      <h1 className=" text-3xl font-bold ">Login</h1>

     <form
        onSubmit={onSubmit}
        
      >
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className=" w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        {errors.email && <p className=" text-red-500">email is required</p>}
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder=" Password"
          className=" w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        {errors.password && (
          <p className=" text-red-500">password is required</p>
        )}
        <button type="submit"
          className=" bg-sky-500 text-white px-4 py-2 rounded-md my-2"
        >Login</button>
      </form>
      <p className=" flex gap-2 justify-between">Don't have a account?
       <Link to='/register' className=" text-sky-500">Sign up</Link>
      </p>
     </div>
    </div>
  );
}

export default LoginPage;
