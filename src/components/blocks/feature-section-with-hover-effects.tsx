import { cn } from "@/lib/utils";
import NextIcon from "@/assets/nextjs-icon.png"
import TypeScriptIcon from "@/assets/ts-icon.png"
import TailwindIcon from "@/assets/tailwind-css-icon.png"
import ShadcnIcon from "@/assets/shadcn-ui-icon.png"
import BetterAuthIcon from "@/assets/better-auth-icon.png"
import DrizzleIcon from "@/assets/drizzle-icon.png"
import PrettierIcon from "@/assets/prettier-icon.png"
import I18nIcon from "@/assets/i18n.png"
import { StaticImageData } from "next/image"
import Image from "next/image"
import { GlobeIcon } from "lucide-react";

interface TechCard {
  title: string
  description: string
  icon: string | StaticImageData
  href: string
}

const techStack: TechCard[] = [
  {
    title: "Next.js 15",
    description: "A framework for React that enables server-side rendering and effortless deployment.",
    icon: NextIcon,
    href: "https://nextjs.org/docs",
  },
  {
    title: "TypeScript",
    description: "A typed superset of JavaScript that enhances code maintainability and scalability.",
    icon: TypeScriptIcon,
    href: "https://www.typescriptlang.org/docs/",
  },
  { 
    title: "Tailwind CSS",
    description: "A utility-first CSS framework for building custom designs with ease.",
    icon: TailwindIcon,
    href: "https://tailwindcss.com/docs",
  },
  {
    title: "Shadcn UI",
    description: "Beautifully designed components that enhance your application's user interface.",
    icon: ShadcnIcon,
    href: "https://ui.shadcn.com/docs",
  },
  {
    title: "BetterAuth",
    description: "Seamless and secure authentication service for modern web applications.",
    icon: BetterAuthIcon,
    href: "https://www.better-auth.com/",
  },
  {
    title: "Drizzle ORM",
    description: "A powerful backend platform with real-time database, file storage, and serverless functions.",
    icon: DrizzleIcon,
    href: "https://orm.drizzle.team/docs/overview",
  },
  {
    title: "Prettier",
    description: "Prettier is an opinionated code formatter.",
    icon: PrettierIcon,
    href: "https://prettier.io/docs/en/index.html",
  },
  {
    title: "Internationalization",
    description: "Internationalization is the process of making your application available in different languages.",
    icon: I18nIcon,
    href: "https://next-intl.dev/",
  }
]

export function FeaturesSectionWithHoverEffects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">

      {techStack.map((feature, index) => (
        <Feature 
          key={feature.title} 
          title={feature.title}
          description={feature.description}
          icon={typeof feature.icon === 'string' ? feature.icon : (
            <Image src={feature.icon} alt={feature.title} width={24} height={24} />
          )}
          index={index}
          href={feature.href}
        />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
  href,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  href: string;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800 hover:no-underline",
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
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-purple-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </a>
  );
};
