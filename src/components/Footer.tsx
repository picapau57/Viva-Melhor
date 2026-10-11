import React from 'react';
import { ShieldCheck, Heart, ExternalLink, Settings, FileText } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { useAdSense } from '../context/AdSenseContext';
import { NewsletterCapture } from './NewsletterCapture';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { resetCookieConsent } = useAdSense();

  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-16">
      {/* Captura de Newsletter Semanal no Topo do Rodapé */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        <NewsletterCapture variant="footer" onNavigate={onNavigate} />
      </div>

      {/* Bloco de Missão e Navegação Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Coluna 1 & 2: Identidade do Portal */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center font-bold shadow-md">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 stroke-current"
                  strokeWidth="2.2"
                >
                  <path d="M16 3L3 13h5v14h16V13h5L16 3z" />
                  <path d="M16 14c-3.3 0-6 2.7-6 6 0 4 6 7 6 7s6-3 6-7c0-3.3-2.7-6-6-6z" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">Viva Melhor</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 block -mt-1">
                  Guia Prático
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Soluções inteligentes para facilitar sua vida todos os dias.
              Um portal editorial independente dedicado a simplificar o cotidiano com receitas econômicas,
              métodos práticos de organização doméstica, jardinagem urbana e finanças reais para as famílias brasileiras.
            </p>

            <div className="text-xs text-stone-500 space-y-1 pt-2">
              <p>• Idioma: Português Brasileiro (pt-BR)</p>
              <p>• Conteúdo pesquisado, fundamentado e revisado humanamente</p>
              <p>• Ferramentas gratuitas com cálculos locais no navegador</p>
            </div>
          </div>

          {/* Coluna 3: Categorias Editoriais */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Seções Editoriais
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleNav(`/categoria/${cat.id}`)}
                    className="hover:text-emerald-400 transition text-stone-400 hover:translate-x-0.5 inline-block"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNav('/ferramentas')}
                  className="hover:text-emerald-400 text-emerald-400 font-semibold transition"
                >
                  Todas as Ferramentas Úteis →
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Institucional e Transparência */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Institucional
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('/sobre')}
                  className="hover:text-emerald-400 transition text-stone-400"
                >
                  Sobre Nós e Propósito
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/contato')}
                  className="hover:text-emerald-400 transition text-stone-400"
                >
                  Fale Conosco
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/aviso-editorial')}
                  className="hover:text-emerald-400 transition text-stone-400"
                >
                  Critérios Editoriais e Fontes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/correcoes')}
                  className="hover:text-emerald-400 transition text-stone-400"
                >
                  Canal de Correções e Erros
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/publicidade')}
                  className="hover:text-emerald-400 transition text-stone-400"
                >
                  Política de Publicidade
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 5: Privacidade, LGPD & Técnico */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Privacidade & Técnico
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('/privacidade')}
                  className="hover:text-emerald-400 transition text-stone-400"
                >
                  Política de Privacidade (LGPD)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/cookies')}
                  className="hover:text-emerald-400 transition text-stone-400"
                >
                  Política de Cookies
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/termos')}
                  className="hover:text-emerald-400 transition text-stone-400"
                >
                  Termos e Condições de Uso
                </button>
              </li>
              <li>
                <button
                  onClick={resetCookieConsent}
                  className="hover:text-emerald-400 transition text-stone-400 flex items-center gap-1.5"
                >
                  <Settings className="w-3.5 h-3.5 text-stone-500" />
                  Gerenciar Preferências de Cookies
                </button>
              </li>
              <li className="pt-2 border-t border-stone-800">
                <button
                  onClick={() => handleNav('/checklist-adsense')}
                  className="hover:text-emerald-400 text-stone-400 flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Auditoria & Checklist AdSense
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/admin')}
                  className="hover:text-amber-400 text-stone-400 flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-500" />
                  Painel de Configuração AdSense & ads.txt
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Links Técnicos Diretos para Indexação */}
        <div className="mt-10 pt-6 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-semibold text-stone-400">Arquivos do Servidor:</span>
            <a
              href="/ads.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-300 underline flex items-center gap-1"
            >
              ads.txt <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-300 underline flex items-center gap-1"
            >
              robots.txt <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-300 underline flex items-center gap-1"
            >
              sitemap.xml <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="text-[11px] text-stone-500">
            © {new Date().getFullYear()} Viva Melhor — Guia Prático. Todos os direitos reservados.
          </div>
        </div>

        {/* Aviso de Isenção e Ética Editorial */}
        <div className="mt-6 pt-4 border-t border-stone-800/60 text-[11px] text-stone-400 leading-relaxed">
          <strong>Aviso Legal e Editorial:</strong> As informações e ferramentas contidas neste portal têm finalidade
          exclusivamente informativa, educacional e orientativa para o cotidiano. Elas não substituem consultas ou pareceres
          com profissionais habilitados (como médicos, nutricionistas, agrônomos, engenheiros, advogados ou contadores).
          Nenhum conteúdo promete resultados financeiros garantidos ou curas milagrosas.
        </div>
      </div>
    </footer>
  );
};
