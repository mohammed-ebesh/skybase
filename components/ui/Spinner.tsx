import { Loader2 } from "lucide-react";

export function Spinner({ className }: { className?: string }) {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Loader2
        className={`animate-spin text-blue-600 ${className}`}
        size={48} // Increased size for better visibility
        strokeWidth={3} // Slightly bolder stroke for visibility
      />
    </div>
  );
}
