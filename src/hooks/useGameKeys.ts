export default function useGameKeys(e: Event) {


  const { type } = e;
  const keyType = (e.currentTarget as HTMLElement).dataset.keyType;
  let dispatchType = '';



  if (type === 'mousedown' || type === 'touchstart') {
    dispatchType = 'keydown'
  } else if (type === 'mouseup' || type === 'touchend') {
    dispatchType = 'keyup'
  }


  if (keyType === 'left') {
    window.dispatchEvent(new KeyboardEvent(dispatchType, {
      keyCode: 37,
    }));
  } else if (keyType === 'right') {
    window.dispatchEvent(new KeyboardEvent(dispatchType, {
      keyCode: 39,
    }));
  }
}