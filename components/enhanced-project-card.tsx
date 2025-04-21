"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Smartphone, Globe, Info } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ProjectModal, { type ProjectDetails } from "./project-modal"

interface EnhancedProjectCardProps {
  project: ProjectDetails
  delay?: number
}

export default function EnhancedProjectCard({ project, delay = 0 }: EnhancedProjectCardProps) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -5 }}
      >
        <Card className="h-full overflow-hidden border-l-4 hover:border-l-primary transition-all duration-300 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <Badge variant={project.type === "web" ? "default" : "secondary"} className="ml-2">
                {project.type === "web" ? <Globe className="h-3 w-3 mr-1" /> : <Smartphone className="h-3 w-3 mr-1" />}
                {project.type}
              </Badge>
            </div>
            <p className="text-muted-foreground line-clamp-3 mb-4">{project.description}</p>

            {project.technologies && (
              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.technologies.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="px-6 pb-6 pt-0 flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setShowModal(true)}>
              <Info className="mr-2 h-4 w-4" />
              Details
            </Button>
            {project.link && (
              <Button className="flex-1" asChild>
                <Link href={project.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>

      {showModal && <ProjectModal project={project} onClose={() => setShowModal(false)} />}
    </>
  )
}
