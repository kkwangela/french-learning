<p align="right">
  <strong>English</strong> | <a href="README.zh.md">中文版</a>
</p>

# 🗼 Je veux aller à Paris — French Vocabulary & Conjugation Web App

<p align="center">
  <img src="assets/icon-192.png" alt="Je veux aller à Paris Logo" width="120" />
</p>

**Je veux aller à Paris** is an interactive, zero-dependency French learning web app and offline-capable PWA designed to help learners memorize French vocabulary, master verb conjugations, sharpen listening comprehension, and track personal word & mistake notebooks across desktop and mobile devices.

🌐 **Live App:** https://kkwangela.github.io/french-learning/

---

## ✨ Key Features

### 1. 🗂️ Spaced Repetition System (SRS Flashcards)
- Powered by the **SuperMemo SM-2** spaced repetition algorithm.
- 3D flip cards featuring native French pronunciation, phonetic transcription, grammatical gender, part of speech, and clickable contextual example sentences.
- 4-tier rating system: **Again (1)**, **Hard (2)**, **Good (3)**, and **Easy (4)**.
- Filter decks by *Everything*, *Verb Conjugations Only*, *Vocabulary Words Only*, or *My Word Notebook*.
- Keyboard shortcuts: `Space` to flip, `1`–`4` to rate cards.

### 2. ⚡ Rapid Conjugation Drill
- Interactive speed drills covering essential French tenses:
  - **Présent de l'indicatif**
  - **Passé Composé** (auxiliary *avoir* / *être* and agreement rules)
  - **Imparfait**
  - **Futur Simple**
- Built-in French accent helper toolbar (`é`, `è`, `ê`, `à`, `â`, `ç`, `î`, `ï`, `ô`, `û`, `œ`) and streak tracking (`🔥`).

### 3. 🎧 Listening & Dictation
- **Verb Dictation**: Hear conjugated verbs and type exact spellings.
- **Liaison Traps**: Train your ear on classic spoken French pairs (*Ils ont* vs *Ils sont*, *Vous avez* vs *Vous savez*, imparfait *-ais* vs passé composé *-é*).
- **Sentence Dictation**: Listen to conversational French at normal (`0.9x`) or slow (`0.65x`) speed with word-by-word diff feedback.

### 4. 💬 Click-to-Lookup Tooltip & 📒 Word Notebook
- Click any French word inside example sentences (*In Context*, *Flashcards*, *Vocabulary*, or *Listening* feedback) to open an instant dictionary popup with English definition, phonetics, part of speech, gender, verb conjugation source, and French audio.
- Save words with one click along with their source example sentence, and launch dedicated SRS flashcard reviews directly from your Word Notebook.

### 5. 📕 Mistake Notebook & Targeted Re-drill
- Automatically captures missed answers from drills, dictations, liaison tests, context sentences, and failed flashcards.
- Compare your answer side-by-side with the correct form, listen to pronunciation, and run targeted re-drill sessions until mastered.

### 6. 📖 Verb Explorer, 🧩 In Context, 📚 Vocabulary & 💡 Memory Rules
- Searchable 30+ verb matrix across 6 tenses with full audio playback.
- Fill-in-the-blank sentence context challenges and categorized high-frequency vocabulary with gender badges (`M` / `F`).
- Visual mnemonics (*Boot Verbs*, *DR MRS VANDERTRAMP*, *3 Odd "Vous" Endings*, *-ger / -cer* rules).

### 7. 🌐 Bilingual UI Switcher & 📦 Cross-Device Backup
- One-click **Chinese / English UI switcher (`🌐`)** in the top bar (keeps French word explanations in English while translating all interface labels cleanly).
- One-click **JSON Backup & Restore** transferring all SRS intervals, Mistake Notebook, and Word Notebook data across devices.
- Responsive **Left Sidebar** on desktop, slide-out **Drawer** on mobile, Light/Dark theme, and Service Worker offline caching.

---

## 📱 Install as a Phone App (PWA)

1. Open https://kkwangela.github.io/french-learning/ in **Safari** (iOS) or **Chrome** (Android).
2. Tap **Share (📤)** → **Add to Home Screen**.
3. Open **Je veux aller à Paris** directly from your home screen in full-screen standalone mode with offline support.

For native Xcode packaging instructions, see [ios/README.md](ios/README.md).

---

## 🚀 Run Locally

### Option A: Open directly in a browser
Open `index.html` in Chrome, Safari, Firefox, or Edge.

### Option B: Start the local server (also prints your LAN URL for phone testing)
```bash
./start.sh
```

---

## 📁 Project Structure

```
french-learning-app/
├── index.html          # Single-page app with left sidebar & mobile drawer
├── manifest.json       # PWA manifest
├── sw.js               # Service Worker for offline caching
├── assets/             # App icons (favicon, 180px, 192px, 512px)
├── css/
│   └── styles.css      # Responsive layout, tooltips & dark/light theme
├── js/
│   ├── i18n.js         # Chinese / English UI translation layer
│   ├── data.js         # French verbs, conjugations, vocabulary & listening sets
│   ├── srs.js          # SuperMemo SM-2 engine, mistakes & JSON backup/restore
│   ├── audio.js        # Mobile-optimized French Web Speech API manager
│   ├── wordtooltip.js  # Click-to-lookup tooltip & Word Notebook
│   └── app.js          # Main application controller
├── ios/                # Optional Xcode SwiftUI WKWebView wrapper & guide
├── server.py           # Local HTTP server with LAN IP output
├── start.sh            # One-click launch script
├── README.md           # English documentation
└── README.zh.md        # Chinese documentation
```
