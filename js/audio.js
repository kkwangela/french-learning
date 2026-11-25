// French Audio & Speech Synthesis Engine + Web Audio Sound FX
// Optimized for desktop + iOS Safari / Android Chrome / standalone PWA
class FrenchAudioManager {
  constructor() {
    this.synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
    this.audioCtx = null;
    this.soundEffectsEnabled = true;
    this.speechRate = 0.9; // Slightly slower for language learners
    this.preferredVoiceURI = localStorage.getItem('french_preferred_voice_uri') || null;
    this.frenchVoice = null;
    this._currentUtterance = null; // Prevent mobile Safari GC mid-speech
    this._fallbackTimer = null;
    this._isIOS = typeof navigator !== 'undefined' && (
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    );

    this.initVoices();
  }

  isFrenchVoice(v) {
    if (!v) return false;
    const lang = (v.lang || '').toLowerCase().replace(/_/g, '-');
    const name = (v.name || '').toLowerCase();

    // Primary & safest check: BCP-47 lang starts with 'fr' (handles fr-FR, fr_FR, fr-CA, fr-BE, fr-CH)
    if (lang.startsWith('fr')) return true;

    // Fallback only for explicit French labels (never bare names like Flo/Eddy which exist in other languages)
    return name.includes('french') || name.includes('français') || name.includes('francais');
  }

  getAvailableFrenchVoices() {
    if (!this.synth) return [];
    const all = this.synth.getVoices() || [];
    const frenchList = all.filter(v => this.isFrenchVoice(v));

    // Sort: local/installed voices first (critical on iOS!), then top-quality fr-FR voices, then others
    return frenchList.sort((a, b) => {
      // On mobile/iOS, localService voices are guaranteed installed and playable without network errors
      if (a.localService && !b.localService) return -1;
      if (!a.localService && b.localService) return 1;

      const langA = (a.lang || '').toLowerCase().replace(/_/g, '-');
      const langB = (b.lang || '').toLowerCase().replace(/_/g, '-');
      const nameA = (a.name || '').toLowerCase();
      const nameB = (b.name || '').toLowerCase();

      // Prefer standard France French (fr-fr) first
      if (langA === 'fr-fr' && langB !== 'fr-fr') return -1;
      if (langA !== 'fr-fr' && langB === 'fr-fr') return 1;

      // Prefer natural-sounding voices over novelty voices
      const isTopA = nameA.includes('thomas') || nameA.includes('amélie') || nameA.includes('amelie') || nameA.includes('google') || nameA.includes('audrey') || nameA.includes('aurélie') || nameA.includes('aurelie');
      const isTopB = nameB.includes('thomas') || nameB.includes('amélie') || nameB.includes('amelie') || nameB.includes('google') || nameB.includes('audrey') || nameB.includes('aurélie') || nameB.includes('aurelie');
      if (isTopA && !isTopB) return -1;
      if (!isTopA && isTopB) return 1;

      return a.name.localeCompare(b.name);
    });
  }

  getFrenchVoice() {
    const frenchVoices = this.getAvailableFrenchVoices();
    if (frenchVoices.length === 0) {
      return null;
    }

    // 1. User-selected preferred voice if present on this device
    if (this.preferredVoiceURI) {
      const match = frenchVoices.find(v => v.voiceURI === this.preferredVoiceURI || v.name === this.preferredVoiceURI);
      if (match) {
        this.frenchVoice = match;
        return match;
      }
    }

    // 2. Best sorted French voice (already prioritizes localService + fr-FR + Thomas/Amélie/Google)
    this.frenchVoice = frenchVoices[0];
    return this.frenchVoice;
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

    // iOS Safari & Chrome Mobile sometimes populate getVoices() lazily without firing onvoiceschanged
    let retries = 0;
    const poll = setInterval(() => {
      retries++;
      if (update() || retries >= 10) {
        clearInterval(poll);
      }
    }, 300);
  }

  speak(text, customRate = null, onStart = null, onEnd = null) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser.');
      if (onEnd) onEnd();
      return;
    }

    const cleanText = (text || '').trim();
    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    clearTimeout(this._fallbackTimer);

    const doSpeak = (useExplicitVoice) => {
      try {
        // CRITICAL iOS FIX: Only call cancel() if something is actually speaking or queued.
        // Calling cancel() when idle on iOS Safari can silently swallow the very next speak() call!
        if (this.synth.speaking || this.synth.pending) {
          this.synth.cancel();
        }
        if (this.synth.paused) {
          this.synth.resume();
        }

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = customRate || this.speechRate;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        const activeVoice = useExplicitVoice ? this.getFrenchVoice() : null;
        if (activeVoice) {
          utterance.voice = activeVoice;
          utterance.lang = (activeVoice.lang || 'fr-FR').replace(/_/g, '-');
        } else {
          utterance.lang = 'fr-FR';
        }

        // Keep strong reference so mobile Safari does not garbage-collect the utterance mid-speech
        this._currentUtterance = utterance;

        let started = false;
        let finished = false;
        const finishOnce = () => {
          if (finished) return;
          finished = true;
          clearTimeout(this._fallbackTimer);
          if (this._currentUtterance === utterance) {
            this._currentUtterance = null;
          }
          if (onEnd) onEnd();
        };

        utterance.onstart = () => {
          started = true;
          clearTimeout(this._fallbackTimer);
          if (onStart) onStart();
        };

        utterance.onend = finishOnce;

        utterance.onerror = (err) => {
          console.warn('Utterance error:', err && err.error ? err.error : err);
          // If an explicit voice failed on mobile (e.g. undownloaded Siri voice), retry once with OS default fr-FR
          if (useExplicitVoice && err && err.error !== 'interrupted' && err.error !== 'canceled') {
            clearTimeout(this._fallbackTimer);
            doSpeak(false);
            return;
          }
          finishOnce();
        };

        // Must be called synchronously inside the user gesture for iOS Safari / PWA
        this.synth.speak(utterance);

        // Mobile watchdog: if explicit voice hung silently without starting, fall back to OS default fr-FR
        if (useExplicitVoice && activeVoice) {
          this._fallbackTimer = setTimeout(() => {
            if (!started && !finished && !this.synth.speaking) {
              doSpeak(false);
            }
          }, 900);
        }
      } catch (e) {
        console.error('Speech synthesis error:', e);
        if (onEnd) onEnd();
      }
    };

    doSpeak(true);
  }

  speakSlow(text, onStart = null, onEnd = null) {
    this.speak(text, 0.65, onStart, onEnd);
  }

  stop() {
    clearTimeout(this._fallbackTimer);
    this._currentUtterance = null;
    if (this.synth) {
      this.synth.cancel();
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
    if (!this.soundEffectsEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.16); // G5

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  playError() {
    if (!this.soundEffectsEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now); // A3
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
    if (!this.soundEffectsEnabled) return;
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
    if (!this.soundEffectsEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
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
