import { createContext, useCallback, useContext, useState } from "react";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

const ToastContext = createContext(() => {});
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const toast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);
  const icons = { success: CheckCircle2, error: AlertCircle, info: Info };
  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-4 left-1/2 z-[100] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 flex-col gap-2 sm:left-auto sm:right-4 sm:translate-x-0" role="status" aria-live="polite">
        {toasts.map((t) => { const Icon = icons[t.type]; return (
          <div key={t.id} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-soft ${t.type === "error" ? "bg-red-600" : t.type === "info" ? "bg-brand-blue" : "bg-brand-indigo"}`}>
            <Icon size={18} /> {t.message}
          </div>); })}
      </div>
    </ToastContext.Provider>
  );
}
