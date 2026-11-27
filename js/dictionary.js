/**
 * dictionary.js — Interactive French Dictionary Lookup & Word Notebook Integration
 * Combines instant offline local dictionary lookup with live online Wiktionary +
 * MyMemory lookup and a custom word fallback, with one-click saving to 单词本 & SRS.
 */

class FrenchDictionaryManager {
  constructor(tooltipMgr, notebook, audioManager, srsManager) {
    this.tooltipMgr = tooltipMgr;
    this.notebook = notebook;
    this.audio = audioManager;
    this.srs = srsManager;

    this.RECENT_KEY = 'french_dict_recent_v1';
    this.direction = 'fr-en'; // 'fr-en' or 'en-fr'
    this.lastResults = [];
    this.lastQuery = '';
    this.recent = this.loadRecent();

    this.els = {
      input: document.getElementById('dictSearchInput'),
      searchBtn: document.getElementById('dictSearchBtn'),
      dirFrEnBtn: document.getElementById('dictDirFrEnBtn'),
      dirEnFrBtn: document.getElementById('dictDirEnFrBtn'),
      recentRow: document.getElementById('dictRecentRow'),
      resultsArea: document.getElementById('dictResultsArea'),
      customToggleBtn: document.getElementById('dictCustomToggleBtn'),
      customBox: document.getElementById('dictCustomBox'),
      customFr: document.getElementById('dictCustomFr'),
      customEn: document.getElementById('dictCustomEn'),
      customPos: document.getElementById('dictCustomPos'),
      customEx: document.getElementById('dictCustomEx'),
      customSaveBtn: document.getElementById('dictCustomSaveBtn')
    };

    this._bindEvents();
    this.renderRecent();
    this.renderEmptyPrompt();
  }

  _t(key, params) {
    return window.I18N ? window.I18N.t(key, params) : key;
  }

  _esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  _stripHtml(html) {
    if (!html) return '';
    return String(html)
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();
  }

  loadRecent() {
    try {
      const raw = localStorage.getItem(this.RECENT_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  saveRecent(term) {
    const clean = (term || '').trim();
    if (!clean) return;
    this.recent = [clean, ...this.recent.filter(x => x.toLowerCase() !== clean.toLowerCase())].slice(0, 12);
    try {
      localStorage.setItem(this.RECENT_KEY, JSON.stringify(this.recent));
    } catch (e) {}
    this.renderRecent();
  }

  clearRecent() {
    this.recent = [];
    try {
      localStorage.removeItem(this.RECENT_KEY);
    } catch (e) {}
    this.renderRecent();
  }

  _bindEvents() {
    if (this.els.searchBtn) {
      this.els.searchBtn.addEventListener('click', () => this.performSearch());
    }

    if (this.els.input) {
      this.els.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.performSearch();
        }
      });
    }

    if (this.els.dirFrEnBtn) {
      this.els.dirFrEnBtn.addEventListener('click', () => this.setDirection('fr-en'));
    }
    if (this.els.dirEnFrBtn) {
      this.els.dirEnFrBtn.addEventListener('click', () => this.setDirection('en-fr'));
    }

    if (this.els.customToggleBtn && this.els.customBox) {
      this.els.customToggleBtn.addEventListener('click', () => {
        const visible = this.els.customBox.style.display !== 'none';
        this.els.customBox.style.display = visible ? 'none' : 'block';
        if (!visible && this.els.customFr) this.els.customFr.focus();
      });
    }

    if (this.els.customSaveBtn) {
      this.els.customSaveBtn.addEventListener('click', () => this.saveCustomWord());
    }

    // Refresh button states if user vocab updates or UI language changes
    window.addEventListener('french-user-vocab-updated', () => {
      if (this.lastResults.length > 0) {
        this.renderResults(this.lastResults, this.lastQuery);
      }
    });

    window.addEventListener('french-ui-lang-changed', () => {
      this.renderRecent();
      if (this.lastResults.length > 0) {
        this.renderResults(this.lastResults, this.lastQuery);
      } else {
        this.renderEmptyPrompt();
      }
    });
  }

  setDirection(dir) {
    this.direction = dir;
    if (this.els.dirFrEnBtn) this.els.dirFrEnBtn.classList.toggle('active', dir === 'fr-en');
    if (this.els.dirEnFrBtn) this.els.dirEnFrBtn.classList.toggle('active', dir === 'en-fr');
    if (this.els.input && this.els.input.value.trim()) {
      this.performSearch();
    }
  }

  renderRecent() {
    if (!this.els.recentRow) return;
    if (this.recent.length === 0) {
      this.els.recentRow.style.display = 'none';
      return;
    }

    this.els.recentRow.style.display = 'flex';
    const chipsHtml = this.recent
      .map(term => `<button type="button" class="dict-chip" data-term="${this._esc(term)}">${this._esc(term)}</button>`)
      .join('');

    this.els.recentRow.innerHTML = `
      <span class="dict-recent-label">${this._esc(this._t('dict_recent_label'))}</span>
      <div class="dict-chips-wrap">${chipsHtml}</div>
      <button type="button" class="dict-clear-recent-btn" id="dictClearRecentBtn">${this._esc(this._t('dict_clear_recent'))}</button>
    `;

    this.els.recentRow.querySelectorAll('.dict-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.els.input) this.els.input.value = btn.dataset.term;
        this.performSearch(btn.dataset.term);
      });
    });

    const clearBtn = this.els.recentRow.querySelector('#dictClearRecentBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clearRecent());
  }

  renderEmptyPrompt() {
    if (!this.els.resultsArea) return;
    const sampleWords = ['croissant', 'parler', 'maison', 'bonjour', 'prendre', 'merveilleux'];
    const chips = sampleWords
      .map(w => `<button type="button" class="dict-chip dict-sample-chip" data-term="${w}">${w}</button>`)
      .join('');

    this.els.resultsArea.innerHTML = `
      <div class="dict-empty-state">
        <div style="font-size:2.75rem; margin-bottom:0.65rem;">🔍</div>
        <div style="font-size:1.1rem; font-weight:700; color:var(--text-primary); margin-bottom:0.35rem;">
          ${this._esc(this._t('dict_empty_prompt_title'))}
        </div>
        <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:1.1rem;">
          ${this._esc(this._t('dict_empty_prompt_desc'))}
        </p>
        <div style="display:flex; align-items:center; justify-content:center; flex-wrap:wrap; gap:0.45rem;">
          <span style="font-size:0.82rem; color:var(--text-muted); font-weight:600;">${this._esc(this._t('dict_examples_label'))}</span>
          ${chips}
        </div>
      </div>
    `;

    this.els.resultsArea.querySelectorAll('.dict-sample-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setDirection('fr-en');
        if (this.els.input) this.els.input.value = btn.dataset.term;
        this.performSearch(btn.dataset.term);
      });
    });
  }

  /* ── Local offline dictionary search (FR or EN) ── */
  searchLocal(query, direction) {
    const clean = (query || '').trim();
    const lower = clean.toLowerCase();
    if (!lower) return [];

    const results = [];
    const seenKeys = new Set();

    const pushUnique = (entry) => {
      const k = (entry.saveKey || entry.french || '').toLowerCase().trim();
      if (!k || seenKeys.has(k)) return;
      seenKeys.add(k);
      results.push(entry);
    };

    const attachVerbConj = (entry) => {
      if (!window.FRENCH_DATA || !window.FRENCH_DATA.verbs) return entry;
      const key = (entry.saveKey || entry.french || '').toLowerCase().trim();
      const verb = window.FRENCH_DATA.verbs.find(v => (v.infinitive || '').toLowerCase() === key);
      if (verb && verb.conjugations && verb.conjugations.present) {
        entry.presentConj = verb.conjugations.present;
        if (!entry.conjugationNote) {
          entry.conjugationNote = `Auxiliary: ${verb.auxiliary || 'avoir'} · Past participle: ${verb.participlePass || ''}`;
        }
        if (!entry.exampleFr && verb.examples && verb.examples[0]) {
          entry.exampleFr = verb.examples[0].fr;
          entry.exampleEn = verb.examples[0].en;
        }
      }
      return entry;
    };

    // 1. Exact lookup via tooltipMgr (for FR -> EN)
    if (direction === 'fr-en' && this.tooltipMgr) {
      const exact = this.tooltipMgr.lookup(clean);
      if (exact && !exact.isFallback) {
        pushUnique(attachVerbConj({
          ...exact,
          source: 'local',
          definitions: [exact.english].filter(Boolean)
        }));
      }
    }

    // 2. Search FRENCH_DATA.vocabulary
    if (window.FRENCH_DATA && window.FRENCH_DATA.vocabulary) {
      window.FRENCH_DATA.vocabulary.forEach(item => {
        const fr = (item.french || '').toLowerCase();
        const en = (item.english || '').toLowerCase();
        const match = direction === 'fr-en'
          ? (fr === lower || fr.includes(lower))
          : (en === lower || en.includes(lower));
        if (match) {
          pushUnique(attachVerbConj({
            french: item.french,
            english: item.english,
            definitions: [item.english],
            phonetic: item.phonetic || '',
            partOfSpeech: item.partOfSpeech || 'word',
            gender: item.gender || '',
            conjugationNote: item.associatedVerb ? `Related verb: ${item.associatedVerb}` : '',
            exampleFr: item.exampleFr || '',
            exampleEn: item.exampleEn || '',
            saveKey: item.french.toLowerCase(),
            source: 'local'
          }));
        }
      });
    }

    // 3. Search FRENCH_DATA.verbs
    if (window.FRENCH_DATA && window.FRENCH_DATA.verbs) {
      window.FRENCH_DATA.verbs.forEach(verb => {
        const inf = (verb.infinitive || '').toLowerCase();
        const en = (verb.english || '').toLowerCase();
        const match = direction === 'fr-en'
          ? (inf === lower || inf.includes(lower))
          : (en === lower || en.includes(lower));
        if (match) {
          pushUnique(attachVerbConj({
            french: verb.infinitive,
            english: verb.english,
            definitions: [verb.english],
            phonetic: verb.phonetic || '',
            partOfSpeech: `verb (${verb.group || ''})`,
            gender: '',
            conjugationNote: `Auxiliary: ${verb.auxiliary || 'avoir'} · Past participle: ${verb.participlePass || ''}`,
            exampleFr: verb.examples && verb.examples[0] ? verb.examples[0].fr : '',
            exampleEn: verb.examples && verb.examples[0] ? verb.examples[0].en : '',
            saveKey: inf,
            source: 'local'
          }));
        }
      });
    }

    // 4. Search built-in common dictionary for EN -> FR or FR -> EN partial matches
    if (this.tooltipMgr) {
      const map = this.tooltipMgr._getMap();
      Object.values(map).forEach(entry => {
        if (results.length >= 8) return;
        if (entry.isConjugatedAuto) return;
        const fr = (entry.french || '').toLowerCase();
        const en = (entry.english || '').toLowerCase();
        const match = direction === 'fr-en'
          ? fr.includes(lower)
          : en.includes(lower);
        if (match) {
          pushUnique({
            ...entry,
            definitions: [entry.english].filter(Boolean),
            source: 'local'
          });
        }
      });
    }

    return results.slice(0, 8);
  }

  /* ── Live online lookup via Wiktionary REST API + MyMemory API ── */
  async searchOnline(query, direction) {
    const clean = (query || '').trim();
    if (!clean) return [];

    const fetchWithTimeout = async (url, ms = 6000) => {
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timer = controller ? setTimeout(() => controller.abort(), ms) : null;
      try {
        const res = await fetch(url, controller ? { signal: controller.signal } : undefined);
        if (!res.ok) return null;
        return await res.json();
      } catch (e) {
        return null;
      } finally {
        if (timer) clearTimeout(timer);
      }
    };

    if (direction === 'fr-en') {
      const lower = clean.toLowerCase();
      // Strip leading French article if user typed e.g. "le croissant"
      const bareWord = lower.replace(/^(le\s+|la\s+|les\s+|l'|un\s+|une\s+|des\s+|se\s+|s')/, '').trim() || lower;

      const [wiktData, mmData] = await Promise.all([
        fetchWithTimeout(`https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(bareWord)}`),
        fetchWithTimeout(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(clean)}&langpair=fr|en`)
      ]);

      const definitions = [];
      let partOfSpeech = '';
      let exampleFr = '';
      let exampleEn = '';

      if (wiktData && Array.isArray(wiktData.fr) && wiktData.fr.length > 0) {
        wiktData.fr.forEach(sec => {
          if (!partOfSpeech && sec.partOfSpeech) {
            partOfSpeech = sec.partOfSpeech.toLowerCase();
          }
          (sec.definitions || []).forEach(d => {
            const defText = this._stripHtml(d.definition);
            if (defText && definitions.length < 4 && !definitions.includes(defText)) {
              definitions.push(defText);
            }
            if (!exampleFr && d.parsedExamples && d.parsedExamples.length > 0) {
              const ex = d.parsedExamples[0];
              exampleFr = this._stripHtml(ex.example || '');
              exampleEn = this._stripHtml(ex.translation || '');
            }
          });
        });
      }

      // Extract MyMemory translation if available
      let mmTranslation = '';
      if (mmData && mmData.responseData && mmData.responseData.translatedText) {
        const tr = String(mmData.responseData.translatedText).trim();
        if (tr && tr.toLowerCase() !== clean.toLowerCase() && !tr.toUpperCase().includes('MYMEMORY WARNING')) {
          mmTranslation = tr;
        }
      }

      if (definitions.length === 0 && mmTranslation) {
        definitions.push(mmTranslation);
      }

      if (definitions.length > 0) {
        const primaryEnglish = mmTranslation && definitions[0].length > 90 ? mmTranslation : definitions[0];
        return [{
          french: clean,
          english: primaryEnglish,
          definitions,
          phonetic: '',
          partOfSpeech: partOfSpeech || 'word',
          gender: '',
          conjugationNote: '',
          exampleFr,
          exampleEn,
          saveKey: lower,
          source: 'online'
        }];
      }
      return [];
    } else {
      // EN -> FR lookup
      const mmData = await fetchWithTimeout(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(clean)}&langpair=en|fr`);
      if (mmData && mmData.responseData && mmData.responseData.translatedText) {
        const frWord = String(mmData.responseData.translatedText).trim();
        if (frWord && !frWord.toUpperCase().includes('MYMEMORY WARNING')) {
          return [{
            french: frWord,
            english: clean,
            definitions: [clean],
            phonetic: '',
            partOfSpeech: 'translation',
            gender: '',
            conjugationNote: '',
            exampleFr: '',
            exampleEn: '',
            saveKey: frWord.toLowerCase(),
            source: 'online'
          }];
        }
      }
      return [];
    }
  }

  async performSearch(explicitQuery = null) {
    const query = (explicitQuery !== null ? explicitQuery : (this.els.input ? this.els.input.value : '')).trim();
    if (!query) {
      this.lastResults = [];
      this.lastQuery = '';
      this.renderEmptyPrompt();
      return;
    }

    this.lastQuery = query;
    this.saveRecent(query);

    // 1. Instant local lookup
    const localResults = this.searchLocal(query, this.direction);
    const hasExactLocal = localResults.length > 0 && (
      (this.direction === 'fr-en' && (
        localResults[0].saveKey === query.toLowerCase() ||
        (localResults[0].french || '').toLowerCase() === query.toLowerCase() ||
        (localResults[0].clickedWord || '').toLowerCase() === query.toLowerCase()
      )) ||
      (this.direction === 'en-fr' && (localResults[0].english || '').toLowerCase() === query.toLowerCase())
    );

    if (hasExactLocal) {
      this.lastResults = localResults;
      this.renderResults(localResults, query);
      return;
    }

    // Show loading spinner (keep any partial local results below if any)
    if (this.els.resultsArea) {
      this.els.resultsArea.innerHTML = `
        <div class="dict-loading">
          <div class="dict-spinner"></div>
          <span>${this._esc(this._t('dict_searching'))}</span>
        </div>
      `;
    }

    // 2. Query online dictionary
    const onlineResults = await this.searchOnline(query, this.direction);

    // Merge online primary result + any local related matches
    const combined = [...onlineResults];
    const seen = new Set(combined.map(r => (r.saveKey || r.french || '').toLowerCase()));
    localResults.forEach(r => {
      const k = (r.saveKey || r.french || '').toLowerCase();
      if (!seen.has(k)) {
        seen.add(k);
        combined.push(r);
      }
    });

    this.lastResults = combined;
    this.renderResults(combined, query);
  }

  renderResults(results, query) {
    if (!this.els.resultsArea) return;

    if (!results || results.length === 0) {
      this.els.resultsArea.innerHTML = `
        <div class="dict-not-found">
          <div style="font-size:2.2rem; margin-bottom:0.5rem;">🤷</div>
          <div style="font-weight:700; font-size:1.05rem; margin-bottom:0.35rem;">${this._esc(this._t('dict_not_found_title'))}</div>
          <p style="font-size:0.88rem; color:var(--text-secondary);">${this._esc(this._t('dict_not_found_desc'))}</p>
        </div>
      `;
      // Auto-open custom word box and prefill query
      if (this.els.customBox) {
        this.els.customBox.style.display = 'block';
        if (this.direction === 'fr-en' && this.els.customFr) {
          this.els.customFr.value = query;
          if (this.els.customEn) this.els.customEn.value = '';
        } else if (this.direction === 'en-fr' && this.els.customEn) {
          this.els.customEn.value = query;
          if (this.els.customFr) this.els.customFr.value = '';
        }
      }
      return;
    }

    this.els.resultsArea.innerHTML = results.map((entry, idx) => {
      const saved = this.notebook && this.notebook.has(entry);
      const sourceLabel = entry.source === 'online'
        ? this._t('dict_source_online')
        : this._t('dict_source_local');
      const genderLabel = entry.gender === 'm' ? 'masculine (m.)' : entry.gender === 'f' ? 'feminine (f.)' : entry.gender || '';
      const posGender = [entry.partOfSpeech, genderLabel].filter(Boolean).join(' · ');

      const defsList = (entry.definitions && entry.definitions.length > 0 ? entry.definitions : [entry.english])
        .filter(Boolean)
        .map((d, i) => `<li>${entry.definitions && entry.definitions.length > 1 ? `<span class="dict-def-num">${i + 1}.</span> ` : ''}${this._esc(d)}</li>`)
        .join('');

      let conjHtml = '';
      if (entry.presentConj) {
        const rows = Object.entries(entry.presentConj)
          .filter(([, f]) => f && f !== '-')
          .map(([p, f]) => {
            const spoken = (p === 'je' && /^[aeéèêiîoôuûyh]/i.test(f)) ? `j'${f}` : `${p} ${f}`;
            const displayPronoun = (p === 'je' && /^[aeéèêiîoôuûyh]/i.test(f)) ? "j'" : `${p} `;
            return `<button type="button" class="dict-conj-pill" data-speak="${this._esc(spoken)}" title="Listen: ${this._esc(spoken)}"><strong>${this._esc(displayPronoun)}</strong>${this._esc(f)} <span class="conj-speaker" aria-hidden="true">🔊</span></button>`;
          })
          .join('');
        conjHtml = `
          <div class="dict-conj-box">
            <div class="dict-conj-label">${this._esc(this._t('dict_conj_preview'))}</div>
            <div class="dict-conj-grid">${rows}</div>
          </div>
        `;
      }

      return `
        <div class="dict-result-card ${idx === 0 ? 'primary' : ''}" data-idx="${idx}">
          <div class="dict-card-top">
            <div>
              <div class="dict-word-row">
                <span class="dict-word-main">${this._esc(entry.french)}</span>
                ${entry.phonetic ? `<span class="dict-phonetic">${this._esc(entry.phonetic)}</span>` : ''}
              </div>
              ${posGender ? `<div class="dict-pos">${this._esc(posGender)}</div>` : ''}
            </div>
            <span class="dict-source-badge ${entry.source}">${this._esc(sourceLabel)}</span>
          </div>

          <ul class="dict-def-list">${defsList}</ul>

          ${entry.conjugationNote ? `<div class="dict-note">${this._esc(entry.conjugationNote)}</div>` : ''}

          ${entry.exampleFr ? `
            <div class="dict-example-box">
              <div class="dict-example-fr">💬 ${this._esc(entry.exampleFr)}</div>
              ${entry.exampleEn ? `<div class="dict-example-en">${this._esc(entry.exampleEn)}</div>` : ''}
            </div>
          ` : ''}

          ${conjHtml}

          <div class="dict-card-actions">
            <button type="button" class="btn-sm btn-ghost dict-listen-btn" data-idx="${idx}">${this._esc(this._t('dict_listen_normal'))}</button>
            <button type="button" class="btn-sm btn-ghost dict-slow-btn" data-idx="${idx}">${this._esc(this._t('dict_listen_slow'))}</button>
            <button type="button" class="btn-sm ${saved ? 'btn-ghost saved' : 'btn-primary'} dict-save-btn" data-idx="${idx}" ${saved ? 'disabled' : ''}>
              ${this._esc(saved ? this._t('dict_saved_btn') : this._t('dict_add_btn'))}
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Wire up audio & save buttons
    this.els.resultsArea.querySelectorAll('.dict-conj-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.audio && btn.dataset.speak) this.audio.speak(btn.dataset.speak);
      });
    });

    this.els.resultsArea.querySelectorAll('.dict-listen-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const entry = results[parseInt(btn.dataset.idx, 10)];
        if (entry && this.audio) this.audio.speak(entry.audioWord || entry.french);
      });
    });

    this.els.resultsArea.querySelectorAll('.dict-slow-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const entry = results[parseInt(btn.dataset.idx, 10)];
        if (entry && this.audio) this.audio.speakSlow(entry.audioWord || entry.french);
      });
    });

    this.els.resultsArea.querySelectorAll('.dict-save-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const entry = results[parseInt(btn.dataset.idx, 10)];
        if (!entry || !this.notebook) return;
        const saved = this.notebook.addWord(entry);
        if (saved && this.tooltipMgr) {
          this.tooltipMgr._ensureSrsCard(saved);
          this.tooltipMgr._showToast(this._t('tooltip_toast_added', { word: saved.french }));
        }
        btn.textContent = this._t('dict_saved_btn');
        btn.disabled = true;
        btn.classList.add('saved');
      });
    });

    // Make example sentences inside dictionary results clickable too!
    if (this.tooltipMgr) {
      this.els.resultsArea.querySelectorAll('.dict-example-fr').forEach(el => {
        this.tooltipMgr.makeTextClickable(el, el.textContent.replace(/^💬\s*/, ''));
      });
    }
  }

  saveCustomWord() {
    const fr = this.els.customFr ? this.els.customFr.value.trim() : '';
    const en = this.els.customEn ? this.els.customEn.value.trim() : '';
    const pos = this.els.customPos ? this.els.customPos.value.trim() : '';
    const ex = this.els.customEx ? this.els.customEx.value.trim() : '';

    if (!fr || !en) {
      alert(this._t('dict_custom_missing'));
      return;
    }

    const entry = {
      french: fr,
      english: en,
      partOfSpeech: pos || 'word',
      exampleFr: ex,
      saveKey: fr.toLowerCase(),
      source: 'custom'
    };

    const saved = this.notebook.addWord(entry);
    if (saved && this.tooltipMgr) {
      this.tooltipMgr._ensureSrsCard(saved);
      this.tooltipMgr._showToast(this._t('tooltip_toast_added', { word: saved.french }));
    }

    if (this.els.customFr) this.els.customFr.value = '';
    if (this.els.customEn) this.els.customEn.value = '';
    if (this.els.customPos) this.els.customPos.value = '';
    if (this.els.customEx) this.els.customEx.value = '';

    // Show the newly added word right in results
    this.lastResults = [{ ...entry, definitions: [en], source: 'local' }];
    this.lastQuery = fr;
    this.renderResults(this.lastResults, fr);
  }
}

window.FrenchDictionaryManager = FrenchDictionaryManager;
