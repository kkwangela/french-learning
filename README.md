# 🇫🇷 VerbeMaster — French Vocabulary & Conjugation Learning Web App

**VerbeMaster** is an interactive, modern web application specifically engineered to help English speakers remember French vocabulary words and master their associated verb conjugations.

---

## ✨ Key Features

### 1. 🗂️ Spaced Repetition System (SRS Flashcards)
- Built on the proven **SuperMemo SM-2** spaced repetition algorithm.
- Interactive 3D flip cards with pronunciation, phonetic spelling, grammatical gender, part of speech, and contextual example sentences.
- 4-tier rating system: **Again (1)**, **Hard (2)**, **Good (3)**, and **Easy (4)**.
- Filter deck by: Everything, Verb Conjugations only, or Vocabulary words only.
- Keyboard shortcuts: `Space` to flip, `1`, `2`, `3`, `4` to rate cards.

### 2. ⚡ Rapid Conjugation Drill
- Rapid-fire drill testing all essential French tenses:
  - **Présent de l'indicatif**
  - **Passé Composé** (with auxiliary *avoir* or *être* and agreement rules)
  - **Imparfait**
  - **Futur Simple**
- Smart typo & accent checking.
- One-click French accent helper toolbar (`é`, `è`, `ê`, `à`, `â`, `ç`, `î`, `ï`, `ô`, `û`, `œ`).
- Streak tracking with fire badge (`🔥`) and high-score memory.

### 3. 🎧 Écoute & Dictée (French Listening & Dictation)
- **🔤 Dictée de Verbes (Verb & Conjugation Dictation)**: Hear conjugated verbs and type the exact spelling (*nous prenons*, *ils vont*, *elle est allée*, *vous faites*, *nous mangeons*, *ils apprennent*).
- **⚡ Pièges de Liaison (Liaison & Phonetic Ear Training)**: Distinguish notoriously confusing spoken French pairs, such as *Ils ont* [il.zɔ̃] vs *Ils sont* [il.sɔ̃], *Vous avez* vs *Vous savez*, and imparfait *-ais* vs passé composé *-é*.
- **📝 Dictée de Phrases (Sentence Dictation)**: Listen to full real-world sentences at normal speed (0.9x) or slow speed (0.65x 🐢).
- **Word-by-word visual diff feedback**: Highlights correct words in green and misspelled/missed words in red with grammatical corrections.
- **Dynamic sound wave animation** synchronizing with speech playback.

### 4. 📕 错题本 (Carnet d'Erreurs & Targeted Re-drill)
- **Automatic Error Logging**: Automatically captures every mistake made during rapid conjugation drills, dictations, listening discrimination, context sentences, and failed flashcards.
- **Answer Comparison & Rule Hints**: Displays your mistake side-by-side with the correct French spelling, pronunciation audio 🔊, error count, and grammar notes.
- **🎯 Targeted Re-drill Mode (专攻错题)**: Practice only your unresolved mistakes until you achieve full mastery! Correct answers in re-drill mode automatically mark mistakes as resolved.
- **Filters & Search**: Filter by exercise type (Conjugaison, Écoute, Phrase, Vocabulaire), status (Unresolved / Mastered), or search by keyword.
- **Integrated Backup**: Mistake history is included in the one-click JSON backup and restore system.

### 5. 📖 Verb Matrix & Conjugation Explorer
- Instant search and filtering across 30+ top French verbs (Regular `-er`, `-ir`, `-re`, and irregular verbs like *être, avoir, aller, faire, pouvoir, vouloir, devoir, savoir, prendre, venir, voir, dire, mettre...*).
- Full side-by-side pronoun tables for all 6 tenses.
- Built-in audio playback for individual conjugated forms or entire verb conjugations.

### 4. 🧩 Conjugations in Real Context (Cloze Sentences)
- Complete authentic real-world French sentences by typing the correct conjugated verb.
- Grammatical explanations explaining stem changes (e.g. why *mangeons* keeps the 'e', why *prennent* doubles 'n').

### 5. 📚 High-Frequency Vocabulary & Expressions
- Curated vocabulary categorized by daily life, food & dining, travel & city, time & frequency, adjectives, and connectors.
- Clear grammatical gender badges (`M` / `F`) and phonetic guides.
- Direct association links between nouns and their root verbs (e.g., *le repas* ➔ *manger*, *le voyage* ➔ *partir*).

### 6. 💡 Memory Rules & Mnemonics
- Visual guides for high-yield rules:
  - **The Boot Verb Rule** (*Verbes de la botte*)
  - **The 3 Odd "Vous" Endings** (*être, faire, dire*)
  - **DR MRS VANDERTRAMP** for Passé Composé with *être*
  - **Sound Preservation** (*-ger* and *-cer* spelling adjustments)

### 7. 📊 Progress & Retention Analytics
- Active cards learned, mature items in permanent memory, total reviews, and retention accuracy percentage.
- Full local persistence via browser `localStorage`.

---

## 🚀 How to Launch the App

You can launch and use the app immediately with zero dependencies:

### Option A: Open directly in your browser
Simply open `index.html` in your favorite web browser (Chrome, Safari, Firefox, Edge):
```bash
open /Users/kewang/.gemini/antigravity/scratch/french-learning-app/index.html
```
Or double-click `index.html` in Finder.

### Option B: Using the included launcher script
From your terminal:
```bash
cd /Users/kewang/.gemini/antigravity/scratch/french-learning-app
./start.sh
```

---

## 📁 Project Structure

```
french-learning-app/
├── index.html          # Semantic, accessible HTML5 single page app
├── css/
│   └── styles.css      # Polished, responsive styling with Dark/Light theme
├── js/
│   ├── data.js         # Curated French verbs, conjugations & vocabulary
│   ├── srs.js          # SuperMemo SM-2 Spaced Repetition engine
│   ├── audio.js        # Web Speech API & Web Audio synthesizer
│   └── app.js          # UI controller, drill engine, keyboard handlers
├── server.py           # Optional local HTTP server
├── start.sh            # One-click launch script
└── README.md           # Documentation
```

---

## 💡 Recommended Next Steps
To continue developing or adding custom words:
1. Set `/Users/kewang/.gemini/antigravity/scratch/french-learning-app` as your active workspace in Antigravity.
2. Edit `js/data.js` to add your own custom French vocabulary or specialized verb lists.
