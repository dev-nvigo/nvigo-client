"use client";

import Link, { LinkProps } from "next/link";
import { event } from "@/lib/gtag";

interface TrackerLinkProps extends LinkProps, React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: React.ReactNode;
    className?: string;
    action: string;
    category: string;
    label: string;
    value?: number;
};



const TrackerLink: React.FC<TrackerLinkProps> = ({ children, href, action, category, label, value = 1, className = "", ...props }) => {
    return (
        <Link
            {...props}
            href={href}
            className={className}
            onClick={() => event({
                action: action,
                category: category,
                label: label,
                value: value,
            })}
        >
            {children}
        </Link>
    );
};

export default TrackerLink;
