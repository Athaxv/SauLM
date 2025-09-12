"use client"
import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Props for the AuthForm component.
 */
interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The source URL or base64 string for the company logo.
   */
  logoSrc: string;
  /**
   * Alt text for the company logo for accessibility.
   */
  logoAlt?: string;
  /**
   * The main title of the form.
   */
  title: string;
  /**
   * A short description or subtitle displayed below the title.
   */
  description?: string;
  /**
   * The primary call-to-action button (e.g., social login).
   */
  primaryAction: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  };
  /**
   * An array of secondary action buttons.
   */
  secondaryActions?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  }[];
  /**
   * An optional action for skipping the login process.
   */
  skipAction?: {
    label: string;
    onClick: () => void;
  };
  /**
   * Custom content to be displayed in the footer area.
   */
  footerContent?: React.ReactNode;
}

/**
 * A reusable authentication form component built with shadcn/ui.
 * It supports various providers, a customizable header, and animations.
 */
const AuthForm = React.forwardRef<HTMLDivElement, AuthFormProps>(
  (
    {
      className,
      logoSrc,
      logoAlt = "Company Logo",
      title,
      description,
      primaryAction,
      secondaryActions,
      skipAction,
      footerContent,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          "relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-orange-50 via-rose-50 to-pink-100 flex items-center justify-center px-4 py-10",
          className
        )}
      >
        {/* Subtle background overlay for depth */}
        <div className="pointer-events-none absolute inset-0 bg-white/60 backdrop-blur-[2px]" />

        {/* Animated background accents */}
        <div className="pointer-events-none absolute -top-16 -left-10 h-56 w-56 rounded-full bg-orange-300/20 blur-3xl animate-pulse [animation-duration:6s]" />
        <div className="pointer-events-none absolute bottom-10 -right-8 h-72 w-72 rounded-full bg-pink-400/20 blur-3xl animate-pulse [animation-duration:7s] [animation-delay:1.5s]" />
        <div className="pointer-events-none absolute top-1/3 right-1/4 h-40 w-40 rounded-full bg-rose-300/20 blur-2xl animate-[pulse_8s_ease-in-out_infinite]" />

        <Card
          ref={ref}
          className={cn(
            "w-full max-w-md rounded-2xl border border-white/50 bg-white/70 backdrop-blur-xl shadow-xl",
            // Entrance Animation from tailwindcss-animate
            "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-500"
          )}
          {...props}
        >
          <CardHeader className="text-center">
            {/* Logo rendered from src */}
            <div className="mb-4 flex justify-center ">
              <Image src={logoSrc} alt={logoAlt} width={48} height={48} className="h-12 w-12 object-contain rounded-[8px] shadow-sm" />
            </div>
            <CardTitle className="text-2xl font-semibold tracking-tight text-gray-900">{title}</CardTitle>
            {description && <CardDescription className="text-gray-600">{description}</CardDescription>}
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* Primary Action Button */}
            <Button
              onClick={primaryAction.onClick}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg hover:from-orange-600 hover:to-pink-700 hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
            >
              {primaryAction.icon}
              {primaryAction.label}
            </Button>

            {/* "OR" separator */}
            {secondaryActions && secondaryActions.length > 0 && (
              <div className="relative my-1">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">or</span>
                </div>
              </div>
            )}

            {/* Secondary Action Buttons */}
            <div className="grid gap-2">
              {secondaryActions?.map((action, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  className="w-full bg-white/70 backdrop-blur border border-white/60 text-gray-800 hover:bg-white transition-all duration-200 hover:scale-[1.02]"
                  onClick={action.onClick}
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))}
            </div>
          </CardContent>

          {/* Skip Action Button */}
          {skipAction && (
            <CardFooter className="flex flex-col">
              <Button
                variant="outline"
                className="w-full border-white/60 bg-white/60 backdrop-blur text-gray-800 hover:bg-white transition-all duration-200 hover:scale-[1.02]"
                onClick={skipAction.onClick}
              >
                {skipAction.label}
              </Button>
            </CardFooter>
          )}
        </Card>

        {/* Footer */}
        {footerContent && (
          <div className="mt-6 w-full max-w-md px-8 text-center text-sm text-muted-foreground animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-500 [animation-delay:200ms]">
            {footerContent}
          </div>
        )}
      </div>
    );
  }
);
AuthForm.displayName = "AuthForm";

export { AuthForm };
