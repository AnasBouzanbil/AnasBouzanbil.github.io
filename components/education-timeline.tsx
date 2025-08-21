import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Calendar, 
  BookOpen, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  GraduationCap, 
  MapPin, 
  Star,
  Award,
  Clock,
  Zap
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface Course {
  name: string;
  description: string;
  skills: string[];
  icon?: React.ReactNode;
}

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  logo: string;
  website: string;
  location: string;
  description: string;
  courses?: Course[];
  highlights?: string[];
  gpa?: string;
  status?: "current" | "completed";
}

// Star background component
const StarField = () => {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-violet-400 dark:bg-violet-300 rounded-full opacity-60"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default function EducationTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

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
        },
        {
          name: "System Architecture",
          description: "Design and implementation of scalable system architectures with microservices and distributed systems",
          skills: ["System Design", "Microservices", "Distributed Systems", "Cloud Architecture"],
          icon: <Star className="h-4 w-4" />,
        },
        {
          name: "Full-Stack Development",
          description: "Building end-to-end web applications with modern technologies and best practices",
          skills: ["React", "Node.js", "Database Design", "API Development", "DevOps"],
          icon: <BookOpen className="h-4 w-4" />,
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
        },
        {
          name: "Linguistics",
          description: "Introduction to phonetics, syntax, semantics, and applied linguistics with practical applications",
          skills: ["Linguistic Theory", "Phonetics", "Spoken English", "Language Analysis"],
          icon: <Star className="h-4 w-4" />,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen text-foreground relative overflow-hidden">
      {/* Star field background */}
      <StarField />

      <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 py-16">
        {/* Scroll progress bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 origin-left bg-gradient-to-r from-primary via-pink-500 to-purple-500 rounded-full"
          style={{ scaleX: scrollYProgress }}
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-pink-500 to-purple-500 bg-clip-text text-transparent"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Education Journey
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Academic foundations and continuous learning experiences that shape my expertise
          </motion.p>
          
          {/* Quick stats */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-full border border-border/50">
              <GraduationCap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{educationData.length} Institutions</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-full border border-border/50">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">2020 - Present</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-full border border-border/50">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Morocco</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Timeline */}
        <div className="relative">
          {/* Main timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
          
          {/* Mobile timeline line */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />

          {/* Education items */}
          <div className="space-y-8 md:space-y-16">
            {educationData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.7, ease: "easeOut" }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-start md:items-center group`}
              >
                {/* Timeline node with enhanced animations */}
                <motion.div
                  className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-3 h-3 z-20"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.15 + 0.3, duration: 0.4, type: "spring" }}
                >
                  <div className="w-full h-full bg-primary rounded-full border-2 border-background relative">
                    <motion.div
                      className="absolute inset-0 bg-primary rounded-full"
                      animate={hoveredId === item.id ? {
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0.8, 0.5]
                      } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                  {item.status === "current" && (
                    <motion.div
                      className="absolute -inset-1 bg-primary/30 rounded-full"
                      animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Content card with improved layout */}
                <div className={`w-full md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? "md:pr-8 pl-16 md:pl-0" : "md:pl-8 pl-16 md:pl-0"
                }`}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.01 }}
                    className="bg-card/60 backdrop-blur-lg border border-border/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                  >
                    {/* Card header with improved visual hierarchy */}
                    <div className="p-6 pb-4">
                      <div className="flex items-start justify-between mb-4">
                        {/* Status and date */}
                        <div className="flex flex-col gap-2">
                          <Badge 
                            className={`w-fit ${
                              item.status === "current" 
                                ? "bg-primary text-white border-primary" 
                                : "bg-muted text-muted-foreground border-border"
                            }`}
                          >
                            {item.status === "current" ? (
                              <><Clock className="h-3 w-3 mr-1" /> Current</>
                            ) : (
                              <><Award className="h-3 w-3 mr-1" /> Completed</>
                            )}
                          </Badge>
                          
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span className="font-medium">{item.startDate} - {item.endDate}</span>
                          </div>
                        </div>
                        
                        {/* Logo with enhanced styling */}
                        <motion.div 
                          className="w-14 h-14 rounded-xl overflow-hidden border-2 border-border/30 group-hover:border-primary/50 transition-all duration-300"
                          whileHover={{ rotate: 5, scale: 1.05 }}
                        >
                          <img
                            src={item.logo}
                            alt={item.institution}
                            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                          />
                        </motion.div>
                      </div>

                      {/* Institution and degree info with better typography */}
                      <div className="space-y-2 mb-4">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                          {item.institution}
                        </h3>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <p className="text-base md:text-lg text-primary font-semibold">
                            {item.degree}
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{item.location}</span>
                            </div>
                            {item.gpa && (
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500" />
                                <span>GPA: {item.gpa}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm font-medium">
                          {item.field}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-4">
                        {item.description}
                      </p>

                      {/* Quick highlights preview */}
                      {item.highlights && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {item.highlights.slice(0, 3).map((highlight, idx) => (
                              <div key={idx} className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded-full">
                                <div className="w-1 h-1 bg-primary rounded-full" />
                                <span>{highlight}</span>
                              </div>
                            ))}
                            {item.highlights.length > 3 && (
                              <div className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                                +{item.highlights.length - 3} more
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action bar */}
                    <div className="px-6 py-3 bg-muted/20 border-t border-border/30 flex justify-between items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpand(item.id)}
                        className="text-primary hover:text-white hover:bg-primary/20 transition-colors"
                      >
                        {expandedId === item.id ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-1" />
                            Show less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-1" />
                            View details
                          </>
                        )}
                      </Button>

                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-pink-500 transition-colors p-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>

                    {/* Expandable content with enhanced styling */}
                    <AnimatePresence>
                      {expandedId === item.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden border-t border-border/30"
                        >
                          <div className="p-6">
                            {/* Full highlights */}
                            {item.highlights && (
                              <div className="mb-6">
                                <h4 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                                  <Star className="h-4 w-4" />
                                  Key Highlights
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {item.highlights.map((highlight, idx) => (
                                    <motion.div 
                                      key={idx} 
                                      className="flex items-center gap-2 text-sm text-muted-foreground"
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: idx * 0.05 }}
                                    >
                                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                                      <span>{highlight}</span>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Courses with better organization */}
                            {item.courses && (
                              <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                  <BookOpen className="h-5 w-5 text-primary" />
                                  <h4 className="text-lg font-bold text-foreground">Featured Courses</h4>
                                </div>
                                
                                <div className="grid gap-4">
                                  {item.courses.map((course, idx) => (
                                    <motion.div
                                      key={idx}
                                      initial={{ opacity: 0, y: 15 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: idx * 0.1 }}
                                      className="bg-background/50 rounded-xl p-4 border border-border/30 hover:border-primary/30 transition-all duration-300"
                                    >
                                      <div className="flex items-start gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg text-primary flex-shrink-0">
                                          {course.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <h5 className="font-semibold text-foreground mb-1 truncate">
                                            {course.name}
                                          </h5>
                                          <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                                            {course.description}
                                          </p>
                                          <div className="flex flex-wrap gap-1">
                                            {course.skills.map((skill, skillIdx) => (
                                              <Badge
                                                key={skillIdx}
                                                className="bg-primary/5 text-primary border-primary/20 text-xs px-2 py-0.5"
                                              >
                                                {skill}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced footer with education summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-card/30 backdrop-blur-sm rounded-full border border-border/50">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Continuous learning journey spanning <span className="font-semibold text-foreground">software engineering</span> and <span className="font-semibold text-foreground">humanities</span>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}