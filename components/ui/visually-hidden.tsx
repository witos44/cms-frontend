// app/components/ui/visually-hidden.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export const VisuallyHidden = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("absolute w-px h-px overflow-hidden whitespace-nowrap border-0", className)}
    {...props}
  />
));
VisuallyHidden.displayName = "VisuallyHidden";