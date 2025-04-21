"use client"
import FullscreenNavigation from "@/components/fullscreen-navigation"
import SectionContent from "@/components/section-content"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Code, Layers, Palette, Users } from "lucide-react"

export default function AlternativeNavigationPage() {
  const sections = [
    {
      id: "home",
      title: "Home",
      color: "hsl(var(--background))",
      component: (
        <SectionContent title="Reimagining Web Navigation" subtitle="Beyond Traditional Scrolling">
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            Explore innovative ways to navigate content with our fullscreen section-based approach, combining horizontal
            transitions on desktop with enhanced vertical scrolling on mobile.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button size="lg" className="group">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>

          <motion.div
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            <p className="text-muted-foreground text-sm mb-2">Swipe or use arrow keys to navigate</p>
            <ArrowRight className="h-6 w-6 mx-auto rotate-90" />
          </motion.div>
        </SectionContent>
      ),
    },
    {
      id: "features",
      title: "Features",
      color: "hsl(var(--background))",
      component: (
        <SectionContent title="Key Features" subtitle="Why Choose This Approach">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[
              {
                icon: <Layers className="h-8 w-8 text-primary" />,
                title: "Immersive Experience",
                description: "Fullscreen sections create a focused, immersive experience for each content area.",
              },
              {
                icon: <Users className="h-8 w-8 text-primary" />,
                title: "Enhanced Engagement",
                description: "Interactive navigation increases user engagement and time spent on your site.",
              },
              {
                icon: <Palette className="h-8 w-8 text-primary" />,
                title: "Visual Storytelling",
                description: "Smooth transitions between sections create a cohesive visual narrative.",
              },
              {
                icon: <Code className="h-8 w-8 text-primary" />,
                title: "Responsive Design",
                description: "Adapts seamlessly between horizontal navigation on desktop and vertical on mobile.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </SectionContent>
      ),
    },
    {
      id: "showcase",
      title: "Showcase",
      color: "hsl(var(--background))",
      component: (
        <SectionContent title="Visual Showcase" subtitle="See It In Action" align="left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden group"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={`/placeholder.svg?height=400&width=300&text=Project ${item}`}
                  alt={`Project ${item}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Project {item}</h3>
                    <p className="text-white/80">Interactive showcase example</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Button className="mt-8">View All Projects</Button>
        </SectionContent>
      ),
    },
    {
      id: "implementation",
      title: "Implementation",
      color: "hsl(var(--background))",
      component: (
        <SectionContent title="Implementation Guide" subtitle="How It Works" align="right">
          <div className="max-w-2xl ml-auto">
            <p className="text-lg text-muted-foreground mb-6">
              This navigation pattern is built with accessibility and performance in mind, using Framer Motion for
              smooth animations and React hooks for responsive behavior.
            </p>

            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Key Technical Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Responsive design with different navigation patterns for mobile and desktop</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Keyboard navigation support with arrow keys</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Touch gestures for mobile devices with swipe detection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Reduced motion support for users with vestibular disorders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>ARIA attributes for screen reader compatibility</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Button variant="outline" className="mb-4">
              View Documentation
            </Button>
          </div>
        </SectionContent>
      ),
    },
    {
      id: "contact",
      title: "Contact",
      color: "hsl(var(--background))",
      component: (
        <SectionContent title="Get In Touch" subtitle="Have Questions?">
          <Card className="max-w-md w-full mx-auto mt-8">
            <CardContent className="p-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="w-full px-3 py-2 border border-border rounded-md bg-background min-h-[120px]"
                    placeholder="Your message"
                  />
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </SectionContent>
      ),
    },
  ]

  return <FullscreenNavigation sections={sections} />
}
