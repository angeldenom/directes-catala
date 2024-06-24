import * as React from "react"

import { cn } from "@/lib/utils"

const Card2 = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card2.displayName = "Card"

const CardHeader2 = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-0.5 p-3", className)}
    {...props}
  />
))
CardHeader2.displayName = "CardHeader"

const CardTitle2 = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-base font-semibold leading-snug tracking-tight text-ellipsis line-clamp-2",
      className
    )}
    {...props}
  />
))
CardTitle2.displayName = "CardTitle"

const CardDescription2 = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription2.displayName = "CardDescription"

const CardContent2 = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent2.displayName = "CardContent"

const CardFooter2 = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter2.displayName = "CardFooter"

const CardImageWithOverlay = React.forwardRef<
  HTMLDivElement,
  { src: string; alt: string; viewers: number; className?: string }
>(({ src, alt, viewers, className }, ref) => (
  <div ref={ref} className={cn("relative", className)}>
    <img src={src} alt={alt} className="w-full h-auto" />
    <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-sm px-1.5 py-0.5 rounded-sm">
      {viewers === 1 ? "1 espectador" : `${viewers} espectadors`}
    </div>
    <div className="absolute top-2 left-2 bg-red-600 text-white text-sm px-1.5 py-0.5 rounded-sm">
      DIRECTE
    </div>
  </div>
))
CardImageWithOverlay.displayName = "CardImageWithOverlay"

export { Card2, CardHeader2, CardFooter2, CardTitle2, CardDescription2, CardContent2, CardImageWithOverlay}
