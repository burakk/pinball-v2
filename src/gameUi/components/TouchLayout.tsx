const TouchLayout = () => {
  function keydown(keyCode: number, key: string) {
    const keyboardEvent = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      keyCode,
      key,
    });
    window.dispatchEvent(keyboardEvent);
  }

  function keyup(keyCode: number, key: string) {
    const keyboardEvent = new KeyboardEvent("keyup", {
      bubbles: true,
      cancelable: true,
      keyCode,
      key,
    });
    window.dispatchEvent(keyboardEvent);
  }

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        zIndex: "1002",
      }}
    >
      <button
        onPointerDown={() => {
          keydown(37, "ArrowLeft");
        }}
        onPointerUp={() => {
          keyup(37, "ArrowLeft");
        }}
        style={{
          flex: "1 1 0",
          backgroundColor: "rgba(0,0,255,0.2)",
          opacity: "0",
        }}
      ></button>
      <button
        onPointerDown={() => {
          keydown(39, "ArrowRight");
        }}
        onPointerUp={() => {
          keyup(39, "ArrowRight");
        }}
        style={{
          flex: "1 1 0",
          backgroundColor: "rgba(0,0,255,0.2)",
          opacity: "0",
        }}
      ></button>
    </div>
  );
};

export default TouchLayout;