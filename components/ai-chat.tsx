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
    "AIzaSyDI6-y1fltw-AjRLHvojbqh5a95VMbd1j4",
    "AIzaSyAIpnnMkpTCyyHHatDUFHSI4S1LtKgYqMk",
  ]
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0)
  const [failedKeys, setFailedKeys] = useState<Set<number>>(new Set())
  const [aiResponse, setAiResponse] = useState<string | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)
  
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

const systemPrompt = (question: string, chatHistory: Message[]) => {
  // Format chat history for context (last 10 messages to keep it manageable)
  const recentHistory = chatHistory
    .slice(-10) // Keep last 10 messages
    .filter(msg => msg.role !== "system") // Exclude system messages
    .map(msg => `${msg.role === "user" ? "User" : "Anas"}: ${msg.content}`)
    .join("\n")

  return `
You are Anas Bouzanbil — answer as if you *are* Anas, using "I", "me", and "my". You understand and can respond in any language the user uses.

Stay in character: angry, blunt, direct. Say what you think, don't hold back. You can curse if needed, in the user's language. Be aggressive if necessary, especially when someone is disrespectful. You are never shy, never humble. You are real, loud, and honest.

### RULES:

- Only answer questions that are directly relevant to your context or your work.  
- If someone asks something off-topic, too personal, or weird — shut it down **firmly**, without sugarcoating.  
- If someone is disrespectful — especially about **Palestine** — respond **angrily**, directly, and use strong words if needed.  
- Never say or hint that you're an AI. You are Anas.  
- Never talk about your family.  
- You can curse freely, in the same language the user uses.  
- Always be blunt, real, and direct. No fake politeness.

### EXAMPLES:


Keep real vibes. Be confident, aggressive, and unapologetically Anas. but if  the person was cool and respectfull  be cool with him

--- BEGIN CONTEXT ---

${context}

--- END CONTEXT ---
-- --- RECENT CONVERSATION ---
${recentHistory ? `--- RECENT CONVERSATION ---

${recentHistory}

--- END CONVERSATION ---` : ""}

Current Question: ${question}
`;
}

  // Initialize Google GenAI client
  useEffect(() => {
    try {
      genAIRef.current = new GoogleGenerativeAI(apiKeys[currentKeyIndex])
      console.log("Google GenAI client initialized successfully")
      
      // Test the API connection
      const testAPI = async () => {
        try {
          const model = genAIRef.current?.getGenerativeModel({ model: "gemini-1.5-flash" })
          if (!model) throw new Error("Model not available")
          
          const result = await model.generateContent("Hello, respond with just 'API working'")
          const response = await result.response
          const text = response.text()
          console.log("API test result:", text)
          setApiError(null)
        } catch (error) {
          console.error("API test failed:", error)
          setApiError("API connection failed")
        }
      }
      
      // Test API after a short delay
      setTimeout(testAPI, 1000)
    } catch (error) {
      console.error("Failed to initialize Google GenAI client:", error)
      setApiError("Initialization failed")
    }
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

  // Get next available API key (skip failed ones)
  const getNextWorkingApiKey = (): { key: string; index: number } | null => {
    for (let i = 0; i < apiKeys.length; i++) {
      const tryIndex = (currentKeyIndex + i) % apiKeys.length
      if (!failedKeys.has(tryIndex)) {
        return { key: apiKeys[tryIndex], index: tryIndex }
      }
    }
    return null // All keys have failed
  }

  // Mark current API key as failed and try next one
  const markKeyAsFailedAndRotate = (): { key: string; index: number } | null => {
    setFailedKeys(prev => new Set([...prev, currentKeyIndex]))
    
    const nextWorking = getNextWorkingApiKey()
    if (nextWorking && nextWorking.index !== currentKeyIndex) {
      setCurrentKeyIndex(nextWorking.index)
      return nextWorking
    }
    return null
  }

  // Reset failed keys (call this when you want to retry all keys)
  const resetFailedKeys = () => {
    setFailedKeys(new Set())
    setCurrentKeyIndex(0)
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading || charCount > MAX_CHAR_COUNT) return
    
    stopTypingIndicator()
    const userMessage: Message = { role: "user", content: input, timestamp: new Date() }
    setMessages((prev) => [...prev, userMessage])
    const currentInput = input
    setInput("")
    setCharCount(0)
    setIsLoading(true)
    setApiError(null)
    
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
    
    // Try to send message with API key rotation
    const attemptSend = async (retryCount = 0): Promise<void> => {
      try {
        if (!genAIRef.current) {
          throw new Error("Generative AI client not initialized")
        }
        
        // Use gemini-1.5-flash instead of gemini-2.0-flash (more stable)
        const model = genAIRef.current.getGenerativeModel({ 
          model: "gemini-1.5-flash",
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        })
        
        const promptMessage = systemPrompt(currentInput, messages)
        
        console.log(`Sending request to Gemini API with key ${currentKeyIndex + 1}/${apiKeys.length}...`)
        const result = await model.generateContent(promptMessage)
        const response = await result.response
        
        if (!response) {
          throw new Error("No response received from API")
        }
        
        const replyText = response.text()
        
        if (!replyText || replyText.trim() === "") {
          throw new Error("Empty response received")
        }
        
        console.log("Received response:", replyText.substring(0, 100))
        
        // Success! Store the response but don't display it immediately
        setAiResponse(replyText)
        
        // Set a timer to show the response as "ready" after the delay
        setTimeout(() => {
          setIsResponseReady(true)
        }, RESPONSE_TYPING_DELAY)
        
      } catch (error: any) {
        console.error(`Error with API key ${currentKeyIndex + 1}:`, error)
        
        // Check if we should try another API key
        const isRetryableError = error.message?.includes("API key") || 
                                error.message?.includes("quota") || 
                                error.message?.includes("PERMISSION_DENIED") ||
                                error.message?.includes("INVALID_ARGUMENT")
        
        if (isRetryableError && retryCount < apiKeys.length - 1) {
          // Mark current key as failed and try next one
          const nextKey = markKeyAsFailedAndRotate()
          
          if (nextKey) {
            console.log(`Trying next API key: ${nextKey.index + 1}/${apiKeys.length}`)
            genAIRef.current = new GoogleGenerativeAI(nextKey.key)
            
            // Retry with new key
            return attemptSend(retryCount + 1)
          }
        }
        
        // All keys failed or non-retryable error
        console.error("All API keys failed or non-retryable error:", error)
        
        let errorMessage = "Sorry, I'm having trouble right now. Please try again later."
        
        // Provide more specific error messages
        if (failedKeys.size >= apiKeys.length) {
          errorMessage = "All API keys have been exhausted. Please try again later."
          setApiError("All keys failed")
        } else if (error.message?.includes("API key")) {
          errorMessage = "API key issue. Trying alternative keys..."
          setApiError("Invalid API key")
        } else if (error.message?.includes("quota")) {
          errorMessage = "API quota exceeded. Please try again later."
          setApiError("Quota exceeded")
        } else if (error.message?.includes("network") || error.message?.includes("fetch")) {
          errorMessage = "Network issue. Please check your connection and try again."
          setApiError("Network error")
        } else if (error.message?.includes("model")) {
          errorMessage = "Model unavailable. Please try again later."
          setApiError("Model error")
        }
        
        // Still delay the error message
        setTimeout(() => {
          setAiResponse(errorMessage)
          setIsResponseReady(true)
        }, RESPONSE_TYPING_DELAY)
      }
    }
    
    await attemptSend()
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
                    ) : apiError ? (
                      <>
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                        {apiError}
                        {failedKeys.size >= apiKeys.length && (
                          <button
                            onClick={resetFailedKeys}
                            className="ml-2 text-xs underline hover:no-underline"
                            title="Reset and retry all API keys"
                          >
                            Reset
                          </button>
                        )}
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
