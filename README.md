# Typing Rhythm Trainer Pro

**Typing Rhythm Trainer Pro** is a dynamic, web-based game designed to improve your typing rhythm, accuracy, and reaction speed. With real-time feedback, smooth animations, and adjustable difficulty levels, this tool transforms typing practice into an engaging, gamified experience.

---

## Features

- **🎮 Interactive Gameplay**
  Letters fall from the top of the screen. Press the correct keys on your keyboard before they reach the bottom to score points.

- **⚙️ Difficulty Selector**
  Choose between Easy, Medium, or Hard. Each level adjusts the speed and frequency of falling letters.

- **⏱ Countdown Overlay**
  A 3-second animated countdown gives players time to prepare before gameplay begins.

- **📈 Real-Time Scoring & Timer**
  Score and time update live as you play. Your final score is revealed when time runs out.

- **⏸ Pause, Resume, & Reset Controls**
  Easily control your game session with intuitive pause, resume, and reset buttons.

- **🏆 Highscore Tracking**
  Your highest score is saved in `localStorage`, ensuring progress is retained between sessions.

- **🌗 Light/Dark Mode Toggle**
  Customize your experience with a responsive theme switcher for light or dark mode.

- **💻 Responsive & Accessible UI**
  Built with modern CSS (Flexbox, Grid, animations), ensuring it looks great on all devices with keyboard-friendly navigation.

---

## Installation & Running Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Mackrina10/typing-rhythm-trainer-pro
   cd typing-rhythm-trainer-pro
   ```

2. **Launch the application:**

   Open `index.html` directly in your browser.
   _Optional:_ Use a live server for smoother development (e.g., the Live Server extension in VS Code).

---

## File Structure

```
typing-rhythm-trainer-pro/
│
├── index.html      # Core HTML layout and structure
├── styles.css      # Responsive, themed, animated styles
├── script.js       # Main game logic and interactivity
└── README.md       # Project documentation
```

---

## 🎮 How to Play

1. **Choose a difficulty**: Use the dropdown to select Easy, Medium, or Hard.

2. **Start the game**: Click "Start Game" to begin a 3-second countdown.

3. **Type the falling letters**: As letters fall, press the matching key on your keyboard.

4. **Game duration**: The game runs for 60 seconds.

5. **Score points**: Each correct key press earns 10 points. Try to beat your highscore!

6. **Pause or reset**: Use the control buttons at any time to pause, resume, or reset the game.

---

## Technologies Used

- **HTML5 & CSS3**: Semantic layout and visually appealing, responsive design using Flexbox, CSS Grid, variables, transitions, and custom animations.
- **JavaScript (ES6+)**: Manages gameplay, scoring, state transitions, and DOM manipulation.
- **Web APIs**:

  - `KeyboardEvent` for input detection
  - `localStorage` for persistent highscores
  - `setInterval`, `clearInterval` for timing logic

---

## Learning Goals

- **Real-Time Interaction**: Practice working with keyboard events, live scoring, and responsive DOM updates.
- **State Management**: Build logic for pausing, resuming, and resetting timed sessions.
- **Responsive Design**: Learn to design flexible layouts that adapt to screen sizes.
- **Animation & UX**: Use keyframe animations and smooth transitions to enhance user experience.
- **Persistence**: Implement browser-based storage to save progress.

---

## Future Enhancements

- **Multiplayer Mode**: Compete against others in real-time with shared leaderboards.
- **Typing Analytics**: Track WPM, accuracy, and reaction time.
- **Sound Effects**: Add key press and error sounds for feedback.
- **Customization**: Allow users to change fonts, themes, and key mappings.
- **Accessibility Improvements**: Support for screen readers and keyboard-only navigation modes.

---

## License

This project is licensed under the **MIT License** — free to use, modify, and share.

---

### Happy typing!

Train your fingers, challenge your rhythm, and beat your highscore!
