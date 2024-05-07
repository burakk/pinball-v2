import { useEffect, useRef } from "react";

export function useSoundEffect(volume = 0.4, seconds = 0.008, tone = 10) {

    const audioContexRef = useRef<null | AudioContext>(new AudioContext());
    const arr: number[] = [];
    useEffect(() => {
        //window.AudioContext = window.AudioContext;
        audioContexRef.current = new AudioContext();

    }, []);

    if (!audioContexRef.current) { return null }

    for (let i = 0; i < audioContexRef.current.sampleRate * seconds; i++) {
        arr[i] = sineWaveAt(i, tone, audioContexRef.current) * volume
    }

    return () => { playSound(arr, audioContexRef.current as AudioContext) };


}


function playSound(arr: number[], audioContext: AudioContext) {
    console.log("soundFx")
    const buf = new Float32Array(arr.length)
    for (let i = 0; i < arr.length; i++) buf[i] = arr[i]
    const buffer = audioContext.createBuffer(1, buf.length, audioContext.sampleRate)
    buffer.copyToChannel(buf, 0)
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
}

function sineWaveAt(sampleNumber: number, tone: number, audioContext: AudioContext) {
    const sampleFreq = audioContext.sampleRate / tone;
    return Math.sin(sampleNumber / (sampleFreq / (Math.PI * 2)))
}

