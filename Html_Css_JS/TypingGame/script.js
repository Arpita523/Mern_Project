const typingText = document.querySelector(".typing-text p")
const input = document.querySelector(".wrapper .input-field")
const time = document.querySelector(".time span b")
const mistakes = document.querySelector(".mistakes span") // Fixed: was .mistake span
const wpm = document.querySelector(".wpm span")
const cpm = document.querySelector(".cpm span")
const btn = document.querySelector("button") // Fixed: was .button

// set value
let timer = null // Fixed: initialized as null instead of 0
let maxTime = 60
let timeLeft = maxTime
let charIndex = 0
let mistake = 0
let isTyping = false

function loadParagraph() {
  const paragraph = [
    "Avoid daydreaming about the years to come.",
    "You are the most important person in your whole life.",
    "Always be true to who you are, and ignore what other people have to say about you.",
    "Always be true to who you are, and ignore what other people have to say about you.",
    "Only demonstrate your strength when it's really required.",
    "Subscribe to Drop X Out",
  ]
  const randomIndex = Math.floor(Math.random() * paragraph.length)
  typingText.innerHTML = ""
  for (const char of paragraph[randomIndex]) {
    console.log(char)
    typingText.innerHTML += `<span>${char}</span>`
  }
  // Fixed: Added safety check
  const spans = typingText.querySelectorAll("span")
  if (spans.length > 0) {
    spans[0].classList.add("active")
  }
  document.addEventListener("keydown", () => input.focus())
  typingText.addEventListener("click", () => input.focus())
}

// handle user input
function initTyping() {
  const chars = typingText.querySelectorAll("span")
  const typedChar = input.value.charAt(charIndex)

  if (charIndex < chars.length && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTime, 1000)
      isTyping = true
    }

    if (chars[charIndex].innerText === typedChar) {
      chars[charIndex].classList.add("correct")
      console.log("correct")
    } else {
      mistake++
      chars[charIndex].classList.add("incorrect")
      console.log("incorrect")
    }

    // Fixed: Remove active class from current character
    chars[charIndex].classList.remove("active")

    charIndex++

    // Fixed: Add active class to next character only if it exists
    if (charIndex < chars.length) {
      chars[charIndex].classList.add("active")
    }

    mistakes.innerText = mistake
    cpm.innerText = charIndex - mistake

    // Fixed: Check if paragraph is completed
    if (charIndex >= chars.length) {
      clearInterval(timer)
      input.value = ""
      isTyping = false
    }
  } else {
    clearInterval(timer)
    input.value = ""
    isTyping = false
  }
}

function initTime() {
  if (timeLeft > 0) {
    timeLeft--
    time.innerText = timeLeft
    let wpmVal = Math.round(
      ((charIndex - mistake) / 5 / (maxTime - timeLeft)) * 60
    )
    // Fixed: Handle NaN and Infinity cases
    if (isNaN(wpmVal) || !isFinite(wpmVal) || wpmVal < 0) {
      wpmVal = 0
    }
    wpm.innerText = wpmVal
  } else {
    clearInterval(timer)
    isTyping = false
  }
}

function reset() {
  loadParagraph()
  clearInterval(timer)
  timeLeft = maxTime
  charIndex = 0
  mistake = 0
  isTyping = false
  input.value = ""
  time.innerText = timeLeft
  wpm.innerText = 0
  cpm.innerText = 0
  mistakes.innerText = 0
}

input.addEventListener("input", initTyping)
btn.addEventListener("click", reset)
loadParagraph
