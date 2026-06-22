import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Instagram, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactInfo = [
  { icon: Mail, label: "Email", value: "ericksond10@gmail.com", href: "mailto:ericksond10@gmail.com" },
  { icon: Phone, label: "Telefone", value: "+55 (67) 99200-9689", href: "https://wa.me/5567992009689" },
  { icon: MapPin, label: "Localização", value: "Ponta Porã - MS, Brasil", href: null },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/EricksonDutra", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/erickson-dutra-dev/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/ericksdutra/", label: "Instagram" },
];

const ContactSection = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/ericksond10@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Nome: nome,
          Email: email,
          Assunto: assunto,
          Mensagem: mensagem,
          _subject: `Novo contato de ${nome} via Portfólio: ${assunto}`,
          _template: "box"
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        setNome("");
        setEmail("");
        setAssunto("");
        setMensagem("");
        
        // Remove a mensagem de sucesso após 5 segundos
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        throw new Error("Erro ao enviar mensagem.");
      }
    } catch (error) {
      alert("Ocorreu um erro ao tentar enviar sua mensagem. Por favor, tente novamente mais tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Vamos <span className="gradient-text">Conversar</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Estou sempre aberto a novas oportunidades e parcerias. Entre em contato!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-6">Informações de Contato</h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    {info.href ? (
                      <a href={info.href} target={info.label === "Telefone" ? "_blank" : "_self"} rel={info.label === "Telefone" ? "noopener noreferrer" : undefined} className="font-medium hover:text-primary transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-medium">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm text-muted-foreground mb-4">Me siga nas redes</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-secondary hover:bg-primary/10 flex items-center justify-center transition-colors group"
                  >
                    <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Nome</label>
                  <Input 
                    placeholder="Seu nome" 
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    disabled={isSubmitting}
                    className="bg-secondary border-border" 
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                  <Input 
                    type="email" 
                    placeholder="seu@email.com" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="bg-secondary border-border" 
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Assunto</label>
                <Input 
                  placeholder="Qual o assunto?" 
                  required
                  value={assunto}
                  onChange={(e) => setAssunto(e.target.value)}
                  disabled={isSubmitting}
                  className="bg-secondary border-border" 
                />
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Mensagem</label>
                <Textarea 
                  placeholder="Escreva sua mensagem..." 
                  required
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  disabled={isSubmitting}
                  rows={5}
                  className="bg-secondary border-border resize-none"
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting || isSuccess} 
                className={`w-full transition-all duration-300 ${isSuccess ? 'bg-green-600 hover:bg-green-700 text-white' : 'glow-primary'}`}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : isSuccess ? (
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                ) : (
                  <Send className="w-5 h-5 mr-2" />
                )}
                {isSubmitting ? "Enviando..." : isSuccess ? "Mensagem Enviada!" : "Enviar Mensagem"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
