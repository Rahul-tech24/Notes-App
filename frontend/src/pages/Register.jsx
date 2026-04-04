import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import AuthLayout from "../components/AuthLayout";

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
      eyebrow="Start Fresh"
      title="Create a quiet place for everything worth remembering."
      description="Create your account and start writing."
      footer={
        <p>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-[var(--accent-deep)]">
            Log in instead
          </Link>
        </p>
      }
    >
      <div className="space-y-2">
        <p className="section-kicker">Create Account</p>
        <h2 className="title-md">Open your knowledge workspace</h2>
      </div>

      {errorMessage ? <div className="status-error">{errorMessage}</div> : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="field-label">
            Username
          </label>
          <input
            id="username"
            name="username"
            value={form.username}
            autoComplete="username"
            placeholder="Choose a display name"
            onChange={handleChange}
            className="field-input"
          />
        </div>

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
            autoComplete="new-password"
            placeholder="At least 6 characters"
            onChange={handleChange}
            className="field-input"
          />
        </div>

        <button className="btn btn-primary w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Register;
