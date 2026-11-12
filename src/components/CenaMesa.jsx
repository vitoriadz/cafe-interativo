import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BILHETES_BOLO, QUADROS_CONCEITOS } from "../data/conteudos";

export function CenaMesa({ totalPausas, onVoltar, onReiniciar }) {
  const [bilheteAberto, setBilheteAberto] = useState(null);
  const [quadroAberto, setQuadroAberto] = useState(null);

  const abrirBilheteBolo = () => {
    const sorteado =
      BILHETES_BOLO[Math.floor(Math.random() * BILHETES_BOLO.length)];
    setBilheteAberto(sorteado);
  };

  return (
    <motion.div
      className="cena cena-larga"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="barra-navegacao-topo">
        <button className="botao-voltar-topo" onClick={onVoltar}>
          ← Preparar outro café
        </button>
        <button className="botao-voltar-topo" onClick={onReiniciar}>
          Início
        </button>
      </div>

      <p className="instrucao-sutil">
        Clique nos quadros na parede ou na fatia de bolo sobre a mesa
      </p>

      <svg width="560" height="340" viewBox="0 0 560 340" className="ilustracao-svg">
        <rect x="20" y="15" width="520" height="240" rx="14" fill="#231E1B" stroke="#4A3F37" strokeWidth="2" />

        <path d="M20 15 Q78 115 38 245 L20 245 Z" fill="#3B302A" />
        <path d="M540 15 Q482 115 522 245 L540 245 Z" fill="#3B302A" />

        <motion.g
          onClick={() => setQuadroAberto(QUADROS_CONCEITOS[0])}
          style={{ cursor: "pointer" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <rect x="95" y="45" width="95" height="115" rx="4" fill="#2E2723" stroke="#D9A066" strokeWidth="2.5" />
          <text x="142" y="106" textAnchor="middle" fill="#E6D5C3" fontSize="28" fontFamily="serif">
            禮
          </text>
          <text x="142" y="136" textAnchor="middle" fill="#BFA995" fontSize="10">
            I. Rito e Li
          </text>
        </motion.g>

        <motion.g
          onClick={() => setQuadroAberto(QUADROS_CONCEITOS[1])}
          style={{ cursor: "pointer" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <rect x="232" y="45" width="95" height="115" rx="4" fill="#2E2723" stroke="#D9A066" strokeWidth="2.5" />
          <circle cx="280" cy="94" r="18" fill="none" stroke="#E6D5C3" strokeWidth="1.6" />
          <path d="M268 94 Q280 106 292 94" fill="none" stroke="#E6D5C3" strokeWidth="1.6" />
          <text x="280" y="136" textAnchor="middle" fill="#BFA995" fontSize="10">
            II. Pausa Afetiva
          </text>
        </motion.g>

        <motion.g
          onClick={() => setQuadroAberto(QUADROS_CONCEITOS[2])}
          style={{ cursor: "pointer" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <rect x="370" y="45" width="95" height="115" rx="4" fill="#2E2723" stroke="#D9A066" strokeWidth="2.5" />
          <path d="M395 105 Q417 75 440 105" fill="none" stroke="#E6D5C3" strokeWidth="1.6" />
          <circle cx="417" cy="95" r="4" fill="#D9A066" />
          <text x="417" y="136" textAnchor="middle" fill="#BFA995" fontSize="10">
            III. Tecnologia
          </text>
        </motion.g>

        <rect x="10" y="245" width="540" height="24" rx="6" fill="#4E3B31" />

        <g>
          <ellipse cx="205" cy="242" rx="30" ry="5" fill="#C8B6A6" />
          <path d="M185 212 H225 V236 C225 242 185 242 185 236 Z" fill="#F5EBE0" />
          <path d="M225 218 C235 218 235 231 225 231" fill="none" stroke="#F5EBE0" strokeWidth="2.5" />
          <motion.path
            d="M200 202 Q195 190 202 180 M210 202 Q215 190 208 180"
            fill="none"
            stroke="#F5EBE0"
            strokeWidth="1.6"
            strokeLinecap="round"
            animate={{ opacity: [0.2, 0.7, 0.2], y: [-2, -8, -2] }}
            transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut" }}
          />
        </g>

        <motion.g
          onClick={abrirBilheteBolo}
          style={{ cursor: "pointer" }}
          whileHover={{ scale: 1.07, y: -3 }}
          whileTap={{ scale: 0.96 }}
        >
          <ellipse cx="345" cy="242" rx="46" ry="6" fill="#C8B6A6" />
          <path d="M312 238 L372 238 L372 204 Z" fill="#D9A066" stroke="#F5EBE0" strokeWidth="1.5" />
          <path d="M312 238 L372 204 L366 198 L308 233 Z" fill="#6F4E37" />
          <rect
            x="352"
            y="214"
            width="16"
            height="7"
            rx="1"
            transform="rotate(-18 352 214)"
            fill="#FFFDF9"
            stroke="#A68A73"
            strokeWidth="0.8"
          />
        </motion.g>
      </svg>

      {/* Contador simbólico de pausas compartilhadas */}
      <motion.div
        className="contador-simbolico"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <span className="ponto-ritual" />
        <span>
          {totalPausas <= 1
            ? "1ª xícara servida neste espaço de pausa"
            : `Esta é a ${totalPausas}ª xícara servida neste rito coletivo`}
        </span>
      </motion.div>

      <AnimatePresence>
        {bilheteAberto && (
          <motion.div
            className="overlay"
            onClick={() => setBilheteAberto(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="cartao-bilhete"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="etiqueta">Bilhete encontrado no bolo</span>
              <p className="texto-bilhete">"{bilheteAberto}"</p>
              <button className="botao-fechar" onClick={() => setBilheteAberto(null)}>
                Guardar lembrança
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {quadroAberto && (
          <motion.div
            className="overlay"
            onClick={() => setQuadroAberto(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="cartao-conceito"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="etiqueta">{quadroAberto.numero}</span>
              <h2>{quadroAberto.titulo}</h2>
              <h3 className="subtitulo-modal">{quadroAberto.subtitulo}</h3>
              <p className="texto-modal">{quadroAberto.texto}</p>
              <button className="botao-fechar" onClick={() => setQuadroAberto(null)}>
                Voltar para a salinha
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}