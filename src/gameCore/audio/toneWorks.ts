import * as Tone from "tone";

export function toneWork() {
  const permitSoundWithUserClick = async () => {
    await Tone.start();
  };

  return permitSoundWithUserClick;
}

export function playCircleBumperSound() {
  const synth = new Tone.Synth().toDestination();
  //const now = Tone.now();
  synth.triggerAttackRelease(10, 0.001);
}

export function playPlungerSound() {
  const synth = new Tone.AMSynth().toDestination();
  //const now = Tone.now();
  synth.set({
    oscillator: {
      type: "sine",
    },

    envelope: {
      attack: 0.005,
      decay: 0.1,
      sustain: 0.3,
      release: 1,
    },
  });
  synth.triggerAttackRelease("A1", 0.05);
}

export function playChainBumperSound() {
  const synth = new Tone.AMSynth().toDestination();
  //const now = Tone.now();

  synth.triggerAttackRelease(80, 0.02);
}

export function playTubeSound() {
  const osc = new Tone.Oscillator().toDestination();
  const env = new Tone.AmplitudeEnvelope();
  // start at "C4"
  osc.frequency.value = "C4";
  // ramp to "C2" over 2 seconds
  osc.frequency.rampTo("C2", 2);
  // start the oscillator for 2 seconds
  osc.connect(env);
  osc.start().stop("+2");
}

export function playScoopLockSound() {
  const osc = new Tone.Oscillator().toDestination();
  // start at "C4"
  osc.frequency.value = "C4";
  // ramp to "C1" over 1 seconds
  osc.frequency.rampTo("C1", 1);
  // start the oscillator for 1 second
  osc.start().stop("+1");
}
