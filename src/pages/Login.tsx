import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/features/actions/auth";

const Login = () => {
  useEffect(() => {
    // isPublic();
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlelogin = async (e: any) => {
    e.preventDefault();
    e.preventDefault();

    if(email === "" || password === ""){
      toast.error("Please fill all the fields");
      return;
    }
    setIsLoading(true);

    const data = {
      email,
      password
    }
    const HOST: string = import.meta.env.VITE_BACKEND_URL;

    const response = await fetch(`${HOST}/auth/login`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(response);
      if (response.status === 200) {
          console.log(result);
      localStorage.setItem("token", result.token);
      toast.success("Login Successfull");
      localStorage.setItem("user", JSON.stringify(result.data));
      
      setIsLoading(false);
      navigate('/');

      } else {
           
        toast.error("wrong credentials");
        setIsLoading(false);
     
      }

   
  };

  return (
    <div className="flex items-center h-screen w-full">
            <ToastContainer />
      <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
        <span className="block w-full text-xl uppercase font-bold mb-4">
          Login
        </span>
        <form className="mb-4" action="#" method="post">
          <div className="mb-4 md:w-full">
            <label className="block text-xs mb-1">Username or Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded p-2 outline-none focus:shadow-outline"
              type="email"
              name="email"
              id="email"
              placeholder="Username or Email"
            />
          </div>
          <div className="mb-6 md:w-full">
            <label className="block text-xs mb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded p-2 outline-none focus:shadow-outline"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>
          {
            isLoading ? (
              <button className="bg-blue-200">Loading...</button>
            ) : (
          <button onClick={handlelogin} className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">
            Login
          </button>
            )
          }
        </form>
        <Link to="/register" className="text-blue-700 text-center text-sm">
        <b className="text-blue-700 text-center text-sm">
         You don't have an account? Register
        </b>
        </Link>
      </div>
    </div>
  );
};

export default Login;
