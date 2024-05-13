import * as Tone from "tone";

export function toneWork() {
  const permitSoundWithUserClick = async () => {
    await Tone.start();
  };

  return permitSoundWithUserClick;
}

export function playIntro() {
  const env = new Tone.AmplitudeEnvelope({
    attack: 0.11,
    decay: 0.21,
    sustain: 0.1,
    release: 0.2,
  }).toDestination();
  //         function createPlayerPlusPanner(url, positionX, positionY, positionZ) {
  // 			const panner = new Tone.Panner3D({
  // 				panningModel: "HRTF",
  // 				positionX,
  // 				positionY,
  // 				positionZ,
  // 			}).toDestination();

  // 			const player = new Tone.Player({
  // 				url,
  //                 autostart:true,
  //                 loop: true,
  //                 //loopEnd:0.1,
  //                 fadeIn:1,
  //                 fadeOut:3,

  // 			}).connect(panner).sync().start(0);

  // 		}
  // 		createPlayerPlusPanner("https://tonejs.github.io/audio/berklee/taps_1c.mp3", 2, 0, 0);
  // 		createPlayerPlusPanner("https://tonejs.github.io/audio/berklee/tinkle3.mp3", 0, 0, 2);
  // 		createPlayerPlusPanner("https://tonejs.github.io/audio/berklee/tapping1.mp3", -2, 0, 2);

  // Tone.getTransport().start();
  // // ramp up to 800 bpm over 10 seconds
  // Tone.getTransport().stop(3);
  //const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  // set the attributes across all the voices using 'set'
  //synth.set({ detune: 200 });
  // play a chord
  const filter = new Tone.JCReverb(0.1).toDestination();
  //const now = Tone.now();

  const feedbackDelay = new Tone.PingPongDelay({
    delayTime: "8n",
    feedback: 0.8,
    wet: 0.2,
  }).toDestination();

  //synth.triggerAttackRelease([100], 0.8);
  //synth.connect(filter);
  //synth.triggerAttackRelease(["D3", "F3"], 0.1, now + 0.3);

  //const synth2 = new Tone.PolySynth(Tone.Synth).toDestination();

  //synth.triggerAttack("D4", now);
  //synth.triggerAttack("DF", now + 2);
  //synth.triggerRelease(["D4", "F4", "A4", "C5", "E5"], now + 5);
  const now = Tone.now();
  // create two monophonic synths
  const synthA = new Tone.PolySynth(Tone.Synth).toDestination();

  const synthB = new Tone.AMSynth().toDestination();
  //play a note every quarter-note
  synthB.connect(feedbackDelay);

  const loopA = new Tone.Loop((time) => {
    synthA.triggerAttackRelease(["A1"], "8n", time);
  }, "2n").start(0.1);

  //play another note every off quarter-note, by starting it "8n"
  const loopB = new Tone.Loop((time) => {
    synthB.triggerAttackRelease("A2", "8n", time);
  }, "2n").start(0);
  //all loops start when the Transport is started
  Tone.getTransport().start(now);
  // ramp up to 800 bpm over 10 seconds

  Tone.getTransport().bpm.rampTo(800, 1.2);

  Tone.getTransport().stop(now + 1.2);
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
