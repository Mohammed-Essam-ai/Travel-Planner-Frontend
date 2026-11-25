import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Field from "../components/forms/Field";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../components/common/Toast";

export default function LoginPage() {
  const { signIn } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const loc = useLocation();
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email address";
    if (form.password.length < 6) err.password = "Password must be at least 6 characters";
    setErrors(err);
    if (Object.keys(err).length) return;
    setLoading(true);
    try { await signIn(form); toast("Welcome back!"); navigate(loc.state?.from || "/", { replace: true }); }
    catch (ex) { setErrors({ form: ex.message }); }
    setLoading(false);
  };
  const social = (n) => toast(`${n} sign-in is not connected in this demo`, "info");

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-brand-navy">Welcome Back</h2>
        <p className="mt-1 text-brand-navy">login to continue planning</p>
      </div>
      <Field label="Email" error={errors.email}><input type="email" className="input" placeholder="you@email.com" value={form.email} onChange={set("email")} autoComplete="email" /></Field>
      <Field label="Password" error={errors.password}><input type="password" className="input" placeholder="Enter your password" value={form.password} onChange={set("password")} autoComplete="current-password" /></Field>
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.remember} onChange={set("remember")} className="h-5 w-5" /> Remember me</label>
        <button type="button" onClick={() => toast("Password reset link sent (demo)", "info")} className="text-red-600 underline">Forgot password?</button>
      </div>
      {errors.form && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{errors.form}</p>}
      <button disabled={loading} className="btn-primary w-full !rounded-full !py-4 text-lg">{loading ? "Signing in…" : "Login"}</button>
      <p className="text-center text-lg">or continue with</p>
      <div className="grid grid-cols-2 gap-4">
        {["Google", "Apple"].map((n) => <button type="button" key={n} onClick={() => social(n)} className="min-h-[52px] rounded-full bg-white text-lg font-bold text-brand-side shadow-md hover:bg-slate-50">{n}</button>)}
      </div>
      <p className="text-center">New to TripMate? <Link to="/register" className="text-brand-blue underline">Create account</Link></p>
      <p className="text-center text-xs text-slate-400">Demo: you@email.com / password123</p>
    </form>
  );
}
