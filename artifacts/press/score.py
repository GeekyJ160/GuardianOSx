#!/usr/bin/env python3
"""Quiet open-fifth bed for the 15s GuardianOS film. Not a library track."""
import math
import struct
import wave

SR = 48000
DUR = 15.0
N = int(SR * DUR)

# (start, end, frequencies)
CHORDS = [
    (0.0, 3.35, (55.0, 110.0, 164.81)),
    (2.75, 5.45, (55.0, 110.0, 164.81, 329.63)),
    (4.85, 7.65, (87.31, 174.61, 261.63)),
    (7.05, 11.35, (65.41, 130.81, 196.0)),
    (10.75, 13.45, (55.0, 110.0, 164.81)),
    (12.85, 15.0, (55.0, 110.0, 138.59, 164.81)),
]


def env(t, a, b, fade=0.6):
    if t < a or t > b:
        return 0.0
    if t < a + fade:
        x = (t - a) / fade
        return math.sin(x * math.pi * 0.5)
    if t > b - fade:
        x = (b - t) / fade
        return math.sin(max(0.0, x) * math.pi * 0.5)
    return 1.0


phases_l = [0.0] * 24
phases_r = [0.0] * 24
left = []
right = []
# deterministic air
rng = 0.17

for i in range(N):
    t = i / SR
    sl = 0.0
    sr = 0.0
    voice = 0
    for a, b, freqs in CHORDS:
        e = env(t, a, b)
        if e <= 0:
            voice += len(freqs)
            continue
        for f in freqs:
            # keep phase continuous per voice slot
            phases_l[voice] += 2 * math.pi * f / SR
            phases_r[voice] += 2 * math.pi * (f * 1.004) / SR
            # fundamentals a touch louder than the upper partials
            g = 0.22 if f < 100 else 0.13 if f < 200 else 0.07
            sl += math.sin(phases_l[voice]) * g * e
            sr += math.sin(phases_r[voice]) * g * e
            voice += 1
    # a little air, not a drum
    rng = (rng * 16807 + 0.13) % 1
    air = (rng * 2 - 1) * 0.012
    breathe = 0.92 + 0.08 * math.sin(2 * math.pi * 0.07 * t)
    master = breathe
    if t < 0.45:
        master *= t / 0.45
    if t > DUR - 1.15:
        master *= max(0.0, (DUR - t) / 1.15)
    left.append((sl + air) * master)
    right.append((sr + air * 0.8) * master)

peak = max(max(abs(x) for x in left), max(abs(x) for x in right), 1e-6)
scale = 0.42 / peak

path = "/workspace/artifacts/press/reel-score.wav"
with wave.open(path, "w") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    frames = bytearray()
    for a, b in zip(left, right):
        frames += struct.pack("<hh", int(max(-1, min(1, a * scale)) * 32767), int(max(-1, min(1, b * scale)) * 32767))
    w.writeframes(frames)
print("score", path, "peak_in", round(peak, 3))
