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
  console.log("Opps what are you doing here?")
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
document.addEventListener("DOMContentLoaded", () => {

  const heroSection = document.querySelector(".hero-content")
  if (heroSection) {
    heroSection.style.opacity = "1"
  }
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  function handleScrollAnimations() {
    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((element) => {
      if (isInViewport(element)) {
        element.classList.add("in-view")
      }
    })
  }

  window.addEventListener("scroll", handleScrollAnimations)

  handleScrollAnimations()

  const socialLinks = document.querySelectorAll(".social-links a")
  socialLinks.forEach((link, index) => {
    link.style.animation = `fadeInUp 0.5s ease forwards ${1.2 + index * 0.1}s`
  })
})

const cursorDot = document.querySelector(".cursor-dot")
const cursorOutline = document.querySelector(".cursor-dot-outline")


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



// Define the styles as objects for better organization
const styles = {
  greeting: `
    font-size: 24px;
    font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #2563eb;
    font-weight: bold;
    padding: 4px 0;
  `,
  
  intro: `
    font-size: 18px;
    font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #1f2937;
    line-height: 1.5;
  `,
  
  name: `
    font-size: 32px;
    font-family: 'Trattatello', fantasy	;
    color: #0f172a;
    font-weight: bold;

    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    background: linear-gradient(45deg,rgb(235, 37, 37),rgb(245, 62, 62));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding: 10px 0;
  `,
  
  title: `
    font-size: 20px;
    font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #4b5563;
    font-style: italic;
  `,
  
  message: `
    font-size: 18px;
    font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #374151;
    line-height: 1.6;
  `,
  
  closing: `
    font-size: 20px;
    font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #2563eb;
    font-weight: bold;
    padding: 4px 0;
  `
};

// The console message with improved structure
console.log(
  `%cHello! 👋\n` +
  `%cI see you're checking out my website.\n` +
  `%cWell I am ` +
  `%cAnas\n` +
  `%ca software engineer based in Morocco.\n\n` +
  `%cIf you're interested in working with me, feel free to reach out!\n` +
  `%cLet's chat about tech - I'm always open to new connections.\n` +
  `%cYou can send me a message via the contact section.\n\n` +
  `%cHave a great day! 🚀`,
  
  styles.greeting,
  styles.intro,
  styles.intro,
  styles.name,
  styles.title,
  styles.message,
  styles.message,
  styles.message,
  styles.closing
);