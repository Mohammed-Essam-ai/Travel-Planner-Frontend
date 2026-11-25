export const read = (key, fallback) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } };
export const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore quota errors */ } };
export const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms));
