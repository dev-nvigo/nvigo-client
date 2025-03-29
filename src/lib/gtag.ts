declare global {
    interface Window {
        gtag: (...args: unknown[]) => void;
    }
}

// Track pageviews
export const pageview = (url: string) => {
    console.log("Logged", url);

    if (typeof window === 'undefined' || !window.gtag) return;
    console.log("Registered");

    window.gtag('event', 'page_view', {
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
