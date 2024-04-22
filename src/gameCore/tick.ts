let start:number, previousTimeStamp:number;


let requestId:number;


let doOnTick: () => void;

export function initTick(callback:()=>void) {
  if(typeof callback == "function"){
    doOnTick = callback;
    requestId = window.requestAnimationFrame(tick);
  }else{
    throw new Error("Tick function needs a callback!");
  }
}

function tick(timeStamp:number) {
  if (start === undefined) {
    start = timeStamp;
  }
  //const elapsed = timeStamp - start;

  if (previousTimeStamp !== timeStamp) {
    //animations
    doOnTick();
  }

  previousTimeStamp = timeStamp;

  requestId = window.requestAnimationFrame(tick);
}


export function cancelStep() {
  cancelAnimationFrame(requestId);
}

