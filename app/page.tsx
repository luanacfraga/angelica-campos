"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

function Accordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative border border-gray-100 rounded-xl bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left bg-gray-50/50 hover:bg-rose-50/30 transition-colors rounded-xl"
      >
        <span className="font-display font-bold text-gray-800">{title}</span>
        <svg
          className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 p-4 text-sm text-gray-600 border border-gray-100 bg-white rounded-xl shadow-xl">
          {children}
        </div>
      )}
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M19.1 17.5c-.2-.1-1.3-.6-1.5-.7s-.4-.1-.6.1-.7.7-.8.8-.3.2-.5.1a6.6 6.6 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.5c.1-.1.2-.3.3-.4.1-.1.1-.3 0-.5s-.6-1.4-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3s-.9.9-.9 2.1.9 2.4 1 2.6 1.8 2.8 4.4 4c.6.3 1.1.5 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.3-.5 1.5-1s.2-.9.1-1-.2-.2-.4-.3z" />
      <path d="M26.7 15.9c0 5.9-4.8 10.7-10.7 10.7a10.6 10.6 0 0 1-5.1-1.3L5.3 27l1.8-5.4a10.7 10.7 0 1 1 19.6-5.7zm-10.7-8.9a8.9 8.9 0 0 0-7.6 13.6l.2.4-1 3 3.1-1 .3.2a8.8 8.8 0 0 0 4.9 1.5A8.9 8.9 0 1 0 16 7z" />
    </svg>
  );
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const whatsappNumber = "5531973155465";
  const whatsappMessage = encodeURIComponent(
    "Olá! Gostaria de agendar um horário."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF9F7" }}>
      {/* MENU DE NAVEGAÇÃO - Fixo no topo */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-rose-100/50 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Menu Mobile Button - Esquerda */}
            <button
              className="md:hidden p-2 shrink-0 z-50 relative text-gray-700 hover:text-[#C08497] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Logo Mobile - Centralizada (Tamanho ideal para navegação) */}
            <div className="md:hidden absolute left-1/2 transform -translate-x-1/2">
              <Image
                src="/images/logo.png"
                alt="Salão da Angelica"
                width={120}
                height={75}
                className="h-16 w-auto drop-shadow-sm"
                priority
              />
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center space-x-8 lg:space-x-12 w-full justify-center">
              {[
                { id: "home", label: "Início" },
                { id: "servicos", label: "Serviços" },
                { id: "sobre", label: "Sobre" },
                { id: "localizacao", label: "Localização" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="font-sans text-sm tracking-widest uppercase font-medium text-gray-600 hover:text-[#C08497] transition-all duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C08497] transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* Botão Agendar Desktop */}
            <div className="hidden md:flex items-center shrink-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#C08497] hover:bg-[#a56d7e] text-white font-medium px-7 py-2.5 rounded-full shadow-md shadow-rose-200 transition-all hover:shadow-lg hover:shadow-rose-300 hover:-translate-y-0.5 text-sm tracking-wide uppercase"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Agendar
              </a>
            </div>
          </div>

          {/* Menu Mobile */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-rose-100 overflow-hidden animate-fade-in">
              <div className="flex flex-col space-y-1 p-4">
                {[
                  { id: "home", label: "Início" },
                  { id: "servicos", label: "Serviços" },
                  { id: "sobre", label: "Sobre" },
                  { id: "localizacao", label: "Localização" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left py-3 px-4 font-sans text-sm font-medium text-gray-700 hover:bg-rose-50 hover:text-[#C08497] rounded-xl transition-all"
                  >
                    {item.label}
                  </button>
                ))}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#C08497] hover:bg-[#a56d7e] text-white font-medium px-6 py-3.5 rounded-xl text-center mt-4 shadow-md shadow-rose-200 text-sm uppercase tracking-wide"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Agendar Horário
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* 1. HERO MODERNO - Com imagem integrada */}
      <section
        id="home"
        className="pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-20 px-4"
        style={{
          background: "linear-gradient(180deg, #FAF9F7 0%, #F5F2EF 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Texto */}
            <div className="text-center lg:text-left order-2 lg:order-1 flex flex-col gap-1">
              {/* Logo - Visível em todas as telas para impacto visual */}
              <div className="flex justify-center lg:justify-start animate-fade-in -mb-8 lg:-mb-16">
                <Image
                  src="/images/logo.png"
                  alt="Salão da Angelica"
                  width={900}
                  height={563}
                  className="h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 w-auto drop-shadow-lg"
                  priority
                />
              </div>

              {/* Conteúdo */}
              <div className="flex flex-col gap-4 max-w-xl mx-auto lg:mx-0">
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight"
                  style={{ color: "#C08497" }}
                >
                  Depilação, Sobrancelhas e Massagem
                </h2>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700">
                  Um espaço exclusivo para cuidar de você. Atendimento
                  individual e personalizado, com a segurança e o conforto que
                  você merece.
                </p>
              </div>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-4 text-base font-medium text-white shadow-lg shadow-green-500/20 transition-all duration-300 hover:scale-105 hover:shadow-green-500/40 sm:text-lg sm:px-10"
                >
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  <span className="relative flex items-center gap-2">
                    <WhatsAppIcon className="w-5 h-5" />
                    Agendar Horário
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </a>
                <button
                  onClick={() => scrollToSection("servicos")}
                  className="group inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-8 py-4 text-base font-medium text-gray-600 shadow-sm transition-all duration-300 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 sm:text-lg sm:px-10"
                >
                  Conhecer Serviços
                </button>
              </div>
            </div>

            {/* Imagem */}
            <div className="flex justify-center items-center order-1 lg:order-2">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg group">
                {/* Elemento decorativo sutil atrás */}
                <div
                  className="absolute -right-4 -bottom-4 w-full h-full rounded-[2rem] -z-10 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1"
                  style={{ backgroundColor: "#E5E0DC" }}
                ></div>

                {/* Imagem limpa */}
                <div className="relative rounded-[2rem] overflow-hidden shadow-sm">
                  <Image
                    src="/images/image.png"
                    alt="Angelica - Profissional de depilação, sobrancelhas e massagem"
                    width={500}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BENEFÍCIOS - Cards modernos e delicados */}
      <section
        className="py-16 sm:py-24 px-4 relative overflow-hidden"
        style={{ backgroundColor: "#F5F2EF" }}
      >
        {/* Elemento decorativo de fundo */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6 tracking-wide uppercase"
              style={{
                backgroundColor: "rgba(192, 132, 151, 0.1)",
                color: "#C08497",
                letterSpacing: "0.05em",
              }}
            >
              Diferenciais
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold"
              style={{ color: "#1F2937" }}
            >
              Experiência e cuidado em cada detalhe
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-rose-50"
                style={{ backgroundColor: "#FAF9F7" }}
              >
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C08497"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3
                className="font-display font-bold text-lg mb-2"
                style={{ color: "#1F2937" }}
              >
                Hora Marcada
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Atendimento pontual e sem espera. Um horário reservado
                exclusivamente para cuidar de você.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-rose-50"
                style={{ backgroundColor: "#FAF9F7" }}
              >
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C08497"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>
              <h3
                className="font-display font-bold text-lg mb-2"
                style={{ color: "#1F2937" }}
              >
                10+ Anos de Dedicação
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Experiência sólida no mercado da beleza, garantindo técnica
                segura e resultados excelentes.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-rose-50"
                style={{ backgroundColor: "#FAF9F7" }}
              >
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C08497"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="M9 12l2 2 4-4"></path>
                </svg>
              </div>
              <h3
                className="font-display font-bold text-lg mb-2"
                style={{ color: "#1F2937" }}
              >
                Ambiente Seguro
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Espaço acolhedor e familiar, ideal para receber meninas e
                mulheres com total privacidade e tranquilidade.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-rose-50"
                style={{ backgroundColor: "#FAF9F7" }}
              >
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C08497"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                </svg>
              </div>
              <h3
                className="font-display font-bold text-lg mb-2"
                style={{ color: "#1F2937" }}
              >
                Atendimento Humanizado
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Cada cliente é especial. O atendimento é feito por mim, com toda
                atenção e carinho que você merece.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVIÇOS - Design moderno e elegante */}
      <section
        id="servicos"
        className="py-16 sm:py-24 px-4 relative"
        style={{ backgroundColor: "#FAF9F7" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6 tracking-wide uppercase"
              style={{
                backgroundColor: "rgba(192, 132, 151, 0.1)",
                color: "#C08497",
                letterSpacing: "0.05em",
              }}
            >
              Menu de Tratamentos
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6"
              style={{ color: "#1F2937" }}
            >
              Serviços
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Todos os atendimentos são realizados exclusivamente por mim,{" "}
              <strong className="text-[#C08497]">Angelica Campos</strong>,
              garantindo padrão de qualidade e cuidado pessoal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-start">
            {/* Depilação */}
            <div className="bg-white p-8 lg:p-10 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100 flex flex-col">
              <div
                className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-6 group-hover:bg-[#C08497] group-hover:text-white transition-colors duration-300"
                style={{ color: "#C08497" }}
              >
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                  <line x1="16" y1="8" x2="2" y2="22"></line>
                  <line x1="17.5" y1="15" x2="9" y2="15"></line>
                </svg>
              </div>
              <h3
                className="text-2xl font-display font-bold mb-6"
                style={{ color: "#1F2937" }}
              >
                Depilação
              </h3>
              <ul className="space-y-3 text-gray-600 flex-grow">
                {[
                  { name: "Virilha completa", price: "57,00" },
                  { name: "Perna completa", price: "57,00" },
                  { name: "Rosto", price: "40,00" },
                  { name: "Coxa", price: "35,00" },
                  { name: "Canela", price: "35,00" },
                  { name: "Axilas", price: "27,00" },
                  { name: "Buço", price: "20,00" },
                  { name: "Barriga / Nádegas / Braço", price: "30,00" },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0"
                  >
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm font-bold text-[#C08497]">
                      R$ {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sobrancelhas */}
            <div className="bg-white p-8 lg:p-10 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100 flex flex-col">
              <div
                className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-6 group-hover:bg-[#C08497] group-hover:text-white transition-colors duration-300"
                style={{ color: "#C08497" }}
              >
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <h3
                className="text-2xl font-display font-bold mb-6"
                style={{ color: "#1F2937" }}
              >
                Sobrancelhas
              </h3>
              <ul className="space-y-3 text-gray-600 flex-grow">
                {[
                  { name: "Micropigmentação", price: "450,00" },
                  { name: "Retoque Micro", price: "280,00" },
                  { name: "Sobrancelha + Henna + Buço", price: "60,00" },
                  { name: "Sobrancelha + Henna", price: "55,00" },
                  { name: "Sobrancelha + Buço", price: "55,00" },
                  { name: "Sobrancelha Pinçada", price: "40,00" },
                  { name: "Henna", price: "30,00" },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0"
                  >
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm font-bold text-[#C08497]">
                      R$ {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Massagem */}
            <div className="bg-white p-8 lg:p-10 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100 flex flex-col">
              <div
                className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-6 group-hover:bg-[#C08497] group-hover:text-white transition-colors duration-300"
                style={{ color: "#C08497" }}
              >
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0-4.5 4.5M7.5 12H9m3 0a4.5 4.5 0 1 1-4.5 4.5M12 12v2.5m4.5-2.5a4.5 4.5 0 1 1 4.5-4.5M12 12h2.5" />
                </svg>
              </div>
              <h3
                className="text-2xl font-display font-bold mb-6"
                style={{ color: "#1F2937" }}
              >
                Massagem
              </h3>
              <div className="space-y-6 flex-grow">
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-lg font-semibold text-gray-800">
                      Relaxante Clássica
                    </span>
                    <span className="text-xl font-bold text-[#C08497]">
                      R$ 130,00
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Sessão completa de 1 hora. Inclui técnicas de ventosaterapia
                    e pedras quentes para relaxamento profundo.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100">
                  <span className="block text-xs font-bold text-[#C08497] uppercase tracking-wider mb-2">
                    Pacote Especial
                  </span>
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="block text-lg font-bold text-gray-800">
                        4 Sessões
                      </span>
                      <span className="text-xs text-gray-500">
                        (Economia de R$ 40)
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="block text-sm text-gray-400 line-through">
                        R$ 520
                      </span>
                      <span className="block text-xl font-bold text-[#C08497]">
                        R$ 120
                        <small className="text-xs font-normal">/sessão</small>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pedras quentes + Ventosaterapia (Accordion) */}
                <div className="grid grid-cols-1 gap-4">
                  <Accordion title="Pedras Quentes">
                    <div className="whitespace-pre-line leading-relaxed">
                      {
                        "• Pedras Vulcânicas:\n\n◦ São usadas pedras de basalto, um tipo de rocha vulcânica, que retém o calor por mais tempo.\n\n• Termoterapia:\n\n◦ O calor das pedras relaxa a musculatura e melhora o fluxo sanguíneo, o que auxilia na liberação das tensões.\n\n• Massoterapia:\n\n◦ O terapeuta combina o uso das pedras com técnicas manuais de massagem, aplicando-as em pontos específicos do corpo, como costas, pés e mãos.\n\nIncluso na “Massagem Relaxante Clássica”"
                      }
                    </div>
                  </Accordion>

                  <Accordion title="Ventosaterapia">
                    <div className="whitespace-pre-line leading-relaxed">
                      {
                        "• Aplicação das ventosas:\n\n◦ O terapeuta coloca ventosas (copos de vidro, silicone ou acrílico) na pele.\n\n• Criação do vácuo:\n\n◦ Um vácuo é criado dentro da ventosa, que suga a pele e os tecidos subjacentes.\n\n• Aumento da circulação:\n\n◦ Esse vácuo puxa o sangue, aumentando a circulação local e a oxigenação dos tecidos.\n\n• Liberação de toxinas:\n\n◦ A melhora na circulação ajuda a liberar toxinas do sangue e dos músculos.\n\nIncluso na “Massagem Relaxante Clássica”"
                      }
                    </div>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SOBRE MIM - Moderno */}
      <section
        id="sobre"
        className="py-16 sm:py-20 px-4"
        style={{ backgroundColor: "#FAF9F7" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-10 sm:p-14 lg:p-16 rounded-3xl shadow-xl">
            <div className="text-center mb-8">
              <span
                className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6"
                style={{ backgroundColor: "#C08497", color: "white" }}
              >
                Sobre Mim
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6"
                style={{ color: "#1F2937" }}
              >
                Conheça a profissional
              </h2>
            </div>
            <p
              className="font-sans text-lg sm:text-xl lg:text-2xl leading-relaxed text-center max-w-3xl mx-auto font-light"
              style={{ color: "#4B5563" }}
            >
              Olá, sou{" "}
              <strong className="font-display font-bold text-[#1F2937]">
                Angelica Campos
              </strong>
              . Há mais de 10 anos, dedico minha vida a realçar a beleza e
              promover o bem-estar de meninas e mulheres. Criei um espaço
              acolhedor e seguro em minha casa, pensado para oferecer uma
              experiência tranquila, com atendimento individual e hora marcada.
              Aqui, cada cliente é única.
            </p>
          </div>
        </div>
      </section>

      {/* 6. CTA FINAL - Destaque */}
      <section
        className="py-16 sm:py-20 px-4"
        style={{
          background: "linear-gradient(135deg, #C08497 0%, #B76E79 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-white p-10 sm:p-14 lg:p-16 rounded-3xl shadow-2xl">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6"
              style={{ color: "#1F2937" }}
            >
              Pronta para agendar?
            </h2>
            <p className="text-lg sm:text-xl mb-10 text-gray-600">
              Atendimento no bairro Nacional • Horários limitados
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 bg-white text-rose-600 hover:text-rose-700 font-bold text-lg sm:text-xl px-10 py-5 sm:px-14 sm:py-6 rounded-full shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 border border-transparent hover:border-white"
            >
              <WhatsAppIcon className="w-6 h-6" />
              <span>Agendar meu horário</span>
              <svg
                className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* 7. LOCALIZAÇÃO - Google Maps */}
      <section
        id="localizacao"
        className="py-16 sm:py-20 px-4"
        style={{ backgroundColor: "#FAF9F7" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span
              className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{ backgroundColor: "#C08497", color: "white" }}
            >
              Localização
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4"
              style={{ color: "#1F2937" }}
            >
              Como chegar
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encontre-nos facilmente no bairro Nacional
            </p>
          </div>
          <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-xl">
            <div className="mb-6 text-center">
              <p
                className="text-xl sm:text-2xl font-bold mb-2"
                style={{ color: "#1F2937" }}
              >
                Rua Alvarenga Peixoto, 94
              </p>
              <p className="text-lg text-gray-600">Nacional - 32185-220</p>
            </div>
            <div className="w-full h-64 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps?q=Rua+Alvarenga+Peixoto+94,+Nacional,+Contagem,+MG,+32185-220&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do Salão da Angelica - Rua Alvarenga Peixoto, 94, Nacional"
              ></iframe>
            </div>
            <div className="mt-4 text-center">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Rua+Alvarenga+Peixoto+94+Nacional+32185-220"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-medium hover:underline"
                style={{ color: "#C08497" }}
              >
                Abrir no Google Maps →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. RODAPÉ - Moderno */}
      <footer className="bg-gray-900 text-white py-10 sm:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left mb-8">
            <div>
              <h3 className="font-semibold mb-3 text-lg">Localização</h3>
              <p className="text-gray-300">Rua Alvarenga Peixoto, 94</p>
              <p className="text-gray-300">Nacional - 32185-220</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-lg">Horários</h3>
              <p className="text-gray-300">Segunda a Sexta: 8h às 20h</p>
              <p className="text-gray-300">Sábado: 8h às 12h</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-lg">Contato</h3>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 mb-2 transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} Salão da Angelica. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
