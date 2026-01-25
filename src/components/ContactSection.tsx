import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactInfo = [
  { icon: Mail, label: "Email", value: "ericksond10@gmail.com", href: "mailto:ericksond10@gmail.com" },
  { icon: Phone, label: "Telefone", value: "+55 (67) 99200-9689", href: "tel:+5567992009689" },
  { icon: MapPin, label: "Localização", value: "Ponta Porã - MS, Brasil", href: null },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/EricksonDutra", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/erickson-dutra-dev/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/ericksdutra/", label: "Instagram" },
];

const ContactSection = () => {
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
                      <a href={info.href} className="font-medium hover:text-primary transition-colors">
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
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Nome</label>
                  <Input placeholder="Seu nome" className="bg-secondary border-border" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                  <Input type="email" placeholder="seu@email.com" className="bg-secondary border-border" />
                </div>
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Assunto</label>
                <Input placeholder="Qual o assunto?" className="bg-secondary border-border" />
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Mensagem</label>
                <Textarea 
                  placeholder="Escreva sua mensagem..." 
                  rows={5}
                  className="bg-secondary border-border resize-none"
                />
              </div>

              <Button size="lg" className="w-full glow-primary">
                <Send className="w-4 h-4 mr-2" />
                Enviar Mensagem
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
