/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ui/card.tsx
import React from "react";
export const Card = ({ children, className = "" }: any) => (
  <div className={`border rounded-lg p-4 shadow ${className}`}>{children}</div>
);

// components/ui/badge.tsx
export const Badge = ({ children }: any) => (
  <span className="px-2 py-1 bg-gray-200 text-sm rounded">{children}</span>
);

// components/ui/separator.tsx
export const Separator = ({ className = "" }: any) => (
  <hr className={`my-4 border-t border-gray-300 ${className}`} />
);

// lib/utils.ts
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
