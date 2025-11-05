import { ReactNode } from "react";

interface StatCardProps {
  children: ReactNode;
  className?: string;
}

export default function StatCard({ children, className = "" }: StatCardProps) {
  return (
    <div className={`stat-card ${className}`}>
      {children}
    </div>
  );
}
