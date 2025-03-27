declare global {
    interface Window {
      gtag: (...args: any[]) => void;
    }
  }
  
const GA_TRACKING_ID = process.env.GA_TRACKING_ID!;

// Track pageviews
export const pageview = (url: string) => {
    console.log('[GA Pageview Triggered]', url); // ✅ this should log
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  };
  

// Track specific events
export const event = ({ action, category, label, value }: {
    action: string;
    category: string;
    label: string;
    value: number;
}) => {
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value,
    });
};
