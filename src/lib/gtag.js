export const GA_MEASUREMENT_ID = 'G-QW9ZXJVJHS';

// Stubs (Funções de preenchimento) para o dataLayer
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Rastreia Pageviews em SPAs
export const pageview = (url: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};
