import { useState } from "react";
import { motion } from "motion/react";
import { SetaVoltar } from "./SetaVoltar"

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
    }, 3600);
  };

  return (
    <motion.div
      className="cena"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    >
   <div className="barra-navegacao-topo">
  <SetaVoltar onClick={onVoltar} texto="Voltar" />
</div>

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
            ? "Toque no botão luminoso da cafeteira para iniciar"
            : "Toque no bule para servir lentamente"
          : !pronto
          ? "Acompanhe o tempo do café..."
          : "A xícara está cheia e aromática."}
      </p>

      {/* ==================== OPÇÃO A: CAFETEIRA ELÉTRICA DETALHADA ==================== */}
      {modo === "cafeteira" && (
        <svg width="320" height="330" viewBox="0 0 320 330" className="ilustracao-svg">
          <defs>
            <linearGradient id="grad-corpo-cafeteira" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#352D29" />
              <stop offset="100%" stopColor="#211C19" />
            </linearGradient>
            <linearGradient id="grad-cafe" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7A5236" />
              <stop offset="100%" stopColor="#432818" />
            </linearGradient>
          </defs>

          {/* Sombra na bancada */}
          <ellipse cx="160" cy="306" rx="108" ry="8" fill="#0D0A09" opacity="0.65" />

          {/* Pés da cafeteira */}
          <rect x="82" y="294" width="24" height="9" rx="4" fill="#181412" />
          <rect x="214" y="294" width="24" height="9" rx="4" fill="#181412" />

          {/* Base inferior e bandeja de gotejamento */}
          <rect x="68" y="264" width="184" height="32" rx="10" fill="url(#grad-corpo-cafeteira)" stroke="#E6D5C3" strokeWidth="2" />
          <line x1="92" y1="264" x2="228" y2="264" stroke="#A68A73" strokeWidth="3" strokeLinecap="round" />

          {/* Coluna traseira e topo da cafeteira */}
          <path
            d="M72 48 C72 34 84 26 98 26 H222 C236 26 248 34 248 48 V108 H72 Z"
            fill="url(#grad-corpo-cafeteira)"
            stroke="#E6D5C3"
            strokeWidth="2"
          />
          <rect x="72" y="96" width="44" height="170" fill="url(#grad-corpo-cafeteira)" stroke="#E6D5C3" strokeWidth="2" />

          {/* Reservatório de água lateral com nível baixando */}
          <rect x="80" y="114" width="28" height="134" rx="6" fill="#181412" stroke="#6B5649" strokeWidth="1.2" />
          <motion.rect
            x="82"
            width="24"
            rx="4"
            fill="#6FA3B8"
            opacity="0.32"
            initial={{ y: 124, height: 122 }}
            animate={{
              y: iniciado ? 215 : 124,
              height: iniciado ? 31 : 122
            }}
            transition={{ duration: 3.1, ease: "easeInOut" }}
          />
          {/* Marcações de nível de água */}
          <line x1="84" y1="145" x2="92" y2="145" stroke="#E6D5C3" strokeWidth="1" opacity="0.5" />
          <line x1="84" y1="180" x2="92" y2="180" stroke="#E6D5C3" strokeWidth="1" opacity="0.5" />
          <line x1="84" y1="215" x2="92" y2="215" stroke="#E6D5C3" strokeWidth="1" opacity="0.5" />

          {/* Detalhe metálico superior */}
          <rect x="92" y="38" width="136" height="8" rx="4" fill="#A68A73" opacity="0.45" />

          {/* Porta-filtro cônico */}
          <path d="M138 108 H212 L198 142 H152 Z" fill="#2A2320" stroke="#E6D5C3" strokeWidth="2" />
          <path d="M210 116 H234 C238 116 238 124 234 124 H207" fill="#3B302A" stroke="#E6D5C3" strokeWidth="1.5" />
          {/* Duplo bico de extração */}
          <rect x="166" y="142" width="6" height="11" rx="2" fill="#A68A73" />
          <rect x="178" y="142" width="6" height="11" rx="2" fill="#A68A73" />

          {/* Visor digital com pulso suave quando ligada */}
          <rect x="135" y="56" width="54" height="26" rx="6" fill="#161210" stroke="#6B5649" strokeWidth="1.5" />
          {iniciado ? (
            <motion.path
              d="M144 70 Q153 62 162 70 T180 70"
              fill="none"
              stroke="#D9A066"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            />
          ) : (
            <circle cx="162" cy="69" r="2.5" fill="#6B5649" />
          )}

          {/* Botão clicável com halo pulsante antes do clique */}
          <motion.g
            onClick={iniciarPreparo}
            style={{ cursor: iniciado ? "default" : "pointer" }}
            whileHover={!iniciado ? { scale: 1.12 } : {}}
            whileTap={!iniciado ? { scale: 0.92 } : {}}
          >
            {!iniciado && (
              <motion.circle
                cx="216"
                cy="69"
                r="16"
                fill="none"
                stroke="#D97757"
                strokeWidth="1.5"
                animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
              />
            )}
            <circle
              cx="216"
              cy="69"
              r="12"
              fill={iniciado ? "#7FB069" : "#D97757"}
              stroke="#E6D5C3"
              strokeWidth="2"
            />
            <path d="M216 63 V68" stroke="#FFFDF9" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M212 65.5 A5 5 0 1 0 220 65.5" fill="none" stroke="#FFFDF9" strokeWidth="1.6" strokeLinecap="round" />
          </motion.g>

          {/* Fios de café caindo */}
          {iniciado && !pronto && (
            <g>
              <motion.line
                x1="169"
                y1="153"
                x2="169"
                y2="232"
                stroke="#6F4E37"
                strokeWidth="3.2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "easeIn" }}
              />
              <motion.line
                x1="181"
                y1="153"
                x2="181"
                y2="232"
                stroke="#6F4E37"
                strokeWidth="3.2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeIn" }}
              />
            </g>
          )}

          {/* Pires da xícara */}
          <ellipse cx="175" cy="260" rx="44" ry="5" fill="#C8B6A6" />

          {/* Líquido enchendo dentro da xícara */}
          <clipPath id="recorte-xicara-a">
            <path d="M144 210 H206 V246 C206 258 144 258 144 246 Z" />
          </clipPath>
          <g clipPath="url(#recorte-xicara-a)">
            <motion.rect
              x="140"
              width="70"
              height="55"
              fill="url(#grad-cafe)"
              initial={{ y: 260 }}
              animate={{ y: iniciado ? 216 : 260 }}
              transition={{ duration: 3.1, delay: 0.4, ease: "easeInOut" }}
            />
            {/* Crema / espuma dourada no topo do café */}
            {iniciado && (
              <motion.ellipse
                cx="175"
                rx="30"
                ry="3.5"
                fill="#C89F7D"
                initial={{ cy: 260, opacity: 0 }}
                animate={{ cy: 216, opacity: 0.85 }}
                transition={{ duration: 3.1, delay: 0.4, ease: "easeInOut" }}
              />
            )}
          </g>

          {/* Xícara de cerâmica detalhada */}
          <path d="M144 210 H206 V246 C206 258 144 258 144 246 Z" fill="none" stroke="#F5EBE0" strokeWidth="2.8" />
          {/* Alça dupla elegante */}
          <path d="M206 218 C224 218 224 242 206 242" fill="none" stroke="#F5EBE0" strokeWidth="2.8" />
          {/* Reflexo sutil na borda */}
          <path d="M152 218 V242" stroke="#FFFDF9" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />

          {/* Fumaça em curvinhas suaves subindo + brilhos de aroma */}
          {pronto && (
            <g>
              <motion.path
                d="M164 202 C156 192 172 182 164 170 C158 161 168 152 163 144"
                fill="none"
                stroke="#F5EBE0"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ opacity: 0, pathLength: 0.2, y: 4 }}
                animate={{
                  opacity: [0, 0.75, 0],
                  pathLength: [0.3, 1, 1],
                  y: [4, -12]
                }}
                transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut" }}
              />
              <motion.path
                d="M184 202 C192 191 176 181 184 169 C190 160 180 151 185 143"
                fill="none"
                stroke="#F5EBE0"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ opacity: 0, pathLength: 0.2, y: 4 }}
                animate={{
                  opacity: [0, 0.65, 0],
                  pathLength: [0.3, 1, 1],
                  y: [4, -14]
                }}
                transition={{ repeat: Infinity, duration: 3.6, delay: 1.4, ease: "easeInOut" }}
              />

              {/* Partículas leves de aroma flutuando */}
              {[
                { cx: 132, cy: 185, delay: 0.2 },
                { cx: 218, cy: 178, delay: 1.1 },
                { cx: 175, cy: 132, delay: 2.0 }
              ].map((p, idx) => (
                <motion.circle
                  key={idx}
                  cx={p.cx}
                  cy={p.cy}
                  r="2.2"
                  fill="#D9A066"
                  animate={{
                    y: [0, -14, 0],
                    opacity: [0.15, 0.85, 0.15],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.2,
                    delay: p.delay,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </g>
          )}
        </svg>
      )}

      {/* ==================== OPÇÃO B: BULE MANUAL DETALHADO ==================== */}
      {modo === "bule" && (
        <svg width="350" height="330" viewBox="0 0 350 330" className="ilustracao-svg">
          <defs>
            <linearGradient id="grad-bule" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5C4438" />
              <stop offset="100%" stopColor="#2F231D" />
            </linearGradient>
            <linearGradient id="grad-cafe-b" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7A5236" />
              <stop offset="100%" stopColor="#432818" />
            </linearGradient>
          </defs>

          {/* Sombra na mesa */}
          <ellipse cx="175" cy="296" rx="125" ry="8" fill="#0D0A09" opacity="0.65" />

          {/* Bule de cerâmica/ágata detalhado e clicável */}
          <motion.g
            onClick={iniciarPreparo}
            style={{ cursor: iniciado ? "default" : "pointer", transformOrigin: "235px 155px" }}
            animate={{
              rotate: iniciado && !pronto ? -38 : 0,
              x: iniciado && !pronto ? -24 : 0,
              y: iniciado && !pronto ? -12 : 0
            }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            whileHover={!iniciado ? { scale: 1.04, rotate: -3 } : {}}
          >
            {/* Halo sutil de convite ao clique */}
            {!iniciado && (
              <motion.circle
                cx="235"
                cy="155"
                r="58"
                fill="none"
                stroke="#D9A066"
                strokeWidth="1.2"
                strokeDasharray="4 6"
                animate={{ rotate: 360, opacity: [0.25, 0.6, 0.25] }}
                transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
              />
            )}

            {/* Base do bule */}
            <path d="M204 205 H266 L272 214 H198 Z" fill="#261D18" stroke="#E6D5C3" strokeWidth="2" />

            {/* Bojo arredondado do bule */}
            <path
              d="M205 112 C182 135 182 182 204 205 H266 C288 182 288 135 265 112 Z"
              fill="url(#grad-bule)"
              stroke="#E6D5C3"
              strokeWidth="2.3"
            />

            {/* Faixa decorativa artesanal no meio do bule */}
            <path
              d="M191 158 Q235 166 279 158"
              fill="none"
              stroke="#D9A066"
              strokeWidth="2"
              opacity="0.85"
            />

            {/* Brilho curvo na lateral */}
            <path
              d="M258 126 C270 144 270 172 258 190"
              fill="none"
              stroke="#FFFDF9"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.35"
            />

            {/* Colarinho e tampa arredondada */}
            <rect x="203" y="104" width="64" height="9" rx="4" fill="#3B2E27" stroke="#E6D5C3" strokeWidth="2" />
            <path d="M210 104 C214 90 256 90 260 104 Z" fill="#4E3B31" stroke="#E6D5C3" strokeWidth="2" />
            {/* Pegador da tampa */}
            <circle cx="235" cy="86" r="6" fill="#D9A066" stroke="#E6D5C3" strokeWidth="1.8" />

            {/* Alça ergonômica curvada */}
            <path
              d="M272 122 C308 118 310 184 272 186"
              fill="none"
              stroke="#E6D5C3"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Bico pescoço de ganso (curvo e elegante) */}
            <path
              d="M193 166 C168 164 164 126 146 116 L151 110 C172 120 175 152 196 154 Z"
              fill="url(#grad-bule)"
              stroke="#E6D5C3"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
          </motion.g>

          {/* Fio curvo de café saindo do bico inclinado */}
          {iniciado && !pronto && (
            <motion.path
              d="M120 150 Q112 175 114 252"
              fill="none"
              stroke="#6F4E37"
              strokeWidth="4.2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.65, ease: "easeIn" }}
            />
          )}

          {/* Pires da xícara */}
          <ellipse cx="114" cy="285" rx="44" ry="5" fill="#C8B6A6" />

          {/* Líquido enchendo a xícara */}
          <clipPath id="recorte-xicara-b">
            <path d="M84 235 H144 V271 C144 283 84 283 84 271 Z" />
          </clipPath>
          <g clipPath="url(#recorte-xicara-b)">
            <motion.rect
              x="80"
              width="68"
              height="55"
              fill="url(#grad-cafe-b)"
              initial={{ y: 285 }}
              animate={{ y: iniciado ? 242 : 285 }}
              transition={{ duration: 2.8, delay: 0.8, ease: "easeInOut" }}
            />
            {iniciado && (
              <motion.ellipse
                cx="114"
                rx="29"
                ry="3.5"
                fill="#C89F7D"
                initial={{ cy: 285, opacity: 0 }}
                animate={{ cy: 242, opacity: 0.85 }}
                transition={{ duration: 2.8, delay: 0.8, ease: "easeInOut" }}
              />
            )}
          </g>

          {/* Xícara de cerâmica detalhada */}
          <path d="M84 235 H144 V271 C144 283 84 283 84 271 Z" fill="none" stroke="#F5EBE0" strokeWidth="2.8" />
          <path d="M84 243 C66 243 66 267 84 267" fill="none" stroke="#F5EBE0" strokeWidth="2.8" />
          <path d="M136 243 V267" stroke="#FFFDF9" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />

          {/* Fumaça em curvinhas suaves + partículas de aroma */}
          {pronto && (
            <g>
              <motion.path
                d="M104 226 C96 216 112 206 104 194 C98 185 108 176 103 168"
                fill="none"
                stroke="#F5EBE0"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ opacity: 0, pathLength: 0.2, y: 4 }}
                animate={{
                  opacity: [0, 0.75, 0],
                  pathLength: [0.3, 1, 1],
                  y: [4, -12]
                }}
                transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut" }}
              />
              <motion.path
                d="M123 226 C131 215 115 205 123 193 C129 184 119 175 124 167"
                fill="none"
                stroke="#F5EBE0"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ opacity: 0, pathLength: 0.2, y: 4 }}
                animate={{
                  opacity: [0, 0.65, 0],
                  pathLength: [0.3, 1, 1],
                  y: [4, -14]
                }}
                transition={{ repeat: Infinity, duration: 3.6, delay: 1.4, ease: "easeInOut" }}
              />

              {[
                { cx: 74, cy: 210, delay: 0.3 },
                { cx: 154, cy: 204, delay: 1.2 },
                { cx: 114, cy: 158, delay: 2.1 }
              ].map((p, idx) => (
                <motion.circle
                  key={idx}
                  cx={p.cx}
                  cy={p.cy}
                  r="2.2"
                  fill="#D9A066"
                  animate={{
                    y: [0, -14, 0],
                    opacity: [0.15, 0.85, 0.15],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.2,
                    delay: p.delay,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </g>
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
          Entrar na salinha 
        </motion.button>
      )}
    </motion.div>
  );
}