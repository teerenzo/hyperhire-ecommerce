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

const Register = () => {
  useEffect(() => {
    // isPublic();
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    e.preventDefault();

    if(email === "" || password === ""){
      toast.error("Please fill all the fields");
      return;
    }
    setIsLoading(true);

    const data = {
      email,
      password,
      name
    }
    const HOST: string = import.meta.env.VITE_BACKEND_URL;

    const response = await fetch(`${HOST}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    if (response.status === 200) {
      toast.success("Registration Successfull");
      setIsLoading(false);
      window.location.replace("/login");
    } else {
      toast.error(result.message);
      setIsLoading(false);
    }  

  };

  return (
    <div className="flex items-center h-screen w-full">
            <ToastContainer />
      <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
        <span className="block w-full text-xl uppercase font-bold mb-4">
          Register
        </span>
        <form className="mb-4" action="#" method="post">
        <div className="mb-4 md:w-full">
            <label className="block text-xs mb-1">Names</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded p-2 outline-none focus:shadow-outline"
              type="text"
              name="name"
              placeholder="Names"
            />
          </div>
          <div className="mb-4 md:w-full">
            <label className="block text-xs mb-1">Email</label>
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
          <div className="mb-6 md:w-full">
            <label className="block text-xs mb-1">Comfirm Password</label>
            <input
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
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
          <button onClick={handleRegister} className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">
            Register
          </button>
            )
          }
        </form>
        <a className="text-blue-700 text-center text-sm" href="/login">
          Already have an account? Login
        </a>
      </div>
    </div>
  );
};

export default Register;
