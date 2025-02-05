const sections = document.querySelectorAll("section")
const navDots = document.querySelectorAll(".nav-dot")
let currentSectionIndex = 0

function updateSection(index) {
  sections.forEach((section) => {
    section.classList.remove("active")
  })
  navDots.forEach((dot) => {
    dot.classList.remove("active")
  })

  sections[index].classList.add("active")
  navDots[index].classList.add("active")
  currentSectionIndex = index
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" && currentSectionIndex < sections.length - 1) {
    updateSection(currentSectionIndex + 1)
  } else if (event.key === "ArrowUp" && currentSectionIndex > 0) {
    updateSection(currentSectionIndex - 1)
  }
})

let wheelTimeout
document.addEventListener("wheel", (event) => {
  if (wheelTimeout) return

  wheelTimeout = setTimeout(() => {
    wheelTimeout = null
  }, 500)

  if (event.deltaY > 0 && currentSectionIndex < sections.length - 1) {
    updateSection(currentSectionIndex + 1)
  } else if (event.deltaY < 0 && currentSectionIndex > 0) {
    updateSection(currentSectionIndex - 1)
  }
})

emailjs.init({
  publicKey: "kc3e4_a8EsRdyRu6D",
})

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contactForm")
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault()
      alert("Form submitted!")

      emailjs.sendForm("service_2pqx0u1", "template_my2xqif", this, "kc3e4_a8EsRdyRu6D").then(
        () => {
          form.reset()
          updateSection(0)
        },
        (error) => {
          alert("Failed to send message. Please try again later.")
          console.error("EmailJS Error:", error)
        },
      )
    })
  } else {
    console.error("Form element not found.")
  }
})

updateSection(0)

// Add this to your JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Initial animation for hero section
  const heroSection = document.querySelector(".hero-content")
  if (heroSection) {
    heroSection.style.opacity = "1"
  }

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  // Function to handle scroll animations
  function handleScrollAnimations() {
    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((element) => {
      if (isInViewport(element)) {
        element.classList.add("in-view")
      }
    })
  }

  // Add scroll event listener
  window.addEventListener("scroll", handleScrollAnimations)

  // Initial check for elements in viewport
  handleScrollAnimations()

  // Animate social icons one by one
  const socialLinks = document.querySelectorAll(".social-links a")
  socialLinks.forEach((link, index) => {
    link.style.animation = `fadeInUp 0.5s ease forwards ${1.2 + index * 0.1}s`
  })
})

const cursorDot = document.querySelector(".cursor-dot")
const cursorOutline = document.querySelector(".cursor-dot-outline")

console.log(cursorDot) // Check if the element exists
console.log(cursorOutline) // Check if the element exists

function updateCursorPosition(e) {
  const x = e.clientX
  const y = e.clientY

  cursorDot.style.left = `${x}px`
  cursorDot.style.top = `${y}px`
  cursorOutline.style.left = `${x}px`
  cursorOutline.style.top = `${y}px`
}

document.addEventListener("mousemove", updateCursorPosition)

const container = document.querySelector("body")
container.addEventListener("click", (event) => {
  const spark = document.createElement("div")
  spark.classList.add("spark")

  spark.style.top = event.clientY - container.offsetTop + "px"
  spark.style.left = event.clientX - container.offsetLeft + "px"
  spark.style.filter = "hue-rotate(" + Math.random() * 360 + "deg)"
  container.appendChild(spark)

  for (var i = 0; i <= 7; i++) {
    const span = document.createElement("span")
    span.style.transform = "rotate(" + i * 45 + "deg)"
    spark.appendChild(span)
  }

  setTimeout(() => {
    spark.remove()
  }, 1500)
})

// Add this code to handle the back-to-top button functionality
const backToTopButton = document.getElementById("back-to-top")

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.style.display = "block"
  } else {
    backToTopButton.style.display = "none"
  }
})

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

