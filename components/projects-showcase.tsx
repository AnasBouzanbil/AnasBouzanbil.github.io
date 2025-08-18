"use client"

import type React from "react"
import { useMemo, useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Globe, Smartphone } from "lucide-react"
import ProjectModal, { type ProjectDetails } from "@/components/project-modal"

interface ProjectsShowcaseProps {
  projects: ProjectDetails[]
}

export default function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const [activeType, setActiveType] = useState<string>("all")
  const [techFilter, setTechFilter] = useState<string[]>([])
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const [isScrolling, setIsScrolling] = useState(false)

  // Build unique tech list
  const allTechs = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.technologies || []))).sort(),
    [projects]
  )

  // Apply filters
  const filtered = useMemo(() => {
    const typeFiltered = projects.filter((p) => activeType === "all" || p.type === activeType)
    if (techFilter.length === 0) return typeFiltered
    return typeFiltered.filter((p) => (p.technologies || []).some((t) => techFilter.includes(t)))
  }, [projects, activeType, techFilter])

  // Featured + grid split
  const featured = filtered[0]
  const rest = filtered.slice(1)

  const toggleTech = (tech: string) => {
    setTechFilter((prev) => (prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]))
  }

  // Prevent parent section navigation when scrolling here
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation()
    setIsScrolling(true)
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
    scrollTimeout.current = setTimeout(() => setIsScrolling(false), 150)
  }

  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  const TypeBadge = ({ type }: { type: string }) => (
    <Badge variant="outline" className="capitalize bg-background/60">
      {type === "web" ? <Globe className="h-3 w-3 mr-1" /> : <Smartphone className="h-3 w-3 mr-1" />}
      {type}
    </Badge>
  )

  return (
    <div className="relative px-4 py-12">
      {/* Soft animated blobs background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, hsl(var(--primary)/0.18), transparent)" }}
          animate={{ x: [0, 20, 0], y: [0, 10, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-24 -right-20 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, hsl(var(--primary)/0.12), transparent)" }}
          animate={{ x: [0, -30, 0], y: [0, -15, 0], opacity: [0.7, 0.95, 0.7] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.h2
          className="text-center text-5xl font-bold mb-2 bg-gradient-to-r from-primary via-pink-500 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>
        <p className="text-center text-muted-foreground mb-8">A selection of things I built and shipped</p>

        {/* Controls */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          {/* Segmented type control */}
          <div className="flex w-full md:w-auto items-center gap-1 rounded-full bg-muted/50 p-1">
            {["all", "web", "mobile"].map((t) => (
              <Button
                key={t}
                onClick={() => setActiveType(t)}
                variant={activeType === t ? "default" : "ghost"}
                className={`h-9 rounded-full px-4 text-sm ${activeType === t ? "shadow" : ""}`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Button>
            ))}
          </div>

          {/* Tech chips (scrollable) */}
          <div className="w-full md:w-auto overflow-x-auto -mx-1 px-1">
            <div className="flex items-center gap-2 min-w-max">
              {allTechs.map((tech) => {
                const active = techFilter.includes(tech)
                return (
                  <Button
                    key={tech}
                    variant={active ? "default" : "outline"}
                    size="sm"
                    className="rounded-full h-8 px-3"
                    onClick={() => toggleTech(tech)}
                  >
                    {tech}
                  </Button>
                )
              })}
              {techFilter.length > 0 && (
                <Button variant="ghost" size="sm" className="h-8 px-3" onClick={() => setTechFilter([])}>
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Content area */}
        <div ref={scrollRef} className="overflow-y-auto max-h-[60vh] pr-1 pb-4 custom-scrollbar" onWheel={handleWheel}>
          {/* Featured horizontal carousel */}
          {filtered.length > 0 && (
            <div className="mb-10">
              <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 -mx-2 px-2">
                {filtered.slice(0, Math.min(5, filtered.length)).map((proj, idx) => (
                  <motion.article
                    key={`${proj.title}-${idx}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    whileHover={{ y: -6 }}
                    className="snap-start min-w-[85%] sm:min-w-[70%] md:min-w-[55%] lg:min-w-[45%]"
                  >
                    {/* Gradient border wrapper */}
                    <div className="p-[1px] rounded-2xl bg-gradient-to-r from-primary via-pink-500 to-purple-500">
                      <div className="rounded-[15px] bg-card/80 backdrop-blur border border-border overflow-hidden">
                        <div className="relative aspect-video">
                          {proj.image ? (
                            <img
                              src={proj.image}
                              alt={proj.title}
                              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-pink-500/10 to-purple-500/10" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                          <div className="absolute top-3 left-3 flex gap-2">
                            <TypeBadge type={proj.type} />
                            {proj.date && (
                              <Badge variant="outline" className="text-xs bg-background/60">{proj.date}</Badge>
                            )}
                          </div>
                          <div className="absolute top-3 right-3 flex gap-2">
                            {proj.github && (
                              <Button asChild size="sm" variant="outline" className="h-8 px-3">
                                <a href={proj.github} target="_blank" rel="noopener noreferrer">
                                  <Github className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                            {proj.link && (
                              <Button asChild size="sm" className="h-8 px-3">
                                <a href={proj.link} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-xl font-semibold mb-1 line-clamp-1">{proj.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{proj.description}</p>
                          {(proj.technologies?.length || 0) > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {(proj.technologies || []).slice(0, 6).map((t) => (
                                <Badge key={t} variant="outline" className="text-[10px] bg-background/60">{t}</Badge>
                              ))}
                              {(proj.technologies || []).length > 6 && (
                                <Badge variant="outline" className="text-[10px] bg-background/60">
                                  +{(proj.technologies || []).length - 6}
                                </Badge>
                              )}
                            </div>
                          )}
                          <div className="mt-4 flex items-center justify-between">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedProject(proj)}>
                              Details
                            </Button>
                            <div className="text-xs text-muted-foreground">Featured</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          )}

          {/* Responsive grid */}
          {rest.length > 0 ? (
            <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
              {rest.map((project, i) => (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className="relative rounded-2xl border border-border bg-card/70 backdrop-blur overflow-hidden group"
                >
                  <div className={`relative ${i % 4 === 0 ? "aspect-[4/3]" : "aspect-[16/10]"}`}>
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-pink-500/10 to-purple-500/10" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <TypeBadge type={project.type} />
                      {project.date && (
                        <Badge variant="outline" className="text-[10px] bg-background/60">{project.date}</Badge>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="text-lg font-semibold mb-1 line-clamp-1">{project.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {(project.technologies || []).slice(0, 4).map((t) => (
                        <Badge key={t} variant="outline" className="text-[10px] bg-background/60">{t}</Badge>
                      ))}
                      {(project.technologies || []).length > 4 && (
                        <Badge variant="outline" className="text-[10px] bg-background/60">
                          +{(project.technologies || []).length - 4}
                        </Badge>
                      )}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedProject(project)}>
                        Details
                      </Button>
                      <div className="flex gap-2">
                        {project.github && (
                          <Button asChild variant="outline" size="sm">
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {project.link && (
                          <Button asChild size="sm">
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center text-muted-foreground py-16">No projects found for the selected filters.</div>
          ) : null}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  )
} 