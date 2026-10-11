import React, { useState } from 'react';
import { ShieldCheck, CheckSquare, Square, AlertTriangle, ExternalLink, Globe, ArrowLeft, Info, HelpCircle } from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: 'Dominio & Tecnico' | 'Conteudo & Editorial' | 'Politicas & Legal' | 'Integracao AdSense';
  title: string;
  description: string;
  policyNote: string;
  checked: boolean;
}

const INITIAL_CHECKLIST: ChecklistItem[] = [
  {
    id: 'c1',
    category: 'Dominio & Tecnico',
    title: 'Domínio próprio registrado e ativo (.com.br ou .com)',
    description: 'O site está publicado em um domínio principal de primeiro nível próprio, não em subdomínios gratuitos compartilhados.',
    policyNote: 'O Google AdSense exige domínio próprio de propriedade do editor para inscrição e análise de site.',
    checked: false,
  },
  {
    id: 'c2',
    category: 'Dominio & Tecnico',
    title: 'Certificado de Segurança SSL / HTTPS ativo',
    description: 'Todas as páginas redirecionam automaticamente para a versão segura HTTPS com cadeado verde.',
    policyNote: 'Sites sem HTTPS sofrem restrições graves de segurança pelos navegadores modernos e pelo Google.',
    checked: true,
  },
  {
    id: 'c3',
    category: 'Dominio & Tecnico',
    title: 'Arquivos sitemap.xml e robots.txt configurados e acessíveis',
    description: 'O sitemap contém todos os artigos e páginas institucionais e o robots.txt não bloqueia robôs públicos.',
    policyNote: 'Necessário para que o Googlebot rastreie e indexe o conteúdo integral do portal.',
    checked: true,
  },
  {
    id: 'c4',
    category: 'Conteudo & Editorial',
    title: 'Conteúdo original, aprofundado e com alto valor para o leitor',
    description: 'Pelo menos 30 artigos completos com introduções, passos, dicas e FAQs que realmente resolvem dúvidas do público.',
    policyNote: 'A política de "Valor de Inventário Baixo" é o motivo nº 1 de rejeição no AdSense quando o conteúdo é raso ou duplicado.',
    checked: true,
  },
  {
    id: 'c5',
    category: 'Conteudo & Editorial',
    title: 'Ausência total de páginas vazias ou textos provisórios (Lorem Ipsum)',
    description: 'Não existem links quebrados, seções "em construção" ou botões decorativos sem funcionalidade.',
    policyNote: 'Páginas em construção geram reprovação automática por site não finalizado.',
    checked: true,
  },
  {
    id: 'c6',
    category: 'Conteudo & Editorial',
    title: 'Menu e navegação interna claros e intuitivos',
    description: 'O visitante consegue navegar entre todas as 5 categorias e retornar à página inicial em qualquer dispositivo.',
    policyNote: 'O Google analisa a facilidade de navegação do usuário e a estrutura da arquitetura do site.',
    checked: true,
  },
  {
    id: 'c7',
    category: 'Politicas & Legal',
    title: 'Página "Sobre Nós" clara e transparente',
    description: 'Explica o propósito real do portal, seções e equipe editorial sem inventar qualificações fictícias.',
    policyNote: 'Demonstra transparência sobre quem é o responsável pela publicação.',
    checked: true,
  },
  {
    id: 'c8',
    category: 'Politicas & Legal',
    title: 'Página de Contato com formulário e e-mail legítimo',
    description: 'Canal de atendimento direto para leitores e parceiros comerciais.',
    policyNote: 'Requisito obrigatório de transparência comercial nas políticas do Google AdSense.',
    checked: true,
  },
  {
    id: 'c9',
    category: 'Politicas & Legal',
    title: 'Política de Privacidade em conformidade com LGPD e AdSense',
    description: 'Menciona especificamente o uso de cookies pelo Google AdSense e direitos de desativação de publicidade personalizada.',
    policyNote: 'Exigência expressa das diretrizes do Google AdSense para todos os editores participantes.',
    checked: true,
  },
  {
    id: 'c10',
    category: 'Politicas & Legal',
    title: 'Mecanismo de Consentimento de Cookies configurado',
    description: 'Banner que permite ao usuário aceitar ou recusar tecnologias não essenciais de acordo com a lei.',
    policyNote: 'Necessário para conformidade com regulamentos de privacidade de dados no Brasil e no exterior.',
    checked: true,
  },
  {
    id: 'c11',
    category: 'Politicas & Legal',
    title: 'Termos de Uso, Aviso Editorial e Canal de Correções',
    description: 'Páginas que delimitam as regras de uso e explicam a isenção de responsabilidade profissional das calculadoras.',
    policyNote: 'Fortalece os critérios de integridade e responsabilidade do domínio.',
    checked: true,
  },
  {
    id: 'c12',
    category: 'Integracao AdSense',
    title: 'Código-base inserido com seu Publisher ID legítimo (ca-pub-...)',
    description: 'O script oficial do AdSense foi adicionado com seu ID emitido após a criação da conta.',
    policyNote: 'Permite ao Google verificar que o site foi reivindicado pelo proprietário correto da conta.',
    checked: false,
  },
  {
    id: 'c13',
    category: 'Integracao AdSense',
    title: 'Arquivo ads.txt publicado na raiz com o pub-ID correspondente',
    description: 'Arquivo acessível em https://seudominio.com.br/ads.txt com sua linha cadastrada no padrão IAB.',
    policyNote: 'Altamente recomendado pelo Google para proteção contra spoofing de domínio.',
    checked: false,
  },
  {
    id: 'c14',
    category: 'Integracao AdSense',
    title: 'Posicionamento de anúncios respeitando as diretrizes visuais',
    description: 'Anúncios não cobrem textos, não ficam colados em botões de ação e têm rótulo claro "Publicidade".',
    policyNote: 'Evita violações de tráfego inválido e cliques acidentais.',
    checked: true,
  },
];

export const AdSenseChecklistPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [items, setItems] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);

  const handleToggle = (id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it))
    );
  };

  const checkedCount = items.filter((it) => it.checked).length;
  const progressPct = Math.round((checkedCount / items.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Botão Voltar */}
      <button
        onClick={() => onNavigate('/')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar à Página Inicial
      </button>

      {/* Cabeçalho */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" /> Checklist de Auditoria Técnica Pré-Aprovação
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Verificações Antes de Solicitar o Google AdSense
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
          Este checklist reúne todos os requisitos técnicos, editoriais e regulatórios necessários para submeter
          seu domínio à avaliação da equipe do Google AdSense com a melhor preparação possível.
        </p>
      </div>

      {/* Alerta de Isenção Legal Obrigatório */}
      <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800/60 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          <strong>Aviso Importante aos Editores:</strong> Nenhum projeto ou consultor pode garantir aprovação
          pelo Google AdSense. A aprovação final depende exclusivamente do critério avaliativo dos robôs e revisores do Google.
          O objetivo deste checklist é seguir rigorosamente as políticas oficiais, oferecer valor real aos visitantes
          e reduzir drasticamente os problemas técnicos e editoriais que costumam causar reprovações.
        </div>
      </div>

      {/* Barra de Progresso */}
      <div className="p-5 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-stone-700 dark:text-stone-300">
          <span>Prontidão Geral para Submissão:</span>
          <span className="text-base font-bold text-emerald-700 dark:text-emerald-400">{progressPct}% ({checkedCount}/{items.length} itens)</span>
        </div>
        <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-3 overflow-hidden">
          <div
            className="bg-emerald-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          ></div>
        </div>
        <p className="text-[11px] text-stone-500 dark:text-stone-400">
          {progressPct === 100
            ? 'Todos os pontos foram checados! Você está pronto para cadastrar seu domínio próprio no painel do AdSense.'
            : 'Revise os itens pendentes antes de solicitar a análise do site no painel do Google AdSense.'}
        </p>
      </div>

      {/* Lista de Itens por Categoria */}
      <div className="space-y-6">
        {['Dominio & Tecnico', 'Conteudo & Editorial', 'Politicas & Legal', 'Integracao AdSense'].map((catName) => {
          const catItems = items.filter((it) => it.category === catName);

          return (
            <div key={catName} className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden bg-white dark:bg-stone-900">
              <div className="bg-stone-100 dark:bg-stone-800 px-4 py-2.5 text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
                {catName}
              </div>
              <div className="divide-y divide-stone-100 dark:divide-stone-800">
                {catItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleToggle(item.id)}
                    className="p-4 flex items-start gap-3 hover:bg-stone-50/70 dark:hover:bg-stone-800/40 cursor-pointer transition select-none"
                  >
                    <div className="mt-0.5">
                      {item.checked ? (
                        <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Square className="w-5 h-5 text-stone-400 dark:text-stone-600" />
                      )}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className={`text-sm font-bold ${item.checked ? 'text-stone-900 dark:text-stone-100' : 'text-stone-700 dark:text-stone-300'}`}>
                        {item.title}
                      </div>
                      <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="text-[11px] text-emerald-800 dark:text-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-100 dark:border-emerald-800 inline-block mt-1">
                        <strong>Diretriz Google:</strong> {item.policyNote}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Botões de Ação para o Proprietário */}
      <div className="p-6 bg-stone-900 dark:bg-stone-950 text-white rounded-2xl border border-stone-800 space-y-4">
        <h3 className="text-lg font-bold">Próximos Passos na Publicação Definitiva</h3>
        <p className="text-xs text-stone-300 leading-relaxed">
          Para publicar este portal em seu domínio próprio com hospedagem profissional (Hostinger, cPanel, Vercel, Netlify ou Cloudflare):
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('/admin')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5"
          >
            Acessar Central de Configuração AdSense & ads.txt →
          </button>
          <a
            href="https://adsense.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-medium border border-stone-700 transition flex items-center gap-1"
          >
            Painel Oficial do Google AdSense <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
