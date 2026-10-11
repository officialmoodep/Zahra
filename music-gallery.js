/* =============================================================
   گالری موسیقی — بخش مستقل
   این فایل کاملاً خودکاره: خودش یه بخش کامل (Section) با طراحی
   می‌سازه و به انتهای صفحه اضافه می‌کنه. کافیه همین یه فایل رو
   لینک کنی؛ نیازی به تغییر HTML یا CSS نیست.

   ✏️ فقط آرایه‌ی SONGS زیر رو با لینک‌های mp3 خودت پر کن.
   ============================================================= */

const SONGS = [
  { title: "نوازش 1",   artist: "تتلو ", url: "https://dl.gisomusic.com/Music/1402/12/16/Amir%20Tataloo%20-%20Navazesh.mp3?_gl=1*1hjqxso*_ga*ODM3OTEwMTE5LjE3ODU4MzUxNjg.*_ga_KEQHMVTX68*czE3ODU4MzUxNjckbzEkZzAkdDE3ODU4MzUxNjckajYwJGwwJGgw" },
  { title: "خار",   artist: "تتلو", url: "https://dl.gisomusic.com/Music/1402/12/13/Amir%20Tataloo%20-%20Khaar.mp3?_gl=1*f20f1o*_ga*ODM3OTEwMTE5LjE3ODU4MzUxNjg.*_ga_KEQHMVTX68*czE3ODU4MzUxNjckbzEkZzEkdDE3ODU4MzUzODckajYwJGwwJGgw" },
  { title: "مال من باش",   artist: "تتلو", url: "https://dl.gisomusic.com/Music/1402/12/16/Amir%20Tataloo%20-%20Male%20Man%20Bash.mp3?_gl=1*1or6lce*_ga*ODM3OTEwMTE5LjE3ODU4MzUxNjg.*_ga_KEQHMVTX68*czE3ODU4MzUxNjckbzEkZzEkdDE3ODU4MzU0ODEkajYwJGwwJGgw" },
  { title: "منو داری",   artist: "مسلک", url: "https://irsv.upmusics.com/dlw/Maslak%20-%20Mano%20Dari%20(320).mp3" },
  { title: "دیگه چی کمه",   artist: "امیر خلوت", url: "https://dl.mokhtalefmusic.com/music/1404/01/25/Amir%20Khalvat%20&%20Darab%20-%20Dige%20Chi%20Kame.mp3" },
  { title: "خواب عمیق",   artist: "حسین تی ام", url: "https://irsv.upmusics.com/dlw/Hossein%20Tm%20-%20Khab%20Amigh%20(320).mp3" },
  { title: "نزار تنها بخوابم شب",   artist: "شایان یو", url: "https://dls.musics-fa.com/tagdl/1402/Shayan%20Yo%20-%20Nazar%20Tanha%20Bekhabam%20(320).mp3" },
  { title: "جون چشات",   artist: "پوری", url: "https://xx.sahand-music.ir/Archive/G/GodPoori/Poori%20-%20Az%20Khoda%20Betars/Poori%20-%20Az%20Khoda%20Betars/10%20Poori%20-%20June%20Cheshaat.mp3" },
  { title: "وقتی از همه خستم",   artist: "مسلک", url: "https://dl.musictaj.com/song403/bhr/Maslak%20-%20Vaghti%20Az%20Hame%20Khastam.mp3" },
  { title: "مرداب",  artist: "گوگوش", url: "https://xx.sahand-music.ir/Archive/G/Googoosh/Googoosh%20-%20Asheghaneha/04%20Mordab.mp3" }
];

(function () {

  /* ---------- ساخت استایل‌های اختصاصی این بخش ---------- */
  const style = document.createElement('style');
  style.textContent = `
    #musicGallerySection{
      padding: 4rem 1rem;
      position: relative;
    }
    #musicGallerySection .mg-eyebrow{
      text-align:center; color:var(--red-glow,#ff4d9d);
      font-size:.85rem; letter-spacing:1px; margin-bottom:.4rem;
    }
    #musicGallerySection .mg-title{
      text-align:center; font-family:'Vazirmatn',sans-serif; font-weight:800;
      font-size:2rem; color:#fff; margin-bottom:.6rem;
      text-shadow:0 0 20px rgba(139,92,246,.4);
    }
    #musicGallerySection .mg-desc{
      text-align:center; color:#b8b8c8; margin-bottom:2.4rem; font-size:.95rem;
    }
    .mg-grid{
      display:grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1rem;
      max-width: 1100px;
      margin: 0 auto;
    }
    .mg-card{
      background: linear-gradient(160deg, rgba(20,20,34,.85), rgba(8,8,18,.9));
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 16px;
      padding: 1rem 1.1rem;
      display:flex; align-items:center; gap:.9rem;
      transition: transform .25s, box-shadow .25s, border-color .25s;
      cursor:pointer;
      position:relative; overflow:hidden;
    }
    .mg-card:hover{
      transform: translateY(-4px);
      border-color: rgba(139,92,246,.5);
      box-shadow: 0 10px 25px rgba(0,0,0,.45), 0 0 20px rgba(139,92,246,.25);
    }
    .mg-card.playing{
      border-color: rgba(255,77,157,.7);
      box-shadow: 0 0 0 1px rgba(255,77,157,.4), 0 0 25px rgba(255,77,157,.35);
    }
    .mg-disc{
      width:48px; height:48px; border-radius:50%; flex-shrink:0;
      background: radial-gradient(circle at 35% 35%, #2a2a3a 0%, #050508 65%);
      border:2px solid rgba(255,255,255,.12);
      display:flex; align-items:center; justify-content:center;
      color:#fff; font-size:1rem;
      position:relative;
    }
    .mg-disc::before{
      content:''; position:absolute; inset:5px; border-radius:50%;
      border:1px dashed rgba(255,255,255,.15);
    }
    .mg-card.playing .mg-disc{
      animation: mgSpin 3s linear infinite;
      border-color: rgba(255,77,157,.7);
      color:#ff4d9d;
    }
    @keyframes mgSpin{ from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
    .mg-info{ flex:1; min-width:0; }
    .mg-info .mg-t{
      color:#fff; font-size:.92rem; font-weight:600;
      white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
    }
    .mg-info .mg-a{
      color:#9494a8; font-size:.78rem; margin-top:2px;
      white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
    }
    .mg-bars{ display:flex; align-items:flex-end; gap:2px; height:16px; margin-top:4px; }
    .mg-bars span{
      width:3px; background:#ff4d9d; border-radius:2px; height:4px;
      animation: mgBar 1s ease-in-out infinite;
    }
    .mg-card.playing .mg-bars span{ animation-play-state:running; }
    .mg-bars span:nth-child(1){ animation-delay:0s; }
    .mg-bars span:nth-child(2){ animation-delay:.15s; }
    .mg-bars span:nth-child(3){ animation-delay:.3s; }
    @keyframes mgBar{
      0%,100%{ height:4px; } 50%{ height:14px; }
    }
  `;
  document.head.appendChild(style);

  /* ---------- ساخت HTML بخش گالری موسیقی ---------- */
  const section = document.createElement('section');
  section.id = 'musicGallerySection';
  section.innerHTML = `
    <p class="mg-eyebrow">فقط برای گوش‌هامون</p>
    <h2 class="mg-title">گالری موسیقی</h2>
    <p class="mg-desc">آهنگ‌هایی که هرکدوم یه خاطره‌ان — روشون بزن و گوش بده</p>
    <div class="mg-grid" id="mgGrid"></div>
  `;

  /* ---------- منطق پخش (فقط یکی هم‌زمان) ---------- */
  const audioPool = new Map(); // index -> Audio element
  let currentIndex = null;

  function stopAllGallerySongs(exceptIndex) {
    audioPool.forEach((audio, idx) => {
      if (idx !== exceptIndex) {
        audio.pause();
        audio.currentTime = 0;
        const card = document.querySelector(`.mg-card[data-index="${idx}"]`);
        if (card) card.classList.remove('playing');
      }
    });
  }

  function playSong(index) {
    let audio = audioPool.get(index);
    if (!audio) {
      audio = new Audio(SONGS[index].url);
      audioPool.set(index, audio);
      audio.addEventListener('ended', () => {
        const card = document.querySelector(`.mg-card[data-index="${index}"]`);
        if (card) card.classList.remove('playing');
        currentIndex = null;
      });
    }

    // اگر همین آهنگ در حال پخشه، متوقفش کن (toggle)
    if (currentIndex === index && !audio.paused) {
      audio.pause();
      document.querySelector(`.mg-card[data-index="${index}"]`).classList.remove('playing');
      currentIndex = null;
      return;
    }

    // موزیک اصلی سایت رو متوقف کن تا قاطی نشن
    const mainAudio = document.getElementById('bgAudio');
    if (mainAudio && !mainAudio.paused) {
      mainAudio.pause();
      const vinylDisc = document.getElementById('vinylDisc');
      const musicLabel = document.getElementById('musicLabel');
      if (vinylDisc) {
        vinylDisc.classList.remove('spinning');
        const icon = vinylDisc.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-music';
      }
      if (musicLabel) musicLabel.textContent = 'موزیک متوقف شد';
    }

    // بقیه آهنگای گالری رو متوقف کن
    stopAllGallerySongs(index);

    audio.play().catch(() => {});
    currentIndex = index;
    document.querySelectorAll('.mg-card').forEach(c => c.classList.remove('playing'));
    document.querySelector(`.mg-card[data-index="${index}"]`).classList.add('playing');
  }

  // اگه موزیک اصلی سایت پخش بشه، آهنگ گالری رو متوقف کن
  document.addEventListener('DOMContentLoaded', () => {
    const mainAudio = document.getElementById('bgAudio');
    if (mainAudio) {
      mainAudio.addEventListener('play', () => {
        stopAllGallerySongs(null);
        currentIndex = null;
      });
    }
  });

  /* ---------- ساخت کارت‌ها ---------- */
  function buildGrid() {
    const grid = section.querySelector('#mgGrid');
    SONGS.forEach((song, i) => {
      const card = document.createElement('div');
      card.className = 'mg-card';
      card.dataset.index = i;
      card.innerHTML = `
        <div class="mg-disc"><i class="fa-solid fa-music"></i></div>
        <div class="mg-info">
          <div class="mg-t">${song.title}</div>
          <div class="mg-a">${song.artist || ''}</div>
          <div class="mg-bars"><span></span><span></span><span></span></div>
        </div>
      `;
      card.addEventListener('click', () => playSong(i));
      grid.appendChild(card);
    });
  }

  /* ---------- اضافه کردن بخش به انتهای صفحه (قبل از فوتر اگه پیدا شد) ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    buildGrid();
    const footer = document.querySelector('footer');
    if (footer) {
      footer.parentNode.insertBefore(section, footer);
    } else {
      document.body.appendChild(section);
    }
  });

})();
