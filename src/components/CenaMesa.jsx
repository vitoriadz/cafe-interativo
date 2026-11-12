import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BILHETES_BOLO, QUADROS_CONCEITOS } from "../data/conteudos";
import { SetaVoltar } from "./SetaVoltar"

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
  <SetaVoltar onClick={onVoltar} texto="Voltar" />
</div>

      <p className="instrucao-sutil">
        Toque nos quadros na parede ou na fatia de bolo sobre a mesa
      </p>

      <svg width="640" height="340" viewBox="0 0 640 340" className="ilustracao-svg">
        <defs>
          <linearGradient id="grad-parede-interna" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2A221E" />
            <stop offset="100%" stopColor="#1C1714" />
          </linearGradient>
          <linearGradient id="grad-ceu-janela" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3D314A" />
            <stop offset="65%" stopColor="#8A5A44" />
            <stop offset="100%" stopColor="#D99B66" />
          </linearGradient>
          <linearGradient id="grad-mesa-madeira" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5C4438" />
            <stop offset="100%" stopColor="#3B2B23" />
          </linearGradient>
          <linearGradient id="grad-massa-bolo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E6B47C" />
            <stop offset="100%" stopColor="#C88D55" />
          </linearGradient>
        </defs>

        {/* Parede interna da sala */}
        <rect
          x="18"
          y="16"
          width="604"
          height="295"
          rx="14"
          fill="url(#grad-parede-interna)"
          stroke="#4A3F37"
          strokeWidth="2"
        />

        {/* Sanca no topo da parede */}
        <line x1="28" y1="34" x2="612" y2="34" stroke="#3D332D" strokeWidth="2" />

        {/* Lambris (meia-parede de madeira) */}
        <rect x="20" y="216" width="600" height="94" fill="#221B17" />
        <line x1="20" y1="216" x2="620" y2="216" stroke="#4A3F37" strokeWidth="2" />
        <line x1="20" y1="222" x2="620" y2="222" stroke="#332A24" strokeWidth="1" />

        {/* ==================== JANELINHA ESQUERDA ==================== */}
        <g>
          <polygon points="44,185 116,185 136,295 28,295" fill="#D9A066" opacity="0.06" />
          <rect x="44" y="68" width="72" height="114" rx="4" fill="url(#grad-ceu-janela)" />
          <motion.circle
            cx="66"
            cy="88"
            r="1.4"
            fill="#FFFDF9"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut" }}
          />
          <line x1="80" y1="68" x2="80" y2="182" stroke="#4E3B31" strokeWidth="3.5" />
          <line x1="44" y1="125" x2="116" y2="125" stroke="#4E3B31" strokeWidth="3.5" />
          <rect x="42" y="66" width="76" height="118" rx="4" fill="none" stroke="#6B5649" strokeWidth="3" />
          <rect x="36" y="182" width="88" height="7" rx="3" fill="#5C4438" stroke="#8C6D59" strokeWidth="1" />
          <path d="M40 64 Q64 118 46 184 L38 184 Z" fill="#4A372E" stroke="#6B5649" strokeWidth="1" />
          <line x1="34" y1="62" x2="126" y2="62" stroke="#A68A73" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* ==================== JANELINHA DIREITA ==================== */}
        <g>
          <polygon points="524,185 596,185 612,295 504,295" fill="#D9A066" opacity="0.06" />
          <rect x="524" y="68" width="72" height="114" rx="4" fill="url(#grad-ceu-janela)" />
          <motion.circle
            cx="574"
            cy="92"
            r="1.4"
            fill="#FFFDF9"
            animate={{ opacity: [0.2, 0.85, 0.2] }}
            transition={{ repeat: Infinity, duration: 4.1, delay: 1, ease: "easeInOut" }}
          />
          <line x1="560" y1="68" x2="560" y2="182" stroke="#4E3B31" strokeWidth="3.5" />
          <line x1="524" y1="125" x2="596" y2="125" stroke="#4E3B31" strokeWidth="3.5" />
          <rect x="522" y="66" width="76" height="118" rx="4" fill="none" stroke="#6B5649" strokeWidth="3" />
          <rect x="516" y="182" width="88" height="7" rx="3" fill="#5C4438" stroke="#8C6D59" strokeWidth="1" />
          <path d="M600 64 Q576 118 594 184 L602 184 Z" fill="#4A372E" stroke="#6B5649" strokeWidth="1" />
          <line x1="514" y1="62" x2="606" y2="62" stroke="#A68A73" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* ==================== QUADRO 1: Rito e Presença - Li (禮) ==================== */}
        <motion.g
          onClick={() => setQuadroAberto(QUADROS_CONCEITOS[0])}
          style={{ cursor: "pointer" }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <circle cx="192" cy="64" r="2.2" fill="#D9A066" />
          <path d="M176 76 L192 64 L208 76" fill="none" stroke="#8C6D59" strokeWidth="1.2" />
          <rect x="148" y="76" width="88" height="112" rx="5" fill="#2E2723" stroke="#D9A066" strokeWidth="2.5" />
          <rect x="154" y="82" width="76" height="100" rx="2" fill="none" stroke="#6B5649" strokeWidth="1" />

         
          <svg x="167" y="96" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#F5EBE0" strokeWidth="1.6">
            <path d="M12 3v18M5 8h14M7 13h10M4 19h16" strokeLinecap="round" />
          </svg>

          <text x="192" y="168" textAnchor="middle" fill="#BFA995" fontSize="9.5">
            I. Rito e Li
          </text>
        </motion.g>

        {/* ==================== QUADRO 2: A Pausa Afetiva ==================== */}
        <motion.g
          onClick={() => setQuadroAberto(QUADROS_CONCEITOS[1])}
          style={{ cursor: "pointer" }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <circle cx="320" cy="64" r="2.2" fill="#D9A066" />
          <path d="M304 76 L320 64 L336 76" fill="none" stroke="#8C6D59" strokeWidth="1.2" />
          <rect x="276" y="76" width="88" height="112" rx="5" fill="#2E2723" stroke="#D9A066" strokeWidth="2.5" />
          <rect x="282" y="82" width="76" height="100" rx="2" fill="none" stroke="#6B5649" strokeWidth="1" />

         <image
  href={`${import.meta.env.BASE_URL}quadroII.svg`}
  x="295"
  y="96"
  width="50"
  height="50"
  className="svg-quadro"
  stroke="#F5EBE0" strokeWidth="1.6"
/>

          <text x="320" y="168" textAnchor="middle" fill="#BFA995" fontSize="9.5">
            II. Pausa Afetiva
          </text>
        </motion.g>

        {/* ==================== QUADRO 3: O Fazer Tecnológico Consciente ==================== */}
        <motion.g
          onClick={() => setQuadroAberto(QUADROS_CONCEITOS[2])}
          style={{ cursor: "pointer" }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <circle cx="448" cy="64" r="2.2" fill="#D9A066" />
          <path d="M432 76 L448 64 L464 76" fill="none" stroke="#8C6D59" strokeWidth="1.2" />
          <rect x="404" y="76" width="88" height="112" rx="5" fill="#2E2723" stroke="#D9A066" strokeWidth="2.5" />
          <rect x="410" y="82" width="76" height="100" rx="2" fill="none" stroke="#6B5649" strokeWidth="1" />

<image
  href={`${import.meta.env.BASE_URL}quadroIII.svg`}
x="423"
  y="96"
  width="50"
  height="50"
  className="svg-quadro"
  stroke="#F5EBE0" strokeWidth="1.6"
/>
          <text x="448" y="168" textAnchor="middle" fill="#BFA995" fontSize="9.5">
            III. Tecnologia
          </text>
        </motion.g>

        {/* ==================== MESA DE MADEIRA DA SALA (SEM PÉS) ==================== */}
        <rect
          x="12"
          y="293"
          width="616"
          height="26"
          rx="8"
          fill="url(#grad-mesa-madeira)"
          stroke="#E6D5C3"
          strokeWidth="1.8"
        />
        <line x1="55" y1="306" x2="250" y2="306" stroke="#8C6244" strokeWidth="1.2" opacity="0.5" />
        <line x1="360" y1="306" x2="575" y2="306" stroke="#8C6244" strokeWidth="1.2" opacity="0.5" />

        {/* Caminho de mesa central */}
        <path d="M175 293 H465 L476 319 H164 Z" fill="#F5EBE0" opacity="0.09" />

        {/* ==================== XÍCARA DE CAFÉ DETALHADA ==================== */}
        <g>
          <ellipse cx="242" cy="290" rx="42" ry="5.5" fill="#C8B6A6" stroke="#E6D5C3" strokeWidth="1.2" />
          <ellipse cx="242" cy="289" rx="26" ry="2.5" fill="#9E8B7B" />

          <path
            d="M214 250 H270 V279 C270 289 214 289 214 279 Z"
            fill="#2A2421"
            stroke="#F5EBE0"
            strokeWidth="2.5"
          />
          <path d="M215 264 H269" stroke="#D9A066" strokeWidth="1.8" opacity="0.7" />
          <path
            d="M270 256 C286 256 286 277 270 277"
            fill="none"
            stroke="#F5EBE0"
            strokeWidth="2.5"
          />
          <ellipse cx="242" cy="251" rx="25" ry="3.2" fill="#5C3A21" />
          <ellipse cx="242" cy="251" rx="18" ry="1.8" fill="#C89F7D" opacity="0.7" />
          <path d="M222 256 V276" stroke="#FFFDF9" strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />

          {/* Curvinhas de fumaça */}
          <motion.path
            d="M234 242 C228 233 240 225 234 215 C230 208 238 200 234 194"
            fill="none"
            stroke="#F5EBE0"
            strokeWidth="1.8"
            strokeLinecap="round"
            animate={{ opacity: [0, 0.75, 0], y: [3, -10] }}
            transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }}
          />
          <motion.path
            d="M250 242 C256 232 244 224 250 214 C254 207 246 199 250 193"
            fill="none"
            stroke="#F5EBE0"
            strokeWidth="1.8"
            strokeLinecap="round"
            animate={{ opacity: [0, 0.65, 0], y: [3, -12] }}
            transition={{ repeat: Infinity, duration: 3.8, delay: 1.6, ease: "easeInOut" }}
          />
        </g>

        {/* ==================== FATIA DE BOLO CASEIRO COM BILHETE ==================== */}
        <motion.g
          onClick={abrirBilheteBolo}
          style={{ cursor: "pointer" }}
          whileHover={{ scale: 1.06, y: -3 }}
          whileTap={{ scale: 0.96 }}
        >
          <ellipse cx="398" cy="290" rx="56" ry="6.5" fill="#C8B6A6" stroke="#E6D5C3" strokeWidth="1.2" />
          <ellipse cx="398" cy="289" rx="38" ry="3.2" fill="#9E8B7B" />

          <path
            d="M356 286 L432 286 L432 244 Z"
            fill="url(#grad-massa-bolo)"
            stroke="#F5EBE0"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* Camada de recheio */}
          <path d="M386 269 L432 269 L432 264 L395 264 Z" fill="#6F4E37" />

          {/* Textura fofinha da massa */}
          <circle cx="406" cy="278" r="1.3" fill="#8C5828" opacity="0.55" />
          <circle cx="418" cy="276" r="1.1" fill="#8C5828" opacity="0.55" />
          <circle cx="416" cy="257" r="1.2" fill="#8C5828" opacity="0.55" />

          {/* Cobertura no topo */}
          <path
            d="M355 286 L432 244 L426 237 L351 280 Z"
            fill="#5C3A21"
            stroke="#F5EBE0"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M396 261 C396 267 401 267 401 259 M415 251 C415 258 420 258 420 248"
            fill="none"
            stroke="#5C3A21"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Bilhete dobrado aparecendo no bolo */}
          <motion.g
            animate={{ rotate: [-14, -8, -14], y: [0, -1.5, 0] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
          >
            <rect
              x="408"
              y="256"
              width="20"
              height="9"
              rx="1.5"
              fill="#FFFDF9"
              stroke="#8C6244"
              strokeWidth="1"
            />
            <line x1="411" y1="260.5" x2="425" y2="260.5" stroke="#D9A066" strokeWidth="1" />
          </motion.g>
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

      {/* Modal do Bilhete Oculto no Bolo */}
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

      {/* Modal dos Quadros Conceituais */}
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