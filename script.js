const menuToggle = document.querySelector('#menuToggle');
const navLinks = document.querySelector('#navLinks');
const navAnchors = document.querySelectorAll('#navLinks a');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
navAnchors.forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

// Reveal sections as they enter the viewport.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

// Project summary dialog uses only resume-grounded descriptions.
const projectInfo = {
  posture: {
    title: 'Wrong Posture Muscle Strain Detector Using Sensor',
    description: 'This project aims to identify poor posture and help prevent muscle fatigue using IoT and sensor-based technology. Specific hardware, implementation details, and test results can be added once confirmed.'
  },
  calories: {
    title: 'Calories Burnt Prediction Using Machine Learning with Python',
    description: 'This project aims to predict calories burned during exercise using user and activity data. The exact dataset, model, evaluation metrics, and results were not specified in the résumé and should be added only when verified.'
  }
};
const dialog = document.querySelector('#projectDialog');
const dialogTitle = document.querySelector('#dialogTitle');
const dialogDescription = document.querySelector('#dialogDescription');
document.querySelectorAll('.project-details').forEach(button => {
  button.addEventListener('click', () => {
    const project = projectInfo[button.dataset.project];
    if (!project) return;
    dialogTitle.textContent = project.title;
    dialogDescription.textContent = project.description;
    if (typeof dialog.showModal === 'function') dialog.showModal();
  });
});
const closeDialog = () => { if (dialog?.open) dialog.close(); };
document.querySelector('#dialogClose')?.addEventListener('click', closeDialog);
document.querySelector('#dialogDone')?.addEventListener('click', closeDialog);
dialog?.addEventListener('click', event => {
  if (event.target === dialog) closeDialog();
});

// Copy email button with fallback-friendly feedback.
const toast = document.querySelector('#toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2300);
}
document.querySelector('#copyEmail')?.addEventListener('click', async event => {
  const email = event.currentTarget.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    showToast('Email copied to clipboard');
  } catch {
    window.location.href = `mailto:${email}`;
    showToast('Opening your email app');
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();

// Warn rather than silently pretending the resume asset exists.
document.querySelector('#resumeButton')?.addEventListener('click', event => {
  // The bundled file is named resume.pdf. If you replace it, keep the same filename.
  const href = event.currentTarget.getAttribute('href');
  if (!href) event.preventDefault();
});
