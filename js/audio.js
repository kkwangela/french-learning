// French Audio & Speech Synthesis Engine + Web Audio Sound FX
class FrenchAudioManager {
  constructor() {
    this.synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
    this.audioCtx = null;
    this.soundEffectsEnabled = true;
    this.speechRate = 0.9; // Slightly slower for language learners
    this.preferredVoiceURI = localStorage.getItem('french_preferred_voice_uri') || null;
    this.frenchVoice = null;

    this.initVoices();
  }

  isFrenchVoice(v) {
    if (!v) return false;
    const lang = (v.lang || '').toLowerCase().replace(/_/g, '-');
    const name = (v.name || '').toLowerCase();

    return lang.startsWith('fr') ||
           name.includes('french') ||
           name.includes('français') ||
           name.includes('thomas') ||
           name.includes('amélie') ||
           name.includes('amelie') ||
           name.includes('jacques') ||
           name.includes('audrey') ||
           name.includes('aurelie') ||
           name.includes('flo') ||
           name.includes('eddy');
  }

  getAvailableFrenchVoices() {
    if (!this.synth) return [];
    const all = this.synth.getVoices() || [];
    const frenchList = all.filter(v => this.isFrenchVoice(v));

    // Sort: fr-FR top quality voices first, then fr-CA, then others
    return frenchList.sort((a, b) => {
      const langA = (a.lang || '').toLowerCase().replace(/_/g, '-');
      const langB = (b.lang || '').toLowerCase().replace(/_/g, '-');
      const nameA = (a.name || '').toLowerCase();
      const nameB = (b.name || '').toLowerCase();

      // Top priority to recognized high-quality native French voices
      const isTopA = nameA.includes('google') || nameA.includes('thomas') || nameA.includes('amélie') || nameA.includes('amelie') || nameA.includes('jacques');
      const isTopB = nameB.includes('google') || nameB.includes('thomas') || nameB.includes('amélie') || nameB.includes('amelie') || nameB.includes('jacques');
      if (isTopA && !isTopB) return -1;
      if (!isTopA && isTopB) return 1;

      // Prefer fr-fr over others
      if (langA === 'fr-fr' && langB !== 'fr-fr') return -1;
      if (langA !== 'fr-fr' && langB === 'fr-fr') return 1;

      return a.name.localeCompare(b.name);
    });
  }

  getFrenchVoice() {
    const frenchVoices = this.getAvailableFrenchVoices();
    if (frenchVoices.length === 0) {
      return null;
    }

    // 1. If user selected a preferred voice and it exists
    if (this.preferredVoiceURI) {
      const match = frenchVoices.find(v => v.voiceURI === this.preferredVoiceURI || v.name === this.preferredVoiceURI);
      if (match) {
        this.frenchVoice = match;
        return match;
      }
    }

    // 2. Prioritize Thomas (standard France French on macOS) or Google français or Amélie
    const preferred = frenchVoices.find(v => {
      const n = v.name.toLowerCase();
      return n.includes('thomas') || n.includes('google') || n.includes('jacques') || n.includes('amélie') || n.includes('amelie');
    });

    this.frenchVoice = preferred || frenchVoices[0];
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
      this.getFrenchVoice();
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('french-voices-ready'));
      }
    };

    update();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = update;
    }
  }

  speak(text, customRate = null, onStart = null, onEnd = null) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser.');
      if (onEnd) onEnd();
      return;
    }

    try {
      this.synth.cancel(); // Stop any pending speech

      const cleanText = (text || '').trim();
      if (!cleanText) {
        if (onEnd) onEnd();
        return;
      }

      // Resume synthesis if suspended by browser
      if (this.synth.paused) {
        this.synth.resume();
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = customRate || this.speechRate;
      utterance.pitch = 1.0;

      // Always resolve best French voice dynamically
      const activeVoice = this.getFrenchVoice();
      if (activeVoice) {
        utterance.voice = activeVoice;
        // Normalize lang tag for utterance
        utterance.lang = (activeVoice.lang || 'fr-FR').replace(/_/g, '-');
      } else {
        // Fallback lang
        utterance.lang = 'fr-FR';
      }

      if (onStart) utterance.onstart = onStart;
      if (onEnd) {
        utterance.onend = onEnd;
        utterance.onerror = (err) => {
          console.warn('Utterance error:', err);
          onEnd();
        };
      }

      this.synth.speak(utterance);
    } catch (e) {
      console.error('Speech synthesis error:', e);
      if (onEnd) onEnd();
    }
  }

  speakSlow(text, onStart = null, onEnd = null) {
    this.speak(text, 0.65, onStart, onEnd);
  }

  stop() {
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
