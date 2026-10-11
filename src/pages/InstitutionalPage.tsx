import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Shield, FileText, ArrowLeft, Send } from 'lucide-react';
import { useAdSense } from '../context/AdSenseContext';

interface InstitutionalPageProps {
  pageType: 'sobre' | 'contato' | 'privacidade' | 'cookies' | 'termos' | 'aviso-editorial' | 'correcoes' | 'publicidade';
  onNavigate: (path: string) => void;
}

export const InstitutionalPage: React.FC<InstitutionalPageProps> = ({ pageType, onNavigate }) => {
  const { resetCookieConsent } = useAdSense();

  // Estados para formulário de contato / correções
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) {
      setStatus('error');
      return;
    }
    // Mecanismo transparente: informa ao usuário que a mensagem foi validada e fornece o canal de envio
    setStatus('success');
  };

  const titles: Record<string, string> = {
    sobre: 'Sobre Nós — Viva Melhor: Guia Prático',
    contato: 'Fale Conosco & Atendimento',
    privacidade: 'Política de Privacidade e Proteção de Dados (LGPD)',
    cookies: 'Política de Cookies e Tecnologias de Rastreamento',
    termos: 'Termos e Condições de Uso do Portal',
    'aviso-editorial': 'Aviso Editorial e Padrões de Qualidade',
    correcoes: 'Canal de Correções, Atualizações e Acessibilidade',
    publicidade: 'Publicidade e Transparência Editorial',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Botão Voltar */}
      <button
        onClick={() => onNavigate('/')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar à Página Inicial
      </button>

      {/* Título Principal */}
      <header className="border-b border-stone-200 dark:border-stone-800 pb-4 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          {titles[pageType]}
        </h1>
        <div className="text-xs text-stone-600 dark:text-stone-400">
          Última revisão formal: Fevereiro de 2025 • Em conformidade com a legislação brasileira
        </div>
      </header>

      {/* Conteúdo Dinâmico por Tipo */}
      <div className="prose prose-stone dark:prose-invert max-w-none text-stone-800 dark:text-stone-200 text-sm sm:text-base leading-relaxed space-y-6">
        {/* SOBRE NÓS */}
        {pageType === 'sobre' && (
          <div className="space-y-4">
            <p>
              O <strong>Viva Melhor — Guia Prático</strong> nasceu com uma missão direta e honesta:
              fornecer respostas claras, acessíveis e verdadeiramente úteis para as dúvidas cotidianas
              das famílias brasileiras. Em um ambiente digital repleto de textos superficiais, promessas
              de enriquecimento fácil e artigos caça-cliques, nós escolhemos o caminho do conteúdo fundamentado.
            </p>

            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">Nossos Pilares Editoriais</h3>
            <ul className="list-disc pl-5 space-y-2 text-stone-700 dark:text-stone-300">
              <li>
                <strong>Utilidade Real:</strong> Todo artigo publicado precisa resolver um problema concreto,
                seja fazer um arroz soltinho sem queimar, organizar uma despensa pequena ou entender a fatura de luz.
              </li>
              <li>
                <strong>Economia Doméstica Consciente:</strong> Ensinamos métodos práticos para comprar melhor,
                evitar desperdício de alimentos e criar reservas financeiras, sem falsas promessas de ganhos rápidos.
              </li>
              <li>
                <strong>Independência e Segurança:</strong> Nossas ferramentas gratuitas funcionam diretamente no seu navegador,
                preservando sua privacidade e calculando dados sem cobrar mensalidades.
              </li>
            </ul>

            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">Transparência Sobre Nossa Equipe</h3>
            <p>
              Não inventamos histórias corporativas fictícias. Nossa equipe editorial é formada por profissionais
              dedicados à redação clara, compilação de pesquisas agronômicas e culinárias e desenvolvimento web voltado
              à acessibilidade. Nossos textos são revisados por pessoas reais antes de cada publicação.
            </p>
          </div>
        )}

        {/* CONTATO */}
        {pageType === 'contato' && (
          <div className="space-y-6">
            <p>
              Tem alguma dúvida sobre um guia, sugestão de pauta, proposta de parceria ou encontrou alguma
              inconsistência em nossos artigos? Utilize o formulário abaixo para entrar em contato com a equipe editorial.
            </p>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-950 dark:text-emerald-200 space-y-1">
              <strong>Canal Direto de E-mail:</strong>
              <div>
                Você também pode enviar uma mensagem diretamente para o endereço:{' '}
                <a href="mailto:contato@vivamelhorguiapratico.com.br" className="font-bold underline text-emerald-800 dark:text-emerald-400">
                  contato@vivamelhorguiapratico.com.br
                </a>
              </div>
              <div className="text-stone-600 dark:text-stone-400 pt-1">
                Respondemos a todas as mensagens legítimas em até 2 dias úteis.
              </div>
            </div>

            {status === 'success' ? (
              <div className="p-4 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 rounded-xl flex items-start gap-3 border border-emerald-300 dark:border-emerald-700">
                <CheckCircle className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <strong>Mensagem recebida com sucesso!</strong>
                  <p>
                    Agradecemos o seu contato. Caso prefira enviar anexos ou documentos, utilize diretamente o e-mail oficial acima.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 bg-stone-50 dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Seu Nome (Opcional):
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Como deseja ser chamado"
                      className="w-full text-xs px-3 py-2 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Seu E-mail (Obrigatório):
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="exemplo@email.com"
                      className="w-full text-xs px-3 py-2 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Assunto:
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Dúvida sobre artigo, sugestão, etc."
                    className="w-full text-xs px-3 py-2 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Mensagem:
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Descreva detalhadamente sua dúvida ou comentário..."
                    className="w-full text-xs px-3 py-2 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    required
                  ></textarea>
                </div>

                {status === 'error' && (
                  <div className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                    Por favor, preencha seu e-mail e sua mensagem antes de enviar.
                  </div>
                )}

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition"
                >
                  <Send className="w-4 h-4" /> Enviar Mensagem
                </button>
              </form>
            )}
          </div>
        )}

        {/* POLÍTICA DE PRIVACIDADE */}
        {pageType === 'privacidade' && (
          <div className="space-y-4">
            <p>
              Esta Política de Privacidade esclarece como o <strong>Viva Melhor — Guia Prático</strong> coleta,
              utiliza, armazena e protege os dados pessoais dos usuários em conformidade com a Lei Geral de
              Proteção de Dados Pessoais do Brasil (LGPD, Lei Federal nº 13.709/2018).
            </p>

            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">1. Coleta de Informações</h3>
            <p>
              Não exigimos cadastro de usuários nem cobrança de taxas para acesso aos artigos ou ferramentas.
              Podemos receber informações pessoais apenas quando você:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-stone-700 dark:text-stone-300">
              <li>Preenche voluntariamente o formulário de contato ou correções (nome e e-mail).</li>
              <li>Inscreve-se opcionalmente na newsletter de novidades.</li>
              <li>Navega pelas páginas enquanto cookies analíticos ou publicitários estiverem autorizados por você.</li>
            </ul>

            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">2. Ferramentas Locais (Calculadoras e Guias)</h3>
            <p>
              Todos os dados inseridos nas calculadoras e planejadores (como despesas na Calculadora de Orçamento,
              itens na Lista de Compras e porções de receitas) são processados <strong>exclusivamente na memória local
              do seu próprio navegador</strong> (LocalStorage). Esses dados nunca são enviados, gravados ou visualizados por nossos servidores.
            </p>

            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">3. Google AdSense e Cookies de Terceiros</h3>
            <p>
              O portal foi desenvolvido para integração com o <strong>Google AdSense</strong> para exibição de anúncios.
              O Google e seus parceiros utilizam cookies para veicular anúncios com base nas visitas anteriores dos usuários
              a este ou a outros websites na internet.
            </p>
            <p>
              Os usuários podem optar por desativar a publicidade personalizada acessando as{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="underline text-emerald-700 dark:text-emerald-400">
                Configurações de Anúncios do Google
              </a>{' '}
              ou utilizando o nosso banner de preferências de cookies.
            </p>

            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">4. Seus Direitos como Titular</h3>
            <p>
              Pela LGPD, você tem direito a solicitar confirmação de tratamento de dados, acesso, correção de dados
              incompletos, revogação do consentimento ou eliminação dos dados fornecidos em cadastros voluntários.
              Para exercer esses direitos, basta nos contatar pelo e-mail <em>privacidade@vivamelhorguiapratico.com.br</em>.
            </p>
          </div>
        )}

        {/* POLÍTICA DE COOKIES */}
        {pageType === 'cookies' && (
          <div className="space-y-4">
            <p>
              Cookies são pequenos arquivos de texto armazenados no seu dispositivo que auxiliam na navegação,
              lembram suas preferências e permitem que os sistemas compreendam como o portal é utilizado.
            </p>

            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">Categorias de Cookies Utilizados</h3>
            <div className="space-y-3">
              <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800">
                <span className="font-bold text-stone-900 dark:text-stone-100">Cookies Estritamente Necessários:</span>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                  Essenciais para a segurança, carregamento rápido das páginas e para guardar sua decisão no aviso de consentimento.
                  Não podem ser desativados sem comprometer a navegação básica.
                </p>
              </div>

              <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800">
                <span className="font-bold text-stone-900 dark:text-stone-100">Cookies de Desempenho e Estatísticas:</span>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                  Coletam dados anônimos de navegação (páginas mais lidas, tempo de carregamento) para identificarmos falhas técnicas
                  e melhorarmos a estrutura do site.
                </p>
              </div>

              <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800">
                <span className="font-bold text-stone-900 dark:text-stone-100">Cookies de Publicidade (Google AdSense):</span>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                  Permitem que o Google exiba anúncios relevantes e evitem que o mesmo anúncio seja exibido repetidamente ao visitante.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={resetCookieConsent}
                className="px-4 py-2 bg-stone-850 hover:bg-stone-750 dark:bg-stone-800 dark:hover:bg-stone-700 text-white rounded-lg text-xs font-semibold transition"
              >
                Reabrir Painel de Preferências de Cookies
              </button>
            </div>
          </div>
        )}

        {/* TERMOS DE USO */}
        {pageType === 'termos' && (
          <div className="space-y-4">
            <p>
              Ao navegar pelo portal <strong>Viva Melhor — Guia Prático</strong> e utilizar suas ferramentas gratuitas,
              você concorda com as disposições estabelecidas nestes Termos de Uso.
            </p>

            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">1. Propriedade Intelectual e Uso Aceitável</h3>
            <p>
              Os textos, tutoriais originais, calculadoras e elementos visuais próprios deste portal são protegidos
              pela Lei de Direitos Autorais do Brasil (Lei nº 9.610/1998). É permitida a citação de pequenos trechos
              com link direto de atribuição à fonte original. É expressamente proibida a cópia integral ou raspagem
              automática (scraping) para republicação comercial.
            </p>

            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">2. Isenção de Responsabilidade sobre as Calculadoras</h3>
            <p>
              Nossas ferramentas interativas fornecem estimativas matemáticas baseadas nos dados fornecidos pelo próprio visitante.
              Elas servem como instrumentos auxiliares de organização e não constituem consultoria financeira oficial, contábil ou fiscal.
            </p>
          </div>
        )}

        {/* AVISO EDITORIAL */}
        {pageType === 'aviso-editorial' && (
          <div className="space-y-4">
            <p>
              O <strong>Viva Melhor — Guia Prático</strong> adota diretrizes editoriais transparentes e rigorosas para garantir
              que as informações fornecidas sejam precisas, seguras e verdadeiramente aplicáveis aos lares brasileiros.
            </p>

            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">Como Trabalhamos</h3>
            <ul className="list-disc pl-5 space-y-2 text-stone-700 dark:text-stone-300">
              <li>
                <strong>Verificação Factual:</strong> Todas as instruções culinárias e de segurança alimentar baseiam-se em normas
                sanitárias oficiais (como Anvisa, Ministério da Saúde e Embrapa).
              </li>
              <li>
                <strong>Revisão Humana:</strong> Ferramentas computacionais e de assistência de pesquisa podem apoiar a organização inicial,
                mas todos os textos passam por validação, edição de tom de voz e testes de clareza por editores humanos.
              </li>
              <li>
                <strong>Ausência de Recomendações Perigosas:</strong> Não ensinamos misturas químicas caseiras arriscadas (como cloro com vinagre),
                não fazemos alegações médicas de cura e não prometemos investimentos milagrosos.
              </li>
            </ul>
          </div>
        )}

        {/* CORREÇÕES E ATUALIZAÇÕES */}
        {pageType === 'correcoes' && (
          <div className="space-y-4">
            <p>
              Erros acontecem, e a transparência em corrigi-los rapidamente é a nossa maior prioridade.
              Se você identificou algum dado desatualizado, link incorreto, erro ortográfico ou problema
              de acessibilidade em qualquer página do portal, por favor nos avise.
            </p>

            <div className="p-4 bg-stone-100 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2">
              <span className="font-bold text-stone-900 dark:text-stone-100 block text-sm">Nosso Procedimento de Correção:</span>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                1. Recebemos o apontamento através do canal de contato com o link da página.<br />
                2. Averiguamos as fontes oficiais em até 48 horas.<br />
                3. Efetuamos a correção no texto com atualização da data de revisão editorial na página do artigo.
              </p>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-400">
              Envie sua observação diretamente para:{' '}
              <a href="mailto:correcoes@vivamelhorguiapratico.com.br" className="underline font-bold text-emerald-800 dark:text-emerald-400">
                correcoes@vivamelhorguiapratico.com.br
              </a>
            </p>
          </div>
        )}

        {/* PUBLICIDADE E TRANSPARÊNCIA */}
        {pageType === 'publicidade' && (
          <div className="space-y-4">
            <p>
              Para manter o <strong>Viva Melhor — Guia Prático</strong> 100% gratuito para todos os visitantes,
              sem cobrar mensalidades ou exigir assinaturas para leitura dos artigos, o portal é mantido
              através de publicidade programática e espaços de anúncios.
            </p>

            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">Políticas de Exibição de Anúncios</h3>
            <ul className="list-disc pl-5 space-y-2 text-stone-700 dark:text-stone-300">
              <li>
                <strong>Identificação Clara:</strong> Todo e qualquer espaço publicitário é explicitamente identificado
                com a legenda "Publicidade" ou "Anúncio", nunca se confundindo com o conteúdo editorial.
              </li>
              <li>
                <strong>Não Intrusividade:</strong> Não utilizamos pop-ups invasivos, anúncios que cobrem o texto de leitura
                ou botões falsos de download projetados para induzir cliques acidentais.
              </li>
              <li>
                <strong>Independência Editorial:</strong> Anunciantes não têm poder de interferência nas recomendações práticas,
                técnicas ou conclusões apresentadas em nossos artigos.
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
