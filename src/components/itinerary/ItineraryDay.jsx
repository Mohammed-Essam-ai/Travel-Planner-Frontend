import { useState } from "react";
import { Plus, X } from "lucide-react";

const periods = ["Morning", "Afternoon", "Evening"];

export default function ItineraryDay({ day, onAdd, onRemove }) {
  const [text, setText] = useState("");
  const [period, setPeriod] = useState("Morning");
  const submit = (e) => { e.preventDefault(); if (!text.trim()) return; onAdd(day.day, { period, text: text.trim() }); setText(""); };
  return (
    <section className="rounded-2xl border border-slate-100 p-4">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-brand-pale px-4 py-1 text-lg font-medium">Day {day.day}</span>
        <h3 className="text-xl font-bold">{day.title}</h3>
      </div>
      <ul className="space-y-2 border-l-2 border-brand-blue/40 pl-4">
        {day.activities.length === 0 && <li className="text-sm text-slate-400">No activities yet.</li>}
        {day.activities.map((a) => (
          <li key={a.id} className="flex items-start justify-between gap-2">
            <span><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-amber-600" /><strong className="font-medium">{a.period}</strong> — {a.text}</span>
            <button onClick={() => onRemove(day.day, a.id)} aria-label="Remove activity" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-red-50 hover:text-red-600"><X size={16} /></button>
          </li>
        ))}
      </ul>
      <form onSubmit={submit} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <select value={period} onChange={(e) => setPeriod(e.target.value)} className="min-h-[44px] rounded-xl border border-slate-200 px-3">{periods.map((p) => <option key={p}>{p}</option>)}</select>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add an activity" className="min-h-[44px] flex-1 rounded-xl border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-brand-blue" />
        <button className="btn-primary"><Plus size={16} /> Add</button>
      </form>
    </section>
  );
}
