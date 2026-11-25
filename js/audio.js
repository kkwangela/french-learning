// French Audio & Speech Synthesis Engine + Web Audio Sound FX
// Hybrid Engine: Reliable Online French HD Audio (<audio>) + Native Web Speech API fallback
// Designed for 100% reliable playback on iOS Safari, iOS PWA, Android Chrome, and Desktop.
class FrenchAudioManager {
  constructor() {
    this.synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
    this.audioCtx = null;
    this.soundEffectsEnabled = true;
    this.speechRate = 0.9;
    this.preferredVoiceURI = localStorage.getItem('french_preferred_voice_uri') || null;
    this.frenchVoice = null;
    this._currentUtterance = null;
    this._htmlAudio = null;
    this._playToken = 0;

    this._isIOS = typeof navigator !== 'undefined' && (
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    );
    this._isMobile = this._isIOS || (typeof navigator !== 'undefined' && /Android|Mobile|iPhone|iPad/i.test(navigator.userAgent));

    // Create a single reusable HTML5 Audio element (unlocks cleanly on mobile user taps)
    if (typeof Audio !== 'undefined') {
      this._htmlAudio = new Audio();
      this._htmlAudio.preload = 'auto';
      try {
        this._htmlAudio.playsInline = true;
        this._htmlAudio.setAttribute('playsinline', '');
      } catch (e) {}
    }

    this.initVoices();
  }

  isFrenchVoice(v) {
    if (!v) return false;
    const lang = (v.lang || '').toLowerCase().replace(/_/g, '-');
    const name = (v.name || '').toLowerCase();
    if (lang.startsWith('fr')) return true;
    return name.includes('french') || name.includes('français') || name.includes('francais');
  }

  getAvailableFrenchVoices() {
    if (!this.synth) return [];
    const all = this.synth.getVoices() || [];
    const frenchList = all.filter(v => this.isFrenchVoice(v));

    return frenchList.sort((a, b) => {
      if (a.localService && !b.localService) return -1;
      if (!a.localService && b.localService) return 1;

      const langA = (a.lang || '').toLowerCase().replace(/_/g, '-');
      const langB = (b.lang || '').toLowerCase().replace(/_/g, '-');
      const nameA = (a.name || '').toLowerCase();
      const nameB = (b.name || '').toLowerCase();

      if (langA === 'fr-fr' && langB !== 'fr-fr') return -1;
      if (langA !== 'fr-fr' && langB === 'fr-fr') return 1;

      const isTopA = nameA.includes('thomas') || nameA.includes('amélie') || nameA.includes('amelie') || nameA.includes('google') || nameA.includes('audrey');
      const isTopB = nameB.includes('thomas') || nameB.includes('amélie') || nameB.includes('amelie') || nameB.includes('google') || nameB.includes('audrey');
      if (isTopA && !isTopB) return -1;
      if (!isTopA && isTopB) return 1;

      return a.name.localeCompare(b.name);
    });
  }

  getFrenchVoice() {
    const frenchVoices = this.getAvailableFrenchVoices();
    if (frenchVoices.length === 0) return null;

    if (this.preferredVoiceURI && this.preferredVoiceURI !== '__online_hd__' && this.preferredVoiceURI !== '__system_default__') {
      const match = frenchVoices.find(v => v.voiceURI === this.preferredVoiceURI || v.name === this.preferredVoiceURI);
      if (match) {
        this.frenchVoice = match;
        return match;
      }
    }

    this.frenchVoice = frenchVoices[0];
    return this.frenchVoice;
  }

  shouldUseOnlineAudio() {
    // Explicit user preference wins
    if (this.preferredVoiceURI === '__online_hd__') return true;
    if (this.preferredVoiceURI && this.preferredVoiceURI !== '__online_hd__') return false;
    // Default: use Online HD <audio> on mobile (bypasses flaky iOS/Android speechSynthesis silent bugs!)
    // or whenever no system French voice is available
    const isOnline = typeof navigator === 'undefined' ? true : navigator.onLine !== false;
    if (!isOnline) return false;
    if (this._isMobile) return true;
    return this.getAvailableFrenchVoices().length === 0;
  }

  setPreferredVoice(voiceURI) {
    this.preferredVoiceURI = voiceURI;
    localStorage.setItem('french_preferred_voice_uri', voiceURI);
    this.getFrenchVoice();
  }

  initVoices() {
    if (!this.synth) return;

    const update = () => {
      const voices = this.getAvailableFrenchVoices();
      this.getFrenchVoice();
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('french-voices-ready'));
      }
      return voices.length > 0;
    };

    update();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = update;
    }

    let retries = 0;
    const poll = setInterval(() => {
      retries++;
      if (update() || retries >= 10) clearInterval(poll);
    }, 300);
  }

  /* ── Build ordered online French MP3 TTS URLs (no CORS required for <audio>) ── */
  _getOnlineTTSUrls(text) {
    const encoded = encodeURIComponent(text);
    return [
      `https://dict.youdao.com/dictvoice?audio=${encoded}&le=fr`,
      `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=fr&q=${encoded}`
    ];
  }

  /* ── Play via HTML5 <audio> (reliable on iPhone Safari, iOS PWA, Android Chrome) ── */
  _speakViaHtmlAudio(cleanText, rate, onStart, onEnd, token) {
    if (!this._htmlAudio) {
      this._speakViaSpeechSynthesis(cleanText, rate, onStart, onEnd, token);
      return;
    }

    const urls = this._getOnlineTTSUrls(cleanText);
    const audio = this._htmlAudio;

    // Stop any previous speech synthesis
    if (this.synth && (this.synth.speaking || this.synth.pending)) {
      try { this.synth.cancel(); } catch (e) {}
    }

    let urlIndex = 0;
    let finished = false;
    const finishOnce = () => {
      if (finished) return;
      finished = true;
      if (onEnd) onEnd();
    };

    const tryNextUrl = () => {
      if (token !== this._playToken) return;
      if (urlIndex >= urls.length) {
        // All online audio endpoints failed (e.g. offline) -> fallback to native speechSynthesis
        this._speakViaSpeechSynthesis(cleanText, rate, onStart, onEnd, token);
        return;
      }

      const url = urls[urlIndex++];
      audio.onplay = () => {
        if (token !== this._playToken) return;
        if (onStart) onStart();
      };
      audio.onended = () => {
        if (token !== this._playToken) return;
        finishOnce();
      };
      audio.onerror = () => {
        if (token !== this._playToken) return;
        tryNextUrl();
      };

      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (e) {}

      audio.src = url;
      audio.volume = 1.0;
      audio.playbackRate = Math.max(0.5, Math.min(1.5, rate || this.speechRate));

      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          if (token !== this._playToken) return;
          tryNextUrl();
        });
      }
    };

    tryNextUrl();
  }

  /* ── Play via native Web Speech API ── */
  _speakViaSpeechSynthesis(cleanText, rate, onStart, onEnd, token) {
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    try {
      // Only cancel when actually speaking/pending (avoids iOS WebKit silent-cancel bug)
      if (this.synth.speaking || this.synth.pending) {
        this.synth.cancel();
      }
      if (this.synth.paused) {
        this.synth.resume();
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = rate || this.speechRate;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // On iOS, assigning utterance.voice often triggers a WebKit silent bug unless user explicitly chose a voice.
      // Setting lang='fr-FR' alone lets iOS pick its working native French voice!
      const userExplicitSystemVoice = this.preferredVoiceURI &&
        this.preferredVoiceURI !== '__online_hd__' &&
        this.preferredVoiceURI !== '__system_default__';

      const activeVoice = (!this._isIOS || userExplicitSystemVoice) ? this.getFrenchVoice() : null;
      if (activeVoice) {
        utterance.voice = activeVoice;
        utterance.lang = (activeVoice.lang || 'fr-FR').replace(/_/g, '-');
      } else {
        utterance.lang = 'fr-FR';
      }

      // Strong reference prevents mobile Safari GC mid-speech
      this._currentUtterance = utterance;

      let finished = false;
      const finishOnce = () => {
        if (finished) return;
        finished = true;
        if (this._currentUtterance === utterance) this._currentUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onstart = () => {
        if (token !== this._playToken) return;
        if (onStart) onStart();
      };
      utterance.onend = finishOnce;
      utterance.onerror = () => finishOnce();

      this.synth.speak(utterance);
    } catch (e) {
      console.error('Speech synthesis error:', e);
      if (onEnd) onEnd();
    }
  }

  speak(text, customRate = null, onStart = null, onEnd = null) {
    const cleanText = (text || '').trim();
    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    const token = ++this._playToken;
    const rate = customRate || this.speechRate;

    if (this.shouldUseOnlineAudio() && this._htmlAudio) {
      this._speakViaHtmlAudio(cleanText, rate, onStart, onEnd, token);
    } else {
      this._speakViaSpeechSynthesis(cleanText, rate, onStart, onEnd, token);
    }
  }

  speakSlow(text, onStart = null, onEnd = null) {
    this.speak(text, 0.65, onStart, onEnd);
  }

  stop() {
    this._playToken++;
    this._currentUtterance = null;
    if (this._htmlAudio) {
      try {
        this._htmlAudio.pause();
        this._htmlAudio.currentTime = 0;
      } catch (e) {}
    }
    if (this.synth) {
      try { this.synth.cancel(); } catch (e) {}
    }
  }

  // Synthesize sound effects without external audio files using Web Audio API
  getAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  playSuccess() {
    if (!this.soundEffectsEnabled || this._isMobile) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.16);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  playError() {
    if (!this.soundEffectsEnabled || this._isMobile) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(160, now + 0.2);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {}
  }

  playFlip() {
    if (!this.soundEffectsEnabled || this._isMobile) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  playLevelUp() {
    if (!this.soundEffectsEnabled || this._isMobile) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);

        gain.gain.setValueAtTime(0.18, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.3);
      });
    } catch (e) {}
  }
}

if (typeof window !== 'undefined') {
  window.FrenchAudioManager = FrenchAudioManager;
}
