import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { doc, onSnapshot, setDoc, increment } from "firebase/firestore";
import { db } from "./firebase";
import { CenaConvite } from "./components/CenaConvite";
import { CenaPreparo } from "./components/CenaPreparo";
import { CenaMesa } from "./components/CenaMesa";

export default function App() {
  const [etapa, setEtapa] = useState("convite");
  const [totalPausas, setTotalPausas] = useState(0);

  // Escuta o total acumulado no banco em tempo real
  useEffect(() => {
    const docRef = doc(db, "ritual", "contador");
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setTotalPausas(snapshot.data().xicaras || 0);
      }
    });
    return () => unsubscribe();
  }, []);

  // Soma +1 de forma atômica no Firestore quando a pessoa entra na salinha
  const registrarPausaColetiva = async () => {
    setEtapa("mesa");
    try {
      const docRef = doc(db, "ritual", "contador");
      await setDoc(docRef, { xicaras: increment(1) }, { merge: true });
    } catch (erro) {
      console.error("Erro ao registrar pausa:", erro);
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