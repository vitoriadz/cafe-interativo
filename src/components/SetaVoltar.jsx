import { motion } from "motion/react";

export function SetaVoltar({ onClick, texto = "Voltar" }) {
  return (
    <motion.button
      className="botao-voltar-seta"
      onClick={onClick}
      aria-label={texto}
      whileHover={{ x: -4 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        style={{ transform: "rotate(90deg)" }}
      >
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M6 14l6 6 6-6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.45"
        />
      </svg>
      <span>{texto}</span>
    </motion.button>
  );
}