/* =============================================================
   منطق سایت زهرا — همه‌ی داده‌ها (اسم، تاریخ، لینک عکس/فیلم/موزیک)
   از فایل js/config.js خوانده می‌شود. این فایل رو ویرایش نکن،
   فقط config.js رو عوض کن.
   ============================================================= */

/* -------------------------------------------------------------
   ۱) تبدیل تاریخ شمسی به میلادی
   الگوریتم استاندارد و شناخته‌شده‌ی تبدیل جلالی به گرگوری.
   ------------------------------------------------------------- */
function jalaliToGregorian(jy, jm, jd) {
  jy += 1595;
  let days = -355668 + (365 * jy) + (Math.floor(jy / 33) * 8) +
             Math.floor(((jy % 33) + 3) / 4) + jd +
             ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);

  let gy = 400 * Math.floor(days / 146097);
  days %= 146097;

  if (days > 36524) {
    gy += 100 * Math.floor(--days / 36524);
    days %= 36524;
    if (days >= 365) days++;
  }

  gy += 4 * Math.floor(days / 1461);
  days %= 1461;

  if (days > 365) {
    gy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }

  let gd = days + 1;
  const isLeap = (gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0);
  const monthLengths = [0, 31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let gm = 0;
  for (gm = 0; gm < 13; gm++) {
    const v = monthLengths[gm];
    if (gd <= v) break;
    gd -= v;
  }

  return { year: gy, month: gm, day: gd }; // month: 1-12
}

const gStart = jalaliToGregorian(CONFIG.startJalali.y, CONFIG.startJalali.m, CONFIG.startJalali.d);
/* همه‌ی محاسبات به وقت ایران (UTC+3:30) و با تقویم شمسی انجام می‌شود */
const IRAN_OFFSET = 3.5 * 3600 * 1000;
function iranNow() { return new Date(Date.now() + IRAN_OFFSET); } // با getUTC* بخوان
const startDate = new Date(Date.UTC(gStart.year, gStart.month - 1, gStart.day, CONFIG.startJalali.hour, CONFIG.startJalali.minute, 0));
function gregorianToJalali(gy, gm, gd) {
  const gdm = [0,31,59,90,120,151,181,212,243,273,304,334];
  const gy2 = gm > 2 ? gy + 1 : gy;
  let days = 355666 + 365*gy + Math.floor((gy2+3)/4) - Math.floor((gy2+99)/100) + Math.floor((gy2+399)/400) + gd + gdm[gm-1];
  let jy = -1595 + 33*Math.floor(days/12053); days %= 12053;
  jy += 4*Math.floor(days/1461); days %= 1461;
  if (days > 365) { jy += Math.floor((days-1)/365); days = (days-1) % 365; }
  const jm = days < 186 ? 1 + Math.floor(days/31) : 7 + Math.floor((days-186)/30);
  const jd = 1 + (days < 186 ? days % 31 : (days-186) % 30);
  return [jy, jm, jd];
}
function jMonthLen(jy, jm) {
  if (jm <= 6) return 31; if (jm <= 11) return 30;
  const g = jalaliToGregorian(jy, 12, 30), back = gregorianToJalali(g.year, g.month, g.day);
  return back[0] === jy && back[1] === 12 ? 30 : 29;
}
function jParts(d) {
  const j = gregorianToJalali(d.getUTCFullYear(), d.getUTCMonth()+1, d.getUTCDate());
  return { y:j[0], m:j[1], d:j[2], h:d.getUTCHours(), mi:d.getUTCMinutes(), s:d.getUTCSeconds() };
}
/* لحظه‌ی «k ماه بعد از شروع» (برای ماهگردها) */
function monthMoment(k) {
  const S = CONFIG.startJalali, idx = S.m - 1 + k;
  const jy = S.y + Math.floor(idx/12), jm = idx % 12 + 1, jd = Math.min(S.d, jMonthLen(jy, jm));
  const g = jalaliToGregorian(jy, jm, jd);
  return Date.UTC(g.year, g.month-1, g.day, S.hour, S.minute, 0);
}

/* -------------------------------------------------------------
   ۲) اسم پارتنر را همه‌جای صفحه جایگزین کن
   ------------------------------------------------------------- */
['heroName', 'brandName', 'letterName', 'footerName'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.textContent = CONFIG.partnerName;
});
document.title = `من و ${CONFIG.partnerName} | داستان عشق ما`;

/* -------------------------------------------------------------
   ۳) کمک‌کننده‌ها
   ------------------------------------------------------------- */
const persianDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
function toPersianDigits(num) {
  return String(num).replace(/\d/g, d => persianDigits[d]);
}
function pad2(n) { return n < 10 ? '0' + n : '' + n; }

/* محاسبه‌ی تقویمی دقیق فاصله‌ی زمانی (سال/ماه/روز/ساعت/دقیقه/ثانیه) */
function getElapsed(from, to) {
  const a = jParts(from), b = jParts(to);
  let years = b.y-a.y, months = b.m-a.m, days = b.d-a.d, hours = b.h-a.h, minutes = b.mi-a.mi, seconds = b.s-a.s;
  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }
  if (days < 0) { let pm = b.m-1, py = b.y; if (pm < 1) { pm = 12; py--; } days += jMonthLen(py, pm); months--; }
  if (months < 0) { months += 12; years--; }
  return { years, months, days, hours, minutes, seconds };
}

/* -------------------------------------------------------------
   ۴) تایمر فلیپ سه‌بعدی
   ------------------------------------------------------------- */
const flipCards = {};
document.querySelectorAll('.flip-card').forEach(card => {
  flipCards[card.dataset.unit] = { el: card, num: card.querySelector('.num'), value: null };
});

function setUnit(unit, value) {
  const item = flipCards[unit];
  if (!item) return;
  if (item.value === value) return; // بدون تغییر، بدون افکت
  const isFirst = item.value === null;
  item.value = value;

  if (isFirst) {
    item.num.textContent = toPersianDigits(pad2(value));
    return;
  }
  item.el.classList.add('flipping');
  setTimeout(() => { item.num.textContent = toPersianDigits(pad2(value)); }, 280);
  setTimeout(() => { item.el.classList.remove('flipping'); }, 600);
}

function updateTimer() {
  let now = iranNow(); if (now < startDate) now = startDate;
  const elapsed = getElapsed(startDate, now);

  setUnit('years', elapsed.years);
  setUnit('months', elapsed.months);
  setUnit('days', elapsed.days);
  setUnit('hours', elapsed.hours);
  setUnit('minutes', elapsed.minutes);
  setUnit('seconds', elapsed.seconds);

  const totalMs = now - startDate;
  const totalMinutes = Math.floor(totalMs / 60000);
  const totalHours = Math.floor(totalMs / 3600000);
  const totalDays = Math.floor(totalMs / 86400000);

  const totalDaysEl = document.getElementById('totalDaysStat');
  const totalHoursEl = document.getElementById('totalHoursStat');
  const totalMinutesEl = document.getElementById('totalMinutesStat');
  if (totalDaysEl) totalDaysEl.textContent = toPersianDigits(totalDays.toLocaleString('en-US'));
  if (totalHoursEl) totalHoursEl.textContent = toPersianDigits(totalHours.toLocaleString('en-US'));
  if (totalMinutesEl) totalMinutesEl.textContent = toPersianDigits(totalMinutes.toLocaleString('en-US'));

  /* ماهگرد بعدی + نقطه‌عطف بعدی */
  const nextAnnEl = document.getElementById('nextAnniversaryStat');
  if (nextAnnEl) {
    const M = elapsed.years*12 + elapsed.months, t = now.getTime();
    const left = monthMoment(M+1) - t;
    const dd = Math.floor(left/864e5);
    nextAnnEl.textContent = toPersianDigits(dd > 0 ? dd : Math.floor(left/36e5) + ' ساعت');
    document.getElementById('nextLabel').textContent = (dd > 0 ? 'روز' : '') + ' تا ماهگرد ' + toPersianDigits(M+1) + 'م';
    const ms = [7,14,30,50,100,150,200,300,365,500,730,1000,1500,2000,3650];
    const nx = ms.find(x => x > totalDays) || totalDays+1000, pv = [0,...ms].filter(x => x <= totalDays).pop();
    document.getElementById('msText').textContent = `تا ${toPersianDigits(nx)} روزگی: ${toPersianDigits(nx-totalDays)} روز مونده`;
    document.getElementById('msBar').style.width = Math.min(100, (totalMs/864e5 - pv)/(nx-pv)*100) + '%';
  }
}

updateTimer();
setInterval(updateTimer, 1000);

/* -------------------------------------------------------------
   ۵) قلب‌های شناور در پس‌زمینه
   ------------------------------------------------------------- */
const heartsContainer = document.getElementById('floating-hearts');
const heartIcons = ['fa-heart', 'fa-heart', 'fa-heart-pulse'];
function spawnHeart() {
  if (!heartsContainer) return;
  const heart = document.createElement('i');
  heart.className = 'fa-solid ' + heartIcons[Math.floor(Math.random() * heartIcons.length)] + ' f-heart';
  const size = 10 + Math.random() * 18;
  heart.style.fontSize = size + 'px';
  heart.style.left = Math.random() * 100 + '%';
  const duration = 10 + Math.random() * 10;
  heart.style.animationDuration = duration + 's';
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}
setInterval(spawnHeart, 1200);
for (let i = 0; i < 6; i++) setTimeout(spawnHeart, i * 400);

/* -------------------------------------------------------------
   ۶) ساخت مکعب سه‌بعدی «کهکشان عشق» از روی لینک‌های config.js
   ------------------------------------------------------------- */
const cube = document.getElementById('loveCube');
const faceClasses = ['face-front', 'face-back', 'face-right', 'face-left', 'face-top', 'face-bottom'];
if (cube) {
  CONFIG.cubePhotos.slice(0, 6).forEach((url, i) => {
    const face = document.createElement('div');
    face.className = 'cube-face ' + (faceClasses[i] || '');
    if (url) face.style.backgroundImage = `url('${url}')`;
    else face.innerHTML = `<div class="ph"><i class="fa-solid fa-image"></i>عکس ${i + 1}</div>`;
    cube.appendChild(face);
  });
}

/* -------------------------------------------------------------
   ۷) ساخت گالری عکس از روی لینک‌های config.js
   ------------------------------------------------------------- */
const galleryGrid = document.getElementById('galleryGrid');
if (galleryGrid) {
  CONFIG.galleryPhotos.forEach((url, i) => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4';
    col.innerHTML = `
      <div class="gallery-item">
        ${url ? `<img src="${url}" alt="خاطره ${i + 1}" loading="lazy">` : `<div class="ph"><i class="fa-solid fa-image"></i>جای عکس ${i + 1}</div>`}
        <span class="gallery-overlay"><i class="fa-solid fa-magnifying-glass-plus"></i></span>
      </div>`;
    galleryGrid.appendChild(col);
  });
}

/* -------------------------------------------------------------
   ۸) ساخت گالری فیلم از روی لینک‌های config.js
   ------------------------------------------------------------- */
const videoGrid = document.getElementById('videoGrid');
if (videoGrid) {
  CONFIG.videos.forEach((v, i) => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
      <div class="video-item" data-video="${v.src}">
        ${v.poster ? `<img src="${v.poster}" alt="ویدیو ${i + 1}" loading="lazy">` : `<div class="ph"><i class="fa-solid fa-film"></i>جای ویدیو ${i + 1}</div>`}
        <span class="play-btn"><i class="fa-solid fa-play"></i></span>
      </div>`;
    videoGrid.appendChild(col);
  });
}

/* -------------------------------------------------------------
   ۹) لایت‌باکس گالری عکس (jQuery)
   ------------------------------------------------------------- */
$(document).on('click', '.gallery-item', function () {
  const src = $(this).find('img').attr('src'); if (!src) return;
  $('#lightboxImg').attr('src', src);
  const modal = new bootstrap.Modal(document.getElementById('lightboxModal'));
  modal.show();
});

/* -------------------------------------------------------------
   ۱۰) مودال گالری ویدیو (jQuery)
   ------------------------------------------------------------- */
$(document).on('click', '.video-item', function () {
  const src = $(this).data('video'); if (!src) return;
  const $video = $('#modalVideo');
  $video.attr('src', src);
  const modal = new bootstrap.Modal(document.getElementById('videoModal'));
  modal.show();
  $video.get(0).play().catch(() => {});
});
document.getElementById('videoModal').addEventListener('hidden.bs.modal', function () {
  const video = document.getElementById('modalVideo');
  video.pause();
  video.removeAttribute('src');
  video.load();
});

/* -------------------------------------------------------------
   ۱۱) پخش‌کننده‌ی موزیک گوشه‌ی سایت
   مرورگرها معمولاً پخش خودکار با صدا را مسدود می‌کنند،
   پس اولین کلیک/لمس کاربر روی هر جای صفحه، پخش را شروع می‌کند.
   ------------------------------------------------------------- */
const bgAudio = document.getElementById('bgAudio');
const vinylDisc = document.getElementById('vinylDisc');
const musicLabel = document.getElementById('musicLabel');
let musicStarted = false;

if (bgAudio && CONFIG.music && CONFIG.music.url) {
  bgAudio.src = CONFIG.music.url;
}

function playMusic() {
  if (!bgAudio.src) return;
  bgAudio.play().then(() => {
    musicStarted = true;
    vinylDisc.classList.add('spinning');
    vinylDisc.querySelector('i').className = 'fa-solid fa-pause';
    musicLabel.textContent = CONFIG.music.title || 'در حال پخش...';
  }).catch(() => {
    musicLabel.textContent = 'برای پخش موزیک لمس کن';
  });
}
function pauseMusic() {
  bgAudio.pause();
  vinylDisc.classList.remove('spinning');
  vinylDisc.querySelector('i').className = 'fa-solid fa-music';
  musicLabel.textContent = 'موزیک متوقف شد';
}

vinylDisc.addEventListener('click', (e) => {
  e.stopPropagation();
  if (bgAudio.paused) playMusic(); else pauseMusic();
});

/* یک بار، در اولین کلیک کاربر روی هر جای دیگر صفحه، تلاش می‌کنیم موزیک
   را خودکار شروع کنیم (به‌خاطر محدودیت مرورگرها روی پخش خودکار با صدا).
   اگر کاربر مستقیم روی دکمه‌ی دیسک بزند، این بخش وارد عمل نمی‌شود. */
function tryAutoStart(e) {
  if (musicStarted || vinylDisc.contains(e.target)) return;
  playMusic();
}
document.addEventListener('click', tryAutoStart, { once: true });

/* -------------------------------------------------------------
   ۱۲) حذف پیش‌بارگذار پس از لود کامل صفحه
   ------------------------------------------------------------- */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hide');
  }, 500);
});

/* ---------- قلب سه‌بعدی چرخان (لایه‌لایه) ---------- */
(function () {
  const rot = document.getElementById('heartRot'); if (!rot) return;
  const N = 26, P = 'M50 88C20 62 2 44 2 26 2 12 13 2 27 2 37 2 46 7 50 16 54 7 63 2 73 2 87 2 98 12 98 26 98 44 80 62 50 88Z';
  for (let i = 0; i < N; i++) {
    const t = i/(N-1)*2 - 1, a = Math.abs(t), s = Math.sqrt(1 - a*a*.9);
    const edge = i === 0 || i === N-1;
    rot.insertAdjacentHTML('beforeend', `<svg viewBox="0 0 100 90" style="transform:translateZ(${(t*30).toFixed(1)}px) scale(${s.toFixed(3)})"><path d="${P}" fill="hsl(${330-55*a},85%,${66-24*a}%)" ${edge ? 'stroke="#ffc26b" stroke-width="1.5"' : ''}/></svg>`);
  }
})();

/* ---------- قلب‌های کوچیک با هر لمس/کلیک ---------- */
document.addEventListener('pointerdown', e => {
  for (let i = 0; i < 7; i++) {
    const h = document.createElement('i');
    h.className = 'fa-solid fa-heart burst';
    h.style.left = e.clientX + 'px'; h.style.top = e.clientY + 'px';
    document.body.appendChild(h);
    const a = Math.random()*6.28, d = 40 + Math.random()*50;
    h.animate([{ transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
      { transform: `translate(calc(-50% + ${Math.cos(a)*d}px),calc(-50% + ${Math.sin(a)*d - 30}px)) scale(.3)`, opacity: 0 }],
      { duration: 900, easing: 'ease-out' }).onfinish = () => h.remove();
  }
});
