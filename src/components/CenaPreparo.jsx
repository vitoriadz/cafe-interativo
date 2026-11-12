import { useState } from "react";
import { motion } from "motion/react";

export function CenaPreparo({ onVoltar, onConcluir }) {
  const [modo, setModo] = useState("cafeteira");
  const [iniciado, setIniciado] = useState(false);
  const [pronto, setPronto] = useState(false);

  const trocarModo = (novoModo) => {
    if (iniciado) return;
    setModo(novoModo);
  };

  const iniciarPreparo = () => {
    if (iniciado) return;
    setIniciado(true);
    setTimeout(() => {
      setPronto(true);
    }, 3400);
  };

  return (
    <motion.div
      className="cena"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <button className="botao-voltar-topo" onClick={onVoltar}>
        ← Voltar
      </button>

      {!iniciado && (
        <div className="seletor-modo">
          <button
            className={`aba-modo ${modo === "cafeteira" ? "ativa" : ""}`}
            onClick={() => trocarModo("cafeteira")}
          >
            Cafeteira elétrica
          </button>
          <button
            className={`aba-modo ${modo === "bule" ? "ativa" : ""}`}
            onClick={() => trocarModo("bule")}
          >
            Bule manual
          </button>
        </div>
      )}

      <p className="instrucao-sutil">
        {!iniciado
          ? modo === "cafeteira"
            ? "Clique no botão da cafeteira para iniciar"
            : "Clique no bule para servir lentamente"
          : !pronto
          ? "Acompanhe o tempo do café..."
          : "A xícara está cheia."}
      </p>

      {modo === "cafeteira" && (
        <svg width="280" height="300" viewBox="0 0 280 300" className="ilustracao-svg">
          <rect x="60" y="30" width="160" height="230" rx="18" fill="#2A2421" stroke="#E6D5C3" strokeWidth="2.5" />
          <rect x="80" y="95" width="120" height="135" rx="8" fill="#1B1715" />
          <rect x="128" y="95" width="24" height="16" rx="4" fill="#A68A73" />

          <motion.g
            onClick={iniciarPreparo}
            style={{ cursor: iniciado ? "default" : "pointer" }}
            whileHover={!iniciado ? { scale: 1.15 } : {}}
            whileTap={!iniciado ? { scale: 0.9 } : {}}
          >
            <circle
              cx="192"
              cy="62"
              r="12"
              fill={iniciado ? "#7FB069" : "#D97757"}
              stroke="#E6D5C3"
              strokeWidth="2"
            />
          </motion.g>

          {iniciado && !pronto && (
            <motion.line
              x1="140"
              y1="111"
              x2="140"
              y2="195"
              stroke="#6F4E37"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeIn" }}
            />
          )}

          <clipPath id="recorte-xicara-a">
            <path d="M112 175 H168 V212 C168 222 112 222 112 212 Z" />
          </clipPath>
          <g clipPath="url(#recorte-xicara-a)">
            <motion.rect
              x="110"
              width="60"
              height="50"
              fill="#5C3A21"
              initial={{ y: 225 }}
              animate={{ y: iniciado ? 182 : 225 }}
              transition={{ duration: 2.9, delay: 0.4, ease: "easeInOut" }}
            />
          </g>

          <path d="M112 175 H168 V212 C168 222 112 222 112 212 Z" fill="none" stroke="#F5EBE0" strokeWidth="3" />
          <path d="M168 183 C182 183 182 205 168 205" fill="none" stroke="#F5EBE0" strokeWidth="3" />

          {pronto && (
            <motion.path
              d="M132 162 Q126 148 134 136 M148 162 Q154 148 146 136"
              fill="none"
              stroke="#F5EBE0"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: [0, 0.7, 0], y: -10 }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
          )}
        </svg>
      )}

      {modo === "bule" && (
        <svg width="320" height="300" viewBox="0 0 320 300" className="ilustracao-svg">
          <motion.g
            onClick={iniciarPreparo}
            style={{ cursor: iniciado ? "default" : "pointer", transformOrigin: "210px 110px" }}
            animate={{ rotate: iniciado && !pronto ? -32 : 0, x: iniciado && !pronto ? -18 : 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={!iniciado ? { scale: 1.04 } : {}}
          >
            <path
              d="M180 75 H240 L252 145 C252 155 168 155 168 145 Z"
              fill="#3B302A"
              stroke="#E6D5C3"
              strokeWidth="2.5"
            />
            <ellipse cx="210" cy="75" rx="30" ry="6" fill="#A68A73" />
            <circle cx="210" cy="66" r="5" fill="#E6D5C3" />
            <path d="M244 88 C268 88 268 130 248 130" fill="none" stroke="#E6D5C3" strokeWidth="3" />
            <path d="M176 115 L145 92 L152 86 L178 102" fill="#3B302A" stroke="#E6D5C3" strokeWidth="2.5" />
          </motion.g>

          {iniciado && !pronto && (
            <motion.path
              d="M132 108 Q122 150 122 215"
              fill="none"
              stroke="#6F4E37"
              strokeWidth="4.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeIn" }}
            />
          )}

          <clipPath id="recorte-xicara-b">
            <path d="M92 195 H152 V235 C152 246 92 246 92 235 Z" />
          </clipPath>
          <g clipPath="url(#recorte-xicara-b)">
            <motion.rect
              x="90"
              width="65"
              height="55"
              fill="#5C3A21"
              initial={{ y: 248 }}
              animate={{ y: iniciado ? 202 : 248 }}
              transition={{ duration: 2.6, delay: 0.8, ease: "easeInOut" }}
            />
          </g>

          <path d="M92 195 H152 V235 C152 246 92 246 92 235 Z" fill="none" stroke="#F5EBE0" strokeWidth="3" />
          <path d="M92 204 C76 204 76 228 92 228" fill="none" stroke="#F5EBE0" strokeWidth="3" />

          {pronto && (
            <motion.path
              d="M114 182 Q108 168 116 156 M130 182 Q136 168 128 156"
              fill="none"
              stroke="#F5EBE0"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: [0, 0.7, 0], y: -10 }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
          )}
        </svg>
      )}

      {pronto && (
        <motion.button
          className="botao-avancar"
          onClick={onConcluir}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Entrar na salinha →
        </motion.button>
      )}
    </motion.div>
  );
}