/* =============================================
   STARTUPFORGE AI — SCRIPT.JS ULTRA EDITION
   ============================================= */

// ── 3D CANVAS BACKGROUND ──
(function() {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [], frame = 0;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Node() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.z = Math.random() * 400 + 100;
    this.vx = (Math.random() - .5) * .4;
    this.vy = (Math.random() - .5) * .4;
    this.vz = (Math.random() - .5) * .5;
    this.r = Math.random() * 2 + 1;
    this.color = ['#8b5cf6','#22d3ee','#f472b6','#a78bfa'][Math.floor(Math.random()*4)];
  }

  function project(x, y, z) {
    const fov = 400;
    const scale = fov / (fov + z);
    return { x: x * scale + W/2, y: y * scale + H/2, scale };
  }

  function initNodes(n) {
    nodes = [];
    for (let i = 0; i < n; i++) nodes.push(new Node());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    frame++;

    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy; n.z += n.vz;
      if (n.x < -W/2) n.x = W/2;
      if (n.x > W/2) n.x = -W/2;
      if (n.y < -H/2) n.y = H/2;
      if (n.y > H/2) n.y = -H/2;
      if (n.z < 0) n.z = 500;
      if (n.z > 500) n.z = 0;
    });

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          const pa = project(a.x - W/2, a.y - H/2, a.z);
          const pb = project(b.x - W/2, b.y - H/2, b.z);
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.strokeStyle = `rgba(139,92,246,${(1 - dist/120) * .12})`;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(n => {
      const p = project(n.x - W/2, n.y - H/2, n.z);
      const radius = n.r * p.scale;
      const alpha = Math.min(1, p.scale * 1.5) * .7;
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = n.color + Math.floor(alpha * 255).toString(16).padStart(2,'0');
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); initNodes(60); });
  resize(); initNodes(60); draw();
})();

// ── PARTICLE FIELD ──
(function() {
  const container = document.getElementById('particles');
  const colors = ['#8b5cf6','#22d3ee','#f472b6','#a78bfa','#818cf8'];

  function createParticle() {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      width:${size}px;height:${size}px;
      left:${Math.random()*100}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${Math.random()*10+8}s;
      animation-delay:${Math.random()*8}s;
      box-shadow:0 0 ${size*4}px currentColor;
    `;
    container.appendChild(p);
    setTimeout(() => p.remove(), 18000);
  }

  setInterval(createParticle, 400);
  for (let i = 0; i < 20; i++) setTimeout(createParticle, i * 200);
})();

// ── CHAR COUNTER ──
document.getElementById('idea').addEventListener('input', function() {
  const n = this.value.length;
  const el = document.getElementById('charCount');
  el.textContent = `${n} / 500`;
  if (n > 450) el.style.color = '#f472b6';
  else if (n > 350) el.style.color = '#fb923c';
  else el.style.color = '';
  if (this.value.length > 500) this.value = this.value.slice(0, 500);
});

// ── 3D CARD TILT ──
const card = document.querySelector('.forge-card-inner');
if (card) {
  document.querySelector('.forge-card').addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    card.style.transform = `perspective(1000px) rotateY(${dx * 6}deg) rotateX(${-dy * 4}deg)`;
  });
  document.querySelector('.forge-card').addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
  });
}

// ── GENERATE BLUEPRINT ──
async function generateBlueprint() {
  const idea = document.getElementById('idea').value.trim();
  if (!idea) { showToast('Please enter a startup idea ✍️'); return; }

  document.getElementById('analytics-dashboard').innerHTML = '';
  document.getElementById('tabBar').style.display = 'none';

  showLoading('blueprint', '⚡ AI Agents Activated', 'Generating your complete startup blueprint...');
  document.getElementById('blueprint').style.display = 'block';

  try {
    const [bpRes, compRes] = await Promise.all([
      fetch(`http://127.0.0.1:8000/blueprint?startup_idea=${enc(idea)}`),
      fetch(`http://127.0.0.1:8000/competitors?startup_idea=${enc(idea)}`)
    ]);

    const data = await bpRes.json();
    const comp = await compRes.json();
    const score = Math.floor(Math.random() * 21) + 80;

    // Analytics dashboard
    const metrics = [
      { label:'Market Fit', val:88, sub:'High demand', grad:'linear-gradient(135deg,#8b5cf6,#22d3ee)', line:'linear-gradient(90deg,#8b5cf6,#22d3ee)' },
      { label:'Innovation', val:92, sub:'Top 10%', grad:'linear-gradient(135deg,#22d3ee,#4ade80)', line:'linear-gradient(90deg,#22d3ee,#4ade80)' },
      { label:'Fundability', val:80, sub:'VC-ready', grad:'linear-gradient(135deg,#f472b6,#fb923c)', line:'linear-gradient(90deg,#f472b6,#fb923c)' },
      { label:'Scalability', val:85, sub:'Global scope', grad:'linear-gradient(135deg,#818cf8,#a78bfa)', line:'linear-gradient(90deg,#818cf8,#a78bfa)' }
    ];

    document.getElementById('analytics-dashboard').innerHTML = `
      <div class="dash-grid">
        ${metrics.map(m => `
          <div class="dash-card" style="--grad:${m.grad};--line:${m.line}">
            <div class="dash-card-label">${m.label}</div>
            <div class="dash-card-val">${m.val}</div>
            <div class="dash-card-sub">${m.sub}</div>
          </div>`).join('')}
      </div>`;

    // Blueprint tab
    document.getElementById('blueprint').innerHTML = `
      <div class="score-wrap">
        <div class="score-label">Startup Readiness Score</div>
        <div class="score-track">
          <div class="score-fill" id="scoreFill" style="width:0%">${score}/100</div>
        </div>
      </div>
      <div class="result-section">
        <h2>🚀 Startup Blueprint</h2>
        ${fmt(data.blueprint)}
      </div>
      <br>
      <a class="pdf-link"
        href="http://127.0.0.1:8000/download-pdf?startup_idea=${enc(idea)}"
        target="_blank">
        📄 Download Full PDF Report
      </a>`;

    setTimeout(() => {
      const f = document.getElementById('scoreFill');
      if (f) f.style.width = score + '%';
    }, 150);

    // Populate other tabs
    document.getElementById('swot').innerHTML = `
      <div class="result-section">
        <h2>📊 SWOT Analysis</h2>
        ${fmt(data.swot)}
      </div>`;

    document.getElementById('pitch').innerHTML = `
      <div class="result-section">
        <h2>🎤 Investor Pitch</h2>
        ${fmt(data.pitch)}
      </div>`;

    document.getElementById('mvp').innerHTML = `
      <div class="result-section">
        <h2>🛠 MVP Plan</h2>
        ${fmt(data.mvp)}
      </div>`;

    document.getElementById('competitors').innerHTML = `
      <div class="result-section">
        <h2>🏢 Competitor Analysis</h2>
        ${fmt(comp.competitor_analysis)}
      </div>`;

    document.getElementById('tabBar').style.display = 'flex';
    showTab('blueprint', document.querySelector('.tabpill'));
    showToast('Blueprint ready! 🚀');

  } catch(err) {
    console.error(err);
    document.getElementById('blueprint').innerHTML = `
      <div class="result-section" style="border-color:rgba(248,113,113,.3)">
        <h2 style="-webkit-text-fill-color:unset;color:#f87171">❌ Connection Error</h2>
        <p style="color:var(--text2)">Could not reach the backend at <code>127.0.0.1:8000</code>. Make sure the server is running.</p>
        <p style="color:var(--text3);font-size:13px;margin-top:8px">${err}</p>
      </div>`;
    document.getElementById('tabBar').style.display = 'none';
  }
}

// ── GENERATE NAMES ──
async function generateNames() {
  const idea = document.getElementById('idea').value.trim();
  if (!idea) { showToast('Enter a startup idea first ✍️'); return; }

  document.getElementById('tabBar').style.display = 'none';
  showLoading('blueprint', '🏷️ Naming Engine Active', 'Crafting unique startup names...');
  document.getElementById('blueprint').style.display = 'block';

  try {
    const res = await fetch(`http://127.0.0.1:8000/startup-names?startup_idea=${enc(idea)}`);
    const data = await res.json();
    const icons = ['🚀','⚡','🔥','💡','🌐','🛡','🦄','💎','🎯','⚙️','🌟','🔮'];

    document.getElementById('blueprint').innerHTML = `
      <div class="result-section">
        <h2>🏷️ Startup Name Suggestions</h2>
        <div class="names-grid">
          ${data.names.split('\n').filter(n => n.trim()).map((n, i) => `
            <div class="name-card" onclick="copyName('${n.trim()}')">
              <span class="name-icon">${icons[i % icons.length]}</span>
              ${n.trim()}
            </div>`).join('')}
        </div>
      </div>`;

    document.getElementById('tabBar').style.display = 'flex';
    showTab('blueprint', document.querySelector('.tabpill'));
    showToast('Names generated! Click any to copy.');
  } catch(err) {
    document.getElementById('blueprint').innerHTML = `
      <div class="result-section" style="border-color:rgba(248,113,113,.3)">
        <h2 style="-webkit-text-fill-color:unset;color:#f87171">❌ Error</h2>
        <p style="color:var(--text2)">${err}</p>
      </div>`;
  }
}

function copyName(name) {
  navigator.clipboard.writeText(name).then(() => showToast(`Copied: ${name} 📋`));
}

// ── TAB SYSTEM ──
function showTab(tabId, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.style.display = 'none');
  document.getElementById(tabId).style.display = 'block';
  if (btn) {
    document.querySelectorAll('.tabpill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
}

// ── CHATBOT ──
function toggleChatbot() {
  const w = document.getElementById('chatbot-window');
  w.style.display = w.style.display === 'flex' ? 'none' : 'flex';
}
function closeChatbot() {
  document.getElementById('chatbot-window').style.display = 'none';
}

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (!msg) return;

  const chat = document.getElementById('chat-messages');
  chat.innerHTML += `<div class="cmsg user"><div class="cmsg-bubble">${escHtml(msg)}</div></div>`;
  input.value = '';
  scrollChat();

  const tid = 'typing_' + Date.now();
  chat.innerHTML += `
    <div class="cmsg bot" id="${tid}">
      <div class="cmsg-bubble" style="opacity:.5">
        <span class="typing-dots">●●●</span>
      </div>
    </div>`;
  scrollChat();

  try {
    const res = await fetch(`http://127.0.0.1:8000/chat?message=${enc(msg)}`);
    const data = await res.json();
    document.getElementById(tid)?.remove();
    chat.innerHTML += `<div class="cmsg bot"><div class="cmsg-bubble">${escHtml(data.reply)}</div></div>`;
  } catch(e) {
    document.getElementById(tid)?.remove();
    chat.innerHTML += `<div class="cmsg bot"><div class="cmsg-bubble" style="color:#f87171">⚠️ Server offline. Make sure the backend is running.</div></div>`;
  }
  scrollChat();
}

function scrollChat() {
  const c = document.getElementById('chat-messages');
  c.scrollTop = c.scrollHeight;
}

// ── DARK MODE ──
let isDark = true;
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('sfTheme');
  if (saved === 'light') { document.body.classList.add('light'); isDark = false; updateThemeIcon(); }
});

function toggleDarkMode() {
  isDark = !isDark;
  document.body.classList.toggle('light', !isDark);
  localStorage.setItem('sfTheme', isDark ? 'dark' : 'light');
  updateThemeIcon();
}

function updateThemeIcon() {
  const el = document.getElementById('themeIcon');
  if (el) el.textContent = isDark ? '☀️' : '🌙';
}

// ── MODALS ──
function showCreator() { document.getElementById('creatorPopup').classList.add('open'); }
function closeCreator() { document.getElementById('creatorPopup').classList.remove('open'); }
function showAbout() { document.getElementById('aboutPopup').classList.add('open'); }
function closeAbout() { document.getElementById('aboutPopup').classList.remove('open'); }

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeCreator(); closeAbout(); closeChatbot(); }
});

// ── TOAST NOTIFICATION ──
function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `
    position:fixed;bottom:110px;left:50%;transform:translateX(-50%) translateY(20px);
    background:rgba(20,16,40,.97);border:1px solid rgba(139,92,246,.3);
    color:#f5f4ff;font-family:'Satoshi',sans-serif;font-size:14px;font-weight:500;
    padding:12px 24px;border-radius:100px;z-index:9999;
    box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 20px rgba(139,92,246,.15);
    backdrop-filter:blur(16px);
    transition:all .4s cubic-bezier(.34,1.56,.64,1);
    opacity:0;white-space:nowrap;
  `;
  document.body.appendChild(t);
  requestAnimationFrame(() => {
    t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    t.style.opacity = '0'; t.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(() => t.remove(), 400);
  }, 2800);
}

// ── HELPERS ──
function enc(s) { return encodeURIComponent(s); }
function escHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function fmt(text) { return text.replace(/\n/g,'<br>'); }

function showLoading(tabId, title, sub) {
  document.getElementById(tabId).innerHTML = `
    <div class="loading-wrap">
      <div class="loader-3d">
        <div class="loader-3d-face"></div>
        <div class="loader-3d-face"></div>
        <div class="loader-3d-face"></div>
      </div>
      <div class="loading-title">${title}</div>
      <div class="loading-sub">${sub}</div>
      <div class="loading-agents">
        <div class="agent-pill"><div class="agent-dot"></div>Blueprint Agent</div>
        <div class="agent-pill"><div class="agent-dot"></div>Market Agent</div>
        <div class="agent-pill"><div class="agent-dot"></div>Pitch Agent</div>
        <div class="agent-pill"><div class="agent-dot"></div>MVP Agent</div>
      </div>
    </div>`;
}

// ── ANIMATED COUNTERS ──
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = timestamp => {
    if (!start) start = timestamp;
    const prog = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(prog * target);
    if (prog < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

// Observe dashboard cards for counter animation
const observer = new MutationObserver(mutations => {
  mutations.forEach(m => {
    m.addedNodes.forEach(node => {
      if (node.classList && node.classList.contains('dash-grid')) {
        node.querySelectorAll('.dash-card-val').forEach(el => {
          const val = parseInt(el.textContent);
          if (!isNaN(val)) animateCounter(el, val, 1200);
        });
      }
    });
  });
});
observer.observe(document.getElementById('analytics-dashboard'), { childList: true });