/* =============================================================
   ساعت زنده‌ی گوشه‌ی صفحه
   این فایل کاملاً مستقله و به فایل‌های دیگه کاری نداره.
   خودش یه المنت می‌سازه و به صفحه اضافه می‌کنه، پس نیازی نیست
   چیزی توی index.html اضافه کنی؛ فقط کافیه همین فایل رو لینک کنی.
   ============================================================= */

(function () {
  // ساخت خودکار المنت ساعت و اضافه کردنش به صفحه
  const clockEl = document.createElement('div');
  clockEl.id = 'liveClock';
  clockEl.style.cssText = `
    position: fixed;
    top: 12px;
    left: 72px;
    z-index: 9999;
    background: linear-gradient(160deg, rgba(20,20,30,.75), rgba(10,10,18,.75));
    color: #fff;
    padding: 8px 16px;
    border-radius: 12px;
    font-family: 'Vazirmatn', Tahoma, sans-serif;
    font-size: 15px;
    letter-spacing: 1px;
    border: 1px solid rgba(255,255,255,.15);
    box-shadow: 0 6px 18px rgba(0,0,0,.4);
    backdrop-filter: blur(6px);
    direction: ltr;
    user-select: none;
  `;
  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(clockEl);
    updateClock();
    setInterval(updateClock, 1000);
  });

  function updateClock() {
    clockEl.textContent = new Date().toLocaleTimeString('en-GB',{timeZone:'Asia/Tehran',hour12:false});
  }
})();
