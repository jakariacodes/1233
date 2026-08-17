import { useEffect } from 'react';
import { useLocation } from '@tanstack/react-router';

// Add your Google Analytics 4 Measurement ID here
const GA_MEASUREMENT_ID = 'G-JMB75PY41D';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    // Check if scripts already exist to avoid duplication
    const scripts = Array.from(document.head.getElementsByTagName('script'));
    const hasScript1 = scripts.some(s => s.src?.includes('googletagmanager.com/gtag/js'));
    
    if (!hasScript1) {
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script1);
    }

    const hasScript2 = scripts.some(s => s.text?.includes('window.dataLayer'));
    if (!hasScript2) {
      const script2 = document.createElement('script');
      script2.text = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', {
          page_path: window.location.pathname,
        });
      `;
      document.head.appendChild(script2);
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
};

// Helper function to track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};