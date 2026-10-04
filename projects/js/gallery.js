  const projectGalleries = [
      [
        {src: "projects/assets/images/Wamy Mosque/mosque1.jpeg", title: "Wamy Mosque Complex -  "},
        {src: "projects/assets/images/Wamy Mosque/mosque3.jpeg", title: "Wamy Mosque Complex -  "},
        {src: "projects/assets/images/Wamy Mosque/mosque2.jpeg", title: "Wamy Mosque Complex -  "},
        {src: "projects/assets/images/Wamy Mosque/mosque4.jpeg", title: "Wamy Mosque Complex -  "}
      ],
      [
        {src: "projects/assets/images/Wamy Model Madrasa/wamy model3.jpeg", title: "Wamy Model Madrasa - Students"},
        {src: "projects/assets/images/Wamy Model Madrasa/wamy model2.jpeg", title: "Wamy Model Madrasa - Classroom"},
        {src: "projects/assets/images/Wamy Model Madrasa/wamy model1.jpeg", title: "Wamy Model Madrasa - Classroom"},
        {src: "projects/assets/images/Wamy Model Madrasa/wamy model4.jpeg", title: "Wamy Model Madrasa - Classroom"}

      ],
      [
        {src: "projects/assets/images/It center/wamy it center 1.jpeg", title: "Wamy IT Center - Lab"},
        {src: "projects/assets/images/It center/wamy it center 2.jpeg", title: "Wamy IT Center - Training"},
        {src: "projects/assets/images/It center/wamy it center 3.jpeg", title: "Wamy IT Center - Training"},
        {src: "projects/assets/images/It center/wamy it center 4.jpeg", title: "Wamy IT Center - Training"}
      ],
      [
        {src: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Wamy Dream Homes - Exterior"},
        {src: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Wamy Dream Homes - Community"}
      ],
      [
        {src: "https://images.pexels.com/photos/8349170/pexels-photo-8349170.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Wamy Collegiate School - Students"},
        {src: "https://images.pexels.com/photos/8363026/pexels-photo-8363026.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Wamy Collegiate School - Building"}
      ],
      [
        {src: "https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Wamy General Library - Reading Hall"},
        {src: "https://images.pexels.com/photos/2908989/pexels-photo-2908989.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Wamy General Library - Books"}
      ],
      [
        {src: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Construction Progress"},
        {src: "https://images.pexels.com/photos/1216544/pexels-photo-1216544.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Development Site"}
      ],
      [
        {src: "https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Nadwa Agro Project - Farm"},
        {src: "https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Nadwa Agro Project - Harvest"}
      ]
    ];
    let currentProject = 0;
    let currentImage = 0;

    function openProjectGallery(projectIdx, imageIdx) {
      currentProject = projectIdx;
      currentImage = imageIdx;
      updateGalleryLightbox();
      document.getElementById('gallery-lightbox').style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    function updateGalleryLightbox() {
      const img = document.getElementById('lightbox-image');
      const title = document.getElementById('lightbox-title');
      const counter = document.getElementById('lightbox-counter');
      const gallery = projectGalleries[currentProject];
      img.src = gallery[currentImage].src;
      img.alt = gallery[currentImage].title;
      title.textContent = gallery[currentImage].title;
      counter.textContent = (currentImage + 1) + " / " + gallery.length;
    }

    function navigateImage(direction) {
      const gallery = projectGalleries[currentProject];
      currentImage += direction;
      if (currentImage < 0) currentImage = gallery.length - 1;
      if (currentImage >= gallery.length) currentImage = 0;
      updateGalleryLightbox();
    }

    function closeLightbox() {
      document.getElementById('gallery-lightbox').style.display = 'none';
      document.body.style.overflow = 'auto';
    }

    // Close on Esc key
    document.addEventListener('keydown', function(e) {
      const lb = document.getElementById('gallery-lightbox');
      if (lb.style.display === 'flex') {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") navigateImage(1);
        if (e.key === "ArrowLeft") navigateImage(-1);
      }
    });
// // ১. মাস্টারপ্ল্যান গ্যালারি বন্ধ করার ফাংশন
// function closeMasterplan() {
//   const lb = document.getElementById('lightbox');
//   lb.style.display = 'none';
//   lb.classList.remove('active');
//   document.body.style.overflow = 'auto';
// }

// // ২. প্রজেক্ট গ্যালারি বন্ধ করার ফাংশন (এটি gallery.js এ আপডেট করুন)
// function closeGalleryLightbox() {
//   document.getElementById('gallery-lightbox').style.display = 'none';
//   document.body.style.overflow = 'auto';
// }

// // ৩. ইমেজের বাহিরে (ব্যাকগ্রাউন্ডে) ক্লিক করলে বন্ধ হওয়ার লজিক
// window.addEventListener('click', function(e) {
//   const mpLightbox = document.getElementById('lightbox');
//   const projectLightbox = document.getElementById('gallery-lightbox');
  
//   // মাস্টারপ্ল্যান গ্যালারির বাহিরে ক্লিক করলে
//   if (e.target === mpLightbox) {
//     closeMasterplan();
//   }
  
//   // প্রজেক্ট গ্যালারির বাহিরে ক্লিক করলে
//   if (e.target === projectLightbox) {
//     closeGalleryLightbox();
//   }
// });