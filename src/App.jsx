import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { CenaConvite } from "./components/CenaConvite";
import { CenaPreparo } from "./components/CenaPreparo";
import { CenaMesa } from "./components/CenaMesa";

export default function App() {
  const [etapa, setEtapa] = useState("convite");
  const [totalPausas, setTotalPausas] = useState(() => {
    return Number(localStorage.getItem("pausa_cafe_total") || 0);
  });

  useEffect(() => {
    fetch("https://api.counterapi.dev/v1/pausa-para-o-cafe-smd/pausas")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === "number") {
          setTotalPausas(data.count);
          localStorage.setItem("pausa_cafe_total", String(data.count));
        }
      })
      .catch(() => {});
  }, []);

  const registrarPausaColetiva = async () => {
    const proximoLocal = totalPausas + 1;
    setTotalPausas(proximoLocal);
    localStorage.setItem("pausa_cafe_total", String(proximoLocal));
    setEtapa("mesa");

    try {
      const res = await fetch(
        "https://api.counterapi.dev/v1/pausa-para-o-cafe-smd/pausas/up"
      );
      const data = await res.json();
      if (data && typeof data.count === "number") {
        setTotalPausas(data.count);
        localStorage.setItem("pausa_cafe_total", String(data.count));
      }
    } catch {
      // Mantém o valor local se a API não responder
    }
  };

  return (
    <main className="palco">
      <AnimatePresence mode="wait">
        {etapa === "convite" && (
          <CenaConvite key="convite" onAvancar={() => setEtapa("preparo")} />
        )}
        {etapa === "preparo" && (
          <CenaPreparo
            key="preparo"
            onVoltar={() => setEtapa("convite")}
            onConcluir={registrarPausaColetiva}
          />
        )}
        {etapa === "mesa" && (
          <CenaMesa
            key="mesa"
            totalPausas={totalPausas}
            onVoltar={() => setEtapa("preparo")}
            onReiniciar={() => setEtapa("convite")}
          />
        )}
      </AnimatePresence>
    </main>
  );
}