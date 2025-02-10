import { ArrowUpRight } from "lucide-react"
import NextIcon from "@/assets/nextjs-icon.png"
import TypeScriptIcon from "@/assets/ts-icon.png"
import TailwindIcon from "@/assets/tailwind-css-icon.png"
import ShadcnIcon from "@/assets/shadcn-ui-icon.png"
import BetterAuthIcon from "@/assets/better-auth-icon.png"
import DrizzleIcon from "@/assets/drizzle-icon.png"
import PrettierIcon from "@/assets/prettier-icon.png"
import { StaticImageData } from "next/image"
import Image from "next/image"

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
]

export default function TechStack() {
  return (
    <section className="w-full mx-auto py-12 md:py-24 lg:py-32">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#B4C7FF]">
            Built with Modern Tech Stack
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
            Powered by the latest technologies to ensure scalability, security, and developer experience.
          </p>
        </div>
        <div className="mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-12">
          {techStack.map((tech) => (
            <a
              key={tech.title}
              href={tech.href}
              className="group relative overflow-hidden rounded-lg bg-[#0F1629] p-6 transition-all hover:ring-2 hover:ring-[#B4C7FF]/20"
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full bg-[#1A2137] flex items-center justify-center text-white font-mono">
                  {typeof tech.icon === 'string' ? (
                    tech.icon
                  ) : (
                    <Image src={tech.icon} alt={tech.title} width={24} height={24} />
                  )}
                </div>
                <ArrowUpRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-xl text-white mb-2">{tech.title}</h3>
                <p className="text-gray-400 text-sm">{tech.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

