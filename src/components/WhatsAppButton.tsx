import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "5567992009689"; // Seu número configurado
  const defaultText = encodeURIComponent("Olá, vi o seu portfólio e gostaria de conversar!");

  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${defaultText}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:bg-[#20bd5a] transition-all hover:scale-110 duration-300"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1 
      }}
      whileHover={{ y: -5 }}
      aria-label="Contato pelo WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      {/* Pulse effect */}
      <span className="absolute w-full h-full rounded-full bg-[#25D366] opacity-40 animate-ping -z-10" />
    </motion.a>
  );
};

export default WhatsAppButton;
