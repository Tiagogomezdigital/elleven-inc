// =============================================================================
// TIPOS BÁSICOS
// =============================================================================

export type EmpreendimentoTipo = "Studio" | "1 dormitório" | "2 dormitórios" | "3 dormitórios" | "Cobertura"
export type EmpreendimentoStatus = "Breve lançamento" | "Lançamento" | "Em Obras" | "Entregues"

// =============================================================================
// INTERFACES AUXILIARES
// =============================================================================

// Interface para endereço completo
export interface Endereco {
  rua: string
  numero: string
  bairro: string
  cidade: string
  estado: string
  cep: string
}

// Interface para coordenadas geográficas
export interface Coordenadas {
  lat: number
  lng: number
}

// Interface para pontos de interesse próximos
export interface PontoInteresse {
  nome: string
  distancia: string
  tipo: "saude" | "shopping" | "transporte" | "comercio" | "parque" | "educacao"
}

// Interface para faixas de preço nos filtros
export interface FaixaPreco {
  label: string
  min: number
  max: number
}

// Interface para plantas/tipologias
export interface Planta {
  id: number
  tipo: string
  area: string
  quartos: number
  banheiros: number
  vagas: number
  imagem: string
  preco: string
  descricao: string
  destaque?: boolean
}

// Interface para especificações técnicas
export interface EspecificacoesTecnicas {
  unidades: string
  andares: string
  elevadores: string
  entrega: string
}

// Interface para identidade visual do empreendimento
export interface IdentidadeVisual {
  logo: string
  corPrimaria: string
  corSecundaria?: string
  imagemBackground: string
}

// Interface para filtros de busca
export interface FiltrosEmpreendimento {
  tipo: string
  status: string
  faixa: string
  bairro: string
  busca: string
}

// =============================================================================
// INTERFACES PARA SISTEMA COMPONENTIZADO
// =============================================================================

// Interface para SEO
export interface SEOData {
  title: string
  description: string
  keywords: string
  ogTitle: string
  ogDescription: string
  ogImage: string
}

// Interface para CTAs
export interface CTA {
  texto: string
  tipo: "primary" | "secondary" | "outline"
  acao: string
}

// Interface para Hero Section
export interface HeroData {
  backgroundImage: string
  logo?: string
  titulo: string
  subtitulo: string
  ctas: CTA[]
}

// Interface para Seção Sobre
export interface SobreData {
  titulo: string
  descricao: string
  imagem: string
  destaques: Array<{
    numero: string
    texto: string
  }>
}

// Interface para conteúdo das abas
export interface ConteudoAba {
  titulo: string
  descricao: string
  imagem: string
  lista: string[]
  destaque?: {
    titulo: string
    valor: string
  }
}

// Interface para abas de informações
export interface AbaInformacao {
  id: string
  titulo: string
  icone: string
  conteudo: ConteudoAba
}

// Interface para sistema de informações
export interface InformacoesData {
  titulo: string
  subtitulo: string
  abas: AbaInformacao[]
}

// Interface para galeria
export interface ImagemGaleria {
  src: string
  alt: string
  titulo: string
}

export interface GaleriaData {
  titulo: string
  imagens: ImagemGaleria[]
}

// Interface para tipologias
export interface Tipologia {
  nome: string
  area: string
  quartos: number
  banheiros: number
  vagas: number
  planta: string
  caracteristicas: string[]
}

// Interface para plantas/ficha técnica
export interface PlantasData {
  titulo: string
  especificacoes: Array<{
    label: string
    valor: string
  }>
  tipologias: Tipologia[]
}

// Interface para campos do formulário
export interface CampoFormulario {
  nome: string
  tipo: "text" | "email" | "tel" | "textarea"
  label: string
  placeholder: string
  obrigatorio: boolean
}

// Interface para formulário de contato
export interface FormularioData {
  campos: CampoFormulario[]
  botao: string
  checkbox: string
}

// Interface para contato
export interface ContatoData {
  titulo: string
  subtitulo: string
  formulario: FormularioData
}

// Interface para tema visual
export interface TemaData {
  corPrimaria: string
  corSecundaria: string
  corDestaque: string
  backgroundPattern?: string
}

// =============================================================================
// INTERFACE PRINCIPAL DO SISTEMA COMPONENTIZADO
// =============================================================================

export interface EmpreendimentoData {
  // Identificação
  id: string
  slug: string
  nome: string
  subtitulo?: string
  slogan?: string

  // SEO
  seo: SEOData

  // Seções da página
  hero: HeroData
  sobre: SobreData
  informacoes: InformacoesData
  galeria: GaleriaData
  plantas: PlantasData
  contato: ContatoData

  // Configurações visuais
  tema: TemaData
}

// =============================================================================
// INTERFACE ORIGINAL (MANTIDA PARA COMPATIBILIDADE)
// =============================================================================

export interface Empreendimento {
  // Identificação
  id: number
  slug: string
  nome: string
  subtitulo?: string
  slogan?: string

  // Localização
  localizacao: string
  bairro: string
  endereco?: Endereco
  coordenadas: Coordenadas
  pontos_interesse: PontoInteresse[]

  // Características básicas
  tipo: EmpreendimentoTipo
  status: EmpreendimentoStatus
  area: string
  quartos: number
  banheiros: number
  vagas: number

  // Preço e entrega
  preco: number
  precoFormatado: string
  entrega: string

  // Conteúdo
  descricao: string
  destaque?: string
  diferenciais: string[]

  // Mídia
  imagem: string
  imagemDestaque?: string
  galeria: string[]

  // Identidade visual
  identidadeVisual: IdentidadeVisual

  // Dados técnicos
  plantas: Planta[]
  especificacoes: EspecificacoesTecnicas

  // Metadados
  destacado?: boolean
  ativo: boolean
  tags: string[]
  categoria: string[]
}

// =============================================================================
// CONFIGURAÇÕES DE FILTROS
// =============================================================================

export interface OpcoesFilter {
  tipos: EmpreendimentoTipo[]
  status: EmpreendimentoStatus[]
  bairros: string[]
  faixas: FaixaPreco[]
}
