"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MapPin,
  Home,
  Dumbbell,
  Sparkles,
  Coffee,
  Building,
  Trees,
  Car,
  Waves,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { empreendimentos } from "@/lib/data/empreendimentos"

// Helper functions
function getEmpreendimentoUrl(slug: string | null): string {
  if (!slug) return "/empreendimentos"
  const empreendimentoUrls: Record<string, string> = {
    jade: "/jade",
    obsidian: "/obsidian",
    "icarai-parque-clube": "/icarai-parque-clube",
  }
  return empreendimentoUrls[slug] || "/empreendimentos"
}

// Função para obter badges específicos por empreendimento
function getBadgesPorEmpreendimento(slug: string) {
  const badgesMap: Record<string, Array<{ icon: any; label: string; description: string }>> = {
    "icarai-parque-clube": [
      { icon: Building, label: "Torres", description: "2 Torres" },
      { icon: Trees, label: "Natureza", description: "Parque Clube" },
      { icon: Waves, label: "Lazer", description: "Piscina" },
      { icon: Dumbbell, label: "Saúde", description: "Academia" },
    ],
    jade: [
      { icon: Home, label: "Studios", description: "25 a 40m²" },
      { icon: Building, label: "Rooftop", description: "Área Externa" },
      { icon: Coffee, label: "Gourmet", description: "Espaço Gourmet" },
      { icon: Car, label: "Garagem", description: "Vagas" },
    ],
    obsidian: [
      { icon: Building, label: "Alto Padrão", description: "Luxo" },
      { icon: Sparkles, label: "Design", description: "Moderno" },
      { icon: Home, label: "Apartamentos", description: "1 a 3 Dorm" },
      { icon: MapPin, label: "Localização", description: "Privilegiada" },
    ],
  }

  return (
    badgesMap[slug] || [
      { icon: Home, label: "Qualidade", description: "Alto Padrão" },
      { icon: Building, label: "Moderno", description: "Arquitetura" },
      { icon: Sparkles, label: "Lazer", description: "Completo" },
      { icon: Car, label: "Garagem", description: "Vagas" },
    ]
  )
}

// Static banners data
// Remover o array staticBanners fixo

// Adicionar função para buscar empreendimentos do banner:
const getBannerEmpreendimentos = () => {
  // Apenas JADE, OBSIDIAN E ICARAÍ no slider
  const slugsPermitidos = ["jade", "obsidian", "icarai-parque-clube"]
  
  return empreendimentos
    .filter((emp) => emp.ativo && slugsPermitidos.includes(emp.slug))
    .map((emp) => ({
      id: emp.id,
      titulo: emp.nome,
      slug: emp.slug,
      subtitulo: emp.subtitulo || emp.status,
      slogan: emp.slogan || emp.nome,
      localizacao: emp.localizacao,
      status: emp.status,
      descricao: emp.descricao,
      preco: emp.precoFormatado,
      entrega: emp.entrega,
      imagem: emp.imagem, // Esta é a fachada principal
      imagemDestaque: emp.imagemDestaque || emp.imagem,
      video: false,
      destaque: emp.status.toUpperCase(),
      destaqueInfo: emp.destaque || emp.subtitulo || "",
      diferenciais: emp.diferenciais.slice(0, 3),
      identidadeVisual: emp.identidadeVisual,
    }))
}
const bannerEmpreendimentos = getBannerEmpreendimentos()

export default function BannerSlider() {
  const [mounted, setMounted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [direction, setDirection] = useState(0)

  // Refs para cleanup
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const mountedRef = useRef(false)

  // Garantir hidratação
  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-play simples e seguro
  useEffect(() => {
    if (!mounted || bannerEmpreendimentos.length <= 1) return

    const timer = setTimeout(() => {
      setIsAutoPlaying(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [mounted])

  // Interval do auto-play
  useEffect(() => {
    if (!mounted || !isAutoPlaying || bannerEmpreendimentos.length <= 1) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentSlide((prev) => (prev + 1) % bannerEmpreendimentos.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [mounted, isAutoPlaying, bannerEmpreendimentos.length])

  // Navigation functions
  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % bannerEmpreendimentos.length)
    setIsAutoPlaying(false)
  }, [bannerEmpreendimentos.length])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + bannerEmpreendimentos.length) % bannerEmpreendimentos.length)
    setIsAutoPlaying(false)
  }, [bannerEmpreendimentos.length])

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentSlide ? 1 : -1)
      setCurrentSlide(index)
      setIsAutoPlaying(false)
    },
    [currentSlide],
  )

  // Renderização durante hidratação
  if (!mounted) {
    return (
      <section className="relative h-[75vh] md:h-[80vh] overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="relative z-20 h-full flex items-center justify-center">
          <div className="text-white text-xl">Carregando...</div>
        </div>
      </section>
    )
  }

  const currentBanner = bannerEmpreendimentos[currentSlide]

  return (
    <section className="relative h-[75vh] md:h-[80vh] overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {currentBanner.identidadeVisual?.imagemBackground ? (
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${currentBanner.identidadeVisual.imagemBackground}')`,
                }}
              />
            ) : (
              <div
                className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
                style={{
                  background: currentBanner.identidadeVisual?.corPrimaria
                    ? `linear-gradient(135deg, ${currentBanner.identidadeVisual.corPrimaria}15 0%, #1a1a1a 50%, ${currentBanner.identidadeVisual.corSecundaria || "#000"}90 100%)`
                    : undefined,
                }}
              >
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%)]" />
                </div>
              </div>
            )}
            {/* Overlay escuro para melhor legibilidade - REMOVIDO PARA OBSIDIAN */}
            {currentBanner.slug !== "obsidian" && <div className="absolute inset-0 bg-black/40" />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-8 max-w-7xl">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              initial={{ x: direction > 0 ? 50 : -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction < 0 ? 50 : -50, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
            >
              {/* Text Content */}
              <div className="lg:col-span-7 space-y-8">
                {currentBanner.identidadeVisual?.logo ? (
                  <div className="mb-6">
                    <img
                      src={currentBanner.identidadeVisual.logo || "/placeholder.svg"}
                      alt={`Logo ${currentBanner.titulo}`}
                      className="h-12 md:h-16 w-auto filter drop-shadow-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = "none"
                      }}
                    />
                  </div>
                ) : (
                  <div className="mb-6">
                    <h2
                      className="text-2xl md:text-3xl font-bold tracking-wider"
                      style={{ color: currentBanner.identidadeVisual?.corPrimaria || "#D4AF37" }}
                    >
                      {currentBanner.titulo}
                    </h2>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-white/60" />
                  <span
                    className="text-sm font-medium tracking-[0.1em] uppercase"
                    style={{ color: currentBanner.identidadeVisual?.corPrimaria || "#D4AF37" }}
                  >
                    {currentBanner.localizacao}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight tracking-tight">
                  {currentBanner.slogan}
                </h1>

                <p className="text-white/70 text-base leading-relaxed max-w-lg">{currentBanner.descricao}</p>

                <div className="pt-4">
                  <Link href={getEmpreendimentoUrl(currentBanner.slug)}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="group bg-transparent border-white/20 text-white transition-all duration-500 hover:bg-white/20 hover:backdrop-blur-lg hover:border-white/40 hover:text-gray-100 hover:shadow-2xl backdrop-blur-sm"
                    >
                      Conhecer Mais
                      <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Image Content */}
              <div className="lg:col-span-5 relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                  <img
                    src={
                      currentBanner.imagem || // Usar a fachada principal
                      "/placeholder.svg?height=600&width=500&query=luxury apartment building"
                    }
                    alt={currentBanner.titulo}
                    className="w-full h-[500px] md:h-[600px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/modern-apartment-facade.png"
                    }}
                  />

                  {/* Background */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />

                  <div className="absolute top-4 right-4">
                    <div className="bg-white/10 backdrop-blur-lg rounded-lg px-3 py-1.5 border border-white/20 shadow-xl">
                      <span className="text-white text-xs font-medium">{currentBanner.subtitulo}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Sobreposição para destaque dos ícones - estendida até o meio */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent pointer-events-none" />

                    <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {getBadgesPorEmpreendimento(currentBanner.slug).map((badge, index) => {
                        const IconComponent = badge.icon
                        return (
                          <div key={index} className="text-center">
                            <div className="w-12 h-12 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center mx-auto mb-2 p-2">
                              <IconComponent className="h-5 w-5 text-white" strokeWidth={1} />
                            </div>
                            <div className="text-xs text-white font-medium">{badge.label}</div>
                            <div className="text-xs text-white/80">{badge.description}</div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="relative z-10 flex items-end justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <MapPin
                            className="h-4 w-4"
                            style={{ color: currentBanner.identidadeVisual?.corPrimaria || "#D4AF37" }}
                          />
                          <span className="text-white text-sm font-medium">{currentBanner.localizacao}</span>
                        </div>
                      </div>

                      <div>
                        <Link href={getEmpreendimentoUrl(currentBanner.slug)}>
                          <button
                            className="text-xs font-medium transition-all duration-300 flex items-center gap-1 hover:opacity-80"
                            style={{ color: currentBanner.identidadeVisual?.corPrimaria || "#D4AF37" }}
                          >
                            Ver detalhes
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      {bannerEmpreendimentos.length > 1 && (
        <>
          <div className="absolute left-8 top-1/2 -translate-y-1/2 z-30">
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="h-14 w-14 md:h-12 md:w-12 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="h-14 w-14 md:h-12 md:w-12 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
            <div className="flex items-center gap-3">
              {bannerEmpreendimentos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Progress Bar */}
      {isAutoPlaying && (
        <div className="absolute top-0 left-0 right-0 z-30">
          <div className="h-0.5 bg-white/20">
            <motion.div
              key={currentSlide}
              className="h-full bg-white/60"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 6, ease: "linear" }}
            />
          </div>
        </div>
      )}
    </section>
  )
}
