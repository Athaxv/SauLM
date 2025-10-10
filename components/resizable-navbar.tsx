"use client";

import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import React, { useRef, useState } from "react";

/* -------------------- Types -------------------- */
interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: { name: string; link: string }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

/* -------------------- Navbar Wrapper -------------------- */
export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 50);
  });

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full transition-all duration-300",
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ visible?: boolean }>, { visible })
          : child
      )}
    </motion.div>
  );
};

/* -------------------- Desktop Nav -------------------- */
export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backgroundColor: visible ? "rgba(255, 255, 255, 0.6)" : "transparent",
        backdropFilter: visible ? "blur(16px)" : "none",
      }}
      transition={{ duration: 0.3 }}
      className={cn(
        "mx-auto hidden h-16 max-w-7xl items-center justify-between rounded-full px-6 lg:flex",
        "   dark:border-neutral-800",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

/* -------------------- Nav Items -------------------- */
export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-center gap-6 text-sm font-medium text-neutral-700 dark:text-neutral-300",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          key={idx}
          href={item.link}
          onClick={onItemClick}
          className="transition-colors hover:text-black dark:hover:text-white cursor-pointer"
        >
          {item.name}
        </a>
      ))}
    </div>
  );
};

/* -------------------- Mobile Nav -------------------- */
export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backgroundColor: visible ? "rgba(255,255,255,0.6)" : "transparent",
        backdropFilter: visible ? "blur(16px)" : "none",
      }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative flex w-full items-center justify-between px-4 py-3 lg:hidden",
        "border-b border-white/20 shadow-sm dark:border-neutral-800",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => (
  <div className={cn("flex w-full items-center justify-between", className)}>
    {children}
  </div>
);

export const MobileNavMenu = ({ children, isOpen, className }: MobileNavMenuProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "absolute inset-x-0 top-16 flex flex-col gap-4 rounded-lg bg-white/80 p-6 shadow-lg backdrop-blur-md dark:bg-neutral-900/80",
          className
        )}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

/* -------------------- Mobile Toggle -------------------- */
export const MobileNavToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) =>
  isOpen ? (
    <IconX className="h-6 w-6 cursor-pointer text-neutral-800 dark:text-white" onClick={onClick} />
  ) : (
    <IconMenu2
      className="h-6 w-6 cursor-pointer text-neutral-800 dark:text-white"
      onClick={onClick}
    />
  );

/* -------------------- Logo -------------------- */
export const NavbarLogo = () => (
  <a href="#" className="flex items-center gap-2 text-lg font-semibold text-neutral-900 dark:text-white cursor-pointer">
    <img src="../newlogo.svg" alt="logo" className="h-7 w-7" />
    
    <span className="font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">SauLM</span>
  </a>
);

/* -------------------- CTA Buttons -------------------- */
export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
} & (React.ComponentPropsWithoutRef<"a"> | React.ComponentPropsWithoutRef<"button">)) => {
  const base =
    "px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 cursor-pointer";
  const variants = {
    primary: "bg-pink-600 text-white hover:bg-pink-700 shadow-lg",
    secondary:
      "bg-transparent border border-neutral-400 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800",
  };

  return (
    <Tag href={href} className={cn(base, variants[variant], className)} {...props}>
      {children}
    </Tag>
  );
};
