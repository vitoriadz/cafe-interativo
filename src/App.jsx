import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { doc, onSnapshot, setDoc, increment } from "firebase/firestore";
import { db } from "./firebase";
import { TelaCarregamento } from "./components/TelaCarregamento";
import { CenaConvite } from "./components/CenaConvite";
import { CenaPreparo } from "./components/CenaPreparo";
import { CenaMesa } from "./components/CenaMesa";

export default function App() {
  const [etapa, setEtapa] = useState("convite");
  const [carregando, setCarregando] = useState(true);
  const [mensagemEspera, setMensagemEspera] = useState("Preparando o espaço...");
  const [totalPausas, setTotalPausas] = useState(0);
  const [tocando, setTocando] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCarregando(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}musica.mp3`);
    audio.loop = true;
    audio.volume = 0.25;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const docRef = doc(db, "ritual", "contador");
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setTotalPausas(snapshot.data().xicaras || 0);
      }
    });
    return () => unsubscribe();
  }, []);

  const mudarCenaComPausa = (novaEtapa, texto = "Um instante...") => {
    setMensagemEspera(texto);
    setCarregando(true);
    setTimeout(() => {
      setEtapa(novaEtapa);
      setCarregando(false);
    }, 1100);
  };

  const entrarNaPausa = () => {
    if (audioRef.current && !tocando) {
      audioRef.current
        .play()
        .then(() => setTocando(true))
        .catch(() => {});
    }
    mudarCenaComPausa("preparo", "Moendo os grãos...");
  };

  const alternarMusica = () => {
    if (!audioRef.current) return;
    if (tocando) {
      audioRef.current.pause();
      setTocando(false);
    } else {
      audioRef.current
        .play()
        .then(() => setTocando(true))
        .catch(() => {});
    }
  };

  const registrarPausaColetiva = async () => {
    mudarCenaComPausa("mesa", "Servindo na salinha...");
    try {
      const docRef = doc(db, "ritual", "contador");
      await setDoc(docRef, { xicaras: increment(1) }, { merge: true });
    } catch (erro) {
      console.error("Erro ao registrar pausa:", erro);
    }
  };

  return (
    <main className="palco">
      {/* Ícone Home fixo no canto superior esquerdo */}
      {!carregando && etapa !== "convite" && (
        <motion.button
          className="botao-home-fixo"
          onClick={() => setEtapa("convite")}
          aria-label="Voltar ao início"
          title="Início"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 10.5L12 3l9 7.5" />
            <path d="M5 9.5V20h14V9.5" />
            <path d="M9.5 20v-6h5v6" />
          </svg>
        </motion.button>
      )}

      {/* Botão discreto de som fixo no canto superior direito */}
      <button
        className="botao-som"
        onClick={alternarMusica}
        aria-label={tocando ? "Pausar música" : "Tocar música"}
      >
        {tocando ? "♪ Som ligado" : "♪ Som pausado"}
      </button>

      <AnimatePresence mode="wait">
        {carregando ? (
          <TelaCarregamento key="loading" mensagem={mensagemEspera} />
        ) : etapa === "convite" ? (
          <CenaConvite key="convite" onAvancar={entrarNaPausa} />
        ) : etapa === "preparo" ? (
          <CenaPreparo
            key="preparo"
            onVoltar={() => setEtapa("convite")}
            onConcluir={registrarPausaColetiva}
          />
        ) : (
          <CenaMesa
            key="mesa"
            totalPausas={totalPausas}
            onVoltar={() => setEtapa("preparo")}
          />
        )}
      </AnimatePresence>
    </main>
  );
}