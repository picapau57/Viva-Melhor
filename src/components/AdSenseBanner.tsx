import React, { useEffect, useRef } from 'react';
import { useAdSense } from '../context/AdSenseContext';

interface AdSenseBannerProps {
  slotType: 'headerBanner' | 'inArticle' | 'sidebar' | 'footerBanner';
  format?: 'auto' | 'rectangle' | 'horizontal';
  className?: string;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  slotType,
  format = 'auto',
  className = '',
}) => {
  const { settings, cookies } = useAdSense();
  const adRef = useRef<HTMLModElement | null>(null);

  const slotId = settings.slots[slotType];

  useEffect(() => {
    // Apenas dispara se for em produção, ID configurado, consentimento concedido e habilitado
    if (
      settings.adsEnabled &&
      settings.publisherId &&
      cookies.advertising &&
      settings.isProduction &&
      adRef.current
    ) {
      try {
        // @ts-expect-error Google AdSense global
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.warn('AdSense push error:', err);
      }
    }
  }, [settings.adsEnabled, settings.publisherId, cookies.advertising, settings.isProduction]);

  // Se anúncios estiverem desligados e NÃO estiver em modo teste visual
  if (!settings.adsEnabled && !settings.testMode) {
    return null;
  }

  // Dimensões recomendadas por formato
  const formatStyles = {
    headerBanner: 'min-h-[90px] max-w-[728px] mx-auto',
    inArticle: 'min-h-[250px] max-w-[720px] mx-auto my-6',
    sidebar: 'min-h-[280px] max-w-[336px] mx-auto',
    footerBanner: 'min-h-[90px] max-w-[728px] mx-auto',
  };

  return (
    <aside
      aria-label="Espaço Publicitário"
      className={`w-full overflow-hidden my-4 ${className}`}
    >
      <div className="flex items-center justify-between text-[11px] font-medium text-stone-500 dark:text-stone-400 px-2 pb-1 uppercase tracking-wider">
        <span>Publicidade</span>
        <span className="text-[10px] text-stone-500 dark:text-stone-400 font-normal">
          {settings.isProduction && settings.publisherId ? 'Google AdSense' : 'Espaço Reservado'}
        </span>
      </div>

      <div
        className={`bg-stone-100/90 dark:bg-stone-900/90 border border-dashed border-stone-300 dark:border-stone-750 rounded-lg flex flex-col items-center justify-center p-3 text-center transition-all ${
          formatStyles[slotType]
        }`}
      >
        {settings.isProduction && settings.publisherId && cookies.advertising ? (
          // Código Real AdSense
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: '100%' }}
            data-ad-client={settings.publisherId}
            data-ad-slot={slotId}
            data-ad-format={format}
            data-full-width-responsive="true"
          />
        ) : (
          // Modo Demonstração / Auditoria Técnica / Sem ID configurado
          <div className="py-4 px-2 space-y-1.5 max-w-md">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              Espaço Reservado para Anúncio
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
              Posicionamento editorial em conformidade com as políticas do Google AdSense.
              Nenhum anúncio real será veiculado até a inserção do seu Publisher ID legítimo.
            </p>
            <div className="text-[10px] text-stone-500 dark:text-stone-400 font-mono">
              Slot: {slotType} | ID: {slotId || 'não configurado'}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
