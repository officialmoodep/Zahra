/* =============================================================
   افکت‌های عاشقانه: گلبرگ، کرم شب‌تاب، شهاب، قلب‌های مداری،
   جرقه‌ی دنبال انگشت، ضربان قلب و ظاهر شدن آرام بخش‌ها
   ============================================================= */
(function () {
  const rnd = (a, b) => a + Math.random() * (b - a);
  const mk = (cls, parent) => { const e = document.createElement('span'); e.className = cls; (parent || document.body).appendChild(e); return e; };
  const layer = id => { const d = document.createElement('div'); d.id = id; document.body.appendChild(d); return d; };

  /* ۱) گلبرگ‌های رز که آروم می‌ریزن */
  const petals = layer('petals');
  const petalColors = ['#ff6fb1', '#ff4d9d', '#e0368a', '#ffc26b', '#c0a0ff'];
  function petal() {
    const p = mk('petal', petals), d = rnd(9, 17);
    p.style.cssText = `left:${rnd(0, 100)}%;width:${rnd(9, 16)}px;height:${rnd(12, 20)}px;background:${petalColors[Math.floor(rnd(0, 5))]};animation-duration:${d}s,${rnd(3, 5)}s;animation-delay:0s,${rnd(0, 2)}s`;
    setTimeout(() => p.remove(), d * 1000);
  }
  setInterval(petal, 1100); for (let i = 0; i < 7; i++) setTimeout(petal, i * 300);

  /* ۲) کرم‌های شب‌تاب طلایی */
  const ff = layer('fireflies');
  for (let i = 0; i < 22; i++) {
    const f = mk('firefly', ff);
    f.style.cssText = `left:${rnd(0, 100)}%;top:${rnd(0, 100)}%;--dx:${rnd(-60, 60)}px;--dy:${rnd(-80, 80)}px;animation-duration:${rnd(6, 12)}s,${rnd(2, 4)}s;animation-delay:${rnd(0, 5)}s,${rnd(0, 3)}s`;
  }

  /* ۳) شهاب‌های گاه‌به‌گاه */
  (function shoot() {
    const s = mk('shooting-star');
    s.style.cssText = `left:${rnd(30, 100)}%;top:${rnd(0, 35)}%`;
    setTimeout(() => s.remove(), 1600);
    setTimeout(shoot, rnd(5000, 10000));
  })();

  /* ۴) قلب‌های کوچیک که دور قلب سه‌بعدی می‌چرخن */
  const stage = document.getElementById('heartStage');
  if (stage) {
    const orbit = mk('orbit', stage);
    for (let i = 0; i < 7; i++) {
      const o = document.createElement('i');
      o.className = 'fa-solid fa-heart orbit-heart';
      o.style.cssText = `--a:${i * (360 / 7)}deg;font-size:${rnd(9, 15)}px;animation-delay:${-i * .4}s`;
      orbit.appendChild(o);
    }
  }

  /* ۵) ردّ جرقه‌ی طلایی دنبال موس/انگشت */
  let last = 0;
  document.addEventListener('pointermove', e => {
    const n = performance.now(); if (n - last < 45) return; last = n;
    const s = mk('spark'); s.style.left = e.clientX + 'px'; s.style.top = e.clientY + 'px';
    setTimeout(() => s.remove(), 800);
  });

  /* ۶) خط ضربان قلب زیر متن هیرو */
  const sub = document.querySelector('.hero-sub');
  if (sub) sub.insertAdjacentHTML('afterend', '<svg class="ecg" viewBox="0 0 300 40"><path d="M0 20H100L112 20 120 6 132 34 142 14 150 20H300" /></svg>');

  /* ۷) ظاهر شدن آرام بخش‌ها هنگام اسکرول */
  const items = document.querySelectorAll('.timeline-item,.letter-card,.mini-stat,.flip-unit,.section-title,.cube-stage,.milestone');
  items.forEach((el, i) => { el.classList.add('rv'); el.style.transitionDelay = (i % 4) * 90 + 'ms'; });
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
  items.forEach(el => io.observe(el));

  /* ۸) هر ثانیه یه ضربه‌ی نوری روی ثانیه‌شمار */
  setInterval(() => {
    const c = document.querySelector('.flip-card[data-unit="seconds"]'); if (!c) return;
    c.classList.remove('pulse'); void c.offsetWidth; c.classList.add('pulse');
  }, 1000);
})();
