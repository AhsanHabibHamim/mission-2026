/* ═══════════════════════════════════════════════
   MISSION 2026 — SCRIPT
   Full functionality, localStorage, animations
═══════════════════════════════════════════════ */

"use strict";

/* ─── DATA ─── */
const SKILLS_DATA = [
  { id: "python", name: "Python", level: "Intermediate", pct: 45, status: "In Progress" },
  { id: "fastapi", name: "FastAPI", level: "Beginner", pct: 25, status: "In Progress" },
  { id: "postgres", name: "PostgreSQL", level: "Beginner", pct: 20, status: "In Progress" },
  { id: "dsa", name: "DSA", level: "Beginner", pct: 30, status: "In Progress" },
  { id: "sysdesign", name: "System Design", level: "Beginner", pct: 15, status: "Not Started" },
  { id: "backend", name: "Backend Dev", level: "Beginner", pct: 25, status: "In Progress" },
  { id: "english", name: "English Comm", level: "Intermediate", pct: 55, status: "In Progress" },
  { id: "portfolio", name: "Portfolio", level: "Starting", pct: 10, status: "Not Started" },
  { id: "upwork", name: "Upwork Profile", level: "Not Started", pct: 5, status: "Not Started" },
];

const ROUTINE_TASKS = [
  { id: "wake", label: "Wake Up Early", icon: "🌅" },
  { id: "python", label: "Study Python", icon: "🐍" },
  { id: "fastapi", label: "Practice FastAPI", icon: "⚡" },
  { id: "postgres", label: "Learn PostgreSQL", icon: "🗄️" },
  { id: "dsa", label: "Solve DSA", icon: "🧩" },
  { id: "project", label: "Build Project", icon: "🛠️" },
  { id: "english", label: "Improve English", icon: "🗣️" },
  { id: "exercise", label: "Exercise", icon: "💪" },
  { id: "docs", label: "Read Documentation", icon: "📖" },
  { id: "jobs", label: "Apply for Jobs", icon: "💼" },
  { id: "upwork", label: "Send Upwork Proposals", icon: "🚀" },
];

const QUOTES = [
  { text: "The man who moves a mountain begins by carrying away small stones.", author: "Confucius" },
  { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
  { text: "Success is not final, failure is not fatal — it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "There are no shortcuts. Hard work is the only thing that works.", author: "Unknown" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { text: "The difference between ordinary and extraordinary is that little 'extra'.", author: "Jimmy Johnson" },
  { text: "Your future self is watching you right now through your memories.", author: "Unknown" },
  { text: "Code is poetry. Write something worth reading.", author: "Unknown" },
  { text: "Every expert was once a beginner. Every pro was once an amateur.", author: "Unknown" },
  { text: "Comfort is the enemy of achievement.", author: "Farrah Gray" },
  { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown" },
  { text: "Stop waiting. Start building.", author: "Unknown" },
  { text: "Your skills are assets. Invest in them daily.", author: "Unknown" },
];

const URGENCY_MSGS = [
  "Every second is an opportunity.",
  "Time is moving whether you work or not.",
  "The deadline doesn't negotiate.",
  "Your future self is waiting.",
  "Right now, someone else is learning what you're avoiding.",
  "Each day without action is a day closer to regret.",
  "The job exists. Go claim it.",
];

const BADGES = [
  { id: "streak7", emoji: "🔥", name: "7-Day Streak", condition: (s) => s.streak >= 7 },
  { id: "streak30", emoji: "💎", name: "30-Day Streak", condition: (s) => s.streak >= 30 },
  { id: "dsa100", emoji: "🧩", name: "100 DSA Problems", condition: (s) => s.dsaProblems >= 100 },
  { id: "firstProject", emoji: "🛠️", name: "First Project", condition: (s) => s.projects >= 1 },
  { id: "upworkClient", emoji: "🤝", name: "First Upwork Client", condition: (s) => s.upworkClients >= 1 },
  { id: "freelanceIncome", emoji: "💰", name: "First Freelance $", condition: (s) => s.upworkIncome >= 1 },
  { id: "firstInterview", emoji: "🎯", name: "First Interview", condition: (s) => s.interviews >= 1 },
  { id: "jobOffer", emoji: "🏆", name: "Job Offer!", condition: (s) => s.jobOffers >= 1 },
];

const DAILY_CHALLENGES = [
  { title: "Solve 3 LeetCode Problems", desc: "Pick Easy, Medium, Hard. Document your approach and time complexity." },
  { title: "Build a FastAPI endpoint", desc: "Create a full CRUD API with authentication. Deploy it to a free service." },
  { title: "Write a PostgreSQL schema", desc: "Design a schema for a real app. Include indexes, constraints, and relationships." },
  { title: "Send 5 Upwork Proposals", desc: "Write tailored, professional proposals. No copy-paste. Make them feel personal." },
  { title: "Study System Design for 2 hours", desc: "Pick one topic: Load Balancing, Caching, or Databases. Go deep." },
  { title: "Apply to 5 Remote Jobs", desc: "Research companies, tailor your resume, write a custom cover letter." },
  { title: "Build and push to GitHub", desc: "Code something useful, document it well, push to GitHub with a good README." },
];

const STAT_FIELDS = [
  { id: "streak", label: "Current Streak (days)", icon: "🔥", default: 0 },
  { id: "tasksTotal", label: "Total Tasks Completed", icon: "✅", default: 0 },
  { id: "learningHours", label: "Total Learning Hours", icon: "📚", default: 0 },
  { id: "projects", label: "Projects Built", icon: "🛠️", default: 0 },
  { id: "applications", label: "Applications Sent", icon: "💼", default: 0 },
  { id: "upworkProposals", label: "Upwork Proposals Sent", icon: "🚀", default: 0 },
  { id: "dsaProblems", label: "DSA Problems Solved", icon: "🧩", default: 0 },
  { id: "upworkClients", label: "Upwork Clients", icon: "🤝", default: 0 },
  { id: "upworkIncome", label: "Upwork Income ($)", icon: "💰", default: 0 },
  { id: "interviews", label: "Interviews Attended", icon: "🎯", default: 0 },
  { id: "jobOffers", label: "Job Offers", icon: "🏆", default: 0 },
];

/* ─── STATE ─── */
let skills = [];
let stats = {};
let currentSkillEditing = null;
let quoteIndex = 0;
let focusInterval = null;
let focusSeconds = 25 * 60;
let urgencyIndex = 0;

/* ─── INIT ─── */
document.addEventListener("DOMContentLoaded", () => {
  loadLoader();
  initParticles();
  loadSkills();
  loadStats();
  renderSkills();
  renderRoutine();
  renderAchievements();
  renderStats();
  renderEditStats();
  renderHeatmap();
  startCountdown();
  startUrgencyRotation();
  startQuoteRotation();
  loadDailyChallenge();
  loadWeeklyReview();
  updateHeroStats();
  updateSuccessProbability();
  initFocusMode();
  initScrollReveal();
  initModalHandlers();
  initRoutineHandlers();
});

/* ─── LOADER ─── */
function loadLoader() {
  const bar = document.getElementById("loaderBar");
  let w = 0;
  const iv = setInterval(() => {
    w += Math.random() * 15;
    if (w >= 100) { w = 100; clearInterval(iv); }
    bar.style.width = w + "%";
  }, 80);
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
  }, 1600);
}

/* ─── PARTICLES ─── */
function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");
  let W, H, particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = -Math.random() * 0.5 - 0.1;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? "0,255,157" : "0,180,255";
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.y < -5 || this.x < -5 || this.x > W + 5) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
}

/* ─── LOCAL STORAGE ─── */
function lsGet(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

/* ─── SKILLS ─── */
function loadSkills() {
  const saved = lsGet("mission2026_skills", null);
  skills = saved || SKILLS_DATA.map(s => ({ ...s }));
}
function saveSkills() { lsSet("mission2026_skills", skills); }

function renderSkills() {
  const grid = document.getElementById("skillsGrid");
  grid.innerHTML = "";
  skills.forEach((skill, i) => {
    const statusClass = skill.status.toLowerCase().replace(/ /g, "-");
    const card = document.createElement("div");
    card.className = "skill-card reveal";
    card.style.transitionDelay = (i * 0.07) + "s";
    card.innerHTML = `
      <div class="skill-top">
        <div class="skill-name">${skill.name}</div>
        <div class="skill-pct">${skill.pct}%</div>
      </div>
      <div class="skill-bar-wrap">
        <div class="skill-bar" style="width:0%" data-pct="${skill.pct}"></div>
      </div>
      <div class="skill-meta">
        <span class="skill-level">${skill.level}</span>
        <span class="skill-status ${statusClass}">${skill.status}</span>
      </div>
    `;
    card.addEventListener("click", () => openSkillModal(i));
    grid.appendChild(card);
  });
  setTimeout(animateSkillBars, 400);
  initScrollReveal();
}

function animateSkillBars() {
  document.querySelectorAll(".skill-bar").forEach(bar => {
    const pct = bar.dataset.pct;
    bar.style.width = pct + "%";
  });
}

/* ─── SKILL MODAL ─── */
function initModalHandlers() {
  document.getElementById("modalClose").onclick = closeSkillModal;
  document.getElementById("skillModal").onclick = (e) => {
    if (e.target.id === "skillModal") closeSkillModal();
  };
  document.getElementById("modalRange").oninput = function () {
    document.getElementById("modalVal").textContent = this.value + "%";
  };
  document.getElementById("modalSave").onclick = saveSkillModal;
}

function openSkillModal(index) {
  currentSkillEditing = index;
  const skill = skills[index];
  document.getElementById("modalSkillName").textContent = skill.name;
  document.getElementById("modalRange").value = skill.pct;
  document.getElementById("modalVal").textContent = skill.pct + "%";
  document.getElementById("modalStatus").value = skill.status;
  document.getElementById("skillModal").classList.remove("hidden");
}

function closeSkillModal() {
  document.getElementById("skillModal").classList.add("hidden");
  currentSkillEditing = null;
}

function saveSkillModal() {
  if (currentSkillEditing === null) return;
  const pct = parseInt(document.getElementById("modalRange").value);
  const status = document.getElementById("modalStatus").value;
  skills[currentSkillEditing].pct = pct;
  skills[currentSkillEditing].status = status;
  const levels = ["Beginner", "Elementary", "Intermediate", "Advanced", "Expert"];
  skills[currentSkillEditing].level = levels[Math.min(4, Math.floor(pct / 22))];
  saveSkills();
  renderSkills();
  updateSuccessProbability();
  closeSkillModal();
}

/* ─── ROUTINE ─── */
function getTodayKey() {
  return "routine_" + new Date().toISOString().slice(0, 10);
}

function loadRoutineState() {
  return lsGet(getTodayKey(), {});
}

function saveRoutineState(state) {
  lsSet(getTodayKey(), state);
  updateStreak();
}

function initRoutineHandlers() {
  document.getElementById("resetRoutineBtn").onclick = () => {
    lsSet(getTodayKey(), {});
    renderRoutine();
  };
}

function renderRoutine() {
  const state = loadRoutineState();
  const grid = document.getElementById("checklistGrid");
  grid.innerHTML = "";

  ROUTINE_TASKS.forEach(task => {
    const done = !!state[task.id];
    const item = document.createElement("div");
    item.className = "check-item reveal" + (done ? " done" : "");
    item.innerHTML = `
      <div class="check-box">${done ? "✓" : ""}</div>
      <div class="check-icon">${task.icon}</div>
      <div class="check-label">${task.label}</div>
    `;
    item.addEventListener("click", () => toggleTask(task.id));
    grid.appendChild(item);
  });

  updateRoutineProgress(state);
  initScrollReveal();
}

function toggleTask(taskId) {
  const state = loadRoutineState();
  state[taskId] = !state[taskId];
  saveRoutineState(state);
  renderRoutine();
  updateHeroStats();
  checkBadges();
}

function updateRoutineProgress(state) {
  const total = ROUTINE_TASKS.length;
  const done = Object.values(state).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);

  document.getElementById("routineDone").textContent = done;
  document.getElementById("routineTotal").textContent = total;
  document.getElementById("routinePct").textContent = pct + "%";
  document.getElementById("routineFill").style.width = pct + "%";

  const streak = lsGet("mission2026_streak", 0);
  document.getElementById("routineStreak").textContent = streak;
}

function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const lastActive = lsGet("mission2026_lastActive", "");
  let streak = lsGet("mission2026_streak", 0);

  const state = loadRoutineState();
  const allDone = ROUTINE_TASKS.every(t => state[t.id]);

  if (allDone) {
    if (lastActive === yesterday) { streak += 1; }
    else if (lastActive !== today) { streak = 1; }
    lsSet("mission2026_lastActive", today);
    lsSet("mission2026_streak", streak);
    stats.streak = streak;
    saveStats();
  }

  document.getElementById("routineStreak").textContent = streak;
  document.getElementById("navStreakCount").textContent = streak;
  document.getElementById("hStreak").textContent = streak;
}

/* ─── COUNTDOWN ─── */
function startCountdown() {
  const deadline = new Date("December 31, 2026 23:59:59").getTime();

  function tick() {
    const now = Date.now();
    const diff = deadline - now;

    if (diff <= 0) {
      document.getElementById("cdDays").textContent = "000";
      document.getElementById("cdHours").textContent = "00";
      document.getElementById("cdMinutes").textContent = "00";
      document.getElementById("cdSeconds").textContent = "00";
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    flipNum("cdDays", String(days).padStart(3, "0"));
    flipNum("cdHours", String(hours).padStart(2, "0"));
    flipNum("cdMinutes", String(mins).padStart(2, "0"));
    flipNum("cdSeconds", String(secs).padStart(2, "0"));

    document.getElementById("hDays").textContent = days;

    // Year progress
    const yearStart = new Date("January 1, 2026").getTime();
    const yearEnd = new Date("December 31, 2026 23:59:59").getTime();
    const yearPct = Math.min(100, Math.round(((now - yearStart) / (yearEnd - yearStart)) * 100));
    document.getElementById("yearPct").textContent = yearPct + "%";
    document.getElementById("yearFill").style.width = yearPct + "%";
  }

  tick();
  setInterval(tick, 1000);
}

function flipNum(id, val) {
  const el = document.getElementById(id);
  if (el.textContent !== val) {
    el.classList.add("flip");
    setTimeout(() => { el.textContent = val; el.classList.remove("flip"); }, 80);
  }
}

/* ─── URGENCY ROTATION ─── */
function startUrgencyRotation() {
  const el = document.getElementById("urgencyMsg");
  setInterval(() => {
    urgencyIndex = (urgencyIndex + 1) % URGENCY_MSGS.length;
    el.style.opacity = 0;
    setTimeout(() => {
      el.textContent = URGENCY_MSGS[urgencyIndex];
      el.style.opacity = 1;
    }, 400);
  }, 5000);
}

/* ─── QUOTES ─── */
function startQuoteRotation() {
  showQuote(0);
  document.getElementById("nextQuoteBtn").onclick = nextQuote;
  setInterval(nextQuote, 12000);
}

function showQuote(index) {
  const q = QUOTES[index];
  const textEl = document.getElementById("quoteText");
  const authEl = document.getElementById("quoteAuthor");
  textEl.classList.add("fade");
  setTimeout(() => {
    textEl.textContent = q.text;
    authEl.textContent = "— " + q.author;
    textEl.classList.remove("fade");
  }, 400);
}

function nextQuote() {
  quoteIndex = (quoteIndex + 1) % QUOTES.length;
  showQuote(quoteIndex);
}

/* ─── DAILY CHALLENGE ─── */
function loadDailyChallenge() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const challenge = DAILY_CHALLENGES[dayOfYear % DAILY_CHALLENGES.length];
  const doneKey = "challenge_" + new Date().toISOString().slice(0, 10);
  const isDone = lsGet(doneKey, false);

  document.getElementById("challengeTitle").textContent = challenge.title;
  document.getElementById("challengeDesc").textContent = challenge.desc;

  const btn = document.getElementById("challengeDoneBtn");
  const status = document.getElementById("challengeStatus");

  if (isDone) {
    btn.textContent = "Completed ✓";
    btn.style.opacity = "0.5";
    status.textContent = "Well done! See you tomorrow.";
  }

  btn.onclick = () => {
    lsSet(doneKey, true);
    btn.textContent = "Completed ✓";
    btn.style.opacity = "0.5";
    status.textContent = "🎉 Well done! See you tomorrow.";
    // Celebration animation
    celebrateSmall(btn);
  };
}

function celebrateSmall(btn) {
  const orig = btn.style.transform;
  btn.style.transform = "scale(1.1)";
  setTimeout(() => { btn.style.transform = orig; }, 200);
}

/* ─── STATS ─── */
function loadStats() {
  const defaults = {};
  STAT_FIELDS.forEach(f => { defaults[f.id] = f.default; });
  stats = { ...defaults, ...lsGet("mission2026_stats", {}) };
}

function saveStats() { lsSet("mission2026_stats", stats); }

function renderStats() {
  const displayStats = [
    { key: "daysLeft", icon: "⏳", label: "Days Remaining", computed: true },
    { key: "tasksTotal", icon: "✅", label: "Tasks Completed" },
    { key: "streak", icon: "🔥", label: "Current Streak" },
    { key: "learningHours", icon: "📚", label: "Learning Hours" },
    { key: "projects", icon: "🛠️", label: "Projects Built" },
    { key: "applications", icon: "💼", label: "Applications Sent" },
    { key: "upworkProposals", icon: "🚀", label: "Upwork Proposals" },
    { key: "dsaProblems", icon: "🧩", label: "DSA Problems" },
  ];

  const grid = document.getElementById("statsGrid");
  grid.innerHTML = "";
  displayStats.forEach((s, i) => {
    const card = document.createElement("div");
    card.className = "stat-card reveal";
    card.style.transitionDelay = (i * 0.08) + "s";

    let val;
    if (s.computed && s.key === "daysLeft") {
      val = Math.max(0, Math.floor((new Date("December 31, 2026") - Date.now()) / 86400000));
    } else {
      val = stats[s.key] || 0;
    }

    card.innerHTML = `
      <div class="stat-icon">${s.icon}</div>
      <div class="stat-num" id="stat_${s.key}">${val.toLocaleString()}</div>
      <div class="stat-label">${s.label}</div>
    `;
    grid.appendChild(card);
  });
}

function renderEditStats() {
  const grid = document.getElementById("editStatsGrid");
  grid.innerHTML = "";
  const editable = STAT_FIELDS.filter(f => f.id !== "streak");
  editable.forEach(f => {
    const div = document.createElement("div");
    div.className = "edit-stat-item";
    div.innerHTML = `
      <label>${f.icon} ${f.label}</label>
      <input type="number" id="edit_${f.id}" value="${stats[f.id] || 0}" min="0" />
    `;
    grid.appendChild(div);
  });

  document.getElementById("saveStatsBtn").onclick = () => {
    editable.forEach(f => {
      const input = document.getElementById("edit_" + f.id);
      if (input) stats[f.id] = parseInt(input.value) || 0;
    });
    saveStats();
    renderStats();
    renderAchievements();
    updateHeroStats();
    updateSuccessProbability();
    checkBadges();
  };
}

/* ─── HERO STATS ─── */
function updateHeroStats() {
  const state = loadRoutineState();
  const done = Object.values(state).filter(Boolean).length;
  document.getElementById("hTasks").textContent = done;
  document.getElementById("hStreak").textContent = lsGet("mission2026_streak", 0);
  document.getElementById("hProjects").textContent = stats.projects || 0;
  document.getElementById("navStreakCount").textContent = lsGet("mission2026_streak", 0);
}

/* ─── SUCCESS PROBABILITY ─── */
function updateSuccessProbability() {
  const streak = lsGet("mission2026_streak", 0);
  const streakScore = Math.min(100, streak * 3);

  const avgSkill = skills.reduce((a, s) => a + s.pct, 0) / skills.length;
  const skillScore = Math.min(100, avgSkill);

  const portfolioScore = Math.min(100, (stats.projects || 0) * 20);

  const overall = Math.round((streakScore * 0.4 + skillScore * 0.35 + portfolioScore * 0.25));

  // Animate meter
  const arc = document.getElementById("probArc");
  const arcLen = 283;
  const offset = arcLen - (arcLen * overall / 100);
  setTimeout(() => { arc.style.strokeDashoffset = offset; }, 500);
  animateNumber("probNumber", 0, overall, 1500, (v) => v + "%");

  // Factors
  setFactor("pfConsistency", streakScore, "pfConsistencyPct");
  setFactor("pfSkill", skillScore, "pfSkillPct");
  setFactor("pfPortfolio", portfolioScore, "pfPortfolioPct");
}

function setFactor(fillId, pct, labelId) {
  const fill = document.getElementById(fillId);
  const label = document.getElementById(labelId);
  setTimeout(() => { fill.style.width = pct + "%"; }, 600);
  label.textContent = Math.round(pct) + "%";
}

function animateNumber(id, from, to, duration, formatter = (v) => v) {
  const el = document.getElementById(id);
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = Math.round(from + (to - from) * eased);
    el.textContent = formatter(val);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ─── ACHIEVEMENTS ─── */
function renderAchievements() {
  const grid = document.getElementById("badgesGrid");
  grid.innerHTML = "";
  BADGES.forEach((badge, i) => {
    const unlocked = badge.condition(stats);
    const card = document.createElement("div");
    card.className = "badge-card reveal" + (unlocked ? " unlocked" : " badge-locked");
    card.style.transitionDelay = (i * 0.07) + "s";
    card.innerHTML = `
      <div class="badge-emoji">${badge.emoji}</div>
      <div class="badge-name">${badge.name}</div>
      ${unlocked ? '<div style="font-family:var(--font-mono);font-size:0.55rem;letter-spacing:0.2em;color:var(--accent);margin-top:0.5rem">UNLOCKED</div>' : ''}
    `;
    if (unlocked) {
      card.title = "Achievement Unlocked! 🎉";
    }
    grid.appendChild(card);
  });
  initScrollReveal();
}

function checkBadges() {
  BADGES.forEach(badge => {
    if (badge.condition(stats)) {
      const key = "badge_notified_" + badge.id;
      if (!lsGet(key, false)) {
        lsSet(key, true);
        showBadgeToast(badge);
      }
    }
  });
}

function showBadgeToast(badge) {
  const toast = document.createElement("div");
  toast.style.cssText = `
    position:fixed;bottom:2rem;right:2rem;
    background:linear-gradient(135deg,rgba(0,255,157,0.15),rgba(0,180,255,0.15));
    border:1px solid rgba(0,255,157,0.3);border-radius:12px;
    padding:1rem 1.5rem;z-index:9000;
    font-family:var(--font-mono);font-size:0.75rem;
    color:var(--text);display:flex;gap:0.75rem;align-items:center;
    animation:popIn 0.4s ease forwards;
    backdrop-filter:blur(20px);max-width:280px;
  `;
  toast.innerHTML = `<span style="font-size:1.5rem">${badge.emoji}</span><div><strong>Badge Unlocked!</strong><br/>${badge.name}</div>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

/* ─── HEATMAP ─── */
function renderHeatmap() {
  const heatmap = document.getElementById("heatmap");
  heatmap.innerHTML = "";
  const heatData = lsGet("mission2026_heatmap", {});

  for (let w = 11; w >= 0; w--) {
    const weekEl = document.createElement("div");
    weekEl.className = "hm-week";
    for (let d = 6; d >= 0; d--) {
      const date = new Date(Date.now() - (w * 7 + d) * 86400000);
      const key = date.toISOString().slice(0, 10);
      const routineKey = "routine_" + key;
      const saved = lsGet(routineKey, {});
      const done = Object.values(saved).filter(Boolean).length;
      let level = 0;
      if (done >= 3) level = 1;
      if (done >= 6) level = 2;
      if (done >= 9) level = 3;
      if (done === ROUTINE_TASKS.length) level = 4;

      const cell = document.createElement("div");
      cell.className = "hm-cell";
      cell.setAttribute("data-level", level);
      cell.title = `${key}: ${done} tasks`;
      weekEl.appendChild(cell);
    }
    heatmap.appendChild(weekEl);
  }
}

/* ─── WEEKLY REVIEW ─── */
function loadWeeklyReview() {
  const weekKey = "review_" + getWeekKey();
  const saved = lsGet(weekKey, {});
  if (saved.well) document.getElementById("reviewWell").value = saved.well;
  if (saved.improve) document.getElementById("reviewImprove").value = saved.improve;
  if (saved.next) document.getElementById("reviewNext").value = saved.next;
  if (saved.hours) document.getElementById("reviewHours").value = saved.hours;

  document.getElementById("saveReviewBtn").onclick = () => {
    const data = {
      well: document.getElementById("reviewWell").value,
      improve: document.getElementById("reviewImprove").value,
      next: document.getElementById("reviewNext").value,
      hours: document.getElementById("reviewHours").value,
    };
    lsSet(weekKey, data);
    const saved = document.getElementById("reviewSaved");
    saved.style.display = "inline";
    setTimeout(() => { saved.style.display = "none"; }, 2000);
  };
}

function getWeekKey() {
  const d = new Date();
  const start = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d - start) / 86400000 + start.getDay() + 1) / 7);
  return d.getFullYear() + "_W" + week;
}

/* ─── FOCUS MODE ─── */
function initFocusMode() {
  const quotes = QUOTES;
  let qi = 0;

  document.getElementById("focusModeBtn").onclick = () => {
    document.getElementById("focusOverlay").classList.remove("hidden");
    focusSeconds = 25 * 60;
    updateFocusTimer();
    document.getElementById("focusQuote").textContent = quotes[qi].text;
    qi = (qi + 1) % quotes.length;
  };

  document.getElementById("focusStop").onclick = () => {
    document.getElementById("focusOverlay").classList.add("hidden");
    clearInterval(focusInterval);
    focusInterval = null;
  };

  document.getElementById("focusStart").onclick = () => {
    if (focusInterval) { clearInterval(focusInterval); focusInterval = null; return; }
    focusInterval = setInterval(() => {
      focusSeconds--;
      if (focusSeconds <= 0) {
        clearInterval(focusInterval);
        focusInterval = null;
        document.getElementById("focusTimer").textContent = "DONE! 🎉";
        // Update learning hours
        stats.learningHours = (stats.learningHours || 0) + 0.5;
        saveStats();
        return;
      }
      updateFocusTimer();
    }, 1000);
  };
}

function updateFocusTimer() {
  const m = Math.floor(focusSeconds / 60);
  const s = focusSeconds % 60;
  document.getElementById("focusTimer").textContent =
    String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}

/* ─── SCROLL REVEAL ─── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

/* ─── ROADMAP PHASE CLICK ─── */
document.querySelectorAll(".roadmap-phase").forEach(phase => {
  phase.addEventListener("click", function () {
    document.querySelectorAll(".roadmap-phase").forEach(p => p.classList.remove("active"));
    this.classList.add("active");
  });
});

/* ─── MIDNIGHT RESET CHECK ─── */
(function checkMidnightReset() {
  const lastDate = lsGet("mission2026_lastDate", "");
  const today = new Date().toISOString().slice(0, 10);
  if (lastDate && lastDate !== today) {
    // New day — accumulate tasksTotal
    const state = lsGet("routine_" + lastDate, {});
    const done = Object.values(state).filter(Boolean).length;
    stats.tasksTotal = (stats.tasksTotal || 0) + done;
    saveStats();
  }
  lsSet("mission2026_lastDate", today);
})();

/* ─── KEYBOARD SHORTCUT: F for Focus Mode ─── */
document.addEventListener("keydown", (e) => {
  if (e.key === "f" && !["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) {
    document.getElementById("focusModeBtn").click();
  }
  if (e.key === "Escape") {
    document.getElementById("focusStop").click();
    closeSkillModal();
  }
});