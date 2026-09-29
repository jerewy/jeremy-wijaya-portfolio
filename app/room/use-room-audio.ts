"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

// All sound is synthesized with the Web Audio API: no audio files, nothing to license.

export type Sfx = "hover" | "open" | "close" | "check" | "toggle" | "copy" | "type";

const MUSIC_VOLUME = 0.05;
const SFX_VOLUME = 0.12;
const BPM = 92;
const EIGHTH = 60 / BPM / 2;
// Schedule notes slightly ahead of time so timer jitter never causes gaps.
const LOOKAHEAD_S = 0.12;
const SCHEDULER_MS = 25;

const midiToHz = (midi: number) => 440 * 2 ** ((midi - 69) / 12);

// A cozy Am - F - C - G loop, 8 eighth notes per chord.
const CHORDS = [
  { bass: 45, arp: [57, 60, 64] },
  { bass: 41, arp: [53, 57, 60] },
  { bass: 48, arp: [60, 64, 67] },
  { bass: 43, arp: [55, 59, 62] },
];
const ARP_PATTERN = [0, 1, 2, 1, 0, 1, 2, 1];
const _ = null;
// Plays on every other pass through the loop so the music doesn't get tiring.
const MELODY: (number | null)[] = [
  76, _, _, 72, _, 74, _, _,
  72, _, _, 69, _, _, _, _,
  67, _, _, 72, _, 76, _, _,
  74, _, _, 71, _, 67, _, _,
];
const LOOP_STEPS = CHORDS.length * ARP_PATTERN.length;

type Voice = { type: OscillatorType; freq: number; start: number; dur: number; gain: number };

function playVoice(ctx: AudioContext, dest: AudioNode, v: Voice, sweepTo?: number) {
  const osc = ctx.createOscillator();
  const env = ctx.createGain();
  osc.type = v.type;
  osc.frequency.setValueAtTime(v.freq, v.start);
  if (sweepTo) osc.frequency.exponentialRampToValueAtTime(sweepTo, v.start + v.dur);
  env.gain.setValueAtTime(0, v.start);
  env.gain.linearRampToValueAtTime(v.gain, v.start + 0.01);
  env.gain.exponentialRampToValueAtTime(0.0001, v.start + v.dur);
  osc.connect(env).connect(dest);
  osc.start(v.start);
  osc.stop(v.start + v.dur + 0.02);
}

// Each effect is a short run of notes: [frequency, delay from now, duration].
const SFX_NOTES: Record<Exclude<Sfx, "toggle">, { type: OscillatorType; gain: number; notes: [number, number, number][] }> = {
  hover: { type: "square", gain: 0.12, notes: [[880, 0, 0.04]] },
  open: { type: "square", gain: 0.22, notes: [[523, 0, 0.07], [659, 0.05, 0.07], [784, 0.1, 0.07], [1047, 0.15, 0.12]] },
  close: { type: "square", gain: 0.18, notes: [[784, 0, 0.06], [523, 0.05, 0.1]] },
  check: { type: "square", gain: 0.22, notes: [[988, 0, 0.08], [1319, 0.08, 0.22]] },
  copy: { type: "square", gain: 0.18, notes: [[1047, 0, 0.05], [1047, 0.08, 0.08]] },
  type: { type: "triangle", gain: 0.1, notes: [[660, 0, 0.025]] },
};

export function useRoomAudio() {
  const [isOn, setIsOn] = useState(false);
  const isOnRef = useRef(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const musicBusRef = useRef<GainNode | null>(null);
  const sfxBusRef = useRef<GainNode | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stepRef = useRef(0);
  const loopRef = useRef(0);
  const nextTimeRef = useRef(0);

  const scheduleMusic = useCallback(() => {
    const ctx = ctxRef.current;
    const bus = musicBusRef.current;
    if (!ctx || !bus) return;
    while (nextTimeRef.current < ctx.currentTime + LOOKAHEAD_S) {
      const step = stepRef.current;
      const t = nextTimeRef.current;
      const chord = CHORDS[Math.floor(step / ARP_PATTERN.length)];
      const beat = step % ARP_PATTERN.length;

      if (beat % 4 === 0) {
        playVoice(ctx, bus, { type: "triangle", freq: midiToHz(chord.bass), start: t, dur: EIGHTH * 3.5, gain: 0.9 });
      }
      playVoice(ctx, bus, {
        type: "square",
        freq: midiToHz(chord.arp[ARP_PATTERN[beat]]),
        start: t,
        dur: EIGHTH * 0.8,
        gain: 0.18,
      });
      const note = MELODY[step];
      if (note && loopRef.current % 2 === 1) {
        playVoice(ctx, bus, { type: "square", freq: midiToHz(note), start: t, dur: EIGHTH * 2.2, gain: 0.3 });
      }

      nextTimeRef.current += EIGHTH;
      stepRef.current = (step + 1) % LOOP_STEPS;
      if (stepRef.current === 0) loopRef.current += 1;
    }
  }, []);

  const stopMusic = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  // Browsers only allow audio after a user gesture, so the context is created on the first toggle.
  const ensureContext = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;
    const ctx = new AudioContext();
    const softener = ctx.createBiquadFilter();
    softener.type = "lowpass";
    softener.frequency.value = 2400;
    softener.connect(ctx.destination);

    const music = ctx.createGain();
    music.gain.value = MUSIC_VOLUME;
    music.connect(softener);
    const sfx = ctx.createGain();
    sfx.gain.value = SFX_VOLUME;
    sfx.connect(softener);

    ctxRef.current = ctx;
    musicBusRef.current = music;
    sfxBusRef.current = sfx;
    return ctx;
  }, []);

  const sfx = useCallback((name: Sfx) => {
    const ctx = ctxRef.current;
    const bus = sfxBusRef.current;
    if (!isOnRef.current || !ctx || !bus) return;
    const now = ctx.currentTime;
    if (name === "toggle") {
      playVoice(ctx, bus, { type: "triangle", freq: 300, start: now, dur: 0.28, gain: 0.35 }, 900);
      return;
    }
    const { type, gain, notes } = SFX_NOTES[name];
    for (const [freq, delay, dur] of notes) {
      playVoice(ctx, bus, { type, freq, start: now + delay, dur, gain });
    }
  }, []);

  const toggle = useCallback(async () => {
    const next = !isOnRef.current;
    isOnRef.current = next;
    setIsOn(next);
    if (!next) {
      stopMusic();
      await ctxRef.current?.suspend();
      return;
    }
    const ctx = ensureContext();
    await ctx.resume();
    nextTimeRef.current = ctx.currentTime + 0.05;
    timerRef.current = setInterval(scheduleMusic, SCHEDULER_MS);
    sfx("check");
  }, [ensureContext, scheduleMusic, sfx, stopMusic]);

  // Go quiet while the tab is in the background.
  useEffect(() => {
    const onVisibility = () => {
      const ctx = ctxRef.current;
      if (!ctx || !isOnRef.current) return;
      if (document.hidden) {
        void ctx.suspend();
      } else {
        void ctx.resume();
        nextTimeRef.current = ctx.currentTime + 0.05;
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(
    () => () => {
      stopMusic();
      void ctxRef.current?.close();
    },
    [stopMusic]
  );

  return { isOn, toggle, sfx };
}

// Lets deeply nested panels (e.g. the Copy button) play effects.
export const RoomAudioContext = createContext<(name: Sfx) => void>(() => {});
export const useSfx = () => useContext(RoomAudioContext);
