import { motion } from "motion/react";

export function TelaCarregamento({ mensagem = "Aquecendo a água..." }) {
  const graos = [0, 1, 2];

  return (
    <motion.div
      className="tela-carregamento"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grupo-graos" aria-hidden="true">
        {graos.map((index) => (
          <motion.svg
            key={index}
            width="28"
            height="36"
            viewBox="0 0 28 36"
            animate={{
              y: [0, -14, 0],
              rotate: [0, index === 1 ? 8 : -8, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              delay: index * 0.25,
              ease: "easeInOut"
            }}
          >
            {/* Corpo oval do grão de café */}
            <ellipse
              cx="14"
              cy="18"
              rx="10"
              ry="14"
              fill="#6F4E37"
              stroke="#E6D5C3"
              strokeWidth="1.8"
            />
            {/* Fenda central curva do grão */}
            <path
              d="M14 6 Q10 18 14 30"
              fill="none"
              stroke="#2A1D15"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </motion.svg>
        ))}
      </div>

      <p className="texto-carregamento">{mensagem}</p>
    </motion.div>
  );
}