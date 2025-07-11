import type { Empreendimento, EmpreendimentoTipo, EmpreendimentoStatus, OpcoesFilter } from "@/lib/types/empreendimento"
import { botaniqueData } from "./botanique-data"
import { leMontData } from "./le-mont-data"
import { leMont2Data } from "./le-mont-2-data"
import { vertData } from "./vert-data"
import { essenceData } from "./essence-data"
import { grandParcData } from "./grand-parc-data"
import { montRoyalData } from "./mont-royal-data"
import { quartierData } from "./quartier-data"

/**
 * =============================================================================
 * DADOS MESTRES DE TODOS OS EMPREENDIMENTOS
 * =============================================================================
 *
 * Este arquivo é a fonte única da verdade para todos os empreendimentos.
 * Usa as páginas COMPLETAS (-novo) como padrão.
 *
 * IMPORTANTE: Sempre use as páginas componentizadas como principal.
 */

// =============================================================================
// FUNÇÃO PARA URLS PADRONIZADAS
// =============================================================================

/**
 * Gera URL para página completa do empreendimento
 * Usa rotas diretas sem sufixo
 */
export function getEmpreendimentoUrl(slug: string): string {
  const routeMap: Record<string, string> = {
    "le-mont": "/le-mont",
    "le-mont-2": "/le-mont-2",
    botanique: "/botanique",
    jade: "/jade",
    obsidian: "/obsidian",
    "icarai-parque-clube": "/icarai",
    "grand-club-cotia": "/grand-club-cotia",
    vert: "/vert",
    essence: "/essence",
    "grand-parc": "/grand-parc",
    "mont-royal": "/mont-royal",
    quartier: "/quartier",
  }

  return routeMap[slug] || `/${slug}`
}

// =============================================================================
// FUNÇÃO PARA CONVERTER DADOS DO TEMPLATE
// =============================================================================

/**
 * Converte dados do template (EmpreendimentoData) para interface padrão (Empreendimento)
 */
function converterTemplateParaEmpreendimento(templateData: any, id: number): Empreendimento {
  return {
    id: id,
    slug: templateData.slug || `empreendimento-${id}`,
    nome: templateData.nome || "Nome não definido",
    subtitulo: templateData.subtitulo,
    slogan: templateData.slogan,

    // Localização - adaptado para interface padrão
    localizacao: templateData.localizacao || "Localização não definida",
    bairro: templateData.endereco?.bairro || "Bairro não definido",
    endereco: templateData.endereco,
    coordenadas: { lat: -23.5505, lng: -46.6333 }, // SP como padrão

    // Características básicas
    tipo: (templateData.tipo === "Residencial" ? "2 dormitórios" : templateData.tipo) as EmpreendimentoTipo,
    status: templateData.status as EmpreendimentoStatus,
    area: templateData.area || "Consulte",
    quartos: templateData.quartos || 2,
    banheiros: 2, // padrão
    vagas: templateData.vagas || 1,

    // Preço
    preco: 500000, // valor padrão para filtros
    precoFormatado: templateData.precoFormatado || "Consulte valores",
    entrega: templateData.entrega || "Em breve",

    // Conteúdo
    descricao: templateData.descricao || "",
    diferenciais: templateData.diferenciais || [],

    // Mídia
    imagem: templateData.imagem || "/placeholder.svg",
    imagemDestaque: templateData.imagemDestaque || templateData.imagem,
    galeria: templateData.galeria || [],

    // Identidade visual
    identidadeVisual: templateData.identidadeVisual || {
      logo: "/placeholder-logo.png",
      corPrimaria: "#000000",
      corSecundaria: "#666666",
      imagemBackground: templateData.imagem || "/placeholder.svg",
    },

    // Dados técnicos
    plantas: templateData.plantas || [],
    especificacoes: templateData.especificacoes || {
      unidades: "Consulte",
      andares: "Consulte",
      elevadores: "Consulte",
      entrega: templateData.entrega || "Em breve",
    },

    // Pontos de interesse
    pontos_interesse: templateData.pontos_interesse || [],

    // Metadados
    destacado: false,
    ativo: true,
    tags: [],
    categoria: ["residencial"],
  }
}

// =============================================================================
// EMPREENDIMENTOS PRINCIPAIS
// =============================================================================

export const empreendimentosMaster: Empreendimento[] = [
  // EMPREENDIMENTOS CRIADOS VIA TEMPLATE
  {
    ...converterTemplateParaEmpreendimento(leMontData, 1),
    slug: "le-mont", // Para usar getEmpreendimentoUrl
    destacado: true,
    tags: ["cotia", "condomínio clube", "lazer completo"],
    preco: 380000,
  },

  // LE MONT 2 - NOVO EMPREENDIMENTO
  {
    ...leMont2Data,
    destacado: true,
  },

  // BOTANIQUE
  {
    ...converterTemplateParaEmpreendimento(botaniqueData, 2),
    slug: "botanique", // Para usar getEmpreendimentoUrl
    destacado: true,
    tags: ["natureza", "cotia", "bosque"],
    preco: 450000,
  },

  // VERT - NOVO EMPREENDIMENTO
  {
    ...converterTemplateParaEmpreendimento(vertData, 7),
    slug: "vert",
    destacado: true,
    tags: ["itu", "condomínio fechado", "street ball"],
    preco: 280000,
    bairro: "Centro",
    coordenadas: { lat: -23.2644, lng: -47.2996 }, // Itu, SP
  },

  // ESSENCE - NOVO EMPREENDIMENTO
  {
    ...converterTemplateParaEmpreendimento(essenceData, 8),
    slug: "essence",
    destacado: true,
    tags: ["cotia", "coberturas duplex", "academia"],
    preco: 350000,
    bairro: "Jardim Nova Vida",
    coordenadas: { lat: -23.6037, lng: -46.9189 }, // Cotia, SP
  },

  // GRAND PARC - NOVO EMPREENDIMENTO
  {
    ...converterTemplateParaEmpreendimento(grandParcData, 9),
    slug: "grand-parc",
    destacado: true,
    tags: ["itu", "pista de caminhada", "poço artesiano"],
    preco: 380000,
    bairro: "Rancho Grande",
    coordenadas: { lat: -23.2644, lng: -47.2996 }, // Itu, SP
  },

  // MONT ROYAL - NOVO EMPREENDIMENTO
  {
    ...converterTemplateParaEmpreendimento(montRoyalData, 10),
    slug: "mont-royal",
    destacado: true,
    tags: ["porto feliz", "espaço zen", "deck solário"],
    preco: 380000,
    bairro: "Jardim Primavera",
    coordenadas: { lat: -23.2144, lng: -47.5269 }, // Porto Feliz, SP
  },

  // QUARTIER - NOVO EMPREENDIMENTO
  {
    ...converterTemplateParaEmpreendimento(quartierData, 11),
    slug: "quartier",
    destacado: true,
    tags: ["itapevi", "castelo branco", "brinquedoteca"],
    preco: 310000,
    bairro: "Jardim Portela",
    coordenadas: { lat: -23.5489, lng: -46.9336 }, // Itapevi, SP
  },

  // GRAND CLUB COTIA - NOVO EMPREENDIMENTO
  {
    id: 6,
    nome: "Grand Club Cotia",
    slug: "grand-club-cotia",
    subtitulo: "Em Obras",
    slogan: "Conforto, lazer e exclusividade em um só lugar",
    localizacao: "Cotia, São Paulo - SP",
    bairro: "Nakamura Park",
    endereco: {
      rua: "R. Geraldo Otaviano de Almeida",
      numero: "1025",
      bairro: "Nakamura Park",
      cidade: "Cotia",
      estado: "SP",
      cep: "06717-000",
    },
    coordenadas: { lat: -23.6037, lng: -46.9189 },
    tipo: "2 dormitórios" as EmpreendimentoTipo,
    status: "Em Obras" as EmpreendimentoStatus,
    entrega: "2026",
    area: "31,06m² a 46,32m²",
    quartos: 2,
    banheiros: 1,
    vagas: 1,
    preco: 320000,
    precoFormatado: "A partir de R$ 320.000",
    descricao:
      "O Grand Club Cotia foi planejado para proporcionar um estilo de vida único, onde a flexibilidade e o conforto são prioridades. Com 8 torres e 198 apartamentos, oferece plantas inteligentes que otimizam a distribuição dos ambientes, equilibrando praticidade e sofisticação. Localizado em Cotia, próximo de tudo que você precisa, em um ambiente seguro e cercado de verde.",
    imagem: "/empreendimentos/grand-club-cotia/galeria/fachada.jpg",
    imagemDestaque: "/empreendimentos/grand-club-cotia/hero-background.jpg",
    galeria: [
      "/empreendimentos/grand-club-cotia/galeria/fachada.jpg",
      "/empreendimentos/grand-club-cotia/galeria/salao-festas.jpg",
      "/empreendimentos/grand-club-cotia/galeria/fitness.jpg",
      "/empreendimentos/grand-club-cotia/galeria/piscina.jpg",
      "/empreendimentos/grand-club-cotia/galeria/churrasqueira.jpg",
      "/empreendimentos/grand-club-cotia/galeria/playground.jpg",
      "/empreendimentos/grand-club-cotia/galeria/quadra.jpg",
      "/empreendimentos/grand-club-cotia/galeria/mini-golf.jpg",
    ],
    identidadeVisual: {
      logo: "/empreendimentos/logos/logo-grand-club-cotia.png",
      corPrimaria: "#B8860B",
      corSecundaria: "#1a1a1a",
      imagemBackground: "/empreendimentos/grand-club-cotia/hero-background.jpg",
    },
    diferenciais: [
      "8 torres com 198 apartamentos",
      "Mais de 12 opções de lazer",
      "Mini golf exclusivo",
      "Bosque privativo",
      "Segurança 24 horas",
      "Localização privilegiada em Cotia",
    ],
    pontos_interesse: [
      { nome: "Centro de Cotia", distancia: "2km", tipo: "comercio" },
      { nome: "Escolas", distancia: "500m", tipo: "educacao" },
      { nome: "Supermercados", distancia: "800m", tipo: "comercio" },
    ],
    plantas: [
      {
        id: 1,
        tipo: "1 Dormitório",
        area: "31,06m²",
        quartos: 1,
        banheiros: 1,
        vagas: 1,
        imagem: "/empreendimentos/grand-club-cotia/plantas/1-dormitorio.jpg",
        preco: "A partir de R$ 320.000",
        descricao: "Apartamento compacto e funcional",
      },
      {
        id: 2,
        tipo: "2 Dormitórios",
        area: "43,05m²",
        quartos: 2,
        banheiros: 1,
        vagas: 1,
        imagem: "/empreendimentos/grand-club-cotia/plantas/2-dormitorios-43.jpg",
        preco: "A partir de R$ 380.000",
        descricao: "Apartamento com boa distribuição",
      },
      {
        id: 3,
        tipo: "2 Dormitórios Plus",
        area: "46,32m²",
        quartos: 2,
        banheiros: 1,
        vagas: 1,
        imagem: "/empreendimentos/grand-club-cotia/plantas/2-dormitorios-46.jpg",
        preco: "A partir de R$ 420.000",
        descricao: "Apartamento mais amplo com área gourmet",
        destaque: true,
      },
    ],
    especificacoes: {
      unidades: "198 apartamentos",
      andares: "8 torres",
      elevadores: "2 elevadores por torre",
      entrega: "2026",
    },
    ativo: true,
    destacado: true,
    tags: ["cotia", "condomínio clube", "mini golf", "bosque"],
    categoria: ["residencial", "condomínio clube"],
  },

  // JADE
  {
    id: 3,
    nome: "Jade",
    slug: "jade",
    subtitulo: "Lançamento",
    slogan: "Viva o Extraordinário",
    localizacao: "Bela Vista, São Paulo - SP",
    bairro: "Bela Vista",
    endereco: {
      rua: "Rua Cardim",
      numero: "123",
      bairro: "Bela Vista",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01323-000",
    },
    coordenadas: { lat: -23.560448, lng: -46.650839 },
    tipo: "2 dormitórios" as EmpreendimentoTipo,
    status: "Lançamento" as EmpreendimentoStatus,
    entrega: "2026",
    area: "65m²",
    quartos: 2,
    banheiros: 2,
    vagas: 1,
    preco: 850000,
    precoFormatado: "A partir de R$ 850.000",
    descricao:
      "No coração da Bela Vista (SP), em São Paulo, é um endereço privilegiado que combina sofisticação, tradição e conveniência. Este bairro, conhecido por sua rica vida cultural e excelente infraestrutura, oferece ótima proximidade com importantes pontos da cidade, como a Avenida Paulista, o Parque Trianon e os centros comerciais e gastronômicos de renomadas regiões como Vila Madalena e Itaim Bibi.",
    imagem: "/empreendimentos/jade/fachadas/JADE_Cardim 01.jpeg",
    imagemDestaque: "/empreendimentos/jade/background-jade.jpeg",
    galeria: [
      "/empreendimentos/jade/fachadas/JADE_Cardim 01.jpeg",
      "/empreendimentos/jade/fachadas/JADE_Cardim 02.jpeg",
      "/empreendimentos/jade/fachadas/JADE_Cardim 03.jpeg",
    ],
    identidadeVisual: {
      logo: "/empreendimentos/jade/logo-jade.png",
      corPrimaria: "#D4AF37",
      corSecundaria: "#1a1a1a",
      imagemBackground: "/empreendimentos/jade/background-jade.jpeg",
    },
    diferenciais: [
      "Localização privilegiada próxima à Av. Paulista",
      "Acabamentos premium e design sofisticado",
      "Rooftop com piscina e vista panorâmica",
      "Áreas comuns equipadas e decoradas",
    ],
    pontos_interesse: [
      { nome: "Avenida Paulista", distancia: "800m", tipo: "comercio" },
      { nome: "Estação de Metrô", distancia: "500m", tipo: "transporte" },
    ],
    plantas: [],
    especificacoes: {
      unidades: "100 unidades",
      andares: "20 andares",
      elevadores: "2 elevadores",
      entrega: "2026",
    },
    ativo: true,
    destacado: true,
    tags: ["luxo", "bela vista", "paulista"],
    categoria: ["residencial", "alto padrão"],
  },

  // OBSIDIAN
  {
    id: 4,
    nome: "Obsidian",
    slug: "obsidian",
    subtitulo: "BREVE LANÇAMENTO by Gemini",
    slogan: "Viva a Exclusividade",
    localizacao: "Pinheiros, São Paulo - SP",
    bairro: "Pinheiros",
    endereco: {
      rua: "Rua Oscar Freire",
      numero: "456",
      bairro: "Pinheiros",
      cidade: "São Paulo",
      estado: "SP",
      cep: "05409-012",
    },
    coordenadas: { lat: -23.564608, lng: -46.682358 },
    tipo: "2 dormitórios" as EmpreendimentoTipo,
    status: "Breve lançamento" as EmpreendimentoStatus,
    entrega: "2027",
    area: "70m²",
    quartos: 2,
    banheiros: 2,
    vagas: 1,
    preco: 950000,
    precoFormatado: "A partir de R$ 950.000",
    descricao:
      "Localizado em Pinheiros-SP. Uma das regiões mais nobres e valorizadas da cidade, o OBSIDIAN de alto padrão é o empreendimento perfeito para quem busca um estilo de vida sofisticado, design, moderno e prático. Com projeto arquitetônico inovador, o imóvel foi desenvolvido para oferecer a máxima excelência em qualidade, conforto e funcionalidade.",
    imagem: "/empreendimentos/obsidian/fachadas/fachada 001.jpeg",
    imagemDestaque: "/empreendimentos/obsidian/background-obsidian.jpeg",
    galeria: [
      "/empreendimentos/obsidian/fachadas/fachada 001.jpeg",
      "/empreendimentos/obsidian/fachadas/fachada 002.jpeg",
      "/empreendimentos/obsidian/fachadas/fachada 003.jpeg",
    ],
    identidadeVisual: {
      logo: "/empreendimentos/obsidian/logo-obsidian.png",
      corPrimaria: "#DBA47A",
      corSecundaria: "#2D2D2D",
      imagemBackground: "/empreendimentos/obsidian/background-obsidian.jpeg",
    },
    diferenciais: [
      "Localização privilegiada em região nobre",
      "Design contemporâneo com acabamentos premium",
      "Áreas comuns equipadas e decoradas",
      "Tecnologia e sustentabilidade integradas",
    ],
    pontos_interesse: [
      { nome: "Estação de Metrô Oscar Freire", distancia: "100m", tipo: "transporte" },
      { nome: "Oscar Freire", distancia: "40m", tipo: "comercio" },
    ],
    plantas: [],
    especificacoes: {
      unidades: "80 unidades",
      andares: "15 andares",
      elevadores: "2 elevadores",
      entrega: "2027",
    },
    ativo: true,
    destacado: true,
    tags: ["luxo", "pinheiros", "gemini"],
    categoria: ["residencial", "alto padrão"],
  },

  // ICARAÍ PARQUE CLUBE
  {
    id: 5,
    nome: "Icaraí Parque Clube",
    slug: "icarai-parque-clube",
    subtitulo: "Em Obras",
    slogan: "Onde Natureza e Qualidade de Vida se Encontram",
    localizacao: "Salto, São Paulo - SP",
    bairro: "Jardim D'Icaraí",
    endereco: {
      rua: "Estrada do Icaraí",
      numero: "1000",
      bairro: "Jardim D'Icaraí",
      cidade: "Salto",
      estado: "SP",
      cep: "13322-000",
    },
    coordenadas: { lat: -23.2, lng: -47.283333 },
    tipo: "2 dormitórios" as EmpreendimentoTipo,
    status: "Em Obras" as EmpreendimentoStatus,
    entrega: "Novembro 2026",
    area: "75m²",
    quartos: 2,
    banheiros: 2,
    vagas: 1,
    preco: 750000,
    precoFormatado: "A partir de R$ 750.000",
    descricao:
      "Um lugar onde o equilíbrio entre qualidade de vida e o encanto da natureza cria o cenário perfeito para o seu novo lar. Com 55 mil metros quadrados, o Icaraí Parque Clube oferece uma experiência completa de moradia com infraestrutura de clube e a tranquilidade de um parque.",
    imagem: "/empreendimentos/icarai-parque-clube/fachadas/ICARAI_TORRES DO ICARAI - FACHADA.jpeg",
    imagemDestaque: "/empreendimentos/icarai-parque-clube/background-icarai-abstract.png",
    galeria: ["/empreendimentos/icarai-parque-clube/fachadas/ICARAI_TORRES DO ICARAI - FACHADA.jpeg"],
    identidadeVisual: {
      logo: "/empreendimentos/icarai-parque-clube/logo-icarai.png",
      corPrimaria: "#10B981",
      corSecundaria: "#065F46",
      imagemBackground: "/empreendimentos/icarai-parque-clube/background-icarai-abstract.png",
    },
    diferenciais: [
      "408 unidades distribuídas em 4 torres",
      "Apartamentos de 2 e 3 dormitórios",
      "Lazer completo com infraestrutura de clube",
      "55.000m² de área total preservada",
    ],
    pontos_interesse: [
      { nome: "Centro de Salto", distancia: "3km", tipo: "comercio" },
      { nome: "Estação Salto", distancia: "5km", tipo: "transporte" },
    ],
    plantas: [],
    especificacoes: {
      unidades: "408 unidades",
      andares: "4 torres",
      elevadores: "2 elevadores por torre",
      entrega: "Novembro 2026",
    },
    ativo: true,
    destacado: true,
    tags: ["natureza", "salto", "clube"],
    categoria: ["residencial", "condomínio clube"],
  },
]

// =============================================================================
// FUNÇÕES HELPER
// =============================================================================

/**
 * Busca um empreendimento pelo slug
 */
export function buscarEmpreendimentoPorSlug(slug: string): Empreendimento | undefined {
  return empreendimentosMaster.find((emp) => emp.slug === slug)
}

/**
 * Retorna apenas empreendimentos ativos
 */
export function buscarEmpreendimentosAtivos(): Empreendimento[] {
  return empreendimentosMaster.filter((emp) => emp.ativo)
}

/**
 * Retorna empreendimentos destacados
 */
export function buscarEmpreendimentosDestaque(): Empreendimento[] {
  return empreendimentosMaster.filter((emp) => emp.ativo && emp.destacado)
}

/**
 * Adiciona um novo empreendimento (para uso com template)
 */
export function adicionarEmpreendimento(novoEmpreendimento: Empreendimento): void {
  // Verifica se já existe
  const existe = empreendimentosMaster.find((emp) => emp.slug === novoEmpreendimento.slug)

  if (!existe) {
    empreendimentosMaster.push({
      ...novoEmpreendimento,
      ativo: true,
      destacado: false,
    })
  }
}

// =============================================================================
// EXPORTS PARA COMPATIBILIDADE
// =============================================================================

// Para manter compatibilidade com código existente
export const empreendimentos = empreendimentosMaster

// =============================================================================
// CONFIGURAÇÕES DE FILTROS
// =============================================================================

/**
 * Opções disponíveis para os filtros de busca
 * Baseadas nos empreendimentos disponíveis
 */
export const opcoesFiltros: OpcoesFilter = {
  tipos: ["Studio", "1 dormitório", "2 dormitórios", "3 dormitórios", "Cobertura"],
  status: ["Lançamento", "Breve lançamento", "Em Obras", "Entregues"],
  bairros: [
    "Bela Vista",
    "Pinheiros",
    "Jardim D'Icaraí",
    "Chácara Roselândia",
    "Jardim Isis",
    "Vila Olímpia",
    "Jardins",
    "Morumbi",
    "Vila Madalena",
    "Nakamura Park", // Grand Club Cotia
    "Centro", // Vert
    "Jardim Nova Vida", // Essence
    "Rancho Grande", // Grand Parc
    "Jardim Primavera", // Mont Royal
    "Jardim Portela", // Quartier
  ],
  faixas: [
    { label: "Até R$ 300.000", min: 0, max: 300000 },
    { label: "R$ 300.000 - R$ 500.000", min: 300000, max: 500000 },
    { label: "R$ 500.000 - R$ 800.000", min: 500000, max: 800000 },
    { label: "R$ 800.000 - R$ 1.200.000", min: 800000, max: 1200000 },
    { label: "R$ 1.200.000 - R$ 2.000.000", min: 1200000, max: 2000000 },
    { label: "Acima de R$ 2.000.000", min: 2000000, max: Number.POSITIVE_INFINITY },
  ],
}
