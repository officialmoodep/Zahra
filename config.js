/* =============================================================
   تنظیمات سایت زهرا — فقط همین فایل رو ویرایش کن.
   عکس/فیلم: لینک یا مسیر فایل (مثلاً "media/1.jpg") بذار.
   هر جا خالی ("") باشه، یه جای‌خالیِ شیک نمایش داده می‌شه.
   ============================================================= */
const CONFIG = {
  partnerName: "زهرا",

  /* شروع رابطه به وقت ایران: ۱۸ مهر ۱۴۰۵ = ۲۰۲۶/۱۰/۱۰ ساعت ۲۳:۴۵ */
  startJalali: { y: 1405, m: 7, d: 18, hour: 23, minute: 45 },

  music: {
    url: "https://dl.bandmusic.ir/files/mp3/s1/Dalu%20%E2%80%93%203:33%20(BandMusic).mp3",
    title: "3:33"
  },

  /* دقیقاً ۶ عکس برای مکعب */
  cubePhotos: ["https://cdn.imgurl.ir/uploads/c6762_1791623458249.jpg", "https://cdn.imgurl.ir/uploads/n790085_IMG_20261011_113006_393.jpg", "https://cdn.imgurl.ir/uploads/i97990_IMG_20261011_112948_689.jpg", "https://cdn.imgurl.ir/uploads/a926069_IMG_20261011_112902_523.jpg", "https://cdn.imgurl.ir/uploads/v094819_IMG_20261011_112942_870.jpg", "https://cdn.imgurl.ir/uploads/48436_IMG_20261011_113019_695.jpg"],

  /* هر تعداد عکس برای گالری (هر "" یک جای خالی است) */
  galleryPhotos: ["https://cdn.imgurl.ir/uploads/c915008_IMG_20261011_112911_117.jpg", "https://cdn.imgurl.ir/uploads/c6762_1791623458249.jpg", "https://cdn.imgurl.ir/uploads/s606659_6263e6de-e552-4a12-8bdc-e55665d0506a.jpeg", "https://cdn.imgurl.ir/uploads/n83211_1791623422259.jpg", "https://cdn.imgurl.ir/uploads/n790085_IMG_20261011_113006_393.jpg", "https://cdn.imgurl.ir/uploads/a926069_IMG_20261011_112902_523.jpg"],

  /* poster = عکس کاور، src = لینک/مسیر ویدیو */
  videos: [
    { poster: "https://cdn.imgurl.ir/uploads/c915008_IMG_20261011_112911_117.jpg", src: "https://cdn.imgurl.ir/uploads/w107123_VID_20261011_115528_866.mp4" },
    { poster: "https://cdn.imgurl.ir/uploads/48436_IMG_20261011_113019_695.jpg", src: "https://cdn.imgurl.ir/uploads/k467141_VID_20261011_115521_145.mp4" },
    { poster: "https://cdn.imgurl.ir/uploads/a926069_IMG_20261011_112902_523.jpg", src: "https://cdn.imgurl.ir/uploads/e98514_VID_20261011_115514_655.mp4" }
  ]
};
