import { cn } from "@/lib/utils";
import {
  IconFileText,
  IconScale,
  IconShield,
  IconBolt,
  IconUsers,
  IconBrain,
  IconClock,
  IconLock,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Legal Document Analysis",
      description:
        "AI-powered analysis of contracts, agreements, and legal documents with precision and accuracy.",
      icon: <IconFileText />,
    },
    {
      title: "Risk Assessment",
      description:
        "Identify potential risks, liabilities, and critical clauses in your legal documents instantly.",
      icon: <IconScale />,
    },
    {
      title: "Enterprise Security",
      description:
        "Bank-level encryption and security protocols to protect your sensitive legal information.",
      icon: <IconShield />,
    },
    {
      title: "Instant Insights",
      description: "Get comprehensive legal analysis in seconds, not hours of manual review.",
      icon: <IconBolt />,
    },
    {
      title: "Team Collaboration",
      description: "Share insights and collaborate with your legal team seamlessly.",
      icon: <IconUsers />,
    },
    {
      title: "Smart AI Brain",
      description:
        "Advanced AI trained on legal knowledge to provide accurate, contextual advice.",
      icon: <IconBrain />,
    },
    {
      title: "24/7 Availability",
      description: "Round-the-clock legal document analysis whenever you need it.",
      icon: <IconClock />,
    },
    {
      title: "Privacy Protected",
      description: "Your documents remain confidential with zero data sharing policies.",
      icon: <IconLock />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-pink-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
