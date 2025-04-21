"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Server, Braces, Database, GitBranch, Globe, Cpu, Layers } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Skill {
  name: string
  level: number
  icon: React.ReactNode
  color: string
  description: string
}

interface SkillCategory {
  name: string
  skills: Skill[]
}

export default function EnhancedSkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState("languages")
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const skillCategories: Record<string, SkillCategory> = {
    languages: {
      name: "Programming Languages",
      skills: [
        {
          name: "JavaScript",
          level: 90,
          icon: <Braces className="h-5 w-5" />,
          color: "text-yellow-500",
          description: "Modern ES6+, async/await, functional programming patterns",
        },
        {
          name: "TypeScript",
          level: 85,
          icon: <Braces className="h-5 w-5 text-blue-500" />,
          color: "text-blue-500",
          description: "Type systems, interfaces, generics, and advanced types",
        },
        {
          name: "Python",
          level: 60,
          icon: <Code className="h-5 w-5" />,
          color: "text-green-500",
          description: "Data processing, automation, and scripting",
        },
        {
          name: "C",
          level: 95,
          icon: <Cpu className="h-5 w-5" />,
          color: "text-gray-500",
          description: "System programming, memory management, and optimization",
        },
        {
          name: "C++",
          level: 95,
          icon: <Cpu className="h-5 w-5" />,
          color: "text-blue-400",
          description: "Object-oriented design, STL, and performance optimization",
        },
        {
          name: "Java",
          level: 30,
          icon: <Code className="h-5 w-5" />,
          color: "text-orange-500",
          description: "Object-oriented programming and enterprise applications",
        },
        {
          name: "Dart",
          level: 50,
          icon: <Code className="h-5 w-5" />,
          color: "text-blue-300",
          description: "Mobile app development with Flutter framework",
        },
      ],
    },
    frameworks: {
      name: "Frameworks & Libraries",
      skills: [
        {
          name: "React",
          level: 70,
          icon: <Code className="h-5 w-5" />,
          color: "text-blue-400",
          description: "Component architecture, hooks, context API, and state management",
        },
        {
          name: "Next.js",
          level: 70,
          icon: <Layers className="h-5 w-5" />,
          color: "text-black dark:text-white",
          description: "Server-side rendering, API routes, and static site generation",
        },
        {
          name: "NestJS",
          level: 75,
          icon: <Server className="h-5 w-5" />,
          color: "text-red-500",
          description: "Building scalable server-side applications with TypeScript",
        },
        {
          name: "Express.js",
          level: 85,
          icon: <Server className="h-5 w-5" />,
          color: "text-gray-500",
          description: "RESTful APIs, middleware, and routing",
        },
        {
          name: "Flutter",
          level: 85,
          icon: <Layers className="h-5 w-5" />,
          color: "text-blue-500",
          description: "Cross-platform mobile app development with Material Design",
        },
        {
          name: "React Native",
          level: 60,
          icon: <Layers className="h-5 w-5" />,
          color: "text-blue-400",
          description: "Native mobile app development with React components",
        },
      ],
    },
    technologies: {
      name: "Technologies & Tools",
      skills: [
        {
          name: "WebRTC",
          level: 80,
          icon: <Globe className="h-5 w-5" />,
          color: "text-green-500",
          description: "Real-time communication, video/audio streaming, and P2P connections",
        },
        {
          name: "Docker",
          level: 75,
          icon: <Database className="h-5 w-5" />,
          color: "text-blue-500",
          description: "Containerization, Docker Compose, and deployment strategies",
        },
        {
          name: "Git",
          level: 80,
          icon: <GitBranch className="h-5 w-5" />,
          color: "text-orange-500",
          description: "Version control, branching strategies, and collaborative workflows",
        },
        {
          name: "PostgreSQL",
          level: 85,
          icon: <Database className="h-5 w-5" />,
          color: "text-blue-400",
          description: "Relational database design, complex queries, and optimization",
        },
        {
          name: "MongoDB",
          level: 80,
          icon: <Database className="h-5 w-5" />,
          color: "text-green-500",
          description: "NoSQL database design, aggregation pipelines, and indexing",
        },
      ],
    },
  }

  const handleCategoryChange = (category: string) => {
    if (isAnimating) return
    setIsAnimating(true)
    setSelectedCategory(category)
    setSelectedSkill(null)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handleSkillSelect = (skill: Skill) => {
    setSelectedSkill(skill === selectedSkill ? null : skill)
  }

  const getProficiencyText = (level: number): string => {
    if (level >= 90) return "Expert"
    if (level >= 70) return "Advanced"
    if (level >= 50) return "Intermediate"
    return "Beginner"
  }

  const getProficiencyColor = (level: number): string => {
    if (level >= 90) return "bg-green-500"
    if (level >= 70) return "bg-blue-500"
    if (level >= 50) return "bg-yellow-500"
    return "bg-gray-500"
  }

  return (
    <div className="container mx-auto px-4 py-12 h-full flex flex-col space-y-10">
      <motion.h2
        className="text-5xl font-bold text-center mb-4 pt-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Skills & Expertise
      </motion.h2>

      <div className="flex flex-col flex-grow space-y-8">
        <Tabs value={selectedCategory} onValueChange={handleCategoryChange} className="w-full">
          <div className="flex justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="languages" className="relative">
                  <span className="flex items-center gap-2">
                    <Braces className="h-4 w-4" />
                    <span className="hidden sm:inline">Languages</span>
                  </span>
                  {selectedCategory === "languages" && (
                    <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" layoutId="activeTab" />
                  )}
                </TabsTrigger>
                <TabsTrigger value="frameworks" className="relative">
                  <span className="flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    <span className="hidden sm:inline">Frameworks</span>
                  </span>
                  {selectedCategory === "frameworks" && (
                    <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" layoutId="activeTab" />
                  )}
                </TabsTrigger>
                <TabsTrigger value="technologies" className="relative">
                  <span className="flex items-center gap-2">
                    <Server className="h-4 w-4" />
                    <span className="hidden sm:inline">Technologies</span>
                  </span>
                  {selectedCategory === "technologies" && (
                    <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" layoutId="activeTab" />
                  )}
                </TabsTrigger>
              </TabsList>
            </motion.div>
          </div>
        </Tabs>

        <motion.div
          key={`title-${selectedCategory}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <h3 className="text-2xl font-medium text-primary mb-1">{skillCategories[selectedCategory].name}</h3>
          <p className="text-muted-foreground">
            {selectedCategory === "languages" && "Programming languages I've mastered over the years"}
            {selectedCategory === "frameworks" && "Frameworks and libraries I use to build applications"}
            {selectedCategory === "technologies" && "Technologies and tools I work with regularly"}
          </p>
        </motion.div>

        <div className="flex-grow flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {skillCategories[selectedCategory].skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => handleSkillSelect(skill)}
                >
                  <Card
                    className={cn(
                      "h-full cursor-pointer transition-all duration-300 overflow-hidden",
                      selectedSkill?.name === skill.name ? "border-primary shadow-lg" : "hover:border-primary/50",
                    )}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "p-2 rounded-lg",
                              selectedSkill?.name === skill.name ? "bg-primary/20" : "bg-muted",
                            )}
                          >
                            <span className={skill.color}>{skill.icon}</span>
                          </div>
                          <h4 className="text-xl font-medium">{skill.name}</h4>
                        </div>
                        <Badge variant={skill.level >= 70 ? "default" : "secondary"}>
                          {getProficiencyText(skill.level)}
                        </Badge>
                      </div>

                      <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
                        <motion.div
                          className={cn("h-full rounded-full", getProficiencyColor(skill.level))}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>

                      <AnimatePresence>
                        {selectedSkill?.name === skill.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="text-muted-foreground text-sm mt-2">{skill.description}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
