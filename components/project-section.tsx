"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ProjectCard from "@/components/project-card"
import ProjectModal, { type ProjectDetails } from "@/components/project-modal"

interface ProjectSectionProps {
  projects: ProjectDetails[]
}

export default function ProjectSection({ projects }: ProjectSectionProps) {
  const [projectFilter, setProjectFilter] = useState("all")
  const [techFilter, setTechFilter] = useState<string[]>([])
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null)
  const projectsContainerRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  // Extract all unique technologies for filtering
  const allTechnologies = Array.from(new Set(projects.flatMap((project) => project.technologies || []))).sort()

  // Filter projects based on type and technologies
  const filteredProjects = projects.filter((project) => {
    const typeMatch = projectFilter === "all" || project.type === projectFilter
    const techMatch = techFilter.length === 0 || techFilter.some((tech) => project.technologies?.includes(tech))

    return typeMatch && (techFilter.length === 0 || techMatch)
  })

  const handleViewProjectDetails = (project: ProjectDetails) => {
    setSelectedProject(project)
  }

  const handleToggleTechFilter = (tech: string) => {
    setTechFilter((prev) => (prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]))
  }

  // Handle wheel events to prevent section navigation when scrolling projects
  const handleWheel = (e: React.WheelEvent) => {
    if (!projectsContainerRef.current) return

    // Always stop propagation to prevent section navigation
    e.stopPropagation()

    // Set scrolling state to true
    setIsScrolling(true)

    // Clear any existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current)
    }

    // Set a timeout to reset the scrolling state
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false)
    }, 150)
  }

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h2
        className="text-5xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Projects
      </motion.h2>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={(value) => setProjectFilter(value)}>
            <TabsList className="grid grid-cols-3 w-full md:w-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="web">Web</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
            </TabsList>
          </Tabs>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filter by Tech {techFilter.length > 0 && `(${techFilter.length})`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 max-h-[300px] overflow-auto">
              {allTechnologies.map((tech) => (
                <DropdownMenuCheckboxItem
                  key={tech}
                  checked={techFilter.includes(tech)}
                  onCheckedChange={() => handleToggleTechFilter(tech)}
                >
                  {tech}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {techFilter.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {techFilter.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => handleToggleTechFilter(tech)}
              >
                {tech} ×
              </Badge>
            ))}
            {techFilter.length > 0 && (
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => setTechFilter([])}>
                Clear all
              </Button>
            )}
          </div>
        )}

        <div
          ref={projectsContainerRef}
          className="overflow-y-auto max-h-[60vh] pr-2 pb-4 custom-scrollbar"
          onWheel={handleWheel}
        >
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  link={project.link}
                  type={project.type}
                  delay={index * 0.1}
                  technologies={project.technologies}
                  onViewDetails={() => handleViewProjectDetails(project)}
                  github={project.github}
                  challenges={project.challenges}
                  outcomes={project.outcomes}
                  image={project.image}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects match your current filters.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setProjectFilter("all")
                  setTechFilter([])
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  )
}
