/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Calendar, BookOpen, ExternalLink, ChevronDown, ChevronUp, Sparkles, Award, GraduationCap, MapPin, Clock, Star, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

interface Course {
  name: string
  description: string
  skills: string[]
  icon?: React.ReactNode
  color?: string
}

interface Achievement {
  title: string
  date: string
  description: string
  icon?: React.ReactNode
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
  color?: string
  icon?: React.ReactNode
  highlights?: string[]
  gpa?: string
  status?: "current" | "completed" | "ongoing"
}

export default function EducationTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })



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
      color: "from-purple-500 to-pink-500",
      icon: <Sparkles className="h-6 w-6" />,
      status: "current",
      gpa: "4.0/4.0",
      highlights: [
        "Peer-to-peer learning methodology",
        "Project-based curriculum",
        "42 Network affiliation",
        "Intensive coding challenges"
      ],
      description:
        "Peer-to-peer learning environment focused on project-based education in software engineering. Developing skills in algorithm design, system architecture, and full-stack development through practical projects.",
      courses: [
        {
          name: "Advanced Algorithms",
          description: "Implementation of complex algorithms and data structures with focus on optimization and efficiency",
          skills: ["Algorithm Design", "Data Structures", "Problem Solving", "Complexity Analysis"],
          icon: <Zap className="h-4 w-4" />,
          color: "from-yellow-500 to-orange-500"
        },
        {
          name: "System Architecture",
          description: "Design and implementation of scalable system architectures with microservices and distributed systems",
          skills: ["System Design", "Microservices", "Distributed Systems", "Cloud Architecture"],
          icon: <Star className="h-4 w-4" />,
          color: "from-blue-500 to-cyan-500"
        },
        {
          name: "Full-Stack Development",
          description: "Building end-to-end web applications with modern technologies and best practices",
          skills: ["React", "Node.js", "Database Design", "API Development", "DevOps"],
          icon: <BookOpen className="h-4 w-4" />,
          color: "from-green-500 to-teal-500"
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
      color: "from-blue-500 to-cyan-500",
      icon: <GraduationCap className="h-6 w-6" />,
      status: "completed",
      gpa: "3.8/4.0",
      highlights: [
        "Comprehensive liberal arts education",
        "Cultural and linguistic studies",
        "Critical thinking development",
        "International perspective"
      ],
      description:
        "Comprehensive education in arts, languages, culture, and human sciences. Developed critical thinking, analytical writing, and communication skills through a variety of literature and linguistics courses.",
      courses: [
        {
          name: "English Literature",
          description: "Study of classic and modern literary works, genres, and critical analysis techniques",
          skills: ["Literary Analysis", "Critical Thinking", "Cultural Studies", "Human Sciences"],
          icon: <BookOpen className="h-4 w-4" />,
          color: "from-purple-500 to-pink-500"
        },
        {
          name: "Linguistics",
          description: "Introduction to phonetics, syntax, semantics, and applied linguistics with practical applications",
          skills: ["Linguistic Theory", "Phonetics", "Spoken English", "Language Analysis"],
          icon: <Star className="h-4 w-4" />,
          color: "from-indigo-500 to-blue-500"
        },
      ],
    },
  ]

  return (
    <div ref={containerRef} className="relative space-y-16 education-timeline">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0, rotate: 0 }}
          whileInView={{ scale: 1, opacity: 0.3, rotate: 360 }}
          viewport={{ once: true }}
          transition={{
            duration: 2,
            ease: "easeOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0, x: 0 }}
          whileInView={{ scale: 1, opacity: 0.4, x: 30 }}
          viewport={{ once: true }}
          transition={{
            duration: 2.5,
            ease: "easeOut",
            delay: 0.5
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-green-500/8 to-teal-500/8 rounded-full blur-2xl"
          initial={{ scale: 0, opacity: 0, y: 0 }}
          whileInView={{ scale: 1, opacity: 0.2, y: -20 }}
          viewport={{ once: true }}
          transition={{
            duration: 2,
            ease: "easeOut",
            delay: 1
          }}
        />
      </div>

      {/* Enhanced timeline line with progress animation */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 md:left-1/2 md:-translate-x-1/2"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Timeline nodes with enhanced animations */}
      {educationData.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            delay: index * 0.4,
            duration: 1,
            ease: [0.4, 0.0, 0.2, 1]
          }}
          className={`relative flex flex-col items-center md:flex-row ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          {/* Enhanced animated timeline node */}
          <motion.div
            className="absolute left-0 w-8 h-8 rounded-full border-4 border-background z-10 md:left-1/2 md:-translate-x-1/2 shadow-lg timeline-node"
            style={{
              background: `linear-gradient(135deg, ${item.color?.split(' ')[1]}, ${item.color?.split(' ')[3]})`
            }}
            initial={{ scale: 0, rotate: 0 }}
            whileInView={{ scale: 1, rotate: 360 }}
            transition={{ 
              delay: index * 0.4 + 0.5, 
              duration: 1,
              type: "spring",
              stiffness: 200
            }}
            whileHover={{ scale: 1.3, rotate: 45 }}
            onHoverStart={() => setActiveCard(item.id)}
            onHoverEnd={() => setActiveCard(null)}
          >
            <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm" />
            <motion.div
              initial={{ rotate: 0 }}
              whileInView={{ rotate: 360 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.4 + 0.5 }}
            >
              {item.icon}
            </motion.div>
          </motion.div>

          {/* Enhanced floating particles around timeline node */}
          <motion.div
            className="absolute left-0 w-8 h-8 md:left-1/2 md:-translate-x-1/2"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: index * 0.3,
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-sm" />
          </motion.div>

          <div className={`w-full md:w-[calc(50%-40px)] ${index % 2 === 0 ? "md:pr-10" : "md:pl-10"}`}>
            <motion.div
              whileHover={{ y: -12, scale: 1.02 }}
              onHoverStart={() => setHoveredId(item.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="relative rounded-3xl border border-border bg-card/40 p-8 shadow-xl backdrop-blur-md transition-all duration-500 hover:border-primary/50 hover:shadow-2xl overflow-hidden group education-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.4 + 0.7,
                duration: 1,
                ease: [0.4, 0.0, 0.2, 1]
              }}
            >
              {/* Enhanced animated background gradient */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
              />
              
              {/* Enhanced glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${item.color?.split(' ')[1]}/20, transparent 70%)`
                }}
                animate={{
                  opacity: hoveredId === item.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10">
                {/* Status badge */}
                <motion.div
                  className="absolute top-4 right-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.4 + 1 }}
                >
                  <Badge 
                    variant={item.status === "current" ? "default" : "secondary"}
                    className={`${
                      item.status === "current" 
                        ? "bg-green-500/20 text-green-600 border-green-500/30" 
                        : "bg-blue-500/20 text-blue-600 border-blue-500/30"
                    }`}
                  >
                    {item.status === "current" ? "Current" : "Completed"}
                  </Badge>
                </motion.div>

                <div className="flex flex-col items-start gap-6 md:flex-row md:justify-between">
                  <div className="flex-1">
                    <motion.div 
                      className="mb-4 flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.4 + 1.2 }}
                    >
                      <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{item.startDate} - {item.endDate}</span>
                      </div>
                      {item.gpa && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>GPA: {item.gpa}</span>
                        </div>
                      )}
                    </motion.div>
                    
                    <motion.h3 
                      className="mb-4 text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.4 + 1.4 }}
                    >
                      {item.institution}
                    </motion.h3>
                    
                    <motion.p 
                      className="mb-3 text-xl font-semibold text-primary"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.4 + 1.6 }}
                    >
                      {item.degree} • {item.field}
                    </motion.p>
                    
                    <motion.div 
                      className="mb-4 text-sm text-muted-foreground flex items-center gap-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.4 + 1.8 }}
                    >
                      <MapPin className="h-4 w-4" />
                      <span>{item.location}</span>
                    </motion.div>
                    
                    <motion.p 
                      className="mb-6 text-muted-foreground leading-relaxed text-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.4 + 2 }}
                    >
                      {item.description}
                    </motion.p>

                    {/* Highlights section */}
                    {item.highlights && (
                      <motion.div
                        className="mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.4 + 2.2 }}
                      >
                        <h4 className="text-lg font-semibold mb-3 text-primary">Key Highlights</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {item.highlights.map((highlight, idx) => (
                            <motion.div
                              key={idx}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.4 + 2.4 + idx * 0.1 }}
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              <span>{highlight}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                  
                  <Link href={item.website} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                    <motion.div 
                      className="relative h-24 w-24 overflow-hidden rounded-2xl border border-border transition-all duration-300 hover:border-primary group-hover:scale-110 shadow-lg"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.4 + 2.6 }}
                    >
                      <Image
                        src={item.logo || "/placeholder.svg"}
                        alt={item.institution}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  </Link>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.4 + 2.8 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpand(item.id)}
                    className="mt-6 flex items-center gap-2 text-primary hover:text-primary/80 group/btn"
                  >
                    {expandedId === item.id ? (
                      <>
                        <ChevronUp className="h-4 w-4 group-hover/btn:rotate-180 transition-transform duration-300" />
                        <span>Show less</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 group-hover/btn:rotate-180 transition-transform duration-300" />
                        <span>View courses & details</span>
                      </>
                    )}
                  </Button>
                </motion.div>

                <AnimatePresence>
                  {expandedId === item.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
                      className="mt-8 space-y-8 overflow-hidden"
                    >
                      {item.courses && item.courses.length > 0 && (
                        <div className="space-y-6">
                          <motion.div 
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <BookOpen className="h-6 w-6 text-primary" />
                            <h4 className="text-2xl font-bold">Key Courses</h4>
                          </motion.div>
                          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {item.courses.map((course, idx) => (
                              <motion.div 
                                key={idx} 
                                className="group/course rounded-2xl border border-border bg-background/50 p-6 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-xl overflow-hidden course-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + idx * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                              >
                                {/* Course background gradient */}
                                <div 
                                  className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover/course:opacity-5 transition-opacity duration-300 rounded-2xl`}
                                />
                                
                                <div className="relative z-10">
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className={`p-2 rounded-lg bg-gradient-to-br ${course.color} text-white`}>
                                      {course.icon}
                                    </div>
                                    <h5 className="text-lg font-bold text-primary">{course.name}</h5>
                                  </div>
                                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{course.description}</p>
                                  <div className="flex flex-wrap gap-2">
                                    {course.skills.map((skill, skillIdx) => (
                                      <Badge key={skillIdx} variant="outline" className="text-xs bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      <motion.div 
                        className="flex justify-end"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Button variant="outline" size="lg" asChild className="group">
                          <Link
                            href={item.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3"
                          >
                            Visit Website 
                            <ExternalLink className="ml-1 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                          </Link>
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
