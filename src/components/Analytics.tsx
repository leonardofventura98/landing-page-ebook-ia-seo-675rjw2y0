// /components/Analytics.tsx

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

const GA_MEASUREMENT_ID = 'G-QW9ZXJVJHS'

export const Analytics = () => {
  const location = useLocation();

  // useEffect 1: Injeta o script e faz a inicialização básica
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.startsWith('G-')) { // Melhoria na verificação
      console.warn('Google Analytics Measurement ID is not set.');
      return;
    }

    const scriptId = 'ga-tracking-script';
    
    // Evita múltiplas injeções
    if (document.getElementById(scriptId)) {
      // Se o script já existe, apenas inicializa/configura o pageview (caso tenha falhado antes)
      window.gtag('js', new Date());
      pageview(location.pathname + location.search);
      return; 
    }
    console.log("Iniciando rastreamento!")
    // 1. Inicializa o dataLayer e o stub gtag (essencial para comandos assíncronos)
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function (...args: any[]) {
        window.dataLayer.push(args);
      };

    // 2. Cria e injeta o script
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // 3. Executa o comando JS e o config inicial *após* a definição do stub e *antes* do script carregar
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: location.pathname + location.search,
    });


    // Retorno para limpeza (boa prática)
    return () => {
      const scriptElement = document.getElementById(scriptId);
      if (scriptElement && scriptElement.parentElement) {
        scriptElement.parentElement.removeChild(scriptElement);
      }
    };
  }, []); // Executa apenas uma vez

  // useEffect 2: Rastreia mudanças de rota
  useEffect(() => {
    // Evita rastrear a primeira página novamente (já rastreada no useEffect 1)
    // Rastreia apenas quando a location REALMENTE muda
    if (location.pathname !== location.state?.prevPath) {
        pageview(location.pathname + location.search);
    }

    // Você pode armazenar o path atual no state para comparação na próxima execução.
    // Isso é uma técnica avançada para evitar rastreamento duplo no carregamento inicial.

  }, [location]); // Dependência em location para rastrear mudanças

  return null;
};
