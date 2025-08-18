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
      
      {/* Removed internal gradient overlay to prevent edge seams; page background handles color */}

      <div ref={containerRef} className="relative max-w-6xl mx-auto px-6 py-20">
        {/* Scroll progress bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 origin-left bg-gradient-to-r from-primary via-pink-500 to-purple-500"
          style={{ scaleX: scrollYProgress }}
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Education
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My academic journey and learning experiences
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary to-pink-500 md:left-1/2 md:-translate-x-px" />

          {/* Timeline items */}
          <div className="space-y-16">
            {educationData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center`}
              >
                {/* Timeline node */}
                <motion.div
                  className="absolute left-8 w-4 h-4 bg-primary rounded-full border-4 border-background z-10 md:left-1/2 md:-translate-x-1/2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.3, duration: 0.4 }}
                  whileHover={{ scale: 1.5 }}
                >
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-50 dark:opacity-75" />
                </motion.div>

                {/* Content card */}
                <div className={`w-full md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                }`}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
                  >
                    {/* Status badge */}
                    <div className="flex justify-between items-start mb-6">
                      <Badge 
                        className={`${
                          item.status === "current" 
                            ? "bg-primary/10 text-primary border-primary/30" 
                            : "bg-muted text-muted-foreground dark:bg-gray-500/20 dark:text-gray-300 dark:border-gray-500/30"
                        } border`}
                      >
                        {item.status === "current" ? (
                          <><Clock className="h-3 w-3 mr-1" /> Current</>
                        ) : (
                          <><Award className="h-3 w-3 mr-1" /> Completed</>
                        )}
                      </Badge>
                      
                      {/* Logo */}
                      <motion.div 
                        className="w-16 h-16 rounded-xl overflow-hidden border border-border"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                      >
                        <img
                          src={item.logo}
                          alt={item.institution}
                          className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition"
                        />
                      </motion.div>
                    </div>

                    {/* Institution info */}
                    <div className="space-y-4 mb-6">
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>{item.startDate} - {item.endDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{item.location}</span>
                        </div>
                        {item.gpa && (
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>GPA: {item.gpa}</span>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-3xl font-bold text-foreground">
                        {item.institution}
                      </h3>
                      
                      <p className="text-xl text-primary font-medium">
                        {item.degree} • {item.field}
                      </p>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Highlights */}
                    {item.highlights && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-primary mb-3">Key Highlights</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {item.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Expand button */}
                    <div className="flex justify-between items-center">
                      <Button
                        variant="ghost"
                        onClick={() => toggleExpand(item.id)}
                        aria-expanded={expandedId === item.id}
                        className="p-0 text-primary hover:text-white hover:bg-primary/20"
                      >
                        {expandedId === item.id ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-2" />
                            Show less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-2" />
                            View courses
                          </>
                        )}
                      </Button>

                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-pink-500 transition-colors"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </div>

                    {/* Expandable content */}
                    <AnimatePresence>
                      {expandedId === item.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-8 pt-8 border-t border-border">
                            {item.courses && (
                              <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-6">
                                  <BookOpen className="h-5 w-5 text-primary" />
                                  <h4 className="text-xl font-bold text-foreground">Courses</h4>
                                </div>
                                
                                <div className="grid gap-6">
                                  {item.courses.map((course, idx) => (
                                    <motion.div
                                      key={idx}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: idx * 0.1 }}
                                      className="bg-muted/50 rounded-xl p-6 border border-border hover:border-primary/30 transition-colors"
                                    >
                                      <div className="flex items-start gap-4">
                                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                          {course.icon}
                                        </div>
                                        <div className="flex-1">
                                          <h5 className="text-lg font-semibold text-foreground mb-2">
                                            {course.name}
                                          </h5>
                                          <p className="text-muted-foreground mb-4 leading-relaxed">
                                            {course.description}
                                          </p>
                                          <div className="flex flex-wrap gap-2">
                                            {course.skills.map((skill, skillIdx) => (
                                              <Badge
                                                key={skillIdx}
                                                className="bg-primary/10 text-primary border-primary/20 text-xs"
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
      </div>
    </div>
  );
}