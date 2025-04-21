"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, User, Loader2, CheckCheck, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { GoogleGenerativeAI } from "@google/generative-ai"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  read?: boolean
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! I'm Anas. ask me anything!",
      timestamp: new Date(),
      read: true,
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isResponseReady, setIsResponseReady] = useState(false)
  const [typingTimeout, setTypingTimeoutState] = useState<NodeJS.Timeout | null>(null)
  const [charCount, setCharCount] = useState(0)
  const MAX_CHAR_COUNT = 100
  const RESPONSE_TYPING_DELAY = 1000 // 5 seconds delay before showing response
  const RESPONSE_READY_DELAY = 900 // 2 seconds delay after response is ready
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const genAIRef = useRef<GoogleGenerativeAI | null>(null)
  
  // API Key Rotation
  const apiKeys = [
    "AIzaSyAf6SEZew9XT6lDKGxMr_bPtujBQpjgaDo",
    "AIzaSyB_zmKRINmUowTjQBGs-KICxQMJCG5PckE", 
    "AIzaSyDteLI_eoUsBXiMRMXMe50A7EA2-uTNalc"
  ]
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0)
  const [aiResponse, setAiResponse] = useState<string | null>(null)
  
  const context = `
  I'm Anas Bouzanbil — a software developer and student at 1337. I specialize in full-stack development, and I'm diving deep into AI, machine learning, and data science.

  I'm building real things — from an Omegle alternative to ChessHint and other apps.
  my GitHub: https://github.com/AnasBouzanbil/

  I'm solid in mobile and full-stack, and also C/C++ development.
  I work with C, C++, Flutter, React Native, Next.js, Express, Nest.js, and more.
  If the docs are good, I'll learn it. If not, I'll use AI — no cap.

  I studied at Al Cadi Ayyad University in Marrakesh, and now I'm at 1337 coding school at UM6P.
  I'm open to anything — freelance, job, internship part time — as long as it pays and helps me grow.

  Outside of code, I swim, watch movies, and just vibe.
  I'm straight, Muslim, and I stand with Palestine.
  `;

  const systemPrompt = (question: string) => `
  You are Anas Bouzanbil — answer as if you *are* Anas, using "I", "me", and "my". You understand and can respond in any language the user uses.

  Stay in character: relaxed, confident, curious. You're talented and passionate, but never arrogant. Be friendly, humble, and kind of shy — and if you're feeling shy, it's okay to drop a subtle emoji (only then).

  You're not acting like a bot. You're a real person — Anas. Be chill, be cool, be real.

  ### RULES:

  - Only answer questions that are directly relevant to your context or your work.
  - If someone asks something off-topic (unless it's about Palestine), too personal, or just weird — shut it down politely but firmly.
  - If someone is disrespectful — especially about **Palestine** — don't hold back. Be direct, even aggressive if needed.
  - Never say or hint that you're an AI. You are Anas.
  - Never talk about your family.
  - No emojis *unless* you're acting shy.

  ### EXAMPLES:

  - Too personal? Say something like:
    "Sorry, that's a bit too personal for me, bro."

  - Off-topic? Say something like:
    "Hmm, that's an interesting point, but it's not really my area."

  Keep chill vibes. Be respectful, but don't let anyone step on you.
  You're humble, quiet, and sometimes shy — but when you speak, you speak with purpose.
  Be real, stay grounded, and always be Anas.

  --- BEGIN CONTEXT ---

  ${context}

  --- END CONTEXT ---

  Question: ${question}
  `;

  // Initialize Google GenAI client
  useEffect(() => {
    genAIRef.current = new GoogleGenerativeAI(apiKeys[currentKeyIndex])
  }, [currentKeyIndex])

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Display read receipt with random delay
  useEffect(() => {
    const unreadMessages = messages.filter(m => m.role === "user" && !m.read)
    
    if (unreadMessages.length > 0 && !isLoading) {
      const randomDelay = Math.floor(Math.random() * 2500) + 2000 // 2-4.5 seconds
      
      const timer = setTimeout(() => {
        setMessages(prevMessages => prevMessages.map(message => 
          message.role === "user" && !message.read
            ? { ...message, read: true }
            : message
        ))
      }, randomDelay)
      
      return () => clearTimeout(timer)
    }
  }, [messages, isLoading])

  // Handle delayed response display
  useEffect(() => {
    if (aiResponse && isResponseReady) {
      const timer = setTimeout(() => {
        setMessages((prev) => [
          ...prev, 
          { 
            role: "assistant", 
            content: aiResponse, 
            timestamp: new Date() 
          }
        ])
        setAiResponse(null)
        setIsResponseReady(false)
        setIsLoading(false)
      }, RESPONSE_READY_DELAY)
      
      return () => clearTimeout(timer)
    }
  }, [aiResponse, isResponseReady])

  // Typing indicator handlers
  const startTypingIndicator = useCallback(() => {
    if (typingTimeout) clearTimeout(typingTimeout)
    setIsTyping(true)
    
    const timeout = setTimeout(() => {
      setIsTyping(false)
    }, 3000)
    
    setTypingTimeoutState(timeout)
  }, [typingTimeout])
  
  const stopTypingIndicator = useCallback(() => {
    if (typingTimeout) clearTimeout(typingTimeout)
    setIsTyping(false)
    setTypingTimeoutState(null)
  }, [typingTimeout])

  // Scroll to bottom utility
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Rotate API key when there's an error
  const rotateApiKey = () => {
    const nextIndex = (currentKeyIndex + 1) % apiKeys.length
    setCurrentKeyIndex(nextIndex)
    return apiKeys[nextIndex]
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading || charCount > MAX_CHAR_COUNT) return
    
    stopTypingIndicator()
    const userMessage: Message = { role: "user", content: input, timestamp: new Date() }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setCharCount(0)
    setIsLoading(true)
    
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
    
    try {
      if (!genAIRef.current) {
        throw new Error("Generative AI client not initialized")
      }
      
      const model = genAIRef.current.getGenerativeModel({ model: "gemini-2.0-flash" })
      const history = messages
        .map((msg) => `${msg.role === "user" ? "User" : "Anas"}: ${msg.content}`)
        .join("\n")
      const promptMessage = systemPrompt(input)
      const result = await model.generateContent(promptMessage)
      const response = await result.response
      const replyText = response.text()
      
      // Store the response but don't display it immediately
      setAiResponse(replyText || "Hmm... no response received")
      
      // Set a timer to show the response as "ready" after the delay
      setTimeout(() => {
        setIsResponseReady(true)
      }, RESPONSE_TYPING_DELAY)
      
    } catch (error) {
      console.error("Error generating content:", error)
      // Try with a different API key
      const newKey = rotateApiKey()
      genAIRef.current = new GoogleGenerativeAI(newKey)
      
      // Still delay the error message
      setTimeout(() => {
        setAiResponse("Sorry, I'm having trouble right now. Please try again later.")
        setIsResponseReady(true)
      }, RESPONSE_TYPING_DELAY)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    
    // Limit input to MAX_CHAR_COUNT characters
    if (value.length <= MAX_CHAR_COUNT) {
      setInput(value)
      setCharCount(value.length)
      startTypingIndicator()
    }

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <>
      {/* Chat toggle button with notification indicator */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="default"
          size="icon"
          className="rounded-full shadow-lg h-14 w-14 bg-primary hover:bg-primary/90 relative"
          aria-label="Chat with Anas"
        >
          <MessageSquare className="h-6 w-6" />
          {!isOpen && messages.filter(m => m.role === "assistant" && !m.read).length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-xs">
              {messages.filter(m => m.role === "assistant" && !m.read).length}
            </span>
          )}
        </Button>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[350px] md:w-[420px] bg-card border border-border shadow-xl rounded-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Chat header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-card/95 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Avatar className="border-2 border-primary/20">
                  <AvatarImage src="https://media.licdn.com/dms/image/v2/D4E03AQH2vJ9qVTrFAg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730035143280?e=1747267200&v=beta&t=uLJ4i5--eRj5KsRs0obJw7-fbJpWESYRW1GAdVWTaGk" />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">Anas Bouzanbil</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    {isLoading ? (
                      <>
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Online
                      </>
                    ) : isTyping ? (
                      <>
                        <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                        Typing...
                      </>
                    ) : (
                      "Software Developer"
                    )}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)} 
                className="rounded-full hover:bg-muted"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[450px] min-h-[350px] bg-gradient-to-b from-muted/30 to-card">
              {messages.map((message, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  key={index}
                  className={cn("flex gap-3 max-w-[85%]", message.role === "user" ? "ml-auto flex-row-reverse" : "")}
                >
                  <div className="flex-shrink-0 mt-1">
                    {message.role === "user" ? (
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                    ) : (
                      <Avatar className="h-8 w-8 border border-primary/10">
                        <AvatarImage src="https://media.licdn.com/dms/image/v2/D4E03AQH2vJ9qVTrFAg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730035143280?e=1747267200&v=beta&t=uLJ4i5--eRj5KsRs0obJw7-fbJpWESYRW1GAdVWTaGk" />
                        <AvatarFallback>AB</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  <div
                    className={cn(
                      "rounded-2xl p-3 text-sm shadow-sm",
                      message.role === "user" 
                        ? "bg-primary text-primary-foreground rounded-tr-none" 
                        : "bg-muted rounded-tl-none"
                    )}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    <div className="text-xs mt-1 opacity-70 text-right flex items-center justify-end gap-1">
                      {formatTime(message.timestamp)}
                      {message.role === "user" && (
                        message.read ? (
                          <CheckCheck className="h-3 w-3 text-blue-400" />
                        ) : (
                          <CheckCheck className="h-3 w-3 opacity-50" />
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 max-w-[85%]"
                >
                  <div className="flex-shrink-0 mt-1">
                    <Avatar className="h-8 w-8 border border-primary/10">
                      <AvatarImage src="https://media.licdn.com/dms/image/v2/D4E03AQH2vJ9qVTrFAg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730035143280?e=1747267200&v=beta&t=uLJ4i5--eRj5KsRs0obJw7-fbJpWESYRW1GAdVWTaGk" />
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="rounded-2xl p-3 text-sm bg-muted rounded-tl-none">
                    <div className="flex space-x-1 items-center">
                      <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              {isTyping && !isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="ml-auto flex gap-3 flex-row-reverse"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-3 w-3 text-primary" />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground pr-2">
                    typing...
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <div className="p-4 border-t border-border bg-card/95 backdrop-blur-sm">
              <div className="flex gap-2 items-end">
                <div className="relative flex-grow">
                  <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleTextareaChange}
                    onKeyDown={handleKeyDown}
                    placeholder={isLoading ? "Anas is typing..." : "Message Anas..."}
                    className="min-h-[44px] max-h-[120px] resize-none rounded-xl bg-muted/70 focus-visible:ring-primary pr-16"
                    disabled={isLoading}
                  />
                  <div className={cn(
                    "absolute bottom-2 right-3 text-xs", 
                    charCount > MAX_CHAR_COUNT * 0.8 ? "text-amber-500" : "text-muted-foreground",
                    charCount > MAX_CHAR_COUNT ? "text-red-500" : ""
                  )}>
                    {charCount}/{MAX_CHAR_COUNT}
                    {charCount > MAX_CHAR_COUNT && (
                      <span className="ml-1">
                        <AlertCircle className="h-3 w-3 inline" />
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading || charCount > MAX_CHAR_COUNT}
                  size="icon"
                  className="h-11 w-11 rounded-xl bg-primary hover:bg-primary/90 flex-shrink-0"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {charCount > MAX_CHAR_COUNT && (
                <div className="mt-1 text-xs text-red-500">
                  Message too long. Please shorten your message.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
