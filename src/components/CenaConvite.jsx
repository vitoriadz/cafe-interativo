import { motion } from "motion/react";

export function CenaConvite({ onAvancar }) {
  return (
    <motion.div
      className="cena"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="subtitulo-topo">Cultura Brasileira à luz da Cultura Chinesa</span>
      <h1 className="titulo-convite">Vamos tomar um cafézinho?</h1>

      <motion.button
        onClick={onAvancar}
        className="botao-seta"
        aria-label="Entrar na pausa"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 14l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
        </svg>
      </motion.button>
    </motion.div>
  );
}