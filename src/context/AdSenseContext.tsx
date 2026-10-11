import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdSenseSettings, CookiePreferences } from '../types';

const DEFAULT_ADSENSE_SETTINGS: AdSenseSettings = {
  publisherId: '', // Ex: 'ca-pub-1234567890123456'
  isProduction: false,
  adsEnabled: false,
  testMode: true,
  slots: {
    headerBanner: '1111111111',
    inArticle: '2222222222',
    sidebar: '3333333333',
    footerBanner: '4444444444',
  },
};

const DEFAULT_COOKIES: CookiePreferences = {
  essential: true,
  analytics: false,
  advertising: false,
  hasConsented: false,
};

interface AdSenseContextType {
  settings: AdSenseSettings;
  updateSettings: (newSettings: Partial<AdSenseSettings>) => void;
  cookies: CookiePreferences;
  acceptAllCookies: () => void;
  acceptEssentialCookies: () => void;
  updateCookiePreferences: (prefs: Partial<CookiePreferences>) => void;
  resetCookieConsent: () => void;
}

const AdSenseContext = createContext<AdSenseContextType | undefined>(undefined);

export const AdSenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AdSenseSettings>(() => {
    try {
      const saved = localStorage.getItem('vivamelhor_adsense_config');
      return saved ? { ...DEFAULT_ADSENSE_SETTINGS, ...JSON.parse(saved) } : DEFAULT_ADSENSE_SETTINGS;
    } catch {
      return DEFAULT_ADSENSE_SETTINGS;
    }
  });

  const [cookies, setCookies] = useState<CookiePreferences>(() => {
    try {
      const saved = localStorage.getItem('vivamelhor_cookie_consent');
      return saved ? { ...DEFAULT_COOKIES, ...JSON.parse(saved) } : DEFAULT_COOKIES;
    } catch {
      return DEFAULT_COOKIES;
    }
  });

  const updateSettings = (newSettings: Partial<AdSenseSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem('vivamelhor_adsense_config', JSON.stringify(updated));
      } catch (e) {
        console.error('Erro ao salvar configurações do AdSense', e);
      }
      return updated;
    });
  };

  const acceptAllCookies = () => {
    const updated: CookiePreferences = {
      essential: true,
      analytics: true,
      advertising: true,
      hasConsented: true,
    };
    setCookies(updated);
    try {
      localStorage.setItem('vivamelhor_cookie_consent', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const acceptEssentialCookies = () => {
    const updated: CookiePreferences = {
      essential: true,
      analytics: false,
      advertising: false,
      hasConsented: true,
    };
    setCookies(updated);
    try {
      localStorage.setItem('vivamelhor_cookie_consent', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const updateCookiePreferences = (prefs: Partial<CookiePreferences>) => {
    setCookies((prev) => {
      const updated = { ...prev, ...prefs, essential: true, hasConsented: true };
      try {
        localStorage.setItem('vivamelhor_cookie_consent', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const resetCookieConsent = () => {
    const reset = { ...DEFAULT_COOKIES, hasConsented: false };
    setCookies(reset);
    try {
      localStorage.removeItem('vivamelhor_cookie_consent');
    } catch (e) {
      console.error(e);
    }
  };

  // Injecao dinamica de script do AdSense se configurado, consentido e habilitado
  useEffect(() => {
    if (settings.adsEnabled && settings.publisherId && cookies.advertising && settings.isProduction) {
      const scriptId = 'google-adsense-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${settings.publisherId}`;
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }
    }
  }, [settings.adsEnabled, settings.publisherId, cookies.advertising, settings.isProduction]);

  return (
    <AdSenseContext.Provider
      value={{
        settings,
        updateSettings,
        cookies,
        acceptAllCookies,
        acceptEssentialCookies,
        updateCookiePreferences,
        resetCookieConsent,
      }}
    >
      {children}
    </AdSenseContext.Provider>
  );
};

export const useAdSense = () => {
  const context = useContext(AdSenseContext);
  if (!context) {
    throw new Error('useAdSense deve ser usado dentro de um AdSenseProvider');
  }
  return context;
};
