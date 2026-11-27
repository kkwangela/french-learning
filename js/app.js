// French Master Learning App - Application Controller
document.addEventListener('DOMContentLoaded', () => {
  // Initialize managers
  const t = (k, p) => (window.I18N ? window.I18N.t(k, p) : k);
  const audioManager = new FrenchAudioManager();
  const srsManager = new FrenchSRSManager();
  const mistakeManager = new FrenchMistakeManager();
  window.mistakeManager = mistakeManager;
  const userVocabNotebook = new UserVocabNotebook();
  window.userVocabNotebook = userVocabNotebook;
  const wordTooltipMgr = new WordTooltipManager(userVocabNotebook, audioManager, srsManager);
  window.wordTooltipMgr = wordTooltipMgr;
  const dictionaryMgr = typeof FrenchDictionaryManager !== 'undefined'
    ? new FrenchDictionaryManager(wordTooltipMgr, userVocabNotebook, audioManager, srsManager)
    : null;
  window.dictionaryMgr = dictionaryMgr;

  // Apply saved UI language immediately
  if (window.I18N) {
    window.I18N.apply(document);
  }

  // Application State
  const state = {
    activeTab: 'srs', // 'srs', 'drill', 'listening', 'mistakes', 'verbs', 'sentences', 'vocab', 'stats'
    theme: localStorage.getItem('french_theme') || 'light',
    
    // Flashcard State
    currentFlashcardIndex: 0,
    dueCards: [],
    isCardFlipped: false,
    flashcardMode: 'all', // 'all', 'verbs', 'vocab'
    
    // Drill State
    currentDrill: null,
    drillScore: { correct: 0, total: 0, streak: 0, bestStreak: parseInt(localStorage.getItem('french_best_streak') || '0', 10) },
    drillTenseFilter: 'all', // 'all', 'present', 'passeCompose', 'imparfait', 'futur'
    drillGroupFilter: 'all', // 'all', 'er', 'ir', 're', 'irregular'
    
    // Listening Module State
    listeningMode: 'verbs', // 'verbs', 'liaisons', 'sentences'
    listeningIndex: 0,
    currentListeningItem: null,
    isListeningSubmitted: false,
    isAudioPlaying: false,

    // Mistake Practice State
    mistakePracticeQueue: [],
    mistakePracticeIndex: 0,
    currentMistakePracticeItem: null,
    isMistakePracticeSubmitted: false,

    // Verb Explorer State
    selectedVerbId: 'etre',
    selectedTense: 'present',
    verbSearchQuery: '',
    verbGroupFilter: 'all',

    // Sentence Drill State
    currentSentenceIndex: 0,
    sentenceDrills: window.FRENCH_DATA.sentenceDrills || []
  };

  // Apply Theme
  document.documentElement.setAttribute('data-theme', state.theme);

  // DOM Elements Cache
  const elements = {
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    audioToggleBtn: document.getElementById('audioToggleBtn'),
    langToggleBtn: document.getElementById('langToggleBtn'),
    voiceSelectDropdown: document.getElementById('voiceSelectDropdown'),
    navTabs: document.querySelectorAll('.nav-tab-btn'),
    viewSections: document.querySelectorAll('.view-section'),
    appShell: document.getElementById('appShell'),
    appSidebar: document.getElementById('appSidebar'),
    sidebarBackdrop: document.getElementById('sidebarBackdrop'),
    sidebarToggleBtn: document.getElementById('sidebarToggleBtn'),
    sidebarCloseBtn: document.getElementById('sidebarCloseBtn'),
    topbarPageTitle: document.getElementById('topbarPageTitle'),
    
    // Stat pills
    statDueCount: document.getElementById('statDueCount'),
    statMasteredCount: document.getElementById('statMasteredCount'),
    statStreak: document.getElementById('statStreak'),
    statAccuracy: document.getElementById('statAccuracy'),

    // Flashcard SRS
    flashcardContainer: document.getElementById('flashcardContainer'),
    flashcardWord: document.getElementById('flashcardWord'),
    flashcardBadge: document.getElementById('flashcardBadge'),
    flashcardPhonetic: document.getElementById('flashcardPhonetic'),
    flashcardContext: document.getElementById('flashcardContext'),
    flashcardMeaning: document.getElementById('flashcardMeaning'),
    flashcardConjugationTag: document.getElementById('flashcardConjugationTag'),
    flashcardConjugationGrid: document.getElementById('flashcardConjugationGrid'),
    flashcardExampleFr: document.getElementById('flashcardExampleFr'),
    flashcardExampleEn: document.getElementById('flashcardExampleEn'),
    flashcardAudioFront: document.getElementById('flashcardAudioFront'),
    flashcardAudioBack: document.getElementById('flashcardAudioBack'),
    flashcardProgressBar: document.getElementById('flashcardProgressBar'),
    flashcardProgressText: document.getElementById('flashcardProgressText'),
    srsRatingBar: document.getElementById('srsRatingBar'),
    flashcardFilterSelect: document.getElementById('flashcardFilterSelect'),

    // Conjugation Drill
    drillVerbBadge: document.getElementById('drillVerbBadge'),
    drillPromptTitle: document.getElementById('drillPromptTitle'),
    drillTenseTag: document.getElementById('drillTenseTag'),
    drillRuleTip: document.getElementById('drillRuleTip'),
    drillInput: document.getElementById('drillInput'),
    drillSubmitBtn: document.getElementById('drillSubmitBtn'),
    drillNextBtn: document.getElementById('drillNextBtn'),
    drillAudioBtn: document.getElementById('drillAudioBtn'),
    drillFeedback: document.getElementById('drillFeedback'),
    drillTenseFilter: document.getElementById('drillTenseFilter'),
    drillGroupFilter: document.getElementById('drillGroupFilter'),
    drillStreakBadge: document.getElementById('drillStreakBadge'),
    accentButtons: document.querySelectorAll('.btn-accent'),

    // Listening & Dictation Elements
    lmodeVerbsBtn: document.getElementById('lmodeVerbsBtn'),
    lmodeLiaisonsBtn: document.getElementById('lmodeLiaisonsBtn'),
    lmodeSentencesBtn: document.getElementById('lmodeSentencesBtn'),
    soundwaveVisualizer: document.getElementById('soundwaveVisualizer'),
    listeningPlayNormalBtn: document.getElementById('listeningPlayNormalBtn'),
    listeningPlaySlowBtn: document.getElementById('listeningPlaySlowBtn'),
    listeningRepeatBtn: document.getElementById('listeningRepeatBtn'),
    listeningToggleHintBtn: document.getElementById('listeningToggleHintBtn'),
    listeningHintText: document.getElementById('listeningHintText'),
    listeningDictationContainer: document.getElementById('listeningDictationContainer'),
    listeningInput: document.getElementById('listeningInput'),
    listeningFeedback: document.getElementById('listeningFeedback'),
    listeningSubmitBtn: document.getElementById('listeningSubmitBtn'),
    listeningNextBtn: document.getElementById('listeningNextBtn'),
    listeningLiaisonContainer: document.getElementById('listeningLiaisonContainer'),
    listeningLiaisonOptions: document.getElementById('listeningLiaisonOptions'),
    listeningLiaisonFeedback: document.getElementById('listeningLiaisonFeedback'),
    listeningLiaisonNextBtn: document.getElementById('listeningLiaisonNextBtn'),

    // Mistake Notebook Elements
    mistakeBadgeCount: document.getElementById('mistakeBadgeCount'),
    startMistakesPracticeBtn: document.getElementById('startMistakesPracticeBtn'),
    clearResolvedMistakesBtn: document.getElementById('clearResolvedMistakesBtn'),
    mistakePracticeArena: document.getElementById('mistakePracticeArena'),
    practiceMistakeProgress: document.getElementById('practiceMistakeProgress'),
    closeMistakePracticeBtn: document.getElementById('closeMistakePracticeBtn'),
    practiceMistakeType: document.getElementById('practiceMistakeType'),
    practiceMistakePrompt: document.getElementById('practiceMistakePrompt'),
    practiceMistakeHint: document.getElementById('practiceMistakeHint'),
    practiceMistakeInput: document.getElementById('practiceMistakeInput'),
    practiceMistakeFeedback: document.getElementById('practiceMistakeFeedback'),
    practiceMistakeAudioBtn: document.getElementById('practiceMistakeAudioBtn'),
    practiceMistakeSubmitBtn: document.getElementById('practiceMistakeSubmitBtn'),
    practiceMistakeNextBtn: document.getElementById('practiceMistakeNextBtn'),
    mistakeTypeFilter: document.getElementById('mistakeTypeFilter'),
    mistakeStatusFilter: document.getElementById('mistakeStatusFilter'),
    mistakeSearchInput: document.getElementById('mistakeSearchInput'),
    mistakesListContainer: document.getElementById('mistakesListContainer'),

    // Verb Explorer
    verbSearchInput: document.getElementById('verbSearchInput'),
    verbGroupFilterSelect: document.getElementById('verbGroupFilterSelect'),
    verbGrid: document.getElementById('verbGrid'),
    verbMatrixTitle: document.getElementById('verbMatrixTitle'),
    verbMatrixEnglish: document.getElementById('verbMatrixEnglish'),
    verbMatrixTip: document.getElementById('verbMatrixTip'),
    verbMatrixTenseSelect: document.getElementById('verbMatrixTenseSelect'),
    conjugationTableBody: document.getElementById('conjugationTableBody'),
    verbPronounceAllBtn: document.getElementById('verbPronounceAllBtn'),

    // Sentence Drill
    sentencePrompt: document.getElementById('sentencePrompt'),
    sentenceEnglish: document.getElementById('sentenceEnglish'),
    sentenceInput: document.getElementById('sentenceInput'),
    sentenceSubmitBtn: document.getElementById('sentenceSubmitBtn'),
    sentenceFeedback: document.getElementById('sentenceFeedback'),
    sentenceNextBtn: document.getElementById('sentenceNextBtn'),

    // Vocab Explorer
    vocabCategoryFilter: document.getElementById('vocabCategoryFilter'),
    vocabSearchInput: document.getElementById('vocabSearchInput'),
    vocabTableBody: document.getElementById('vocabTableBody'),

    // User Vocab Notebook (单词本)
    userVocabBadgeCount: document.getElementById('userVocabBadgeCount'),
    userVocabSearchInput: document.getElementById('userVocabSearchInput'),
    clearUserVocabBtn: document.getElementById('clearUserVocabBtn'),
    practiceUserVocabSrsBtn: document.getElementById('practiceUserVocabSrsBtn'),
    openDictFromVocabBtn: document.getElementById('openDictFromVocabBtn'),
    dictSearchInput: document.getElementById('dictSearchInput'),
    refreshAppBtn: document.getElementById('refreshAppBtn'),

    // Stats View
    statsTotalLearned: document.getElementById('statsTotalLearned'),
    statsMatureCount: document.getElementById('statsMatureCount'),
    statsTotalReviews: document.getElementById('statsTotalReviews'),
    statsRetentionRate: document.getElementById('statsRetentionRate'),
    exportProgressBtn: document.getElementById('exportProgressBtn'),
    importProgressBtn: document.getElementById('importProgressBtn'),
    importBackupFileInput: document.getElementById('importBackupFileInput'),
    resetProgressBtn: document.getElementById('resetProgressBtn'),
    headerBackupRestoreBtn: document.getElementById('headerBackupRestoreBtn'),
    migrationPanelCard: document.getElementById('migrationPanelCard')
  };

  /* ----------------------------------------------------
     THEME & AUDIO TOGGLES
  ---------------------------------------------------- */
  if (elements.themeToggleBtn) {
    elements.themeToggleBtn.addEventListener('click', () => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('french_theme', state.theme);
      elements.themeToggleBtn.innerHTML = state.theme === 'light' ? '🌙' : '☀️';
    });
    elements.themeToggleBtn.innerHTML = state.theme === 'light' ? '🌙' : '☀️';
  }

  if (elements.audioToggleBtn) {
    elements.audioToggleBtn.addEventListener('click', () => {
      audioManager.soundEffectsEnabled = !audioManager.soundEffectsEnabled;
      elements.audioToggleBtn.innerHTML = audioManager.soundEffectsEnabled ? '🔊' : '🔇';
    });
  }

  if (elements.langToggleBtn && window.I18N) {
    elements.langToggleBtn.addEventListener('click', () => {
      window.I18N.toggleLang();
    });
  }

  /* ----------------------------------------------------
     FRENCH VOICE SELECTION
  ---------------------------------------------------- */
  function populateVoiceSelector() {
    if (!elements.voiceSelectDropdown) return;
    const voices = audioManager.getAvailableFrenchVoices();
    const useOnline = audioManager.shouldUseOnlineAudio();
    const pref = audioManager.preferredVoiceURI;
    elements.voiceSelectDropdown.innerHTML = '';

    // 1. Always offer Online French HD (<audio>) — works reliably on iPhone/Android & all browsers
    const onlineOpt = document.createElement('option');
    onlineOpt.value = '__online_hd__';
    onlineOpt.textContent = t('voice_online_opt');
    if (pref === '__online_hd__' || (!pref && useOnline)) {
      onlineOpt.selected = true;
    }
    elements.voiceSelectDropdown.appendChild(onlineOpt);

    // 2. System default French (lets OS pick best native French voice without setting utterance.voice)
    const sysOpt = document.createElement('option');
    sysOpt.value = '__system_default__';
    sysOpt.textContent = t('voice_system_opt');
    if (pref === '__system_default__') {
      sysOpt.selected = true;
    }
    elements.voiceSelectDropdown.appendChild(sysOpt);

    // 3. Individual installed system French voices
    const currentVoice = audioManager.getFrenchVoice();
    voices.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.voiceURI || v.name;
      const cleanLang = (v.lang || 'fr-FR').replace(/_/g, '-');
      opt.textContent = `${v.name} (${cleanLang})`;
      if (!useOnline && pref !== '__system_default__' && currentVoice && (v.voiceURI === currentVoice.voiceURI || v.name === currentVoice.name)) {
        opt.selected = true;
      }
      elements.voiceSelectDropdown.appendChild(opt);
    });
  }

  populateVoiceSelector();
  window.addEventListener('french-voices-ready', populateVoiceSelector);
  window.addEventListener('french-ui-lang-changed', populateVoiceSelector);

  if (elements.voiceSelectDropdown) {
    elements.voiceSelectDropdown.addEventListener('change', (e) => {
      audioManager.setPreferredVoice(e.target.value);
      audioManager.speak("Bonjour ! Voix française configurée.");
    });
  }

  /* ----------------------------------------------------
     HEADER QUICK BACKUP / RESTORE JUMP
  ---------------------------------------------------- */
  if (elements.headerBackupRestoreBtn) {
    elements.headerBackupRestoreBtn.addEventListener('click', () => {
      switchTab('stats');
      closeMobileSidebar();
      if (elements.migrationPanelCard) {
        setTimeout(() => {
          elements.migrationPanelCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          elements.migrationPanelCard.classList.add('pulse-highlight');
          setTimeout(() => elements.migrationPanelCard.classList.remove('pulse-highlight'), 2200);
        }, 120);
      }
    });
  }

  /* ----------------------------------------------------
     SIDEBAR & NAVIGATION
  ---------------------------------------------------- */
  const TAB_ICONS = {
    srs: '🗂️',
    drill: '⚡',
    listening: '🎧',
    sentences: '🧩',
    mistakes: '📕',
    uservocab: '📒',
    dictionary: '🔍',
    verbs: '📖',
    vocab: '📚',
    tips: '💡',
    stats: '📊'
  };

  function updateTopbarTitle(tabId) {
    if (!elements.topbarPageTitle) return;
    const icon = TAB_ICONS[tabId] || '';
    const label = t(`nav_${tabId}`);
    elements.topbarPageTitle.textContent = `${icon} ${label}`.trim();
  }

  function isMobileViewport() {
    return window.innerWidth <= 960;
  }

  function closeMobileSidebar() {
    if (elements.appSidebar) elements.appSidebar.classList.remove('mobile-open');
    if (elements.sidebarBackdrop) elements.sidebarBackdrop.classList.remove('visible');
  }

  function toggleSidebar() {
    if (isMobileViewport()) {
      const opening = elements.appSidebar && !elements.appSidebar.classList.contains('mobile-open');
      if (elements.appSidebar) elements.appSidebar.classList.toggle('mobile-open', opening);
      if (elements.sidebarBackdrop) elements.sidebarBackdrop.classList.toggle('visible', opening);
    } else if (elements.appShell) {
      elements.appShell.classList.toggle('sidebar-collapsed');
    }
  }

  if (elements.sidebarToggleBtn) {
    elements.sidebarToggleBtn.addEventListener('click', toggleSidebar);
  }
  if (elements.sidebarCloseBtn) {
    elements.sidebarCloseBtn.addEventListener('click', closeMobileSidebar);
  }
  if (elements.sidebarBackdrop) {
    elements.sidebarBackdrop.addEventListener('click', closeMobileSidebar);
  }
  window.addEventListener('resize', () => {
    if (!isMobileViewport()) closeMobileSidebar();
  });

  elements.navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      switchTab(target);
      closeMobileSidebar();
    });
  });

  function switchTab(tabId) {
    state.activeTab = tabId;
    elements.navTabs.forEach(t => {
      const isActive = t.dataset.target === tabId;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    elements.viewSections.forEach(s => s.classList.toggle('active', s.id === `view-${tabId}`));
    updateTopbarTitle(tabId);

    if (tabId === 'srs') {
      loadDueCards();
    } else if (tabId === 'drill') {
      if (!state.currentDrill) generateNewDrill();
    } else if (tabId === 'listening') {
      initListeningExercise();
    } else if (tabId === 'mistakes') {
      renderMistakesList();
    } else if (tabId === 'verbs') {
      renderVerbGrid();
      renderVerbMatrix(state.selectedVerbId);
    } else if (tabId === 'sentences') {
      renderSentenceDrill();
    } else if (tabId === 'vocab') {
      renderVocabTable();
    } else if (tabId === 'uservocab') {
      renderUserVocabSection();
    } else if (tabId === 'dictionary') {
      if (elements.dictSearchInput) {
        setTimeout(() => elements.dictSearchInput.focus(), 60);
      }
    } else if (tabId === 'stats') {
      renderStatsView();
    }

    wordTooltipMgr.hideTooltip();
    updateHeaderStats();
    updateMistakeBadge();
    updateUserVocabBadge();
  }

  function updateUserVocabBadge() {
    if (!elements.userVocabBadgeCount) return;
    const count = userVocabNotebook.count;
    elements.userVocabBadgeCount.textContent = count;
    elements.userVocabBadgeCount.classList.toggle('zero', count === 0);
  }

  function jumpToUserVocabSrs() {
    const words = userVocabNotebook.getAll();
    if (words.length === 0) {
      alert(t('uv_empty_alert'));
      return;
    }
    // Ensure all notebook words exist in SRS and are due if none are currently due
    words.forEach(w => wordTooltipMgr._ensureSrsCard(w));
    const dueUserVocab = srsManager.getDueCards('uservocab', 50);
    if (dueUserVocab.length === 0) {
      // Reset due timestamps for uservocab cards so user can review right now
      words.forEach(w => {
        const c = srsManager.cards[`uservocab_${w.key}`];
        if (c) c.due = Date.now() - 1000;
      });
      srsManager.save();
    }
    state.flashcardMode = 'uservocab';
    if (elements.flashcardFilterSelect) {
      elements.flashcardFilterSelect.value = 'uservocab';
    }
    switchTab('srs');
  }

  function renderUserVocabSection() {
    const q = elements.userVocabSearchInput ? elements.userVocabSearchInput.value : '';
    renderUserVocabView(userVocabNotebook, audioManager, srsManager, q, jumpToUserVocabSrs);
  }

  window.addEventListener('french-user-vocab-updated', () => {
    updateUserVocabBadge();
    updateHeaderStats();
    if (state.activeTab === 'uservocab') {
      renderUserVocabSection();
    }
  });

  if (elements.userVocabSearchInput) {
    elements.userVocabSearchInput.addEventListener('input', renderUserVocabSection);
  }

  if (elements.practiceUserVocabSrsBtn) {
    elements.practiceUserVocabSrsBtn.addEventListener('click', jumpToUserVocabSrs);
  }

  if (elements.openDictFromVocabBtn) {
    elements.openDictFromVocabBtn.addEventListener('click', () => switchTab('dictionary'));
  }

  if (elements.clearUserVocabBtn) {
    elements.clearUserVocabBtn.addEventListener('click', () => {
      if (userVocabNotebook.count === 0) return;
      if (confirm(t('uv_confirm_clear'))) {
        // Also remove uservocab SRS cards
        Object.keys(srsManager.cards).forEach(id => {
          if (id.startsWith('uservocab_')) delete srsManager.cards[id];
        });
        srsManager.save();
        userVocabNotebook.clear();
        renderUserVocabSection();
      }
    });
  }

  // Re-render dynamic views whenever UI language switches
  window.addEventListener('french-ui-lang-changed', () => {
    updateTopbarTitle(state.activeTab);
    renderCurrentFlashcard();
    renderMistakesList();
    renderUserVocabSection();
    wordTooltipMgr.hideTooltip();
    if (elements.listeningToggleHintBtn && elements.listeningHintText) {
      const isHidden = elements.listeningHintText.style.display === 'none';
      elements.listeningToggleHintBtn.textContent = isHidden ? t('listening_show_hint') : t('listening_hide_hint');
    }
  });

  function updateHeaderStats() {
    const stats = srsManager.getStats();
    if (elements.statDueCount) elements.statDueCount.textContent = stats.dueCount;
    if (elements.statMasteredCount) elements.statMasteredCount.textContent = stats.learnedCount;
    if (elements.statStreak) elements.statStreak.textContent = `${state.drillScore.streak} 🔥`;
    if (elements.statAccuracy) elements.statAccuracy.textContent = `${stats.retentionRate}%`;
  }

  function updateMistakeBadge() {
    if (!elements.mistakeBadgeCount) return;
    const count = mistakeManager.getUnresolvedCount();
    elements.mistakeBadgeCount.textContent = count;
    elements.mistakeBadgeCount.classList.toggle('zero', count === 0);
  }

  window.addEventListener('french-mistakes-updated', () => {
    updateMistakeBadge();
    if (state.activeTab === 'mistakes') {
      renderMistakesList();
    }
  });

  /* ----------------------------------------------------
     1. FLASHCARD SRS MODE
  ---------------------------------------------------- */
  const EXTRA_PRESENT_CONJ = {
    oublier: { je: "oublie", tu: "oublies", il: "oublie", nous: "oublions", vous: "oubliez", ils: "oublient" },
    apprendre: { je: "apprends", tu: "apprends", il: "apprend", nous: "apprenons", vous: "apprenez", ils: "apprennent" },
    habiter: { je: "habite", tu: "habites", il: "habite", nous: "habitons", vous: "habitez", ils: "habitent" },
    vivre: { je: "vis", tu: "vis", il: "vit", nous: "vivons", vous: "vivez", ils: "vivent" }
  };

  function resolveVerbConjugations(verbName, tenseKey = 'present') {
    if (!verbName) return null;
    const clean = verbName.toLowerCase().trim();
    const verbs = (window.FRENCH_DATA && window.FRENCH_DATA.verbs) || [];
    const found = verbs.find(v =>
      (v.infinitive || '').toLowerCase() === clean ||
      (v.id || '').toLowerCase() === clean
    );
    if (found && found.conjugations && found.conjugations[tenseKey]) {
      return { infinitive: found.infinitive, forms: found.conjugations[tenseKey] };
    }
    if (tenseKey === 'present' && EXTRA_PRESENT_CONJ[clean]) {
      return { infinitive: clean, forms: EXTRA_PRESENT_CONJ[clean] };
    }
    // Regular -er verb fallback for user-saved verbs (excluding aller)
    if (tenseKey === 'present' && /^[a-zà-ÿœ]+er$/.test(clean) && clean !== 'aller' && clean.length > 3) {
      const stem = clean.slice(0, -2);
      const nousForm = clean.endsWith('ger') ? `${stem}eons` : clean.endsWith('cer') ? `${stem.slice(0, -1)}çons` : `${stem}ons`;
      return {
        infinitive: clean,
        forms: { je: `${stem}e`, tu: `${stem}es`, il: `${stem}e`, nous: nousForm, vous: `${stem}ez`, ils: `${stem}ent` }
      };
    }
    return null;
  }

  function formatSpokenConjugation(pronounKey, rawForm) {
    const form = (rawForm || '').replace(/\(e\)|\(s\)|\(es\)/g, '').trim();
    if (!form || form === '-') return '';
    if (pronounKey === 'je' && /^[aeéèêiîoôuûyh]/i.test(form)) {
      return `j'${form}`;
    }
    return `${pronounKey} ${form}`;
  }

  function renderFlashcardConjGrid(formsObj) {
    if (!elements.flashcardConjugationGrid) return;
    if (!formsObj) {
      elements.flashcardConjugationGrid.style.display = 'none';
      elements.flashcardConjugationGrid.innerHTML = '';
      return;
    }

    const pronounOrder = [
      { key: 'je', label: 'je' },
      { key: 'nous', label: 'nous' },
      { key: 'tu', label: 'tu' },
      { key: 'vous', label: 'vous' },
      { key: 'il', label: 'il/elle' },
      { key: 'ils', label: 'ils/elles' }
    ];

    const cells = pronounOrder
      .filter(p => formsObj[p.key] && formsObj[p.key] !== '-')
      .map(p => {
        const form = formsObj[p.key];
        const displayPronoun = (p.key === 'je' && /^[aeéèêiîoôuûyh]/i.test(form)) ? "j'" : `${p.label} `;
        const spokenText = formatSpokenConjugation(p.key, form).replace(/"/g, '&quot;');
        return `<button type="button" class="flashcard-conj-item" data-speak="${spokenText}" title="Listen: ${spokenText}"><span class="conj-text"><strong>${displayPronoun}</strong>${form}</span></button>`;
      })
      .join('');

    if (cells) {
      elements.flashcardConjugationGrid.innerHTML = cells;
      elements.flashcardConjugationGrid.style.display = 'grid';

      elements.flashcardConjugationGrid.querySelectorAll('.flashcard-conj-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          btn.blur();
          audioManager.speak(btn.dataset.speak);
        });
      });
    } else {
      elements.flashcardConjugationGrid.style.display = 'none';
    }
  }

  function loadDueCards() {
    state.dueCards = srsManager.getDueCards(state.flashcardMode, 50);
    state.currentFlashcardIndex = 0;
    state.isCardFlipped = false;
    renderCurrentFlashcard();
  }

  function renderCurrentFlashcard() {
    if (!elements.flashcardContainer) return;

    elements.flashcardContainer.classList.remove('is-flipped');
    state.isCardFlipped = false;

    const promptHintEl = elements.flashcardContainer.querySelector('.flashcard-prompt-hint');

    if (state.dueCards.length === 0) {
      elements.flashcardWord.textContent = t('srs_all_done_title');
      elements.flashcardPhonetic.textContent = "";
      elements.flashcardContext.textContent = t('srs_all_done_desc');
      elements.flashcardBadge.textContent = t('srs_all_done_badge');
      elements.srsRatingBar.style.display = 'none';
      elements.flashcardContainer.style.cursor = 'default';
      if (elements.flashcardAudioFront) elements.flashcardAudioFront.style.display = 'none';
      if (promptHintEl) promptHintEl.style.display = 'none';

      // Clear stale back-face data so completion screen never leaks the last reviewed word
      if (elements.flashcardMeaning) elements.flashcardMeaning.textContent = '';
      if (elements.flashcardConjugationTag) elements.flashcardConjugationTag.textContent = '';
      renderFlashcardConjGrid(null);
      if (elements.flashcardExampleFr) elements.flashcardExampleFr.textContent = '';
      if (elements.flashcardExampleEn) elements.flashcardExampleEn.textContent = '';
      if (elements.flashcardAudioFront) elements.flashcardAudioFront.onclick = null;
      if (elements.flashcardAudioBack) elements.flashcardAudioBack.onclick = null;

      if (elements.flashcardProgressBar) elements.flashcardProgressBar.style.width = '100%';
      if (elements.flashcardProgressText) elements.flashcardProgressText.textContent = t('srs_all_done_progress');
      return;
    }

    elements.flashcardContainer.style.cursor = 'pointer';
    if (elements.flashcardAudioFront) elements.flashcardAudioFront.style.display = '';
    if (promptHintEl) promptHintEl.style.display = '';
    elements.srsRatingBar.style.display = 'flex';
    const cardMeta = state.dueCards[state.currentFlashcardIndex];
    if (!cardMeta) {
      loadDueCards();
      return;
    }

    // Update progress
    const progressPercent = Math.round(((state.currentFlashcardIndex) / state.dueCards.length) * 100);
    if (elements.flashcardProgressBar) elements.flashcardProgressBar.style.width = `${progressPercent}%`;
    if (elements.flashcardProgressText) {
      elements.flashcardProgressText.textContent = t('srs_card_progress', {
        current: state.currentFlashcardIndex + 1,
        total: state.dueCards.length
      });
    }

    if (cardMeta.type === 'vocab') {
      const vocab = window.FRENCH_DATA.vocabulary.find(v => v.id === cardMeta.refId);
      if (!vocab) return;

      elements.flashcardBadge.textContent = vocab.category || 'Vocabulaire';
      elements.flashcardWord.textContent = vocab.french;
      elements.flashcardPhonetic.textContent = vocab.phonetic || '';
      elements.flashcardContext.textContent = `Type: ${vocab.partOfSpeech || 'Word'}${vocab.gender ? ' (' + vocab.gender + ')' : ''}`;

      elements.flashcardMeaning.textContent = vocab.english;
      // Show full present-tense conjugation for verbs or associated verbs!
      const targetVerbName = vocab.partOfSpeech === 'verb' ? vocab.french : vocab.associatedVerb;
      const conjResult = resolveVerbConjugations(targetVerbName, 'present');
      if (conjResult) {
        elements.flashcardConjugationTag.textContent = vocab.partOfSpeech === 'verb'
          ? `Présent — ${conjResult.infinitive}`
          : `Related verb: ${conjResult.infinitive} (Présent)`;
        renderFlashcardConjGrid(conjResult.forms);
      } else {
        elements.flashcardConjugationTag.textContent = vocab.associatedVerb ? `Related verb: ${vocab.associatedVerb}` : 'Essential Word';
        renderFlashcardConjGrid(null);
      }
      elements.flashcardExampleFr.textContent = vocab.exampleFr || '';
      if (vocab.exampleFr) wordTooltipMgr.makeTextClickable(elements.flashcardExampleFr, vocab.exampleFr);
      elements.flashcardExampleEn.textContent = vocab.exampleEn || '';

      // Auto pronunciation on click
      elements.flashcardAudioFront.onclick = (e) => {
        e.stopPropagation();
        audioManager.speak(vocab.french);
      };
      elements.flashcardAudioBack.onclick = (e) => {
        e.stopPropagation();
        audioManager.speak(vocab.exampleFr || vocab.french);
      };
    } else if (cardMeta.type === 'uservocab') {
      const savedWord = userVocabNotebook.words[cardMeta.refId] || cardMeta;
      elements.flashcardBadge.textContent = t('srs_uservocab_badge');
      elements.flashcardWord.textContent = savedWord.french || '';
      elements.flashcardPhonetic.textContent = savedWord.phonetic || '';
      const g = savedWord.gender ? ` (${savedWord.gender})` : '';
      elements.flashcardContext.textContent = `Type: ${savedWord.partOfSpeech || 'Word'}${g}`;

      elements.flashcardMeaning.textContent = savedWord.english || '';
      const savedConj = resolveVerbConjugations(savedWord.french || savedWord.key, 'present');
      if (savedConj) {
        elements.flashcardConjugationTag.textContent = `Présent — ${savedConj.infinitive}`;
        renderFlashcardConjGrid(savedConj.forms);
      } else {
        elements.flashcardConjugationTag.textContent = savedWord.conjugationNote || t('srs_uservocab_default_tag');
        renderFlashcardConjGrid(null);
      }
      elements.flashcardExampleFr.textContent = savedWord.exampleFr || '';
      if (savedWord.exampleFr) wordTooltipMgr.makeTextClickable(elements.flashcardExampleFr, savedWord.exampleFr);
      elements.flashcardExampleEn.textContent = '';

      elements.flashcardAudioFront.onclick = (e) => {
        e.stopPropagation();
        audioManager.speak(savedWord.french || '');
      };
      elements.flashcardAudioBack.onclick = (e) => {
        e.stopPropagation();
        audioManager.speak(savedWord.exampleFr || savedWord.french || '');
      };
    } else if (cardMeta.type === 'verb') {
      const verb = window.FRENCH_DATA.verbs.find(v => v.id === cardMeta.refId);
      if (!verb) return;

      const tenseObj = window.FRENCH_DATA.tenses.find(t => t.key === cardMeta.tense);
      const tenseName = tenseObj ? tenseObj.name : cardMeta.tense;

      elements.flashcardBadge.textContent = `Conjugaison • ${tenseName}`;
      elements.flashcardWord.textContent = `${verb.infinitive} (${tenseName})`;
      elements.flashcardPhonetic.textContent = `[${verb.english}] • Group: ${verb.group.toUpperCase()}`;
      elements.flashcardContext.textContent = `Auxiliary: ${verb.auxiliary} • Participle: ${verb.participlePass}`;

      elements.flashcardMeaning.textContent = `${verb.infinitive} = "${verb.english}"`;
      elements.flashcardConjugationTag.textContent = tenseName;
      renderFlashcardConjGrid(verb.conjugations[cardMeta.tense] || null);
      
      const exactExample = (verb.examples || []).find(ex => ex.tense === cardMeta.tense);
      let exampleFrText = '';
      let exampleEnText = '';
      if (exactExample) {
        exampleFrText = exactExample.fr;
        exampleEnText = exactExample.en || '';
      } else {
        // Fallback strictly in the card's own tense (never fall back to a Present tense example!)
        const forms = verb.conjugations[cardMeta.tense] || {};
        if (forms.je && forms.je !== '-') {
          exampleFrText = /^[aeéèêiîoôuûyh]/i.test(forms.je) ? `J'${forms.je}.` : `Je ${forms.je}.`;
        } else if (forms.il && forms.il !== '-') {
          exampleFrText = `Il ${forms.il}.`;
        }
      }
      elements.flashcardExampleFr.textContent = exampleFrText;
      wordTooltipMgr.makeTextClickable(elements.flashcardExampleFr, exampleFrText);
      elements.flashcardExampleEn.textContent = exampleEnText;

      elements.flashcardAudioFront.onclick = (e) => {
        e.stopPropagation();
        audioManager.speak(verb.infinitive);
      };
      elements.flashcardAudioBack.onclick = (e) => {
        e.stopPropagation();
        audioManager.speak(exampleFrText);
      };
    }
  }

  // Flip flashcard on click (never auto-speak on flip; only speak when clicking 🔊)
  if (elements.flashcardContainer) {
    elements.flashcardContainer.addEventListener('click', (e) => {
      // Do not flip the "All Done" completion screen
      if (!state.dueCards || state.dueCards.length === 0) return;
      // Do not flip card if user clicked a clickable word, conjugation pill, or audio button
      if (e.target && e.target.closest && (
        e.target.closest('.clickable-word') ||
        e.target.closest('.flashcard-conj-item') ||
        e.target.closest('.flashcard-audio-btn')
      )) return;
      state.isCardFlipped = !state.isCardFlipped;
      elements.flashcardContainer.classList.toggle('is-flipped', state.isCardFlipped);
      audioManager.playFlip();
    });
  }

  // Handle SRS rating buttons
  document.querySelectorAll('.btn-srs').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const rating = parseInt(btn.dataset.rating, 10);
      handleCardRating(rating);
    });
  });

  function handleCardRating(rating) {
    const cardMeta = state.dueCards[state.currentFlashcardIndex];
    if (!cardMeta) return;

    srsManager.recordReview(cardMeta.id, rating);
    if (rating >= 3) {
      audioManager.playSuccess();
    } else {
      audioManager.playError();
      // Record failed flashcard to Mistake Notebook
      if (cardMeta.type === 'vocab') {
        const vocab = window.FRENCH_DATA.vocabulary.find(v => v.id === cardMeta.refId);
        if (vocab) {
          mistakeManager.addMistake({
            id: `srs_vocab_${vocab.id}`,
            type: 'Vocabulaire',
            prompt: `${vocab.french} (${vocab.partOfSpeech || 'Word'})`,
            userAnswer: 'À revoir (Again)',
            correctAnswer: `${vocab.french} = "${vocab.english}"`,
            explanation: vocab.exampleFr ? `Exemple : ${vocab.exampleFr} ("${vocab.exampleEn}")` : '',
            hint: vocab.english,
            audioText: vocab.french
          });
        }
      } else if (cardMeta.type === 'verb') {
        const verb = window.FRENCH_DATA.verbs.find(v => v.id === cardMeta.refId);
        if (verb) {
          mistakeManager.addMistake({
            id: `srs_verb_${verb.id}_${cardMeta.tense}`,
            type: 'Conjugaison',
            prompt: `${verb.infinitive} (${cardMeta.tense})`,
            userAnswer: 'À revoir (Again)',
            correctAnswer: `${verb.infinitive} (${cardMeta.tense}) : Je ${verb.conjugations[cardMeta.tense]?.je || ''}`,
            explanation: verb.tip || '',
            hint: `Verbe ${verb.infinitive} ("${verb.english}")`,
            audioText: verb.infinitive
          });
        }
      } else if (cardMeta.type === 'uservocab') {
        const savedWord = userVocabNotebook.words[cardMeta.refId] || cardMeta;
        if (savedWord && savedWord.french) {
          mistakeManager.addMistake({
            id: `srs_uservocab_${cardMeta.refId}`,
            type: 'Vocabulaire',
            prompt: `${savedWord.french}`,
            userAnswer: 'À revoir (Again)',
            correctAnswer: `${savedWord.french} = "${savedWord.english || ''}"`,
            explanation: savedWord.exampleFr ? `Example: ${savedWord.exampleFr}` : '',
            hint: savedWord.english || '',
            audioText: savedWord.french
          });
        }
      }
    }

    state.currentFlashcardIndex++;
    if (state.currentFlashcardIndex >= state.dueCards.length) {
      loadDueCards();
    } else {
      renderCurrentFlashcard();
    }

    updateHeaderStats();
  }

  if (elements.flashcardFilterSelect) {
    elements.flashcardFilterSelect.addEventListener('change', (e) => {
      state.flashcardMode = e.target.value;
      loadDueCards();
    });
  }

  /* ----------------------------------------------------
     2. CONJUGATION DRILL ENGINE
  ---------------------------------------------------- */
  function generateNewDrill() {
    let verbs = window.FRENCH_DATA.verbs;

    if (state.drillGroupFilter !== 'all') {
      verbs = verbs.filter(v => v.group === state.drillGroupFilter);
    }
    if (verbs.length === 0) verbs = window.FRENCH_DATA.verbs;

    const verb = verbs[Math.floor(Math.random() * verbs.length)];

    let tenses = ['present', 'passeCompose', 'imparfait', 'futur'];
    if (state.drillTenseFilter !== 'all') {
      tenses = [state.drillTenseFilter];
    }
    const tenseKey = tenses[Math.floor(Math.random() * tenses.length)];
    const tenseObj = window.FRENCH_DATA.tenses.find(t => t.key === tenseKey) || { name: tenseKey };

    const pronounList = window.FRENCH_DATA.pronouns;
    const pronoun = pronounList[Math.floor(Math.random() * pronounList.length)];

    const correctForm = verb.conjugations && verb.conjugations[tenseKey] && verb.conjugations[tenseKey][pronoun.key];
    if (!correctForm || correctForm === '-') {
      return generateNewDrill();
    }

    state.currentDrill = {
      verb,
      tenseKey,
      tenseName: tenseObj.name,
      pronoun,
      correctForm: correctForm.trim(),
      isSubmitted: false
    };

    elements.drillVerbBadge.textContent = `${verb.infinitive} • "${verb.english}" • ${verb.group.toUpperCase()}`;
    elements.drillPromptTitle.textContent = `${pronoun.label} + [${verb.infinitive}]`;
    elements.drillTenseTag.textContent = tenseObj.name;
    elements.drillRuleTip.textContent = verb.tip || '';

    elements.drillInput.value = '';
    elements.drillInput.className = 'drill-input';
    elements.drillInput.disabled = false;
    elements.drillInput.focus();

    elements.drillFeedback.style.display = 'none';
    elements.drillFeedback.className = 'drill-feedback';
    elements.drillSubmitBtn.style.display = 'inline-flex';
    elements.drillNextBtn.style.display = 'none';

    elements.drillAudioBtn.onclick = () => {
      audioManager.speak(verb.infinitive);
    };
  }

  function submitDrillAnswer() {
    if (!state.currentDrill || state.currentDrill.isSubmitted) return;

    const userInput = elements.drillInput.value.trim().toLowerCase();
    const correct = state.currentDrill.correctForm.trim().toLowerCase();

    state.currentDrill.isSubmitted = true;
    state.drillScore.total++;

    const isMatch = userInput === correct;

    if (isMatch) {
      state.drillScore.correct++;
      state.drillScore.streak++;
      if (state.drillScore.streak > state.drillScore.bestStreak) {
        state.drillScore.bestStreak = state.drillScore.streak;
        localStorage.setItem('french_best_streak', state.drillScore.bestStreak);
      }

      elements.drillInput.classList.add('correct');
      elements.drillFeedback.innerHTML = `<strong>Magnifique ! Correct :</strong> <em>${state.currentDrill.pronoun.key} ${state.currentDrill.correctForm}</em>`;
      elements.drillFeedback.className = 'drill-feedback correct-box';

      audioManager.playSuccess();
      audioManager.speak(`${state.currentDrill.pronoun.key} ${state.currentDrill.correctForm}`);
    } else {
      state.drillScore.streak = 0;
      elements.drillInput.classList.add('incorrect');
      elements.drillFeedback.innerHTML = `<strong>Attention :</strong> La bonne forme est <strong>${state.currentDrill.correctForm}</strong>.<br><span style="font-size:0.875rem;">${state.currentDrill.verb.tip || ''}</span>`;
      elements.drillFeedback.className = 'drill-feedback incorrect-box';

      audioManager.playError();
      audioManager.speak(state.currentDrill.correctForm);

      // Auto log mistake to notebook
      mistakeManager.addMistake({
        id: `drill_${state.currentDrill.verb.id}_${state.currentDrill.tenseKey}_${state.currentDrill.pronoun.key}`,
        type: 'Conjugaison',
        prompt: `${state.currentDrill.pronoun.label} + [${state.currentDrill.verb.infinitive}] (${state.currentDrill.tenseName})`,
        userAnswer: userInput || '(vide)',
        correctAnswer: state.currentDrill.correctForm,
        explanation: state.currentDrill.verb.tip || `Conjugaison du verbe ${state.currentDrill.verb.infinitive} au ${state.currentDrill.tenseName}.`,
        hint: `Verbe ${state.currentDrill.verb.infinitive} ("${state.currentDrill.verb.english}")`,
        audioText: `${state.currentDrill.pronoun.key} ${state.currentDrill.correctForm}`
      });
    }

    elements.drillStreakBadge.textContent = `${state.drillScore.streak} 🔥 (Best: ${state.drillScore.bestStreak})`;
    elements.drillSubmitBtn.style.display = 'none';
    elements.drillNextBtn.style.display = 'inline-flex';
    elements.drillNextBtn.focus();

    updateHeaderStats();
  }

  if (elements.drillSubmitBtn) {
    elements.drillSubmitBtn.addEventListener('click', submitDrillAnswer);
  }

  if (elements.drillNextBtn) {
    elements.drillNextBtn.addEventListener('click', generateNewDrill);
  }

  if (elements.drillInput) {
    elements.drillInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        if (!state.currentDrill.isSubmitted) {
          submitDrillAnswer();
        } else {
          generateNewDrill();
        }
      }
    });
  }

  if (elements.drillTenseFilter) {
    elements.drillTenseFilter.addEventListener('change', (e) => {
      state.drillTenseFilter = e.target.value;
      generateNewDrill();
    });
  }

  if (elements.drillGroupFilter) {
    elements.drillGroupFilter.addEventListener('change', (e) => {
      state.drillGroupFilter = e.target.value;
      generateNewDrill();
    });
  }

  /* ----------------------------------------------------
     3. LISTENING & DICTATION MODULE
  ---------------------------------------------------- */
  const listeningModes = [
    { id: 'verbs', btn: elements.lmodeVerbsBtn },
    { id: 'liaisons', btn: elements.lmodeLiaisonsBtn },
    { id: 'sentences', btn: elements.lmodeSentencesBtn }
  ];

  listeningModes.forEach(m => {
    if (m.btn) {
      m.btn.addEventListener('click', () => {
        state.listeningMode = m.id;
        state.listeningIndex = 0;
        listeningModes.forEach(x => {
          if (x.btn) x.btn.classList.toggle('active', x.id === m.id);
        });
        initListeningExercise();
      });
    }
  });

  function playListeningAudio(rate = 0.9) {
    if (!state.currentListeningItem) return;
    const textToSpeak = state.currentListeningItem.audio;
    
    if (elements.soundwaveVisualizer) {
      elements.soundwaveVisualizer.classList.add('is-playing');
    }

    audioManager.speak(
      textToSpeak,
      rate,
      () => {
        if (elements.soundwaveVisualizer) elements.soundwaveVisualizer.classList.add('is-playing');
      },
      () => {
        if (elements.soundwaveVisualizer) elements.soundwaveVisualizer.classList.remove('is-playing');
      }
    );
  }

  function initListeningExercise() {
    const list = window.FRENCH_DATA.listeningExercises;
    if (!list) return;

    state.isListeningSubmitted = false;

    // Reset Hint
    if (elements.listeningHintText) {
      elements.listeningHintText.style.display = 'none';
      elements.listeningHintText.textContent = '';
    }
    if (elements.listeningToggleHintBtn) {
      elements.listeningToggleHintBtn.textContent = t('listening_show_hint');
    }

    if (state.listeningMode === 'verbs') {
      const items = list.verbDictations;
      state.currentListeningItem = items[state.listeningIndex % items.length];
      setupDictationUI("Verb Dictation: Conjugation & Endings", state.currentListeningItem.hint);
    } else if (state.listeningMode === 'liaisons') {
      const items = list.liaisonChallenges;
      state.currentListeningItem = items[state.listeningIndex % items.length];
      setupLiaisonUI();
    } else if (state.listeningMode === 'sentences') {
      const items = list.sentenceDictations;
      state.currentListeningItem = items[state.listeningIndex % items.length];
      setupDictationUI("Sentence Dictation: Full Conversational French", state.currentListeningItem.hint);
    }

    playListeningAudio(0.9);
  }

  function setupDictationUI(modeTitle, hintText) {
    if (elements.listeningDictationContainer) elements.listeningDictationContainer.style.display = 'block';
    if (elements.listeningLiaisonContainer) elements.listeningLiaisonContainer.style.display = 'none';

    if (elements.listeningInput) {
      elements.listeningInput.value = '';
      elements.listeningInput.className = 'drill-input';
      elements.listeningInput.disabled = false;
      elements.listeningInput.focus();
    }

    if (elements.listeningFeedback) {
      elements.listeningFeedback.style.display = 'none';
      elements.listeningFeedback.className = 'drill-feedback';
    }

    if (elements.listeningSubmitBtn) elements.listeningSubmitBtn.style.display = 'inline-flex';
    if (elements.listeningNextBtn) elements.listeningNextBtn.style.display = 'none';

    if (elements.listeningHintText) {
      elements.listeningHintText.textContent = hintText || "Écoutez attentivement les terminaisons et accords.";
    }
  }

  function setupLiaisonUI() {
    if (elements.listeningDictationContainer) elements.listeningDictationContainer.style.display = 'none';
    if (elements.listeningLiaisonContainer) elements.listeningLiaisonContainer.style.display = 'block';

    const item = state.currentListeningItem;
    if (!item) return;

    if (elements.listeningLiaisonFeedback) {
      elements.listeningLiaisonFeedback.style.display = 'none';
      elements.listeningLiaisonFeedback.className = 'drill-feedback';
    }

    if (elements.listeningLiaisonNextBtn) {
      elements.listeningLiaisonNextBtn.style.display = 'none';
    }

    if (elements.listeningHintText) {
      elements.listeningHintText.textContent = item.phoneticFocus || "Écoutez si vous entendez une liaison en [z] ou un son [s].";
    }

    if (elements.listeningLiaisonOptions) {
      elements.listeningLiaisonOptions.innerHTML = '';
      item.options.forEach(opt => {
        const card = document.createElement('div');
        card.className = 'liaison-option-card';
        card.textContent = opt;
        card.addEventListener('click', () => {
          if (state.isListeningSubmitted) return;
          handleLiaisonAnswer(opt, card);
        });
        elements.listeningLiaisonOptions.appendChild(card);
      });
    }
  }

  function normalizeFrenchText(str) {
    return (str || '')
      .trim()
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, '')
      .replace(/\s+/g, ' ');
  }

  function submitListeningDictation() {
    if (!state.currentListeningItem || state.isListeningSubmitted) return;
    state.isListeningSubmitted = true;

    const rawInput = elements.listeningInput.value;
    const userClean = normalizeFrenchText(rawInput);
    const targetClean = normalizeFrenchText(state.currentListeningItem.target);

    const isMatch = userClean === targetClean;

    const targetWords = state.currentListeningItem.target.split(/\s+/);
    const userWords = rawInput.trim().split(/\s+/);

    let diffHtml = '<div class="diff-container">';
    targetWords.forEach((word, idx) => {
      const uWord = userWords[idx] || '';
      const cleanW = normalizeFrenchText(word);
      const cleanU = normalizeFrenchText(uWord);

      if (cleanW === cleanU) {
        diffHtml += `<span class="diff-word-correct">${word}</span>`;
      } else {
        diffHtml += `<span class="diff-word-missing" title="Vous avez écrit : ${uWord || 'rien'}">${word}</span>`;
      }
    });
    diffHtml += '</div>';

    if (elements.listeningFeedback) {
      elements.listeningFeedback.style.display = 'block';

      if (isMatch) {
        elements.listeningInput.classList.add('correct');
        elements.listeningFeedback.className = 'drill-feedback correct-box';
        elements.listeningFeedback.innerHTML = `
          <strong>Parfait ! Vous avez bien entendu :</strong><br>
          ${diffHtml}
          <div style="font-size:0.9rem; margin-top:0.4rem; color:#065f46;">
            Traduction : <em>"${state.currentListeningItem.english}"</em>
          </div>
        `;
        audioManager.playSuccess();
      } else {
        elements.listeningInput.classList.add('incorrect');
        elements.listeningFeedback.className = 'drill-feedback incorrect-box';
        elements.listeningFeedback.innerHTML = `
          <strong>Correction :</strong><br>
          ${diffHtml}
          <div style="font-size:0.875rem; margin-top:0.4rem;">
            Phrase attendue : <strong class="listening-target-sentence">${state.currentListeningItem.target}</strong><br>
            Traduction : <em>"${state.currentListeningItem.english}"</em><br>
            <span style="color:var(--text-secondary);">${state.currentListeningItem.hint || ''}</span>
          </div>
        `;
        audioManager.playError();

        // Auto log dictation mistake to notebook
        mistakeManager.addMistake({
          id: `dictation_${state.currentListeningItem.id}`,
          type: 'Écoute',
          prompt: `Dictée audio : "${state.currentListeningItem.english}"`,
          userAnswer: rawInput || '(vide)',
          correctAnswer: state.currentListeningItem.target,
          explanation: `${state.currentListeningItem.hint || ''} — Traduction : "${state.currentListeningItem.english}"`,
          hint: state.currentListeningItem.hint || '',
          audioText: state.currentListeningItem.audio
        });
      }

      // Make words in the dictation result clickable to look up / save
      const diffContainer = elements.listeningFeedback.querySelector('.diff-container');
      if (diffContainer) wordTooltipMgr.makeTextClickable(diffContainer, state.currentListeningItem.target);
      const targetEl = elements.listeningFeedback.querySelector('.listening-target-sentence');
      if (targetEl) wordTooltipMgr.makeTextClickable(targetEl, state.currentListeningItem.target);
    }

    if (elements.listeningSubmitBtn) elements.listeningSubmitBtn.style.display = 'none';
    if (elements.listeningNextBtn) {
      elements.listeningNextBtn.style.display = 'inline-flex';
      elements.listeningNextBtn.focus();
    }
  }

  function handleLiaisonAnswer(chosenOption, cardEl) {
    state.isListeningSubmitted = true;
    const item = state.currentListeningItem;
    const isCorrect = chosenOption === item.target;

    document.querySelectorAll('.liaison-option-card').forEach(c => {
      if (c.textContent === item.target) {
        c.classList.add('correct-pick');
      } else if (c === cardEl && !isCorrect) {
        c.classList.add('wrong-pick');
      }
    });

    if (elements.listeningLiaisonFeedback) {
      elements.listeningLiaisonFeedback.style.display = 'block';
      if (isCorrect) {
        elements.listeningLiaisonFeedback.className = 'drill-feedback correct-box';
        elements.listeningLiaisonFeedback.innerHTML = `
          <strong>Bravo ! Vous avez bien identifié la liaison !</strong><br>
          ${item.explanation}<br>
          <em>"${item.english}"</em>
        `;
        audioManager.playSuccess();
      } else {
        elements.listeningLiaisonFeedback.className = 'drill-feedback incorrect-box';
        elements.listeningLiaisonFeedback.innerHTML = `
          <strong>Attention au piège phonétique :</strong><br>
          ${item.explanation}<br>
          <em>"${item.english}"</em>
        `;
        audioManager.playError();

        // Auto log liaison mistake to notebook
        mistakeManager.addMistake({
          id: `liaison_${item.id}`,
          type: 'Écoute',
          prompt: `Piège de liaison : "${item.english}"`,
          userAnswer: chosenOption,
          correctAnswer: item.target,
          explanation: item.explanation,
          hint: item.phoneticFocus || '',
          audioText: item.audio
        });
      }
    }

    if (elements.listeningLiaisonNextBtn) {
      elements.listeningLiaisonNextBtn.style.display = 'inline-flex';
      elements.listeningLiaisonNextBtn.focus();
    }
  }

  // Audio Playback Controls
  if (elements.listeningPlayNormalBtn) {
    elements.listeningPlayNormalBtn.addEventListener('click', () => playListeningAudio(0.9));
  }
  if (elements.listeningPlaySlowBtn) {
    elements.listeningPlaySlowBtn.addEventListener('click', () => playListeningAudio(0.65));
  }
  if (elements.listeningRepeatBtn) {
    elements.listeningRepeatBtn.addEventListener('click', () => playListeningAudio(0.85));
  }

  // Hint Toggle
  if (elements.listeningToggleHintBtn) {
    elements.listeningToggleHintBtn.addEventListener('click', () => {
      if (elements.listeningHintText) {
        const isHidden = elements.listeningHintText.style.display === 'none';
        elements.listeningHintText.style.display = isHidden ? 'block' : 'none';
        elements.listeningToggleHintBtn.textContent = isHidden ? t('listening_hide_hint') : t('listening_show_hint');
      }
    });
  }

  // Dictation Submit & Next
  if (elements.listeningSubmitBtn) {
    elements.listeningSubmitBtn.addEventListener('click', submitListeningDictation);
  }
  if (elements.listeningNextBtn) {
    elements.listeningNextBtn.addEventListener('click', () => {
      state.listeningIndex++;
      initListeningExercise();
    });
  }
  if (elements.listeningLiaisonNextBtn) {
    elements.listeningLiaisonNextBtn.addEventListener('click', () => {
      state.listeningIndex++;
      initListeningExercise();
    });
  }

  if (elements.listeningInput) {
    elements.listeningInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        if (!state.isListeningSubmitted) {
          submitListeningDictation();
        } else {
          state.listeningIndex++;
          initListeningExercise();
        }
      }
    });
  }

  /* ----------------------------------------------------
     4. MISTAKE NOTEBOOK (CARNET D'ERREURS)
  ---------------------------------------------------- */
  function renderMistakesList() {
    if (!elements.mistakesListContainer) return;
    elements.mistakesListContainer.innerHTML = '';

    let list = mistakeManager.mistakes;
    const typeFilter = elements.mistakeTypeFilter ? elements.mistakeTypeFilter.value : 'all';
    const statusFilter = elements.mistakeStatusFilter ? elements.mistakeStatusFilter.value : 'unresolved';
    const query = elements.mistakeSearchInput ? elements.mistakeSearchInput.value.trim().toLowerCase() : '';

    if (typeFilter !== 'all') {
      list = list.filter(m => m.type === typeFilter);
    }
    if (statusFilter === 'unresolved') {
      list = list.filter(m => !m.resolved);
    } else if (statusFilter === 'resolved') {
      list = list.filter(m => m.resolved);
    }

    if (query) {
      list = list.filter(m => 
        (m.prompt && m.prompt.toLowerCase().includes(query)) ||
        (m.correctAnswer && m.correctAnswer.toLowerCase().includes(query)) ||
        (m.userAnswer && m.userAnswer.toLowerCase().includes(query)) ||
        (m.explanation && m.explanation.toLowerCase().includes(query))
      );
    }

    if (list.length === 0) {
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'mistake-empty-state';
      emptyDiv.innerHTML = `
        <div class="mistake-empty-icon">🎉</div>
        <h3 style="font-size:1.3rem; font-weight:700; color:var(--text-primary); margin-bottom:0.4rem;">${t('mistakes_empty_title')}</h3>
        <p style="font-size:0.95rem;">${t('mistakes_empty_desc')}</p>
      `;
      elements.mistakesListContainer.appendChild(emptyDiv);
      return;
    }

    list.forEach(m => {
      const card = document.createElement('div');
      card.className = `mistake-card ${m.resolved ? 'resolved' : ''}`;

      const typeLower = (m.type || 'Conjugaison').toLowerCase();
      const countTag = m.wrongCount > 1 ? `<span class="mistake-count-badge">${t('mistakes_count_tag', { count: m.wrongCount })}</span>` : '';
      const resolvedTag = m.resolved ? `<span style="font-size:0.75rem; font-weight:700; color:var(--accent-emerald);">✓ ${t('mistakes_resolved_tag')}</span>` : '';

      card.innerHTML = `
        <div>
          <div class="mistake-card-header">
            <span class="mistake-type-badge ${typeLower}">${m.type}</span>
            <div>${countTag} ${resolvedTag}</div>
          </div>
          <div class="mistake-prompt-title">${m.prompt}</div>
          <div class="mistake-compare-box">
            <div class="mistake-wrong-row">
              <span style="font-size:0.8rem; color:var(--text-muted);">${t('mistakes_your_wrong')}</span>
              <span class="strike">${m.userAnswer || '(empty)'}</span>
            </div>
            <div class="mistake-correct-row">
              <div>
                <span style="font-size:0.8rem; color:var(--text-muted);">${t('mistakes_correct_ans')}</span>
                <span>${m.correctAnswer}</span>
              </div>
              <button class="btn-audio-sm" title="Listen" aria-label="Listen ${m.correctAnswer}">🔊</button>
            </div>
          </div>
          ${m.explanation ? `<div class="mistake-explanation-box">${m.explanation}</div>` : ''}
        </div>
        <div class="mistake-action-row">
          <button class="mistake-btn-sm retry-btn">${t('mistakes_retry_btn')}</button>
          <button class="mistake-btn-sm resolve-btn">${m.resolved ? t('mistakes_mark_unresolved') : t('mistakes_mark_resolved')}</button>
          <button class="mistake-btn-sm delete-btn" title="Delete">🗑️</button>
        </div>
      `;

      // Listen audio button
      card.querySelector('.btn-audio-sm').addEventListener('click', () => {
        audioManager.speak(m.audioText || m.correctAnswer);
      });

      // Retry single mistake
      card.querySelector('.retry-btn').addEventListener('click', () => {
        startMistakesPractice([m]);
      });

      // Toggle resolve
      card.querySelector('.resolve-btn').addEventListener('click', () => {
        if (m.resolved) {
          m.resolved = false;
          mistakeManager.save();
          mistakeManager.notifyUpdate();
        } else {
          mistakeManager.markResolved(m.id);
        }
      });

      // Delete mistake
      card.querySelector('.delete-btn').addEventListener('click', () => {
        mistakeManager.deleteMistake(m.id);
      });

      elements.mistakesListContainer.appendChild(card);
    });
  }

  if (elements.mistakeTypeFilter) elements.mistakeTypeFilter.addEventListener('change', renderMistakesList);
  if (elements.mistakeStatusFilter) elements.mistakeStatusFilter.addEventListener('change', renderMistakesList);
  if (elements.mistakeSearchInput) elements.mistakeSearchInput.addEventListener('input', renderMistakesList);

  if (elements.clearResolvedMistakesBtn) {
    elements.clearResolvedMistakesBtn.addEventListener('click', () => {
      if (confirm(t('mistakes_confirm_clear'))) {
        mistakeManager.clearResolved();
      }
    });
  }

  // Targeted Mistake Practice Mode
  function startMistakesPractice(customList = null) {
    const list = customList || mistakeManager.mistakes.filter(m => !m.resolved);
    if (!list || list.length === 0) {
      alert(t('mistakes_none_left'));
      return;
    }

    state.mistakePracticeQueue = [...list];
    state.mistakePracticeIndex = 0;
    state.isMistakePracticeSubmitted = false;

    if (elements.mistakePracticeArena) {
      elements.mistakePracticeArena.style.display = 'block';
      elements.mistakePracticeArena.scrollIntoView({ behavior: 'smooth' });
    }

    renderCurrentPracticeMistake();
  }

  function renderCurrentPracticeMistake() {
    const item = state.mistakePracticeQueue[state.mistakePracticeIndex];
    if (!item) {
      // Completed all
      if (elements.mistakePracticeArena) {
        elements.mistakePracticeArena.style.display = 'none';
      }
      audioManager.playLevelUp();
      alert(t('mistakes_session_done'));
      renderMistakesList();
      return;
    }

    state.currentMistakePracticeItem = item;
    state.isMistakePracticeSubmitted = false;

    if (elements.practiceMistakeProgress) {
      elements.practiceMistakeProgress.textContent = `${state.mistakePracticeIndex + 1} / ${state.mistakePracticeQueue.length}`;
    }

    if (elements.practiceMistakeType) elements.practiceMistakeType.textContent = item.type || 'Conjugaison';
    if (elements.practiceMistakePrompt) elements.practiceMistakePrompt.textContent = item.prompt;
    if (elements.practiceMistakeHint) elements.practiceMistakeHint.textContent = item.hint || '';

    if (elements.practiceMistakeInput) {
      elements.practiceMistakeInput.value = '';
      elements.practiceMistakeInput.className = 'drill-input';
      elements.practiceMistakeInput.disabled = false;
      elements.practiceMistakeInput.focus();
    }

    if (elements.practiceMistakeFeedback) {
      elements.practiceMistakeFeedback.style.display = 'none';
      elements.practiceMistakeFeedback.className = 'drill-feedback';
    }

    if (elements.practiceMistakeSubmitBtn) elements.practiceMistakeSubmitBtn.style.display = 'inline-flex';
    if (elements.practiceMistakeNextBtn) elements.practiceMistakeNextBtn.style.display = 'none';

    if (elements.practiceMistakeAudioBtn) {
      elements.practiceMistakeAudioBtn.onclick = () => {
        audioManager.speak(item.audioText || item.correctAnswer);
      };
    }
  }

  function submitMistakePractice() {
    if (!state.currentMistakePracticeItem || state.isMistakePracticeSubmitted) return;
    state.isMistakePracticeSubmitted = true;

    const userInput = normalizeFrenchText(elements.practiceMistakeInput.value);
    const target = normalizeFrenchText(state.currentMistakePracticeItem.correctAnswer);

    const isMatch = userInput === target;

    if (elements.practiceMistakeFeedback) {
      elements.practiceMistakeFeedback.style.display = 'block';

      if (isMatch) {
        elements.practiceMistakeInput.classList.add('correct');
        elements.practiceMistakeFeedback.className = 'drill-feedback correct-box';
        elements.practiceMistakeFeedback.innerHTML = `
          <strong>Bravo ! Réussi et maîtrisé !</strong><br>
          La bonne réponse est bien : <em>${state.currentMistakePracticeItem.correctAnswer}</em>
        `;
        audioManager.playSuccess();
        audioManager.speak(state.currentMistakePracticeItem.audioText || state.currentMistakePracticeItem.correctAnswer);

        // Mark as resolved in database
        mistakeManager.markResolved(state.currentMistakePracticeItem.id);
      } else {
        elements.practiceMistakeInput.classList.add('incorrect');
        elements.practiceMistakeFeedback.className = 'drill-feedback incorrect-box';
        elements.practiceMistakeFeedback.innerHTML = `
          <strong>À revoir :</strong> La réponse attendue est <strong>${state.currentMistakePracticeItem.correctAnswer}</strong>.<br>
          <span style="font-size:0.85rem;">${state.currentMistakePracticeItem.explanation || ''}</span>
        `;
        audioManager.playError();
      }
    }

    if (elements.practiceMistakeSubmitBtn) elements.practiceMistakeSubmitBtn.style.display = 'none';
    if (elements.practiceMistakeNextBtn) {
      elements.practiceMistakeNextBtn.style.display = 'inline-flex';
      elements.practiceMistakeNextBtn.focus();
    }

    updateMistakeBadge();
  }

  if (elements.startMistakesPracticeBtn) {
    elements.startMistakesPracticeBtn.addEventListener('click', () => startMistakesPractice());
  }

  if (elements.closeMistakePracticeBtn) {
    elements.closeMistakePracticeBtn.addEventListener('click', () => {
      if (elements.mistakePracticeArena) elements.mistakePracticeArena.style.display = 'none';
    });
  }

  if (elements.practiceMistakeSubmitBtn) {
    elements.practiceMistakeSubmitBtn.addEventListener('click', submitMistakePractice);
  }

  if (elements.practiceMistakeNextBtn) {
    elements.practiceMistakeNextBtn.addEventListener('click', () => {
      state.mistakePracticeIndex++;
      renderCurrentPracticeMistake();
    });
  }

  if (elements.practiceMistakeInput) {
    elements.practiceMistakeInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        if (!state.isMistakePracticeSubmitted) {
          submitMistakePractice();
        } else {
          state.mistakePracticeIndex++;
          renderCurrentPracticeMistake();
        }
      }
    });
  }

  // Accent helper buttons for all text inputs
  elements.accentButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const char = btn.textContent;
      let targetInput = elements.drillInput;
      if (state.activeTab === 'sentences') {
        targetInput = elements.sentenceInput;
      } else if (state.activeTab === 'listening') {
        targetInput = elements.listeningInput;
      } else if (state.activeTab === 'mistakes') {
        targetInput = elements.practiceMistakeInput;
      } else if (state.activeTab === 'dictionary') {
        targetInput = elements.dictSearchInput;
      }

      if (targetInput) {
        const start = targetInput.selectionStart || targetInput.value.length;
        const end = targetInput.selectionEnd || targetInput.value.length;
        const val = targetInput.value;
        targetInput.value = val.substring(0, start) + char + val.substring(end);
        targetInput.selectionStart = targetInput.selectionEnd = start + char.length;
        targetInput.focus();
      }
    });
  });

  /* ----------------------------------------------------
     5. VERB EXPLORER & FULL CONJUGATION MATRIX
  ---------------------------------------------------- */
  function renderVerbGrid() {
    if (!elements.verbGrid) return;
    elements.verbGrid.innerHTML = '';

    let verbs = window.FRENCH_DATA.verbs;
    if (state.verbGroupFilter !== 'all') {
      verbs = verbs.filter(v => v.group === state.verbGroupFilter);
    }
    if (state.verbSearchQuery) {
      const q = state.verbSearchQuery.toLowerCase();
      verbs = verbs.filter(v => v.infinitive.toLowerCase().includes(q) || v.english.toLowerCase().includes(q));
    }

    verbs.forEach(verb => {
      const card = document.createElement('div');
      card.className = `verb-card ${verb.id === state.selectedVerbId ? 'selected' : ''}`;
      card.innerHTML = `
        <div>
          <div class="verb-card-header">
            <span class="verb-infinitive">${verb.infinitive}</span>
            <span class="verb-tag ${verb.group}">${verb.group}</span>
          </div>
          <div class="verb-english">${verb.english}</div>
        </div>
        <div class="verb-auxiliary-note">
          <span>Auxiliary: <strong>${verb.auxiliary}</strong></span> • 
          <span>Participle: <strong>${verb.participlePass}</strong></span>
        </div>
      `;

      card.addEventListener('click', () => {
        state.selectedVerbId = verb.id;
        document.querySelectorAll('.verb-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        renderVerbMatrix(verb.id);
        audioManager.speak(verb.infinitive);
      });

      elements.verbGrid.appendChild(card);
    });
  }

  function renderVerbMatrix(verbId) {
    const verb = window.FRENCH_DATA.verbs.find(v => v.id === verbId);
    if (!verb || !elements.conjugationTableBody) return;

    elements.verbMatrixTitle.textContent = `${verb.infinitive} (${verb.english})`;
    elements.verbMatrixEnglish.textContent = `Group: ${verb.group.toUpperCase()} • Auxiliary: ${verb.auxiliary} • Past Participle: ${verb.participlePass}`;
    elements.verbMatrixTip.textContent = verb.tip || '';

    const tenseKey = state.selectedTense;
    const conj = (verb.conjugations && verb.conjugations[tenseKey]) || {};

    elements.conjugationTableBody.innerHTML = '';

    window.FRENCH_DATA.pronouns.forEach(pronoun => {
      const form = conj[pronoun.key] || '-';
      const spoken = formatSpokenConjugation(pronoun.key, form);
      const tr = document.createElement('tr');
      if (spoken) tr.className = 'conjugation-row-clickable';
      tr.innerHTML = `
        <td class="pronoun-cell">${pronoun.label}</td>
        <td class="form-cell">
          <span>${form}</span>
          ${spoken ? `<button type="button" title="Listen" aria-label="Listen ${spoken}">🔊</button>` : ''}
        </td>
      `;

      if (spoken) {
        tr.addEventListener('click', () => {
          audioManager.speak(spoken);
        });
      }

      elements.conjugationTableBody.appendChild(tr);
    });

    if (elements.verbPronounceAllBtn) {
      elements.verbPronounceAllBtn.onclick = () => {
        const formsToSpeak = window.FRENCH_DATA.pronouns
          .map(p => formatSpokenConjugation(p.key, conj[p.key]))
          .filter(Boolean);
        
        let i = 0;
        function next() {
          if (i < formsToSpeak.length) {
            const phrase = formsToSpeak[i++];
            audioManager.speak(phrase, null, null, () => {
              setTimeout(next, 250);
            });
          }
        }
        next();
      };
    }
  }

  if (elements.verbSearchInput) {
    elements.verbSearchInput.addEventListener('input', (e) => {
      state.verbSearchQuery = e.target.value.trim();
      renderVerbGrid();
    });
  }

  if (elements.verbGroupFilterSelect) {
    elements.verbGroupFilterSelect.addEventListener('change', (e) => {
      state.verbGroupFilter = e.target.value;
      renderVerbGrid();
    });
  }

  if (elements.verbMatrixTenseSelect) {
    elements.verbMatrixTenseSelect.addEventListener('change', (e) => {
      state.selectedTense = e.target.value;
      renderVerbMatrix(state.selectedVerbId);
    });
  }

  /* ----------------------------------------------------
     6. SENTENCE CLOZE CHALLENGE
  ---------------------------------------------------- */
  function renderSentenceDrill() {
    const list = state.sentenceDrills;
    if (!list || list.length === 0) return;

    const item = list[state.currentSentenceIndex % list.length];
    const fullSentence = item.sentence.replace('________', item.correct);
    elements.sentencePrompt.textContent = item.sentence;
    wordTooltipMgr.makeTextClickable(elements.sentencePrompt, fullSentence);
    elements.sentenceEnglish.textContent = `"${item.english}"`;

    elements.sentenceInput.value = '';
    elements.sentenceInput.className = 'drill-input';
    elements.sentenceInput.disabled = false;
    elements.sentenceInput.focus();

    elements.sentenceFeedback.style.display = 'none';
    elements.sentenceSubmitBtn.style.display = 'inline-flex';
    elements.sentenceNextBtn.style.display = 'none';
  }

  function submitSentenceAnswer() {
    const list = state.sentenceDrills;
    const item = list[state.currentSentenceIndex % list.length];
    const userVal = elements.sentenceInput.value.trim().toLowerCase();
    const target = item.correct.trim().toLowerCase();

    const isMatch = userVal === target;
    elements.sentenceFeedback.style.display = 'block';

    if (isMatch) {
      elements.sentenceInput.classList.add('correct');
      elements.sentenceFeedback.className = 'drill-feedback correct-box';
      elements.sentenceFeedback.innerHTML = `<strong>Bravo !</strong> ${item.ruleHint}`;
      audioManager.playSuccess();
      audioManager.speak(item.sentence.replace('________', item.correct));
    } else {
      elements.sentenceInput.classList.add('incorrect');
      elements.sentenceFeedback.className = 'drill-feedback incorrect-box';
      elements.sentenceFeedback.innerHTML = `<strong>Réponse attendue :</strong> ${item.correct}<br><span style="font-size:0.875rem;">${item.ruleHint}</span>`;
      audioManager.playError();
      audioManager.speak(item.correct);

      // Auto log sentence mistake to notebook
      mistakeManager.addMistake({
        id: `sentence_${item.id}`,
        type: 'Phrase',
        prompt: item.sentence,
        userAnswer: userVal || '(vide)',
        correctAnswer: item.correct,
        explanation: `${item.ruleHint} — Traduction : "${item.english}"`,
        hint: `Verbe : ${item.verbId}`,
        audioText: item.sentence.replace('________', item.correct)
      });
    }

    elements.sentenceSubmitBtn.style.display = 'none';
    elements.sentenceNextBtn.style.display = 'inline-flex';
    elements.sentenceNextBtn.focus();
  }

  if (elements.sentenceSubmitBtn) {
    elements.sentenceSubmitBtn.addEventListener('click', submitSentenceAnswer);
  }

  if (elements.sentenceNextBtn) {
    elements.sentenceNextBtn.addEventListener('click', () => {
      state.currentSentenceIndex++;
      renderSentenceDrill();
    });
  }

  if (elements.sentenceInput) {
    elements.sentenceInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        if (elements.sentenceSubmitBtn.style.display !== 'none') {
          submitSentenceAnswer();
        } else {
          state.currentSentenceIndex++;
          renderSentenceDrill();
        }
      }
    });
  }

  /* ----------------------------------------------------
     7. VOCABULARY EXPLORER
  ---------------------------------------------------- */
  function renderVocabTable() {
    if (!elements.vocabTableBody) return;
    elements.vocabTableBody.innerHTML = '';

    let items = window.FRENCH_DATA.vocabulary;
    const cat = elements.vocabCategoryFilter ? elements.vocabCategoryFilter.value : 'all';
    const query = elements.vocabSearchInput ? elements.vocabSearchInput.value.trim().toLowerCase() : '';

    if (cat !== 'all') {
      items = items.filter(v => v.category === cat);
    }
    if (query) {
      items = items.filter(v => v.french.toLowerCase().includes(query) || v.english.toLowerCase().includes(query));
    }

    items.forEach(item => {
      const tr = document.createElement('tr');
      const genderClass = item.gender === 'm' ? 'm' : item.gender === 'f' ? 'f' : item.gender ? 'mf' : '';
      const genderTag = item.gender ? `<span class="gender-badge ${genderClass}">${item.gender.toUpperCase()}</span>` : '';

      tr.innerHTML = `
        <td style="font-weight:700; color:var(--accent-blue);">
          <span class="vocab-word-cell">${item.french}</span> ${genderTag}
        </td>
        <td>${item.english}</td>
        <td>${item.phonetic || ''}</td>
        <td class="vocab-example-cell" style="font-size:0.85rem; color:var(--text-secondary);">${item.exampleFr || ''}</td>
        <td>
          <button class="btn-icon" title="Listen" aria-label="Listen ${item.french}">🔊</button>
        </td>
      `;

      const exCell = tr.querySelector('.vocab-example-cell');
      if (exCell && item.exampleFr) {
        wordTooltipMgr.makeTextClickable(exCell, item.exampleFr);
      }
      const wordCell = tr.querySelector('.vocab-word-cell');
      if (wordCell) {
        wordTooltipMgr.makeTextClickable(wordCell, item.exampleFr || item.french);
      }

      tr.querySelector('button').addEventListener('click', () => {
        audioManager.speak(item.french);
      });

      elements.vocabTableBody.appendChild(tr);
    });
  }

  if (elements.vocabCategoryFilter) {
    elements.vocabCategoryFilter.addEventListener('change', renderVocabTable);
  }
  if (elements.vocabSearchInput) {
    elements.vocabSearchInput.addEventListener('input', renderVocabTable);
  }

  /* ----------------------------------------------------
     8. STATS & ANALYTICS
  ---------------------------------------------------- */
  function renderStatsView() {
    const stats = srsManager.getStats();
    if (elements.statsTotalLearned) elements.statsTotalLearned.textContent = stats.learnedCount;
    if (elements.statsMatureCount) elements.statsMatureCount.textContent = stats.matureCount;
    if (elements.statsTotalReviews) elements.statsTotalReviews.textContent = stats.totalReviews;
    if (elements.statsRetentionRate) elements.statsRetentionRate.textContent = `${stats.retentionRate}%`;
  }

  if (elements.refreshAppBtn) {
    elements.refreshAppBtn.addEventListener('click', async () => {
      try {
        if ('serviceWorker' in navigator) {
          const regs = await navigator.serviceWorker.getRegistrations();
          await Promise.all(regs.map(r => r.unregister()));
        }
        if ('caches' in window) {
          const keys = await caches.keys();
          await Promise.all(keys.map(k => caches.delete(k)));
        }
      } catch (e) {}
      // Force fresh network reload without touching localStorage progress!
      const cleanUrl = window.location.origin + window.location.pathname + '?r=' + Date.now();
      window.location.replace(cleanUrl);
    });
  }

  if (elements.resetProgressBtn) {
    elements.resetProgressBtn.addEventListener('click', () => {
      if (confirm(t('mig_confirm_reset'))) {
        srsManager.resetProgress();
        renderStatsView();
        updateHeaderStats();
        loadDueCards();
        alert(t('mig_reset_done'));
      }
    });
  }

  // Backup Export & Import handlers
  if (elements.exportProgressBtn) {
    elements.exportProgressBtn.addEventListener('click', () => {
      const dataStr = srsManager.exportData();
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const dateStr = new Date().toISOString().split('T')[0];
      a.href = url;
      a.download = `french_learning_backup_${dateStr}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  if (elements.importProgressBtn && elements.importBackupFileInput) {
    elements.importProgressBtn.addEventListener('click', () => {
      elements.importBackupFileInput.click();
    });

    elements.importBackupFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const success = srsManager.importData(event.target.result);
        if (success) {
          alert(t('mig_import_ok'));
          renderStatsView();
          updateHeaderStats();
          loadDueCards();
          updateMistakeBadge();
          updateUserVocabBadge();
          renderUserVocabSection();
        } else {
          alert(t('mig_import_fail'));
        }
      };
      reader.readAsText(file);
      elements.importBackupFileInput.value = '';
    });
  }

  /* ----------------------------------------------------
     KEYBOARD SHORTCUTS
  ---------------------------------------------------- */
  document.addEventListener('keydown', (e) => {
    // Avoid interfering when typing in inputs
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

    if (state.activeTab === 'srs') {
      if (e.code === 'Space') {
        e.preventDefault();
        elements.flashcardContainer.click();
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        e.preventDefault();
        handleCardRating(parseInt(e.key, 10));
      }
    }
  });

  // Initial load
  updateTopbarTitle(state.activeTab);
  loadDueCards();
  generateNewDrill();
  renderVerbGrid();
  renderVerbMatrix('etre');
  renderSentenceDrill();
  renderVocabTable();
  updateHeaderStats();
  updateMistakeBadge();
  updateUserVocabBadge();

  // Register Service Worker for PWA & iOS Offline App Mode
  if ('serviceWorker' in navigator && (location.protocol === 'http:' || location.protocol === 'https:')) {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW registration note:', err));
  }
});
