import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import AuthLayout from "../components/AuthLayout";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    }
  });

  const errorMessage = mutation.error?.response?.data?.message;

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
    <AuthLayout
      eyebrow="Welcome Back"
      title="Pick up your notes where you left them."
      description="Log in and continue writing."
      footer={
        <p>
          New here?{" "}
          <Link to="/register" className="font-semibold text-[var(--accent-deep)]">
            Create an account
          </Link>
        </p>
      }
    >
      <div className="space-y-2">
        <p className="section-kicker">Sign In</p>
        <h2 className="title-md">Log in to your workspace</h2>
      </div>

      {errorMessage ? <div className="status-error">{errorMessage}</div> : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="field-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            autoComplete="email"
            placeholder="you@example.com"
            onChange={handleChange}
            className="field-input"
          />
        </div>

        <div>
          <label htmlFor="password" className="field-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            autoComplete="current-password"
            placeholder="Enter your password"
            onChange={handleChange}
            className="field-input"
          />
        </div>

        <button className="btn btn-primary w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Logging in..." : "Log In"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Login;
