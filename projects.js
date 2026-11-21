// Edit this file to add videos: put the file in /videos and set `video: "videos/name.mp4"`.
const G = "https://github.com/asayenju/";

export const featured = [
  { name: "Banking Customer Service Agent", repo: "banking_customer_service_agent", live: "https://bankingcustomerserviceagent-fronten.vercel.app", pinned: true,
    desc: "Six specialist agents for credit cards, debit cards, rewards, fees and fraud. GPT-4 breaks down intents at about 85% accuracy and the Jev decision model picks each action. The model only reports what the customer said; code decides every rule and fee. The demo has 59 user personas to try.",
    tags: ["Python", "FastAPI", "GPT-4", "tau2-bench"], video: null },
  { name: "Memora", repo: "Memora", pinned: true,
    desc: "Slack-native memory for student clubs, built by a 3-person team in a 2-month agent builder challenge. Reconciles conflicting records across 3 systems at 95% recall and precision, with Elo-style source confidence and 452 pytest tests.",
    tags: ["Python", "Claude API", "pgvector", "MCP"], video: null },
  { name: "PM Review RAG", repo: "PM_review_rag", live: "https://pm-review-rag.vercel.app", pinned: true,
    desc: "Ask product-manager questions over customer reviews. Embeds reviews, retrieves feature-scoped evidence and answers with source labels.",
    tags: ["FastAPI", "Next.js", "Supabase", "RAG"], video: null },
  { name: "BMO Personal Assistant", repo: "meeting_schedule_assistant", pinned: true,
    desc: "Agentic assistant on Gemini that reads and sends email, checks calendars and schedules meetings, with a voice-driven hardware front end.",
    tags: ["Python", "Gemini", "Agents", "Hardware"], video: null },
  { name: "Interview Practice AI", repo: "interview-practice-ai-frontend", live: "https://interview-practice-ai-frontend.vercel.app", pinned: true,
    desc: "A React app for practising interviews with AI.",
    tags: ["React", "Vite"], video: null },
  { name: "Head Gesture Fatigue Detector", repo: "ERSP_Head_Gesture_detection", extra: [["Predictor", "HeadGesture_predictor"], ["Sensor backend", "sensor_reading_backend"]], pinned: true,
    desc: "Helmet sensors stream acceleration and gyroscope data over Bluetooth through Kafka into MySQL. ML models separate normal cycling from fatigued head motion.",
    tags: ["Python", "IoT", "Kafka", "ML"], video: null },
];

export { G };
