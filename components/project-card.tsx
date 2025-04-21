"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ExternalLink, Smartphone, Globe, ChevronRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { ProjectDetails } from "./project-modal"

interface ProjectCardProps {
  title: string
  description: string
  link: string
  type: "web" | "mobile" | string
  delay?: number
  technologies?: string[]
  onViewDetails: (project: ProjectDetails) => void
  github?: string
  challenges?: string
  outcomes?: string
  image?: string
  role?: string
  date?: string
}

export default function ProjectCard({
  title,
  description,
  link,
  type,
  delay = 0,
  technologies = [],
  onViewDetails,
  github,
  challenges,
  outcomes,
  image,
  role,
  date,
}: ProjectCardProps) {
  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onViewDetails({
      title,
      description,
      link,
      type,
      technologies,
      github,
      challenges,
      outcomes,
      image,
      role,
      date,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full overflow-hidden border-l-4 hover:border-l-primary transition-all duration-300 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold">{title}</h3>
            <Badge variant={type === "web" ? "default" : "secondary"} className="ml-2">
              {type === "web" ? <Globe className="h-3 w-3 mr-1" /> : <Smartphone className="h-3 w-3 mr-1" />}
              {type}
            </Badge>
          </div>
          <p className="text-muted-foreground line-clamp-3 mb-3">{description}</p>

          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3 mb-2">
              {technologies.slice(0, 3).map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {technologies.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{technologies.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
          <Button variant="ghost" size="sm" onClick={handleViewDetails} className="p-0 h-auto">
            <span className="text-primary text-sm">View Details</span>
            <ChevronRight className="h-4 w-4 text-primary" />
          </Button>

          {link && (
            <Link href={link} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="group">
                <span>Visit</span>
                <ExternalLink className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
