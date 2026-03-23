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

  /* Parallax Animación Mouse */
  document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.orb');
    if(!orbs.length) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    
    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 30;
      orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

  /* Particles.js Background Network */
  if (typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
      "particles": {
        "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#00ffd1" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.4, "random": true },
        "size": { "value": 2, "random": true },
        "line_linked": { "enable": true, "distance": 140, "color": "#ff2d6b", "opacity": 0.25, "width": 1 },
        "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "out_mode": "out" }
      },
      "interactivity": {
        "detect_on": "window",
        "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
        "modes": { "grab": { "distance": 220, "line_linked": { "opacity": 0.7 } }, "push": { "particles_nb": 3 } }
      },
      "retina_detect": true
    });
  }

  /* Preloader */
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hidden');
  }, 2800);

  /* Back to Top */
  const btnTop = document.getElementById('btn-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) btnTop?.classList.add('show');
    else btnTop?.classList.remove('show');
  });
  btnTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* Sci-Fi UI Sounds (Web Audio API) */
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  
  const playHoverSound = () => {
    if(audioCtx.state === 'suspended') return;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1000, audioCtx.currentTime + 0.05);
    gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  };

  const playClickSound = () => {
    if(audioCtx.state === 'suspended') return;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(300, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  };

  document.body.addEventListener('click', () => {
    if(audioCtx.state === 'suspended') audioCtx.resume();
  }, { once: true });

  document.querySelectorAll('a, button, .concept-card, .gallery-item, summary').forEach(el => {
    el.addEventListener('mouseenter', playHoverSound);
    el.addEventListener('click', playClickSound);
  });
