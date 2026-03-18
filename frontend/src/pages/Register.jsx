import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {

      localStorage.setItem("token", data.token);

      navigate("/dashboard");

    }
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    mutation.mutate(form);

};
    

  return (


    <div className="flex justify-center items-center h-screen">

      {/* so are you saying that this is not a form of a mobile apiications? I mean, it is a form but it is not a // */}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-md rounded w-96"
      >

        <h2 className="text-xl mb-4">Register</h2>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <button className="bg-black text-white w-full p-2">
          Register
        </button>

      </form>

    </div>

  );
}

export default Register;