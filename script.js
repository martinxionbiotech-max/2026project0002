const toTopButton = document.getElementById('toTop');

if (toTopButton) {
  toTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
