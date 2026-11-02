// Browsers can throw on any access to localStorage/sessionStorage (blocked cookies,
// some in-app webviews, storage quota). These helpers never throw.

type StorageKind = "localStorage" | "sessionStorage";

const memoryFallback = new Map<string, string>();

const getStore = (kind: StorageKind): Storage | null => {
  if (typeof window === "undefined") return null;
  try {
    return window[kind];
  } catch {
    return null;
  }
};

export const safeGetItem = (key: string, kind: StorageKind = "localStorage"): string | null => {
  try {
    const store = getStore(kind);
    if (store) return store.getItem(key);
  } catch {
    // fall through to the in-memory copy
  }
  return memoryFallback.get(`${kind}:${key}`) ?? null;
};

export const safeSetItem = (key: string, value: string, kind: StorageKind = "localStorage") => {
  memoryFallback.set(`${kind}:${key}`, value);
  try {
    getStore(kind)?.setItem(key, value);
  } catch {
    // ignore: the in-memory copy keeps this page view consistent
  }
};

export const safeRemoveItem = (key: string, kind: StorageKind = "localStorage") => {
  memoryFallback.delete(`${kind}:${key}`);
  try {
    getStore(kind)?.removeItem(key);
  } catch {
    // ignore
  }
};

/** A Storage-like adapter for libraries (e.g. supabase-js auth) that expect one. */
export const safeLocalStorageAdapter = {
  getItem: (key: string) => safeGetItem(key),
  setItem: (key: string, value: string) => safeSetItem(key, value),
  removeItem: (key: string) => safeRemoveItem(key),
};
