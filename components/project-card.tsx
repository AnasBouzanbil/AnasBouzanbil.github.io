"use client"

import { motion } from "framer-motion"
import { ExternalLink, Smartphone, Globe } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  description: string
  link: string
  type: "web" | "mobile"
  delay?: number
}

export default function ProjectCard({ title, description, link, type, delay = 0 }: ProjectCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
      <Card className="h-full overflow-hidden border-l-4 hover:border-l-primary transition-all duration-300 hover:-translate-y-2 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold">{title}</h3>
            <Badge variant={type === "web" ? "default" : "secondary"} className="ml-2">
              {type === "web" ? <Globe className="h-3 w-3 mr-1" /> : <Smartphone className="h-3 w-3 mr-1" />}
              {type}
            </Badge>
          </div>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-0">
          <Link href={link} target="_blank" rel="noopener noreferrer" className="w-full">
            <Button variant="outline" className="w-full group">
              <span>View Project</span>
              <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

