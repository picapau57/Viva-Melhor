import React, { useState } from 'react';
import { useAdSense } from '../context/AdSenseContext';
import { ShieldCheck, Settings, Check, X } from 'lucide-react';

export const CookieConsentBanner: React.FC = () => {
  const { cookies, acceptAllCookies, acceptEssentialCookies, updateCookiePreferences } = useAdSense();
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [tempAnalytics, setTempAnalytics] = useState(cookies.analytics);
  const [tempAdvertising, setTempAdvertising] = useState(cookies.advertising);

  if (cookies.hasConsented && !showCustomModal) {
    return null;
  }

  const handleSavePreferences = () => {
    updateCookiePreferences({
      analytics: tempAnalytics,
      advertising: tempAdvertising,
    });
    setShowCustomModal(false);
  };

  return (
    <>
      {/* Banner inferior se não houver consentimento */}
      {!cookies.hasConsented && (
        <div
          role="region"
          aria-label="Consentimento de Cookies e Privacidade"
          className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6 bg-stone-900/95 text-stone-100 backdrop-blur border-t border-stone-800 shadow-2xl transition-all"
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1 text-sm max-w-3xl">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-base">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Privacidade e Cookies no Viva Melhor</span>
              </div>
              <p className="text-stone-300 text-xs md:text-sm leading-relaxed">
                Utilizamos cookies e tecnologias semelhantes para garantir o funcionamento correto do portal,
                analisar o tráfego de visitantes e exibir publicidade relevante e personalizada quando autorizada.
                Você pode optar por aceitar todos os cookies ou gerenciar suas preferências em conformidade com a LGPD.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0">
              <button
                onClick={() => setShowCustomModal(true)}
                className="px-3.5 py-2 text-xs font-medium text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-md border border-stone-700 transition"
              >
                Personalizar
              </button>
              <button
                onClick={acceptEssentialCookies}
                className="px-3.5 py-2 text-xs font-medium text-stone-200 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-md border border-stone-700 transition"
              >
                Apenas Essenciais
              </button>
              <button
                onClick={acceptAllCookies}
                className="px-4 py-2 text-xs font-semibold text-stone-900 bg-emerald-400 hover:bg-emerald-300 rounded-md shadow transition"
              >
                Aceitar Todos
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Personalização */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-cookies-title"
            className="bg-white dark:bg-stone-900 rounded-xl shadow-2xl max-w-lg w-full p-6 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-800"
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2 text-lg font-bold text-stone-900 dark:text-stone-100" id="modal-cookies-title">
                <Settings className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Preferências de Privacidade
              </div>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-1"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 py-4 text-sm max-h-[60vh] overflow-y-auto pr-1">
              {/* Essenciais */}
              <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-lg border border-stone-200 dark:border-stone-700">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-900 dark:text-stone-100">1. Cookies Estritamente Essenciais</span>
                  <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-medium">Sempre Ativo</span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                  Necessários para o funcionamento básico, segurança e salvamento das suas preferências locais de navegação.
                </p>
              </div>

              {/* Analíticos */}
              <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-lg border border-stone-200 dark:border-stone-700">
                <div className="flex items-center justify-between">
                  <label htmlFor="check-analytics" className="font-semibold text-stone-900 dark:text-stone-100 cursor-pointer">
                    2. Cookies Analíticos de Desempenho
                  </label>
                  <input
                    id="check-analytics"
                    type="checkbox"
                    checked={tempAnalytics}
                    onChange={(e) => setTempAnalytics(e.target.value as any)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                  Permitem compreender como os leitores encontram os artigos e utilizam as ferramentas para que possamos aprimorar a experiência.
                </p>
              </div>

              {/* Publicidade */}
              <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-lg border border-stone-200 dark:border-stone-700">
                <div className="flex items-center justify-between">
                  <label htmlFor="check-advertising" className="font-semibold text-stone-900 dark:text-stone-100 cursor-pointer">
                    3. Publicidade e Google AdSense
                  </label>
                  <input
                    id="check-advertising"
                    type="checkbox"
                    checked={tempAdvertising}
                    onChange={(e) => setTempAdvertising(e.target.value as any)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                  Permitem a exibição de anúncios contextuais para manter o portal e as ferramentas 100% gratuitos para os usuários.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-stone-100 dark:border-stone-800">
              <button
                onClick={() => setShowCustomModal(false)}
                className="px-3.5 py-2 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md transition flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                Salvar Minhas Escolhas
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
