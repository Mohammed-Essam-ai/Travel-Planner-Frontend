import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import Field from "../components/forms/Field";
import { useToast } from "../components/common/Toast";

export default function ProfilePage() {
  const { user, update, signOut } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [prefs, setPrefs] = useState(user.preferences);
  const [error, setError] = useState("");

  const save = async (e) => {
    e.preventDefault();
    if (name.trim().length < 2) return setError("Name is too short");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email");
    setError(""); await update({ name: name.trim(), email, preferences: prefs }); toast("Settings saved");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-indigo text-2xl font-bold text-white">{user.name[0]}</div>
        <div><h1 className="text-3xl font-bold text-brand-ink">Settings</h1><p className="text-slate-500">Manage your profile and preferences.</p></div>
      </header>
      <form onSubmit={save} noValidate className="space-y-5 rounded-3xl bg-white p-6 shadow-card">
        <Field label="Full name"><input className="input" value={name} onChange={(e) => setName(e.target.value)} /></Field>
        <Field label="Email"><input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
        <Field label="Favorite trip type"><select className="input" value={prefs.tripType} onChange={(e) => setPrefs({ ...prefs, tripType: e.target.value })}>{["Business", "Couple", "Solo", "Family"].map((t) => <option key={t}>{t}</option>)}</select></Field>
        <Field label="Currency"><select className="input" value={prefs.currency} onChange={(e) => setPrefs({ ...prefs, currency: e.target.value })}>{["USD", "EUR", "EGP"].map((t) => <option key={t}>{t}</option>)}</select></Field>
        <label className="flex min-h-[44px] items-center gap-3"><input type="checkbox" className="h-5 w-5" checked={prefs.notifications} onChange={(e) => setPrefs({ ...prefs, notifications: e.target.checked })} /> Email me trip recommendations</label>
        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
        <div className="flex flex-col gap-3 sm:flex-row"><button className="btn-primary flex-1">Save changes</button>
          <button type="button" onClick={() => { signOut(); navigate("/login"); }} className="btn-ghost"><LogOut size={16} /> Log out</button></div>
      </form>
    </div>
  );
}
