import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

// Cloudflare Turnstile bot check for the public forms. Renders nothing until
// VITE_TURNSTILE_SITE_KEY is set; the server only enforces it once
// TURNSTILE_SECRET_KEY is set, so both halves can be switched on independently.
// Public site key (safe in code by design).
const SITE_KEY =
  (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined) || "0x4AAAAAAFxMYExDYYJfQNmC";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const TOKEN_WAIT_MS = 10_000;

export const isTurnstileEnabled = Boolean(SITE_KEY);

interface TurnstileApi {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<TurnstileApi> | null = null;

const loadTurnstile = () => {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!scriptPromise) {
    scriptPromise = new Promise<TurnstileApi>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile missing")));
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error("Turnstile failed to load"));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
};

export interface TurnstileHandle {
  /** The current token, waiting briefly for one if the check is still running. */
  getToken: () => Promise<string | null>;
  /** Tokens are single-use: reset after every submission to get a fresh one. */
  reset: () => void;
}

interface TurnstileWidgetProps {
  action: string;
  className?: string;
}

const TurnstileWidget = forwardRef<TurnstileHandle, TurnstileWidgetProps>(({ action, className }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const tokenRef = useRef<string | null>(null);
  const waitersRef = useRef<Array<(token: string | null) => void>>([]);

  // Set when Cloudflare's script can't load or the widget errors: getToken then answers
  // immediately instead of making the visitor wait for the timeout.
  const failedRef = useRef(false);

  const fail = () => {
    failedRef.current = true;
    tokenRef.current = null;
    const waiters = waitersRef.current;
    waitersRef.current = [];
    waiters.forEach((resolve) => resolve(null));
  };

  const settle = (token: string | null) => {
    tokenRef.current = token;
    if (!token) return;
    failedRef.current = false;
    const waiters = waitersRef.current;
    waitersRef.current = [];
    waiters.forEach((resolve) => resolve(token));
  };

  useImperativeHandle(ref, () => ({
    getToken: () => {
      if (!SITE_KEY) return Promise.resolve(null);
      if (tokenRef.current) return Promise.resolve(tokenRef.current);
      if (failedRef.current) return Promise.resolve(null);
      return new Promise((resolve) => {
        waitersRef.current.push(resolve);
        setTimeout(() => {
          waitersRef.current = waitersRef.current.filter((waiter) => waiter !== resolve);
          resolve(tokenRef.current);
        }, TOKEN_WAIT_MS);
      });
    },
    reset: () => {
      tokenRef.current = null;
      if (widgetIdRef.current && window.turnstile) window.turnstile.reset(widgetIdRef.current);
    },
  }));

  useEffect(() => {
    if (!SITE_KEY || !containerRef.current) return;
    let cancelled = false;

    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !containerRef.current) return;
        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          action,
          size: "flexible",
          appearance: "interaction-only",
          callback: (token: string) => settle(token),
          "expired-callback": () => settle(null),
          "error-callback": () => fail(),
        });
      })
      .catch(() => fail());

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    };
  }, [action]);

  if (!SITE_KEY) return null;
  return <div ref={containerRef} className={className} />;
});

TurnstileWidget.displayName = "TurnstileWidget";

export default TurnstileWidget;
