export default function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-lg font-medium text-brand-navy">{label}</span>
      {children}
      {error && <span className="mt-1 block text-sm text-red-600" role="alert">{error}</span>}
    </label>
  );
}
