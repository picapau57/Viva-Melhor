import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, ShieldCheck, Sparkles, TrendingDown, Send, ArrowRight, RefreshCw, X } from 'lucide-react';

interface NewsletterCaptureProps {
  variant?: 'footer' | 'sidebar' | 'card';
  title?: string;
  description?: string;
  onNavigate?: (path: string) => void;
  className?: string;
}

export const NewsletterCapture: React.FC<NewsletterCaptureProps> = ({
  variant = 'footer',
  title,
  description,
  onNavigate,
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [categoryPreference, setCategoryPreference] = useState<'todos' | 'economia' | 'culinaria' | 'organizacao'>('economia');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [alreadySubscribedEmail, setAlreadySubscribedEmail] = useState<string | null>(null);

  // Verifica se o usuário já se cadastrou anteriormente via localStorage
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem('vivamelhor_newsletter_email');
      if (savedEmail) {
        setAlreadySubscribedEmail(savedEmail);
      }
    } catch {
      // Ignora erro de acesso ao localStorage
    }
  }, []);

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Por favor, informe um endereço de e-mail válido.');
      return;
    }

    if (!consent) {
      setStatus('error');
      setErrorMessage('Por favor, confirme que concorda em receber os e-mails com as dicas.');
      return;
    }

    setStatus('loading');

    // Simulação de processamento com gravação local persistente
    setTimeout(() => {
      try {
        localStorage.setItem('vivamelhor_newsletter_email', email.trim());
        localStorage.setItem('vivamelhor_newsletter_preference', categoryPreference);
        localStorage.setItem('vivamelhor_newsletter_date', new Date().toISOString());
        setAlreadySubscribedEmail(email.trim());
      } catch {
        // Fallback gracioso
      }
      setStatus('success');
    }, 600);
  };

  const handleUnsubscribeOrChange = () => {
    try {
      localStorage.removeItem('vivamelhor_newsletter_email');
      localStorage.removeItem('vivamelhor_newsletter_preference');
    } catch {
      // Ignora erro
    }
    setAlreadySubscribedEmail(null);
    setStatus('idle');
    setEmail('');
    setConsent(false);
  };

  const handlePolicyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('/privacidade');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ==========================================
  // ESTADO 1: JÁ INSCRITO
  // ==========================================
  if (alreadySubscribedEmail && status !== 'idle' && status !== 'error') {
    return (
      <div
        className={`bg-emerald-900/60 dark:bg-emerald-950/80 border border-emerald-700/60 dark:border-emerald-800 rounded-2xl p-5 sm:p-6 text-white ${className}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" /> Inscrição Ativa
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Você já recebe nossas dicas de economia doméstica!
              </h4>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Toda terça-feira enviamos conteúdos práticos para o endereço{' '}
                <strong className="text-white underline">{alreadySubscribedEmail}</strong>.
              </p>
            </div>
          </div>
          <button
            onClick={handleUnsubscribeOrChange}
            className="text-xs text-emerald-300 hover:text-white underline shrink-0 transition"
            title="Alterar e-mail ou preferências"
          >
            Alterar e-mail
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // ESTADO 2: SUCESSO APÓS INSCRIÇÃO
  // ==========================================
  if (status === 'success') {
    return (
      <div
        className={`bg-emerald-900/90 dark:bg-emerald-950/90 border border-emerald-600/80 dark:border-emerald-700/80 rounded-2xl p-6 sm:p-8 text-white shadow-xl ${className}`}
      >
        <div className="max-w-xl mx-auto text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-500 text-stone-950 rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h4 className="text-xl sm:text-2xl font-black text-white">
            Pronto! Inscrição confirmada com sucesso.
          </h4>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-md mx-auto">
            Muito obrigado por acompanhar o <strong>Viva Melhor</strong>. Na próxima terça-feira você receberá
            nosso boletim com comparativos de preços no mercado, técnicas de economia doméstica e receitas inteligentes.
          </p>
          <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Sem spam. Cancele sua inscrição quando desejar com 1 clique no rodapé de qualquer e-mail.</span>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VARIANTE: BARRA LATERAL OU CARTÃO COMPACTO
  // ==========================================
  if (variant === 'sidebar' || variant === 'card') {
    return (
      <div
        className={`bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 ${className}`}
      >
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
            <TrendingDown className="w-3.5 h-3.5" /> Dicas Semanais no Seu E-mail
          </div>
          <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-stone-100 leading-snug">
            {title || 'Economize no mercado e nas contas de casa'}
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            {description || 'Receba toda terça-feira métodos testados para comparar preços por quilo/litro, planejar refeições econômicas e reduzir despesas fixas.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="newsletter-email-sidebar" className="sr-only">
              Seu melhor e-mail
            </label>
            <div className="relative">
              <input
                id="newsletter-email-sidebar"
                type="email"
                placeholder="Seu melhor e-mail..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 placeholder:text-stone-400"
                required
              />
              <Mail className="w-4 h-4 text-stone-400 dark:text-stone-500 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          <label className="flex items-start gap-2 text-left text-[11px] text-stone-500 dark:text-stone-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 border-stone-300 dark:border-stone-700"
              required
            />
            <span className="leading-tight">
              Aceito receber dicas gratuitas e concordo com a{' '}
              <button
                type="button"
                onClick={handlePolicyClick}
                className="underline text-emerald-700 dark:text-emerald-400 hover:text-emerald-800"
              >
                Política de Privacidade (LGPD)
              </button>
              .
            </span>
          </label>

          {errorMessage && (
            <div className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-70"
          >
            {status === 'loading' ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Inscrevendo...
              </>
            ) : (
              <>
                Quero Receber Dicas Gratuitas <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-stone-200/60 dark:border-stone-800 flex items-center justify-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>100% gratuito. Cancele quando quiser.</span>
        </div>
      </div>
    );
  }

  // ==========================================
  // VARIANTE: RODAPÉ / SEÇÃO EXPANDIDA (FOOTER)
  // ==========================================
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-emerald-950 via-stone-900 to-stone-950 text-white rounded-3xl border border-emerald-900/60 shadow-xl p-6 sm:p-10 ${className}`}
    >
      {/* Padrão visual decorativo sutil */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Bloco de Chamada Editorial */}
        <div className="space-y-3 text-center lg:text-left max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            <TrendingDown className="w-3.5 h-3.5 text-emerald-400" /> Dicas Semanais de Economia Doméstica
          </div>

          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
            {title || 'Faça seu orçamento render mais todas as semanas'}
          </h3>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
            {description || 'Receba toda terça-feira estratégias práticas para economizar no supermercado, receitas com aproveitamento integral, ferramentas de corte de desperdícios e guias de organização doméstica.'}
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-stone-400 pt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Sem cadastro obrigatório no site
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Cancelamento em 1 clique
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Livre de Spam
            </span>
          </div>
        </div>

        {/* Bloco do Formulário de Captura */}
        <div className="w-full lg:max-w-md bg-stone-900/90 backdrop-blur-md p-6 rounded-2xl border border-stone-800 shadow-2xl space-y-4">
          <div className="text-xs font-semibold text-stone-300">
            Qual assunto você mais quer acompanhar?
          </div>

          {/* Seletores de Tópico de Interesse */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { id: 'economia', label: 'Economia & Mercado' },
              { id: 'culinaria', label: 'Receitas & Sobras' },
              { id: 'organizacao', label: 'Rotinas & Limpeza' },
              { id: 'todos', label: 'Todas as Dicas' },
            ].map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => setCategoryPreference(topic.id as any)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition border ${
                  categoryPreference === topic.id
                    ? 'bg-emerald-600/30 text-emerald-200 border-emerald-500/70 font-semibold'
                    : 'bg-stone-800/80 text-stone-400 border-stone-700/60 hover:text-stone-200'
                }`}
              >
                {topic.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 pt-1">
            <div>
              <label htmlFor="newsletter-email-footer" className="sr-only">
                Seu endereço de e-mail
              </label>
              <div className="relative">
                <input
                  id="newsletter-email-footer"
                  type="email"
                  placeholder="Digite seu melhor e-mail..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-xs bg-stone-800/90 text-white placeholder:text-stone-400 border border-stone-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <label className="flex items-start gap-2 text-left text-[11px] text-stone-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 border-stone-700"
                required
              />
              <span className="leading-tight">
                Concordo em receber dicas semanais do Viva Melhor e aceito a{' '}
                <button
                  type="button"
                  onClick={handlePolicyClick}
                  className="underline text-emerald-400 hover:text-emerald-300"
                >
                  Política de Privacidade
                </button>
                .
              </span>
            </label>

            {errorMessage && (
              <div className="text-[11px] text-rose-400 font-medium">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 cursor-pointer"
            >
              {status === 'loading' ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Processando Inscrição...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Cadastrar e Receber Dicas Gratuitas
                </>
              )}
            </button>
          </form>

          <div className="text-center text-[11px] text-stone-500 pt-1">
            Seus dados estão protegidos pela LGPD e nunca serão compartilhados com terceiros.
          </div>
        </div>
      </div>
    </div>
  );
};
