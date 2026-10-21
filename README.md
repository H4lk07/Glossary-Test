# KOTOBA LAB (言葉ラボ) ❖ 現代デジタル用語図鑑

![KOTOBA LAB Hero Banner](assets/hero-banner.jpg)

**KOTOBA LAB** is a responsive, dynamic content Single Page Application (SPA) built with vanilla HTML5, CSS3, and modern JavaScript. The content is crafted entirely in authentic Japanese, offering a comprehensive glossary and learning portal for cutting-edge concepts in Artificial Intelligence, Modern Web, Cloud, UI/UX Design, and Future Technologies.

---

## ✨ Features

- 🔍 **Real-Time Instant Search**: Fast, client-side searching across Japanese Kanji, Katakana, Hiragana, English acronyms, and furigana readings.
- 🏷️ **Dynamic Category & Tag Filtering**: Seamlessly toggle between categories (AI・機械学習, モダンWeb・クラウド, UI/UXデザイン, 次世代トレンド) and tags without page reloads.
- 🪟 **Glassmorphic Native Modal Dialogs**: Rich dialogs using standard HTML `<dialog>` element with `@starting-style` transitions, revealing in-depth explanations, practical use cases, pros & cons, code snippets, and cross-linked related terms.
- 🔊 **Japanese Web Speech Synthesis**: One-click audio pronunciation of Japanese terms with animated sound waves.
- ⚡ **Interactive 1-Minute Quiz Engine**: Embedded dynamic mini-quiz that generates 4-choice questions from the glossary data to test technical comprehension with live score tracking.
- ➕ **User Contribution & Persistence**: Add custom terms directly via modal form, persistently saved using `localStorage`.
- 🌙 **Tokyo Cyber-Slate Dark & Light Modes**: Curated dual themes featuring glassmorphism, fluid typography (`Noto Sans JP` & `Outfit`), and smooth transitions.
- 📈 **Mastery Progress Tracker**: Dynamic tracker computing viewing and bookmarking stats in real time.

---

## 🚀 Getting Started

No build tools, bundlers, or heavy dependencies required. Simply serve the directory with any local static server or open `index.html` in your browser.

### Option 1: Python HTTP Server (Recommended)
```bash
# In the project root directory:
python -m http.server 5500
```
Then visit: [http://localhost:5500](http://localhost:5500)

### Option 2: Node.js (npx serve)
```bash
npx serve .
```

---

## 📂 Project Structure

```text
├── assets/
│   ├── favicon.svg          # SVG brand icon
│   └── hero-banner.jpg      # High-resolution glassmorphic hero artwork
├── css/
│   └── style.css            # Design tokens, Tokyo glassmorphic theme, animations
├── js/
│   ├── data.js              # Curated Japanese technology glossary dataset
│   └── app.js               # Reactive state management, filters, quiz & audio engine
├── index.html               # Semantic HTML5 SPA markup & accessible dialogs
├── .gitignore
└── README.md
```

---

## 📄 License

MIT License. Designed and crafted for modern web exploration.
