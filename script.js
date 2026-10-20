// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });
}

// Work page: filter projects by category
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.project[data-category]');
const emptyNote = document.getElementById('emptyNote');

function applyFilter(key) {
  let shown = 0;
  cards.forEach(card => {
    const match = key === 'all' || card.dataset.category === key;
    card.hidden = !match;
    if (match) shown++;
  });
  chips.forEach(chip => {
    const active = chip.dataset.filter === key;
    chip.classList.toggle('is-active', active);
    chip.setAttribute('aria-pressed', active);
  });
  if (emptyNote) emptyNote.hidden = shown !== 0;
}

chips.forEach(chip => chip.addEventListener('click', () => applyFilter(chip.dataset.filter)));

// Lets you link straight to a category, e.g. work.html#church
if (chips.length) {
  const fromHash = location.hash.replace('#', '');
  const valid = [...chips].some(c => c.dataset.filter === fromHash);
  applyFilter(valid ? fromHash : 'all');
}
