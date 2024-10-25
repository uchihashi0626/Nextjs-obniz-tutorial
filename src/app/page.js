"use client";
import Script from "next/script";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLEDOn, setLEDOn] = useState(false);
  const [led, setLed] = useState(null);

  // Obniz初期化と接続
  const handleOnLoad = () => {
    const obniz = new Obniz(""); // ObnizのIDを指定してください
    obniz.onconnect = () => {
      const ledInstance = obniz.wired("LED", { anode: 0, cathode: 1 });
      setLed(ledInstance);
      updateLEDState(isLEDOn, ledInstance);
    };
  };

  // LEDの状態を更新する関数
  const updateLEDState = (state, ledInstance) => {
    if (ledInstance) {
      state ? ledInstance.on() : ledInstance.off();
    }
  };

  // isLEDOnが変わるたびにLEDの状態を更新
  useEffect(() => {
    updateLEDState(isLEDOn, led);
  }, [isLEDOn, led]);

  return (
    <main className="bg-white text-center">
      <Script src="https://unpkg.com/obniz/obniz.js" onLoad={handleOnLoad} />
      <h1 className="text-2xl mb-6 p-6">LED</h1>
      <div className="space-x-4">
        <button
          className="px-4 py-1 bg-slate-500 text-white font-bold rounded"
          onClick={() => setLEDOn(true)}
        >
          ON
        </button>
        <button
          className="px-4 py-1 bg-white border border-slate-500 text-slate-500 font-bold rounded"
          onClick={() => setLEDOn(false)}
        >
          OFF
        </button>
      </div>
    </main>
  );
}
