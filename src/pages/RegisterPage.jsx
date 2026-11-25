import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Field from "../components/forms/Field";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../components/common/Toast";

export default function RegisterPage() {
  const { signUp } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [f, setF] = useState({ name: "", email: "", password: "", confirm: "", agree: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    if (f.name.trim().length < 2) err.name = "Please enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) err.email = "Enter a valid email address";
    if (f.password.length < 8) err.password = "At least 8 characters";
    if (f.confirm !== f.password) err.confirm = "Passwords do not match";
    if (!f.agree) err.agree = "Please accept the terms";
    setErrors(err);
    if (Object.keys(err).length) return;
    setLoading(true);
    await signUp({ name: f.name.trim(), email: f.email });
    toast("Account created. Let's plan!");
    navigate("/", { replace: true });
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-brand-navy">Create account</h2>
        <p className="mt-1 text-brand-navy">It only takes a minute</p>
      </div>
      <Field label="Full Name" error={errors.name}><input className="input" placeholder="Mohamed Ali" value={f.name} onChange={set("name")} autoComplete="name" /></Field>
      <Field label="Email" error={errors.email}><input type="email" className="input" placeholder="you@email.com" value={f.email} onChange={set("email")} autoComplete="email" /></Field>
      <Field label="Password" error={errors.password}><input type="password" className="input" placeholder="at least 8 characters" value={f.password} onChange={set("password")} autoComplete="new-password" /></Field>
      <Field label="Confirm" error={errors.confirm}><input type="password" className="input" placeholder="repeat password" value={f.confirm} onChange={set("confirm")} autoComplete="new-password" /></Field>
      <div>
        <label className="flex items-center gap-3"><input type="checkbox" checked={f.agree} onChange={set("agree")} className="h-5 w-5" /> I agree to the Terms and privacy policy</label>
        {errors.agree && <span className="text-sm text-red-600" role="alert">{errors.agree}</span>}
      </div>
      <button disabled={loading} className="btn-primary w-full !rounded-full !py-4 text-lg">{loading ? "Creating…" : "Create account"}</button>
      <p className="text-center">Already have an account? <Link to="/login" className="text-brand-blue underline">Login</Link></p>
    </form>
  );
}
