"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ExternalLink, Smartphone, Globe, ChevronRight, Star, Users, TrendingUp } from "lucide-react"
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
  impact?: {
    users?: number
    rating?: number
    downloads?: number
  }
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
  impact,
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "web":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "mobile":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "C++":
        return "bg-orange-500/10 text-orange-600 border-orange-500/20"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="h-full overflow-hidden border-l-4 hover:border-l-primary transition-all duration-300 bg-card/50 backdrop-blur-sm group-hover:shadow-lg">
        <CardContent className="p-6">
          {/* Header with type badge */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{title}</h3>
              {date && (
                <p className="text-xs text-muted-foreground mt-1">{date}</p>
              )}
            </div>
            <Badge 
              variant="outline" 
              className={`ml-2 ${getTypeColor(type)}`}
            >
              {type === "web" ? <Globe className="h-3 w-3 mr-1" /> : <Smartphone className="h-3 w-3 mr-1" />}
              {type}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-muted-foreground line-clamp-3 mb-4 leading-relaxed">{description}</p>

          {/* Impact metrics */}
          {impact && (
            <div className="flex items-center gap-4 mb-4 text-sm">
              {impact.users && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>{impact.users}+ users</span>
                </div>
              )}
              {impact.rating && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{impact.rating}/5</span>
                </div>
              )}
              {impact.downloads && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  <span>{impact.downloads}+ downloads</span>
                </div>
              )}
            </div>
          )}

          {/* Technologies */}
          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {technologies.slice(0, 4).map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs bg-background/50">
                  {tech}
                </Badge>
              ))}
              {technologies.length > 4 && (
                <Badge variant="outline" className="text-xs bg-background/50">
                  +{technologies.length - 4}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleViewDetails} 
            className="p-0 h-auto group-hover:text-primary transition-colors"
          >
            <span className="text-sm">View Details</span>
            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>

          <div className="flex gap-2">
            {github && (
              <Link href={github} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="text-xs">
                  Code
                </Button>
              </Link>
            )}
            {link && (
              <Link href={link} target="_blank" rel="noopener noreferrer">
                <Button variant="default" size="sm" className="text-xs group/link">
                  <span>Visit</span>
                  <ExternalLink className="ml-1 h-3 w-3 group-hover/link:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
