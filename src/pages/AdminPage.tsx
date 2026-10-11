import React, { useState } from 'react';
import {
  Settings,
  Shield,
  FileText,
  Copy,
  Check,
  Download,
  ExternalLink,
  Save,
  Globe,
  AlertCircle,
  ArrowLeft,
  Server,
  BookOpen,
} from 'lucide-react';
import { useAdSense } from '../context/AdSenseContext';
import { ARTICLES } from '../data/articles';

interface AdminPageProps {
  onNavigate: (path: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const { settings, updateSettings } = useAdSense();

  const [pubId, setPubId] = useState(settings.publisherId);
  const [isProd, setIsProd] = useState(settings.isProduction);
  const [enabled, setEnabled] = useState(settings.adsEnabled);
  const [testMode, setTestMode] = useState(settings.testMode);
  const [slotHeader, setSlotHeader] = useState(settings.slots.headerBanner);
  const [slotArticle, setSlotArticle] = useState(settings.slots.inArticle);
  const [slotSidebar, setSlotSidebar] = useState(settings.slots.sidebar);
  const [slotFooter, setSlotFooter] = useState(settings.slots.footerBanner);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedAdsTxt, setCopiedAdsTxt] = useState(false);

  // Derivação do ID numérico para ads.txt (ex: pub-1234567890123456)
  const numericId = pubId.replace(/^ca-/, '').trim() || 'pub-0000000000000000';
  const adsTxtContent = `google.com, ${numericId}, DIRECT, f08c47fec0942fa0`;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      publisherId: pubId.trim(),
      isProduction: isProd,
      adsEnabled: enabled,
      testMode: testMode,
      slots: {
        headerBanner: slotHeader.trim(),
        inArticle: slotArticle.trim(),
        sidebar: slotSidebar.trim(),
        footerBanner: slotFooter.trim(),
      },
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleCopyAdsTxt = () => {
    navigator.clipboard.writeText(adsTxtContent);
    setCopiedAdsTxt(true);
    setTimeout(() => setCopiedAdsTxt(false), 3000);
  };

  const handleDownloadAdsTxt = () => {
    const blob = new Blob([adsTxtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ads.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Botão Voltar */}
      <button
        onClick={() => onNavigate('/')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar ao Portal
      </button>

      {/* Cabeçalho */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">
          <Settings className="w-4 h-4" /> Painel Técnico do Proprietário
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Configuração de Google AdSense, ads.txt & Hospedagem
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
          Gerencie suas chaves do AdSense, gere o arquivo ads.txt oficial e consulte o guia para publicar em seu domínio próprio.
        </p>
      </div>

      {/* 1. Formulário de Configuração do Google AdSense */}
      <section className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Parâmetros do Google AdSense
          </h2>
          {savedSuccess && (
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Salvo com Sucesso!
            </span>
          )}
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Publisher ID do AdSense (Formato: ca-pub-XXXXXXXXXXXXXXXX):
              </label>
              <input
                type="text"
                value={pubId}
                onChange={(e) => setPubId(e.target.value)}
                placeholder="ca-pub-1234567890123456"
                className="w-full text-xs font-mono px-3 py-2 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
              <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1">
                Deixe em branco enquanto sua conta estiver em processo de criação ou pré-análise.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              <label className="flex items-center gap-2 text-xs font-semibold text-stone-800 dark:text-stone-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Habilitar Veiculação de Espaços Publicitários</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-stone-800 dark:text-stone-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isProd}
                  onChange={(e) => setIsProd(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Ambiente de Produção (Dispara scripts reais com ID configurado)</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-stone-800 dark:text-stone-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={testMode}
                  onChange={(e) => setTestMode(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Modo Demonstração Visual (Exibe wireframes com dimensões de teste)</span>
              </label>
            </div>
          </div>

          {/* Slots Específicos */}
          <div className="pt-3 border-t border-stone-100 dark:border-stone-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-3">
              Identificadores de Blocos de Anúncios (Slots Manuais)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] text-stone-600 dark:text-stone-400 mb-1">Header Banner (728x90):</label>
                <input
                  type="text"
                  value={slotHeader}
                  onChange={(e) => setSlotHeader(e.target.value)}
                  className="w-full text-xs font-mono px-2 py-1.5 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 rounded"
                />
              </div>
              <div>
                <label className="block text-[11px] text-stone-600 dark:text-stone-400 mb-1">In-Article (Conteúdo):</label>
                <input
                  type="text"
                  value={slotArticle}
                  onChange={(e) => setSlotArticle(e.target.value)}
                  className="w-full text-xs font-mono px-2 py-1.5 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 rounded"
                />
              </div>
              <div>
                <label className="block text-[11px] text-stone-600 dark:text-stone-400 mb-1">Sidebar (300x250):</label>
                <input
                  type="text"
                  value={slotSidebar}
                  onChange={(e) => setSlotSidebar(e.target.value)}
                  className="w-full text-xs font-mono px-2 py-1.5 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 rounded"
                />
              </div>
              <div>
                <label className="block text-[11px] text-stone-600 dark:text-stone-400 mb-1">Footer Banner:</label>
                <input
                  type="text"
                  value={slotFooter}
                  onChange={(e) => setSlotFooter(e.target.value)}
                  className="w-full text-xs font-mono px-2 py-1.5 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 rounded"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-xs transition"
          >
            <Save className="w-4 h-4" /> Salvar Configurações
          </button>
        </form>
      </section>

      {/* 2. Gerador Oficial de ads.txt */}
      <section className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Gerador e Validador do Arquivo ads.txt
          </h2>
          <span className="text-xs bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-2.5 py-0.5 rounded font-medium">
            Padrão IAB / Google Oficial
          </span>
        </div>

        <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
          O arquivo <code>ads.txt</code> é um arquivo de texto simples que deve ser publicado diretamente no diretório raiz do seu domínio
          (ex: <code>https://seudominio.com.br/ads.txt</code>). Ele comprova que você é o editor autorizado a comercializar inventário no domínio.
        </p>

        <div className="p-4 bg-stone-900 dark:bg-stone-950 rounded-xl text-stone-100 font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-stone-800">
          <div className="truncate">{adsTxtContent}</div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyAdsTxt}
              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 rounded text-xs flex items-center gap-1.5 text-stone-200 transition"
            >
              {copiedAdsTxt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedAdsTxt ? 'Copiado!' : 'Copiar'}
            </button>
            <button
              onClick={handleDownloadAdsTxt}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 rounded text-xs flex items-center gap-1.5 text-white transition font-sans font-semibold"
            >
              <Download className="w-3.5 h-3.5" /> Baixar ads.txt
            </button>
          </div>
        </div>

        <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-lg border border-stone-200 dark:border-stone-700 text-xs text-stone-700 dark:text-stone-300 space-y-1">
          <strong>Como publicar na sua hospedagem:</strong>
          <p>
            1. Baixe o arquivo <code>ads.txt</code> acima.<br />
            2. Acesse o gerenciador de arquivos da sua hospedagem (Hostinger, cPanel, Apache) ou pasta <code>public/</code> do projeto.<br />
            3. Salve o arquivo na pasta raiz <code>public_html/</code>.<br />
            4. Acesse no navegador <code>https://seudominio.com.br/ads.txt</code> para verificar se abre o texto plano.
          </p>
        </div>
      </section>

      {/* 3. Guia de Hospedagem em Domínio Próprio */}
      <section className="bg-stone-900 dark:bg-stone-950 text-white rounded-2xl p-6 sm:p-8 space-y-5 border border-stone-800">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
          <Server className="w-4 h-4" /> Guia Técnico de Implantação
        </div>
        <h2 className="text-xl sm:text-2xl font-black">
          Como Publicar este Portal em seu Domínio Próprio (.com.br)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-300">
          <div className="p-4 bg-stone-800/80 rounded-xl border border-stone-700 space-y-2">
            <span className="font-bold text-white block text-sm">Passo 1: Registro do Domínio</span>
            <p className="leading-relaxed">
              Registre seu domínio no Registro.br ou provedor de preferência (ex: <code>vivamelhorguiapratico.com.br</code>).
            </p>
          </div>

          <div className="p-4 bg-stone-800/80 rounded-xl border border-stone-700 space-y-2">
            <span className="font-bold text-white block text-sm">Passo 2: Build e Hospedagem</span>
            <p className="leading-relaxed">
              Execute <code>npm run build</code>. Suba a pasta <code>dist/</code> resultante para sua hospedagem (Vercel, Netlify, Hostinger ou servidor VPS com Nginx/Apache).
            </p>
          </div>

          <div className="p-4 bg-stone-800/80 rounded-xl border border-stone-700 space-y-2">
            <span className="font-bold text-white block text-sm">Passo 3: Search Console</span>
            <p className="leading-relaxed">
              Cadastre a propriedade no Google Search Console e envie o sitemap em: <code>https://seudominio.com.br/sitemap.xml</code>.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Auditoria Editorial dos Artigos Cadastrados */}
      <section className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Inventário de Conteúdo Editorial Cadastrado ({ARTICLES.length} artigos)
          </h2>
        </div>

        <div className="max-h-80 overflow-y-auto border border-stone-200 dark:border-stone-800 rounded-lg divide-y divide-stone-100 dark:divide-stone-800 text-xs">
          {ARTICLES.map((art, idx) => (
            <div key={art.id} className="p-3 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800/50">
              <div className="space-y-0.5 max-w-md">
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  {idx + 1}. {art.title}
                </span>
                <div className="text-stone-600 dark:text-stone-400 flex items-center gap-2">
                  <span className="uppercase text-[10px] font-bold text-emerald-700 dark:text-emerald-400">{art.category}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                  <span>•</span>
                  <span>{art.steps.length} etapas</span>
                  <span>•</span>
                  <span>{art.faq.length} FAQs</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate(`/artigo/${art.slug}`)}
                className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold shrink-0 ml-4"
              >
                Visualizar Artigo →
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
