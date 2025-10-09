"use client";
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./resizable-navbar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { useState } from "react";
import { FileText, Brain, Shield, Zap, Users, BookOpen, MessageSquare, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NavbarDemo() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const features = [
    {
      title: "Document Analysis",
      href: "#document-analysis",
      description: "AI-powered legal document review and analysis",
      icon: FileText,
    },
    {
      title: "Smart Insights",
      href: "#smart-insights", 
      description: "Intelligent legal recommendations and advice",
      icon: Brain,
    },
    {
      title: "Security & Privacy",
      href: "#security",
      description: "Enterprise-grade protection for your documents",
      icon: Shield,
    },
    {
      title: "Fast Processing",
      href: "#fast-processing",
      description: "Instant analysis results and responses",
      icon: Zap,
    },
  ];

  const simpleNavItems = [
    { name: "About", link: "#specifications" },
    { name: "Testimonials", link: "#testimonials" },
    { name: "Contact", link: "#newsletter" },
  ];

  return (
    <Navbar>
      {/* Desktop Nav */}
      <NavBody>
        <NavbarLogo />
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="cursor-pointer">Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  {features.map((feature) => (
                    <NavigationMenuLink key={feature.title} href={feature.href} className="cursor-pointer">
                      <div className="flex items-center gap-3">
                        <feature.icon className="h-5 w-5 text-red-500" />
                        <div>
                          <div className="font-medium">{feature.title}</div>
                          <div className="text-sm text-gray-600">{feature.description}</div>
                        </div>
                      </div>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            {simpleNavItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink href={item.link} className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 cursor-pointer">
                  {item.name}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-3">
          <NavbarButton 
            variant="secondary" 
            onClick={() => router.push('/signin')}
          >
            Sign In
          </NavbarButton>
          <NavbarButton 
            variant="primary"
            onClick={() => router.push('/signin')}
          >
            Get Started
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Nav */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle 
            isOpen={isMobileMenuOpen} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          />
        </MobileNavHeader>
        <MobileNavMenu 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)}
        >
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Features</h3>
              <div className="space-y-2 pl-4">
                {features.map((feature) => (
                  <a
                    key={feature.title}
                    href={feature.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                  >
                    <feature.icon className="h-4 w-4 text-red-500" />
                    <div>
                      <div className="text-sm font-medium">{feature.title}</div>
                      <div className="text-xs text-gray-600">{feature.description}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              {simpleNavItems.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-2 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md cursor-pointer"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
            <NavbarButton 
              variant="secondary" 
              onClick={() => {
                router.push('/signin')
                setIsMobileMenuOpen(false)
              }}
            >
              Sign In
            </NavbarButton>
            <NavbarButton 
              variant="primary"
              onClick={() => {
                router.push('/signin')
                setIsMobileMenuOpen(false)
              }}
            >
              Get Started
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}

// const DummyContent = () => {
//   return (
//     <div className="container mx-auto p-8 pt-24">
//       <h1 className="mb-4 text-center text-3xl font-bold">
//         Check the navbar at the top of the container
//       </h1>
//       <p className="mb-10 text-center text-sm text-zinc-500">
//         For demo purpose we have kept the position as{" "}
//         <span className="font-medium">Sticky</span>. Keep in mind that this
//         component is <span className="font-medium">fixed</span> and will not
//         move when scrolling.
//       </p>
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
//         {[
//           {
//             id: 1,
//             title: "The",
//             width: "md:col-span-1",
//             height: "h-60",
//             bg: "bg-neutral-100 dark:bg-neutral-800",
//           },
//           {
//             id: 2,
//             title: "First",
//             width: "md:col-span-2",
//             height: "h-60",
//             bg: "bg-neutral-100 dark:bg-neutral-800",
//           },
//           {
//             id: 3,
//             title: "Rule",
//             width: "md:col-span-1",
//             height: "h-60",
//             bg: "bg-neutral-100 dark:bg-neutral-800",
//           },
//           {
//             id: 4,
//             title: "Of",
//             width: "md:col-span-3",
//             height: "h-60",
//             bg: "bg-neutral-100 dark:bg-neutral-800",
//           },
//           {
//             id: 5,
//             title: "F",
//             width: "md:col-span-1",
//             height: "h-60",
//             bg: "bg-neutral-100 dark:bg-neutral-800",
//           },
//           {
//             id: 6,
//             title: "Club",
//             width: "md:col-span-2",
//             height: "h-60",
//             bg: "bg-neutral-100 dark:bg-neutral-800",
//           },
//           {
//             id: 7,
//             title: "Is",
//             width: "md:col-span-2",
//             height: "h-60",
//             bg: "bg-neutral-100 dark:bg-neutral-800",
//           },
//           {
//             id: 8,
//             title: "You",
//             width: "md:col-span-1",
//             height: "h-60",
//             bg: "bg-neutral-100 dark:bg-neutral-800",
//           },
//           {
//             id: 9,
//             title: "Do NOT TALK about",
//             width: "md:col-span-2",
//             height: "h-60",
//             bg: "bg-neutral-100 dark:bg-neutral-800",
//           },
//           {
//             id: 10,
//             title: "F Club",
//             width: "md:col-span-1",
//             height: "h-60",
//             bg: "bg-neutral-100 dark:bg-neutral-800",
//           },
//         ].map((box) => (
//           <div
//             key={box.id}
//             className={`${box.width} ${box.height} ${box.bg} flex items-center justify-center rounded-lg p-4 shadow-sm`}
//           >
//             <h2 className="text-xl font-medium">{box.title}</h2>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
