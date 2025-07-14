const btn = document.getElementById('runaway-portfolio-btn');
let moving = false;
let btnRect = null;

function moveButton(e) {
  if (!btnRect) btnRect = btn.getBoundingClientRect();
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const btnX = btnRect.left + btnRect.width / 2;
  const btnY = btnRect.top + btnRect.height / 2;

  const dx = mouseX - btnX;
  const dy = mouseY - btnY;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < 120) { // Only run if mouse is close
    moving = true;
    let newLeft = btn.offsetLeft - dx * 0.5;
    let newTop = btn.offsetTop - dy * 0.5;

    // Boundaries so it stays visible
    const padding = 10;
    newLeft = Math.max(padding, Math.min(window.innerWidth - btn.offsetWidth - padding, newLeft));
    newTop = Math.max(padding, Math.min(window.innerHeight - btn.offsetHeight - padding, newTop));

    btn.style.left = newLeft + 'px';
    btn.style.top = newTop + 'px';
    btn.style.right = 'auto';
    btn.style.bottom = 'auto';

    // Update rect for next move
    btnRect = btn.getBoundingClientRect();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const btn = document.querySelector('.runaway-portfolio-btn');
  if (btn) {
    btn.addEventListener('mouseover', function() {
      btn.style.position = 'absolute';
      btn.style.left = Math.random() * window.innerWidth + 'px';
      btn.style.top = Math.random() * window.innerHeight + 'px';
    });
  }
});

btn.addEventListener('mouseenter', () => {
  btnRect = btn.getBoundingClientRect();
  document.addEventListener('mousemove', moveButton);
});
btn.addEventListener('mouseleave', () => {
  moving = false;
  // Reset to bottom-right
  btn.style.left = '';
  btn.style.top = '';
  btn.style.right = '30px';
  btn.style.bottom = '30px';
  btnRect = null;
  document.removeEventListener('mousemove', moveButton);
});
