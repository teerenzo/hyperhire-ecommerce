import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import axios from "axios";
// import isPublic from "../utils/isPublic";
// import { ToastContainer, toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/features/actions/auth";

const Login = () => {
  useEffect(() => {
    // isPublic();
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handlelogin = async (e: any) => {
    e.preventDefault();
    e.preventDefault();

    if(email === "" || password === ""){
      toast.error("Please fill all the fields");
      return;
    }
    setIsLoading(true);

    dispatch(login({email, password})).then((res) => {
      console.log(res);
      if(res&&res.payload&&res.error){
    
        toast.error("wrong credentials");
        setIsLoading(false);
      }else{

        toast.success("Login Successfull");
        localStorage.setItem("user", JSON.stringify(res.payload.data));
        
        setIsLoading(false);
        window.location.replace("/checkout");

  
      }
    }).catch((err:any) => {
    setIsLoading(false);
      toast.error("Error Occured");
    });

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
        <a className="text-blue-700 text-center text-sm" href="/register">
         You don't have an account? Register
        </a>
      </div>
    </div>
  );
};

export default Login;
