import { useEffect } from "react";

type CalNamespace = {
  (...args: unknown[]): void;
  q?: unknown[][];
};

type CalApi = {
  (...args: unknown[]): void;
  config?: {
    forwardQueryParams?: boolean;
  };
  loaded?: boolean;
  ns?: Record<string, CalNamespace>;
  q?: unknown[][];
};

type CalWindow = Window & {
  Cal?: CalApi;
};

const uiConfig = {
  cssVarsPerTheme: { light: { "cal-brand": "#aeec01" } },
  hideEventTypeDetails: false,
  layout: "month_view",
};

function getCalApi() {
  const calWindow = window as CalWindow;
  const existingCal = calWindow.Cal;

  if (existingCal) {
    return existingCal;
  }

  const cal: CalApi = ((...args: unknown[]) => {
    const push = (target: { q?: unknown[][] }, item: unknown[]) => {
      target.q = target.q || [];
      target.q.push(item);
    };
    const [command, namespace] = args;

    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      const script = document.createElement("script");
      script.src = "https://app.cal.com/embed/embed.js";
      document.head.appendChild(script);
      cal.loaded = true;
    }

    if (command === "init") {
      const api: CalNamespace = (...namespaceArgs: unknown[]) => {
        push(api, namespaceArgs);
      };
      cal.ns = cal.ns || {};
      if (typeof namespace === "string") {
        cal.ns[namespace] = cal.ns[namespace] || api;
        push(cal.ns[namespace], args);
        push(cal, ["initNamespace", namespace]);
      } else {
        push(cal, args);
      }
      return;
    }

    push(cal, args);
  }) as CalApi;

  calWindow.Cal = cal;
  return cal;
}

export function useCalEmbed(namespace: string, namespaceConfig: Record<string, unknown>) {
  useEffect(() => {
    const cal = getCalApi();
    cal("init", "secret", { origin: "https://app.cal.com" });
    cal.config = cal.config || {};
    cal.config.forwardQueryParams = true;
    cal.ns?.secret?.(namespace, namespaceConfig);
    cal.ns?.secret?.("ui", uiConfig);
  }, []);
}
