/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, BookOpen, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface Course {
  name: string
  description: string
  skills: string[]
}

interface Achievement {
  title: string
  date: string
  description: string
}

interface EducationItem {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  logo: string
  website: string
  location: string
  description: string
  courses?: Course[]
  achievements?: Achievement[]
}

export default function EducationTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const educationData: EducationItem[] = [
    {
      id: "1337",
      institution: "1337 School",
      degree: "Software Engineering",
      field: "Computer Science",
      startDate: "2022",
      endDate: "Present",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMjDUu5Cugm9VpGLWK5FN-c6zwi9Y1x8DZGA&s",
      website: "https://1337.ma/",
      location: "Benguerir, Morocco",
      description:
        "Peer-to-peer learning environment focused on project-based education in software engineering. Developing skills in algorithm design, system architecture, and full-stack development through practical projects.",
      courses: [
        {
          name: "Advanced Algorithms",
          description: "Implementation of complex algorithms and data structures",
          skills: ["Algorithm Design", "Data Structures", "Problem Solving"],
        },
        {
          name: "System Architecture",
          description: "Design and implementation of scalable system architectures",
          skills: ["System Design", "Microservices", "Distributed Systems"],
        },
        {
          name: "Full-Stack Development",
          description: "Building end-to-end web applications with modern technologies",
          skills: ["React", "Node.js", "Database Design", "API Development"],
        },
      ],
    },
    {
      id: "cadi",
      institution: "Al Cadi Ayyad University",
      degree: "General Academic Studies Degree",
      field: "English Studies",
      startDate: "2020",
      endDate: "2022",
      logo: "https://bghit-nekhdem.com/wp-content/uploads/2023/04/cadi-ayyad.png",
      website: "https://www.uca.ma/fr",
      location: "Marrakech, Morocco",
      description:
        "Comprehensive education in arts, languages, culture, and human sciences. Developed critical thinking, analytical writing, and communication skills through a variety of literature and linguistics courses.",
      courses: [
        {
          name: "English Literature",
          description: "Study of classic and modern literary works and genres",
          skills: ["Arts", "Culture", "Human Sciences"],
        },
        {
          name: "Linguistics",
          description: "Introduction to phonetics, syntax, semantics, and applied linguistics",
          skills: ["Linguistic Theory", "Phonetics", "Spoken English"],
        },
      ],
    },
  ]

  return (
    <div className="relative pt[50px] mt-[50px] space-y-16">
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/80 to-primary/20 md:left-1/2 md:-translate-x-1/2"
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 1.5 }}
      />

      {educationData.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className={`relative flex flex-col items-center md:flex-row ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          <motion.div
            className="absolute left-0 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 md:left-1/2 md:-translate-x-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.2 + 0.5, type: "spring" }}
          />

          <div className={`w-full md:w-[calc(50%-20px)] ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-border bg-card/30 pt-10 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3 + 0.7 }}
            >
              <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {item.startDate} - {item.endDate}
                    </span>
                  </div>
                  <h3 className="mb-4 mt-4 text-2xl font-semibold">{item.institution}</h3>
                  <p className="mb-2 text-lg font-medium">
                    {item.degree} • {item.field}
                  </p>
                  <div className="mb-4 text-sm text-muted-foreground">
                    <span>{item.location}</span>
                  </div>
                  <p className="mb-4 text-muted-foreground">{item.description}</p>
                </div>
                <Link href={item.website} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                  <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-border transition-colors duration-300 hover:border-primary">
                    <Image
                      src={item.logo || "/placeholder.svg"}
                      alt={item.institution}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                </Link>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleExpand(item.id)}
                className="mt-2 flex items-center gap-1 text-primary hover:text-primary/80"
              >
                {expandedId === item.id ? (
                  <>
                    <ChevronUp className="h-4 w-4" /> <span>Show less</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" /> <span>Show more</span>
                  </>
                )}
              </Button>

              <AnimatePresence>
                {expandedId === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 space-y-6"
                  >
                    {item.courses?.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-primary" />
                          <h4 className="text-lg font-medium">Key Courses</h4>
                        </div>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          {item.courses.map((course, idx) => (
                            <div key={idx} className="rounded-lg border border-border bg-background/50 p-3">
                              <h5 className="mb-1 font-medium">{course.name}</h5>
                              <p className="mb-2 text-sm text-muted-foreground">{course.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {course.skills.map((skill, skillIdx) => (
                                  <Badge key={skillIdx} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          Visit Website <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
