// Spaced Repetition System (SRS) using SuperMemo-2 (SM-2) algorithm
class FrenchSRSManager {
  constructor(storageKey = 'french_master_srs_data_v1') {
    this.storageKey = storageKey;
    this.cards = this.load();
    this.ensureInitialCards();
  }

  load() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.warn('Failed to load SRS data from localStorage, starting fresh', e);
      return {};
    }
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cards));
    } catch (e) {
      console.error('Failed to save SRS data to localStorage', e);
    }
  }

  ensureInitialCards() {
    if (!window.FRENCH_DATA) return;

    let modified = false;

    // Initialize vocabulary cards
    if (window.FRENCH_DATA.vocabulary) {
      window.FRENCH_DATA.vocabulary.forEach(item => {
        const id = `vocab_${item.id}`;
        if (!this.cards[id]) {
          this.cards[id] = {
            id,
            refId: item.id,
            type: 'vocab',
            reps: 0,
            interval: 0,
            ef: 2.5,
            due: Date.now() - 1000, // Due immediately
            history: [],
            lastReviewed: null
          };
          modified = true;
        }
      });
    }

    // Initialize core verb conjugation cards (verb + tense + pronoun combinations)
    if (window.FRENCH_DATA.verbs) {
      window.FRENCH_DATA.verbs.forEach(verb => {
        ['present', 'passeCompose', 'imparfait', 'futur'].forEach(tense => {
          if (verb.conjugations && verb.conjugations[tense]) {
            const id = `verb_${verb.id}_${tense}`;
            if (!this.cards[id]) {
              this.cards[id] = {
                id,
                refId: verb.id,
                tense: tense,
                type: 'verb',
                reps: 0,
                interval: 0,
                ef: 2.5,
                due: Date.now() - 1000,
                history: [],
                lastReviewed: null
              };
              modified = true;
            }
          }
        });
      });
    }

    if (modified) {
      this.save();
    }
  }

  getCard(id) {
    return this.cards[id] || null;
  }

  recordReview(id, ratingQuality) {
    // ratingQuality: 1: Again (failed), 2: Hard, 3: Good, 4: Easy
    let card = this.cards[id];
    if (!card) {
      card = {
        id,
        reps: 0,
        interval: 0,
        ef: 2.5,
        due: Date.now(),
        history: [],
        lastReviewed: null
      };
      this.cards[id] = card;
    }

    const now = Date.now();
    let q = ratingQuality; // 1 to 4
    // Map 1-4 to standard SM-2 0-5 scale: 1 -> 1, 2 -> 3, 3 -> 4, 4 -> 5
    const sm2Score = q === 1 ? 1 : q === 2 ? 3 : q === 3 ? 4 : 5;

    // Update Easiness Factor (EF)
    let ef = card.ef + (0.1 - (5 - sm2Score) * (0.08 + (5 - sm2Score) * 0.02));
    if (ef < 1.3) ef = 1.3;
    card.ef = Math.round(ef * 100) / 100;

    let nextIntervalDays = 1;
    if (sm2Score < 3) {
      // Failed
      card.reps = 0;
      nextIntervalDays = 0.1; // Review again in ~2.4 hours or next session
    } else {
      card.reps += 1;
      if (card.reps === 1) {
        nextIntervalDays = 1;
      } else if (card.reps === 2) {
        nextIntervalDays = q === 4 ? 4 : 2;
      } else {
        nextIntervalDays = Math.round(card.interval * card.ef * (q === 4 ? 1.3 : 1.0));
      }
    }

    card.interval = nextIntervalDays;
    card.due = now + nextIntervalDays * 24 * 60 * 60 * 1000;
    card.lastReviewed = now;
    card.history.push({
      date: now,
      score: sm2Score,
      rating: ratingQuality,
      interval: nextIntervalDays
    });

    this.save();
    return card;
  }

  getDueCards(filterType = 'all', limit = 30) {
    const now = Date.now();
    const all = Object.values(this.cards);
    
    let filtered = all.filter(c => {
      if (filterType !== 'all' && c.type !== filterType) return false;
      return c.due <= now;
    });

    // Sort by due date ascending (most overdue first)
    filtered.sort((a, b) => a.due - b.due);
    return filtered.slice(0, limit);
  }

  getPracticeAheadCards(filterType = 'all', limit = 20) {
    const all = Object.values(this.cards);
    const filtered = all.filter(c => filterType === 'all' || c.type === filterType);
    // Soonest-due / least-practiced cards first
    filtered.sort((a, b) => (a.due || 0) - (b.due || 0));
    return filtered.slice(0, limit);
  }

  getStats() {
    const all = Object.values(this.cards);
    const now = Date.now();
    let learnedCount = 0;
    let matureCount = 0;
    let dueCount = 0;
    let totalReviews = 0;
    let correctReviews = 0;

    all.forEach(c => {
      if (c.reps > 0) learnedCount++;
      if (c.reps >= 4) matureCount++;
      if (c.due <= now) dueCount++;

      if (c.history && c.history.length > 0) {
        c.history.forEach(h => {
          totalReviews++;
          if (h.score >= 3) correctReviews++;
        });
      }
    });

    const retentionRate = totalReviews > 0 ? Math.round((correctReviews / totalReviews) * 100) : 100;

    return {
      totalCards: all.length,
      learnedCount,
      matureCount,
      dueCount,
      totalReviews,
      retentionRate
    };
  }

  exportData() {
    const mistakeData = localStorage.getItem('french_mistakes_notebook_v1');
    const userVocabData = localStorage.getItem('french_user_vocab_v1');
    return JSON.stringify({
      version: 3,
      exportDate: new Date().toISOString(),
      bestStreak: localStorage.getItem('french_best_streak') || 0,
      cards: this.cards,
      mistakes: mistakeData ? JSON.parse(mistakeData) : [],
      userVocab: userVocabData ? JSON.parse(userVocabData) : {}
    }, null, 2);
  }

  importData(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data && data.cards) {
        this.cards = data.cards;
        if (data.bestStreak !== undefined) {
          localStorage.setItem('french_best_streak', data.bestStreak);
        }
        if (data.mistakes && Array.isArray(data.mistakes)) {
          localStorage.setItem('french_mistakes_notebook_v1', JSON.stringify(data.mistakes));
          if (window.mistakeManager) {
            window.mistakeManager.mistakes = data.mistakes;
            window.mistakeManager.notifyUpdate();
          }
        }
        if (data.userVocab && typeof data.userVocab === 'object') {
          localStorage.setItem('french_user_vocab_v1', JSON.stringify(data.userVocab));
          if (window.userVocabNotebook) {
            window.userVocabNotebook.words = data.userVocab;
            window.userVocabNotebook.notifyUpdate();
          }
        }
        this.save();
        return true;
      }
      return false;
    } catch (e) {
      console.error('Failed to parse import JSON:', e);
      return false;
    }
  }

  resetProgress() {
    this.cards = {};
    localStorage.removeItem(this.storageKey);
    this.ensureInitialCards();
  }
}

// French Mistakes Notebook Manager (Carnet d'Erreurs)
class FrenchMistakeManager {
  constructor(storageKey = 'french_mistakes_notebook_v1') {
    this.storageKey = storageKey;
    this.mistakes = this.load();
  }

  load() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn('Failed to load mistakes notebook:', e);
      return [];
    }
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.mistakes));
    } catch (e) {
      console.error('Failed to save mistakes notebook:', e);
    }
  }

  addMistake(entry) {
    const now = Date.now();
    const existingIndex = this.mistakes.findIndex(m => 
      (entry.id && m.id === entry.id) || 
      (m.prompt === entry.prompt && m.correctAnswer.toLowerCase() === entry.correctAnswer.toLowerCase())
    );

    if (existingIndex >= 0) {
      const existing = this.mistakes[existingIndex];
      existing.wrongCount = (existing.wrongCount || 1) + 1;
      existing.lastFailed = now;
      existing.userAnswer = entry.userAnswer;
      existing.resolved = false;
      if (entry.explanation) existing.explanation = entry.explanation;
      // Bring most recently failed mistake to front
      this.mistakes.splice(existingIndex, 1);
      this.mistakes.unshift(existing);
    } else {
      this.mistakes.unshift({
        id: entry.id || `m_${now}_${Math.random().toString(36).substr(2, 5)}`,
        type: entry.type || 'Conjugaison', // 'Conjugaison', 'Écoute', 'Phrase', 'Vocabulaire'
        prompt: entry.prompt,
        userAnswer: entry.userAnswer || '',
        correctAnswer: entry.correctAnswer,
        explanation: entry.explanation || '',
        hint: entry.hint || '',
        audioText: entry.audioText || entry.correctAnswer,
        wrongCount: 1,
        addedAt: now,
        lastFailed: now,
        resolved: false,
        streakInPractice: 0
      });
    }

    this.save();
    this.notifyUpdate();
  }

  markResolved(id) {
    const item = this.mistakes.find(m => m.id === id);
    if (item) {
      item.resolved = true;
      item.resolvedAt = Date.now();
      this.save();
      this.notifyUpdate();
    }
  }

  deleteMistake(id) {
    this.mistakes = this.mistakes.filter(m => m.id !== id);
    this.save();
    this.notifyUpdate();
  }

  clearResolved() {
    this.mistakes = this.mistakes.filter(m => !m.resolved);
    this.save();
    this.notifyUpdate();
  }

  clearAll() {
    this.mistakes = [];
    this.save();
    this.notifyUpdate();
  }

  getUnresolvedCount() {
    return this.mistakes.filter(m => !m.resolved).length;
  }

  notifyUpdate() {
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('french-mistakes-updated'));
    }
  }
}

if (typeof window !== 'undefined') {
  window.FrenchSRSManager = FrenchSRSManager;
  window.FrenchMistakeManager = FrenchMistakeManager;
}
