// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNav);

// AI Chatbot
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotInput = document.getElementById('chatbot-input-field');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');

// Chatbot knowledge base
const chatbotKnowledge = {
    greetings: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'],
    pricing: ['price', 'cost', 'pricing', 'how much', 'expensive', 'cheap', 'fee', 'payment'],
    features: ['feature', 'capability', 'what can', 'functions', 'abilities', 'do you have'],
    ai: ['ai', 'artificial intelligence', 'machine learning', 'llm', 'cerebras', 'gemini', 'model'],
    voice: ['voice', 'speak', 'talk', 'speech', 'whisper', 'tts', 'microphone'],
    camera: ['camera', 'ring', 'video', 'footage', 'surveillance', 'security'],
    privacy: ['privacy', 'private', 'local', 'cloud', 'data', 'secure', 'security'],
    installation: ['install', 'setup', 'deploy', 'configure', 'implementation'],
    hardware: ['hardware', 'jetson', 'nvidia', 'device', 'equipment'],
    support: ['support', 'help', 'assistance', 'problem', 'issue', 'trouble'],
    contact: ['contact', 'email', 'phone', 'reach', 'call', 'message']
};

const chatbotResponses = {
    greeting: "👋 Hello! I'm your AI assistant for AI SmartHome Solutions. I can help you learn about our features, pricing, installation process, and more. What would you like to know?",

    pricing: "💰 We offer three pricing tiers:\n\n• Entry: $49/month + $149-$249 hardware (cloud-assisted, basic features)\n• Pro: $79/month + $249-$399 hardware (100% local option, advanced features) - Most Popular!\n• Enterprise: $199/month + $399+ hardware (multi-tenant, white-label)\n\nAll plans include AI chat, voice control, Ring camera analysis, and remote access. Would you like more details about a specific tier?",

    features: "🚀 Our system includes cutting-edge features:\n\n✨ Three-Tier Intelligence (learns from you)\n⚡ Ultra-Fast AI (0.37s response time)\n🎥 AI Video Analysis with Gemini\n🔒 100% Privacy-First Option\n🎤 Advanced Voice Control\n🎨 AI Image Generation (0.5s)\n🔍 Auto Device Discovery\n🏠 Interactive Floor Plans\n\nWhich feature would you like to learn more about?",

    ai: "🧠 Our AI stack is industry-leading:\n\n• Cerebras Llama 70B (0.37s responses - 10x faster than ChatGPT)\n• Gemini 2.5 Flash for video analysis\n• FAL.ai Flux for image generation\n• Whisper for speech recognition\n• Automatic cloud/local fallback\n\nWe use cloud AI for speed but can run 100% locally for privacy. You choose!",

    voice: "🎤 Voice control features:\n\n• Natural language understanding (talk normally)\n• Browser-based (click & talk from any device)\n• Optional wake-word ('Computer')\n• Sub-3s response pipeline\n• Free Piper TTS or premium ElevenLabs\n• Works remotely via Tailscale HTTPS\n\nNo complicated commands - just speak naturally!",

    camera: "📹 Ring Camera AI Analysis:\n\n• Gemini 2.5 Flash analyzes your videos\n• Identifies people, packages, vehicles, animals\n• Intelligent caching (sub-second retrieval)\n• Daily/weekly digest summaries\n• Anomaly detection\n• Natural language queries ('Show me people at my door this week')\n\nFirst analysis: 10-30s. After that: instant!",

    privacy: "🔒 Privacy is our priority:\n\n• 100% local processing option (Pro tier)\n• Your data NEVER leaves your network\n• No vendor data mining\n• End-to-end encrypted remote access\n• Open source foundation (Home Assistant)\n• You own ALL your data\n\nChoose cloud for speed or local for privacy - or switch anytime!",

    installation: "🛠️ Professional installation:\n\n• White-glove setup ($99-$999)\n• Complete in 30-60 minutes\n• Hardware optimization\n• All services deployed\n• Device pairing & testing\n• Custom automation setup\n• Training included\n\nSame-day service available in select areas!",

    hardware: "⚡ NVIDIA Jetson powered:\n\n• Entry: Orin Nano 8GB ($149-$249)\n• Pro: Orin NX 16GB ($249-$399)\n• Enterprise: AGX Orin 32GB ($399+)\n\nAll include GPU acceleration for AI, NVMe storage, and professional-grade reliability. The hardware is included in our managed plans!",

    support: "💬 Support options:\n\n• Email support (all plans, 48hr response)\n• Priority support (Pro tier, 24hr response)\n• Phone support (Enterprise)\n• Live chat (business hours)\n• Knowledge base & video tutorials\n• Community forum\n\nNeed help with something specific?",

    contact: "📧 Get in touch:\n\n• Visit our Contact page\n• Email: info@aismarthome.com\n• Schedule a demo\n• Request a quote\n\nOur team typically responds within 24 hours. What's the best way to reach you?",

    default: "I'm not sure I understand that question. I can help you with:\n\n💰 Pricing & plans\n🚀 Features & capabilities\n🧠 AI technology\n🎤 Voice control\n📹 Camera analysis\n🔒 Privacy & security\n🛠️ Installation\n⚡ Hardware specs\n💬 Support options\n📧 Contact information\n\nWhat would you like to know?"
};

// Toggle chatbot
chatbotToggle?.addEventListener('click', () => {
    chatbotToggle.classList.toggle('active');
    chatbotWindow.classList.toggle('active');

    if (chatbotWindow.classList.contains('active')) {
        chatbotInput.focus();
    }
});

// Send message
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    chatbotInput.value = '';

    // Simulate typing indicator
    setTimeout(() => {
        const response = generateResponse(message);
        addMessage(response, 'bot');
    }, 500);
}

chatbotSend?.addEventListener('click', sendMessage);
chatbotInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;

    messageDiv.appendChild(contentDiv);
    chatbotMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Generate AI response based on message
function generateResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Check for greetings
    if (chatbotKnowledge.greetings.some(word => lowerMessage.includes(word))) {
        return chatbotResponses.greeting;
    }

    // Check for pricing questions
    if (chatbotKnowledge.pricing.some(word => lowerMessage.includes(word))) {
        return chatbotResponses.pricing;
    }

    // Check for features
    if (chatbotKnowledge.features.some(word => lowerMessage.includes(word))) {
        return chatbotResponses.features;
    }

    // Check for AI questions
    if (chatbotKnowledge.ai.some(word => lowerMessage.includes(word))) {
        return chatbotResponses.ai;
    }

    // Check for voice
    if (chatbotKnowledge.voice.some(word => lowerMessage.includes(word))) {
        return chatbotResponses.voice;
    }

    // Check for camera
    if (chatbotKnowledge.camera.some(word => lowerMessage.includes(word))) {
        return chatbotResponses.camera;
    }

    // Check for privacy
    if (chatbotKnowledge.privacy.some(word => lowerMessage.includes(word))) {
        return chatbotResponses.privacy;
    }

    // Check for installation
    if (chatbotKnowledge.installation.some(word => lowerMessage.includes(word))) {
        return chatbotResponses.installation;
    }

    // Check for hardware
    if (chatbotKnowledge.hardware.some(word => lowerMessage.includes(word))) {
        return chatbotResponses.hardware;
    }

    // Check for support
    if (chatbotKnowledge.support.some(word => lowerMessage.includes(word))) {
        return chatbotResponses.support;
    }

    // Check for contact
    if (chatbotKnowledge.contact.some(word => lowerMessage.includes(word))) {
        return chatbotResponses.contact;
    }

    // Default response
    return chatbotResponses.default;
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.feature-card, .service-card, .pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Console welcome message
console.log('%c🏠 AI SmartHome Solutions', 'font-size: 24px; font-weight: bold; color: #667eea;');
console.log('%cPowered by NVIDIA Jetson & Cutting-Edge AI', 'font-size: 14px; color: #718096;');
console.log('%c0.37s response time | 100% privacy option | Enterprise-grade', 'font-size: 12px; color: #48bb78;');
