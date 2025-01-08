import React from "react";

const Register = () => {
  return (
    <div className="h-auto bg-zinc-900 px-15 py-8 flex items-center justify-center w-full overflow-scroll ">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6 mt-60">
        <p className="text-zinc-200 text-xl">Register User</p>
        <div className="mt-10">
          <label htmlFor="" className="text-zinc-400 ">
            First Name :
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="first name"
            name="firstName"
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400 ">
            Last Name :
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="last name"
            name="lastName"
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400 ">
            UserName :
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="username"
            name="userName"
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400 ">
            Email :
          </label>
          <input
            type="email"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="email"
            name="Email"
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Password :
          </label>
          <input
            type="password"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="password"
            name="Password"
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Confirm Password :
          </label>
          <input
            type="password"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="confirm password"
            name="ConfirmPassword"
            required
          />
        </div>
        <button className="w-full bg-blue-400 mt-5 text-white font-semibold rounded hover:text-zinc-700 py-2 hover:bg-white">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
