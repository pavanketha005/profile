(() => {
  const leftEye = document.getElementById('leftEye');
  const rightEye = document.getElementById('rightEye');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const togglePassword = document.getElementById('togglePassword');

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
  const pupilRadius = 7;

  function movePupil(eye, xRatio, yRatio) {
    const pupil = eye.querySelector('.pupil');
    const x = clamp(xRatio * pupilRadius, -pupilRadius, pupilRadius);
    const y = clamp(yRatio * pupilRadius, -pupilRadius, pupilRadius);
    pupil.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
  }

  function followTextInput() {
    const cursorPos = usernameInput.selectionEnd || 0;
    const maxFollowChars = 20;
    const ratio = Math.min(cursorPos / maxFollowChars, 1);
    const xRatio = ratio * 2 - 1;
    const yRatio = 0;
    movePupil(leftEye, xRatio, yRatio);
    movePupil(rightEye, xRatio, yRatio);
  }

  function closeEyes() {
    leftEye.classList.add('closed');
    rightEye.classList.add('closed');
  }
  function openEyes() {
    leftEye.classList.remove('closed');
    rightEye.classList.remove('closed');
  }

  usernameInput.addEventListener('input', () => {
    if (!passwordInput.matches(':focus')) {
      openEyes();
      followTextInput();
    }
  });
  usernameInput.addEventListener('focus', () => {
    if (!passwordInput.matches(':focus')) {
      openEyes();
      followTextInput();
    }
  });
  usernameInput.addEventListener('blur', () => {
    if (!passwordInput.matches(':focus')) {
      movePupil(leftEye, 0, 0);
      movePupil(rightEye, 0, 0);
    }
  });

  passwordInput.addEventListener('focus', closeEyes);
  passwordInput.addEventListener('input', closeEyes);
  passwordInput.addEventListener('blur', () => {
    openEyes();
    movePupil(leftEye, 0, 0);
    movePupil(rightEye, 0, 0);
  });

  // Toggle password visibility
  togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.textContent = type === 'password' ? 'visibility' : 'visibility_off';

    // Close eyes if password is hidden
    if (type === 'password') {
      closeEyes();
    } else {
      openEyes();
    }
  });

  movePupil(leftEye, 0, 0);
  movePupil(rightEye, 0, 0);

  document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    alert('Login submitted! This is a demo.');
  });
})();
