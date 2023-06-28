import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function RegiterPage() {
  
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigation = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigation("/tasks");
    }
  }, [isAuthenticated]);
  const onSubmit = handleSubmit((values) => {
    signup(values);
  });

  return (
  <div className=" flex justify-center items-center h-[calc(100vh-100px)]">
   
      <div className=" bg-zinc-800 max-w-md p-10 rounded-md">
      {registerErrors.map((error, i) => (
        <div className=" bg-red-500 p-2 text-white" key={i}>
          {error}
        </div>
      ))}
      <h1 className=" text-3xl font-bold my-2">Register</h1>
      <form  onSubmit={onSubmit}  >
         
        <input
          type="text"
          {...register("username", { required: true })}
          placeholder="Username"
          className=" w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        {errors.username && (
          <p className=" text-red-500">username is required</p>
        )}
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
        >Register</button>
      </form>
      <p className=" flex gap-2 justify-between">Already have a account?
       <Link to='/login' className=" text-sky-500">login</Link>
      </p>
    </div>
  </div>
  );
}

export default RegiterPage;
