document.getElementById('y').textContent = new Date().getFullYear();


const root = document.documentElement;
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const saved = localStorage.getItem('theme');
if(saved === 'light' || (!saved && prefersLight)) root.classList.add('light');


document.getElementById('themeToggle').addEventListener('click', () => {
root.classList.toggle('light');
localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
});


const copyBtn = document.getElementById('copyEmail');
copyBtn.addEventListener('click', () => {
const email = document.getElementById('mail').textContent.trim();
navigator.clipboard.writeText(email).then(() => {
const original = copyBtn.textContent; copyBtn.textContent = 'Kopyalandı!';
setTimeout(() => copyBtn.textContent = original, 900);
});
});


document.querySelectorAll('.btn').forEach(btn => {
btn.addEventListener('pointerdown', e => {
const r = document.createElement('span');
const size = Math.max(btn.clientWidth, btn.clientHeight);
r.style.position = 'absolute';
r.style.width = r.style.height = size + 'px';
r.style.borderRadius = '50%';
r.style.left = (e.clientX - btn.getBoundingClientRect().left - size/2) + 'px';
r.style.top = (e.clientY - btn.getBoundingClientRect().top - size/2) + 'px';
r.style.background = 'currentColor';
r.style.opacity = '0.12';
r.style.pointerEvents = 'none';
r.style.transform = 'scale(0)';
r.style.transition = 'transform 300ms ease, opacity 600ms ease';
btn.appendChild(r);
requestAnimationFrame(() => r.style.transform = 'scale(1)');
setTimeout(() => { r.style.opacity='0'; setTimeout(()=>r.remove(), 400); }, 250);
});
});

