/* Scroll reveal */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.09 + 's';
    observer.observe(el);
  });

  /* Smooth nav highlight */
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) cur = s.id;
    });
    links.forEach(l => {
      l.style.color = l.getAttribute('href') === '#'+cur
        ? 'var(--cyan)' : '';
    });
  });

  /* Custom Audio Player */
  document.querySelectorAll('.custom-audio').forEach(player => {
    const audio = new Audio(player.getAttribute('data-src'));
    const playBtn = player.querySelector('.play-btn');
    const progressContainer = player.querySelector('.progress-container');
    const progressBar = player.querySelector('.progress-bar');
    const timeDisplay = player.querySelector('.time-display');

    const formatTime = (time) => {
      if (isNaN(time) || !isFinite(time)) return "0:00";
      const m = Math.floor(time / 60);
      const s = Math.floor(time % 60);
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    audio.addEventListener('loadedmetadata', () => {
      timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
    });

    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        document.querySelectorAll('audio').forEach(a => a.pause());
        document.querySelectorAll('.play-btn').forEach(btn => btn.textContent = '▶');
        audio.play();
        playBtn.textContent = '⏸';
      } else {
        audio.pause();
        playBtn.textContent = '▶';
      }
    });

    audio.addEventListener('timeupdate', () => {
      const progressPercent = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = `${progressPercent}%`;
      timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
    });

    audio.addEventListener('ended', () => {
      playBtn.textContent = '▶';
      progressBar.style.width = '0%';
    });

    progressContainer.addEventListener('click', (e) => {
      const width = progressContainer.clientWidth;
      const clickX = e.offsetX;
      const duration = audio.duration;
      audio.currentTime = (clickX / width) * duration;
    });
  });

  /* Lightbox */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');

  if (lightbox) {
    document.querySelectorAll('.gallery-item img').forEach(img => {
      img.addEventListener('click', () => {
        lightbox.classList.add('active');
        lightboxImg.src = img.src;
      });
    });

    closeBtn.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target !== lightboxImg) {
        lightbox.classList.remove('active');
      }
    });
  }
