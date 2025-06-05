document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const difficultySelect = document.getElementById("difficulty");
  const scoreEl = document.getElementById("score");
  const highscoreEl = document.getElementById("highscore");
  const timeLeftEl = document.getElementById("timeLeft");
  const countdownOverlay = document.getElementById("countdownOverlay");
  const countdownEl = document.getElementById("countdown");
  const gameArea = document.getElementById("gameArea");
  const themeToggleBtn = document.getElementById("themeToggleBtn");

  // Game control buttons
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const resetBtn = document.getElementById("resetBtn");

  // Game settings
  const GAME_DURATION = 60; // seconds
  let remainingTime = GAME_DURATION;
  let score = 0;
  let highscore = localStorage.getItem("typingRhythmHighscore") || 0;
  highscoreEl.textContent = highscore;
  let gameRunning = false;
  let gamePaused = false;
  let generateInterval, timerInterval;
  let countdownInterval;

  // Difficulty settings: fall duration & generation rate (ms)
  const settings = {
    easy: { fallDuration: 5000, generationRate: 1500 },
    medium: { fallDuration: 3500, generationRate: 1000 },
    hard: { fallDuration: 2000, generationRate: 700 },
  };

  // Theme toggle
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
  });

  // Start Game: Initiates countdown then game
  startBtn.addEventListener("click", () => {
    resetGame(); // Clear previous state if any
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    startCountdown();
  });

  // Pause/Resume Game
  pauseBtn.addEventListener("click", () => {
    if (!gamePaused) {
      pauseGame();
      pauseBtn.textContent = "Resume Game";
    } else {
      resumeGame();
      pauseBtn.textContent = "Pause Game";
    }
  });

  // Reset Game
  resetBtn.addEventListener("click", () => {
    resetGame();
  });

  // Countdown before game start
  function startCountdown() {
    let count = 3;
    countdownEl.textContent = count;
    countdownOverlay.style.display = "flex";
    countdownInterval = setInterval(() => {
      count--;
      if (count <= 0) {
        clearInterval(countdownInterval);
        countdownOverlay.style.display = "none";
        startGame();
      } else {
        countdownEl.textContent = count;
      }
    }, 1000);
  }

  // Start the game after countdown
  function startGame() {
    gameRunning = true;
    gamePaused = false;
    score = 0;
    remainingTime = GAME_DURATION;
    scoreEl.textContent = score;
    timeLeftEl.textContent = remainingTime;
    const difficulty = difficultySelect.value;
    const fallDuration = settings[difficulty].fallDuration;
    const generationRate = settings[difficulty].generationRate;

    generateInterval = setInterval(() => {
      createFallingLetter(fallDuration);
    }, generationRate);

    timerInterval = setInterval(() => {
      if (!gamePaused) {
        remainingTime--;
        timeLeftEl.textContent = remainingTime;
        if (remainingTime <= 0) {
          endGame();
        }
      }
    }, 1000);
  }

  // Create a falling letter
  function createFallingLetter(duration) {
    if (!gameRunning || gamePaused) return;
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const letterEl = document.createElement("div");
    letterEl.classList.add("falling-letter");
    letterEl.textContent = letter;

    // Random horizontal position (with 30px margin for letter width)
    const posX = Math.random() * (gameArea.clientWidth - 30);
    letterEl.style.left = `${posX}px`;
    letterEl.style.animationDuration = duration + "ms";

    // Remove letter when animation ends
    letterEl.addEventListener("animationend", () => {
      if (gameArea.contains(letterEl)) {
        gameArea.removeChild(letterEl);
      }
    });
    gameArea.appendChild(letterEl);
  }

  // Keyboard input detection for falling letters
  document.addEventListener("keydown", (e) => {
    if (!gameRunning || gamePaused) return;
    const pressedKey = e.key.toUpperCase();
    const fallingLetters = Array.from(
      document.getElementsByClassName("falling-letter")
    );
    fallingLetters.forEach((letterEl) => {
      if (letterEl.textContent === pressedKey) {
        score += 10;
        scoreEl.textContent = score;
        // Add a small visual effect on hit (optional)
        letterEl.classList.add("hit");
        setTimeout(() => {
          if (gameArea.contains(letterEl)) gameArea.removeChild(letterEl);
        }, 50);
      }
    });
  });

  // Pause game: stop intervals and pause animations
  function pauseGame() {
    gamePaused = true;
    clearInterval(generateInterval);
    clearInterval(timerInterval);
    document.querySelectorAll(".falling-letter").forEach((letter) => {
      letter.style.animationPlayState = "paused";
    });
  }

  // Resume game: restart intervals and resume animations
  function resumeGame() {
    gamePaused = false;
    const difficulty = difficultySelect.value;
    const fallDuration = settings[difficulty].fallDuration;
    const generationRate = settings[difficulty].generationRate;
    generateInterval = setInterval(() => {
      createFallingLetter(fallDuration);
    }, generationRate);
    timerInterval = setInterval(() => {
      if (!gamePaused) {
        remainingTime--;
        timeLeftEl.textContent = remainingTime;
        if (remainingTime <= 0) {
          endGame();
        }
      }
    }, 1000);
    document.querySelectorAll(".falling-letter").forEach((letter) => {
      letter.style.animationPlayState = "running";
    });
  }

  // End game: clear intervals, update highscore
  function endGame() {
    gameRunning = false;
    clearInterval(generateInterval);
    clearInterval(timerInterval);
    pauseBtn.disabled = true;
    startBtn.disabled = false;
    pauseBtn.textContent = "Pause Game";
    updateHighscore();
    alert("Time's up! Your score: " + score);
  }

  // Reset game: clear game area & intervals, reset UI
  function resetGame() {
    gameRunning = false;
    gamePaused = false;
    clearInterval(generateInterval);
    clearInterval(timerInterval);
    clearInterval(countdownInterval);
    while (gameArea.firstChild) {
      gameArea.removeChild(gameArea.firstChild);
    }
    score = 0;
    remainingTime = GAME_DURATION;
    scoreEl.textContent = score;
    timeLeftEl.textContent = remainingTime;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
  }

  // Update highscore using localStorage
  function updateHighscore() {
    if (score > highscore) {
      highscore = score;
      localStorage.setItem("typingRhythmHighscore", highscore);
      highscoreEl.textContent = highscore;
    }
  }
});
