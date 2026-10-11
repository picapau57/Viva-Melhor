import React from 'react';
import { Sparkles, ArrowRight, BookOpen, CheckCircle, ShieldCheck, Mail, Compass, HelpCircle } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { ARTICLES } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { AdSenseBanner } from '../components/AdSenseBanner';
import { NewsletterCapture } from '../components/NewsletterCapture';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectArticle: (slug: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectArticle }) => {
  const featuredArticle = ARTICLES[0]; // Arroz e Feijão
  const recentArticles = ARTICLES.slice(1, 7);
  const deepGuides = [ARTICLES[3], ARTICLES[7], ARTICLES[13], ARTICLES[19]]; // Seleção diversificada

  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      {/* 1. Área de Destaque / Hero Editorial */}
      <section className="relative bg-gradient-to-b from-emerald-950 via-stone-900 to-stone-900 text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-b-3xl shadow-xl">
        {/* Padrão decorativo sutil */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" /> Portal Brasileiro de Utilidade Prática
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Aprenda algo útil todos os dias.
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Soluções inteligentes, econômicas e descomplicadas para melhorar sua rotina.
            Aprenda a cozinhar pratos saborosos do dia a dia, organizar sua casa com facilidade,
            cultivar plantas em pequenos espaços e fazer seu dinheiro render de verdade.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('/ferramentas')}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg transition flex items-center gap-2"
            >
              Acessar Ferramentas Gratuitas <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('/categoria/culinaria')}
              className="px-5 py-3 bg-stone-800/80 hover:bg-stone-800 text-stone-200 rounded-xl text-sm font-semibold border border-stone-700 transition"
            >
              Explorar Receitas Econômicas
            </button>
          </div>
        </div>
      </section>

      {/* Espaço Publicitário - Header Banner Topo */}
      <div className="max-w-5xl mx-auto px-4">
        <AdSenseBanner slotType="headerBanner" format="horizontal" />
      </div>

      {/* 2. Artigo em Destaque Principal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
              Guia em Destaque da Semana
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              Conteúdo detalhado, passo a passo e testado para resolver o seu dia a dia
            </p>
          </div>
        </div>

        <ArticleCard
          article={featuredArticle}
          onSelect={onSelectArticle}
          featured={true}
        />
      </section>

      {/* 3. Categorias Editoriais em Cartões */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
            Navegue por Nossas Seções
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Descubra artigos estruturados de acordo com a área da sua rotina que você deseja aprimorar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate(`/categoria/${cat.id}`)}
              className="group bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all cursor-pointer flex flex-col"
            >
              <div className="h-32 overflow-hidden relative bg-stone-100 dark:bg-stone-800">
                <img
                  src={cat.heroImage}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent"></div>
                <div className="absolute bottom-2 left-3 text-white font-bold text-sm drop-shadow-sm">
                  {cat.name}
                </div>
              </div>
              <div className="p-3.5 flex flex-col justify-between flex-1 space-y-2">
                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2">
                  {cat.shortDesc}
                </p>
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Ver artigos →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Destaque das Ferramentas Gratuitas e Funcionais */}
      <section className="bg-emerald-900 dark:bg-emerald-950 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-3xl max-w-7xl mx-auto shadow-lg border border-emerald-800/40">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-8">
          <span className="px-3 py-1 rounded-full bg-emerald-800 dark:bg-emerald-900 text-emerald-200 text-xs font-bold tracking-wide uppercase inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> 100% Gratuitas e Imediatas
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Ferramentas Práticas que Calculam e Organizam para Você
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto">
            Sem cadastro obrigatório, sem mensalidades e sem enviar seus dados pessoais para servidores.
            Ferramentas pensadas para o bolso e o cotidiano das famílias brasileiras.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {[
            { title: 'Calculadora de Orçamento Familiar', desc: 'Controle de receitas, despesas e análise pela regra 50-30-20.', action: () => onNavigate('/ferramentas') },
            { title: 'Comparador de Preços por Quilo/Litro', desc: 'Descubra na hora a embalagem com melhor custo-benefício.', action: () => onNavigate('/ferramentas') },
            { title: 'Planejador de Refeições (Meal Prep)', desc: 'Monte o menu semanal e exporte a lista de ingredientes.', action: () => onNavigate('/ferramentas') },
            { title: 'Gerador de Lista de Compras', desc: 'Separada por corredores do mercado e tique itens no carrinho.', action: () => onNavigate('/ferramentas') },
            { title: 'Planejador de Tarefas Domésticas', desc: 'Divisão de rotinas por cômodo em blocos curtos de tempo.', action: () => onNavigate('/ferramentas') },
            { title: 'Calculadora de Porções de Receitas', desc: 'Ajuste proporcional exato de ingredientes para qualquer quantidade.', action: () => onNavigate('/ferramentas') },
          ].map((tool, idx) => (
            <div
              key={idx}
              onClick={tool.action}
              className="p-5 bg-emerald-800/70 hover:bg-emerald-800 dark:bg-emerald-900/60 dark:hover:bg-emerald-900/90 rounded-xl border border-emerald-700/60 dark:border-emerald-800/80 transition cursor-pointer flex flex-col justify-between space-y-2 group"
            >
              <div>
                <h3 className="font-bold text-white text-base group-hover:text-emerald-200 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-xs text-emerald-100/90 mt-1 leading-relaxed">
                  {tool.desc}
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1 pt-2">
                Usar ferramenta gratuita →
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Seleção de Artigos Recentes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
              Artigos Recentes e Guias Passo a Passo
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              Instruções detalhadas escritas com clareza para resolver problemas reais
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelect={onSelectArticle}
            />
          ))}
        </div>
      </section>

      {/* Espaço Publicitário - Meio da Home */}
      <div className="max-w-5xl mx-auto px-4">
        <AdSenseBanner slotType="inArticle" format="auto" />
      </div>

      {/* 6. Seleção de Guias Mais Procurados */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
            Guias Práticos Essenciais
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            Conhecimento atemporal para consultar sempre que precisar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {deepGuides.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelect={onSelectArticle}
            />
          ))}
        </div>
      </section>

      {/* 7. Bloco Editorial com Dicas Sazonais Brasileiras */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-100 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <Compass className="w-4 h-4" /> Dicas da Estação para o Brasil
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">
            Cuidados Domésticos e de Safra para o Período
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
            <div className="p-4 bg-white dark:bg-stone-800/80 rounded-xl border border-stone-200 dark:border-stone-700 space-y-1.5">
              <span className="font-bold text-stone-900 dark:text-stone-100 block">Hortifrúti da Safra em Alta:</span>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                Aproveite abobrinha, berinjela, mandioca e frutas cítricas que estão com preços até 40% menores nos mercados e feiras municipais.
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-stone-800/80 rounded-xl border border-stone-200 dark:border-stone-700 space-y-1.5">
              <span className="font-bold text-stone-900 dark:text-stone-100 block">Atenção com Plantas no Calor:</span>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                Em dias de calor intenso, regue as plantas de vaso bem cedo ou após as 18h para que a água não evapore antes de penetrar as raízes.
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-stone-800/80 rounded-xl border border-stone-200 dark:border-stone-700 space-y-1.5">
              <span className="font-bold text-stone-900 dark:text-stone-100 block">Economia com Ar e Geladeira:</span>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                Mantenha a borracha da geladeira limpa e o ar-condicionado ajustado para 23°C; cada grau a menos aumenta em até 8% o consumo elétrico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Metodologia Editorial e Transparência */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" /> Nosso Compromisso com a Qualidade
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Como Nosso Conteúdo é Produzido e Revisado
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-3xl mx-auto">
          No <strong>Viva Melhor — Guia Prático</strong>, não publicamos artigos copiados ou conselhos vazios.
          Nossos artigos são baseados em fontes técnicas confiáveis (como Embrapa, Anvisa, Procon e órgãos oficiais de saúde pública),
          passam por revisão criteriosa e trazem passos executáveis testados na rotina doméstica.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('/aviso-editorial')}
            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 underline"
          >
            Conheça na íntegra nossos critérios editoriais e código de ética →
          </button>
        </div>
      </section>

      {/* 9. Newsletter Opcional sem Cadastro Obrigatório */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterCapture
          variant="footer"
          title="Receba dicas práticas de economia doméstica toda semana"
          description="Estratégias fáceis para baratear a feira e o mercado, aproveitar alimentos sem desperdício e organizar as contas do mês com tranquilidade."
          onNavigate={onNavigate}
        />
      </section>
    </div>
  );
};
