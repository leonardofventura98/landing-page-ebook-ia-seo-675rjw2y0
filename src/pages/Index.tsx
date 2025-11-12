import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { LeadCaptureForm } from '@/components/LeadCaptureForm'
import {
  CheckCircle,
  ShieldCheck,
  Target,
  BrainCircuit,
  TrendingUp,
  Users,
  Award,
} from 'lucide-react'
import { getVariant, getVariantLink, trackClick } from '@/lib/ab-test'

const handleCTAClick = (location: string) => {
  const variant = getVariant()
  trackClick(variant, location)
  const link = getVariantLink(variant)
  window.open(link, '_blank')
}

const Index = () => {
  useEffect(() => {
    const pageTitle =
      'Plano 30 Dias: Sua Primeira Venda Online com IA e Tráfego Orgânico'
    const pageDescription =
      'Método passo a passo para fazer sua primeira venda sem investir em anúncios. Estratégia simples, prática e comprovada para iniciantes.'
    const pageUrl = 'https://plano30dias.goskip.app/'
    const imageUrl =
      'https://img.usecurling.com/p/1200/630?q=ebook%20cover%20blue%20digital%20marketing'

    document.title = pageTitle

    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', pageDescription)

    const ogTags = [
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: pageDescription },
      { property: 'og:url', content: pageUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: imageUrl },
    ]

    const addedOgTags: HTMLElement[] = []
    ogTags.forEach((tagInfo) => {
      let meta = document.querySelector(`meta[property='${tagInfo.property}']`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('property', tagInfo.property)
        document.head.appendChild(meta)
        addedOgTags.push(meta as HTMLElement)
      }
      meta.setAttribute('content', tagInfo.content)
    })

    let schemaScript = document.querySelector(
      'script[type="application/ld+json"]',
    )
    if (!schemaScript) {
      schemaScript = document.createElement('script')
      schemaScript.setAttribute('type', 'application/ld+json')
      document.head.appendChild(schemaScript)
    }
    schemaScript.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Plano 30 Dias',
      description:
        'Método passo a passo para fazer sua primeira venda no marketing digital usando IA e tráfego orgânico, sem investir em anúncios.',
      provider: {
        '@type': 'Organization',
        name: 'Plano 30 Dias',
        url: pageUrl,
      },
      url: pageUrl,
    })

    return () => {
      addedOgTags.forEach((tag) => document.head.removeChild(tag))
      if (schemaScript && document.head.contains(schemaScript)) {
        document.head.removeChild(schemaScript)
      }
    }
  }, [])

  return (
    <div className="flex flex-col">
      <HeroSection onCTAClick={() => handleCTAClick('Hero')} />
      <ProblemSection />
      <SolutionSection />
      <WhatYouWillLearnSection />
      <SocialProofSection />
      <LeadCaptureSection />
      <GuaranteeSection />
      <FaqSection />
      <FinalCtaSection onCTAClick={() => handleCTAClick('Final CTA')} />
    </div>
  )
}

const HeroSection = ({ onCTAClick }: { onCTAClick: () => void }) => (
  <section className="bg-secondary py-20 sm:py-24 lg:py-32">
    <div className="container grid items-center gap-12 lg:grid-cols-2">
      <div className="space-y-6 text-center lg:text-left">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Aprenda a Fazer Sua Primeira Venda Online em 30 Dias, Mesmo Começando
          do Zero.
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          Sem gastar com anúncios e usando IA para acelerar sua produção de
          conteúdo.
        </p>
        <Button size="lg" onClick={onCTAClick}>
          Quero o Ebook Agora
        </Button>
      </div>
      <div className="flex justify-center">
        <img
          src="https://img.usecurling.com/p/600/800?q=ebook%20cover%20blue%20digital%20marketing"
          alt="Capa do ebook Primeira Venda em 30 Dias"
          className="max-w-xs rounded-lg shadow-2xl md:max-w-sm animate-float"
        />
      </div>
    </div>
  </section>
)

const ProblemSection = () => (
  <section className="py-16 sm:py-20">
    <div className="container text-center max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Por que 9 em cada 10 iniciantes desistem antes da primeira venda?
      </h2>
      <p className="mt-6 text-lg text-muted-foreground">
        A resposta é simples: falta de um caminho claro. Eles se perdem em um
        mar de informações, tentando de tudo um pouco, mas sem foco. O
        resultado? Frustração e a sensação de que o marketing digital não é para
        eles.
      </p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">Sem Nicho</h3>
            <p className="mt-2 text-muted-foreground">
              Atirar para todos os lados é o mesmo que não acertar ninguém.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">Sem Estratégia</h3>
            <p className="mt-2 text-muted-foreground">
              Postar por postar não gera vendas, apenas cansaço.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">Sem Consistência</h3>
            <p className="mt-2 text-muted-foreground">
              Aparecer de vez em quando não cria confiança nem autoridade.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
)

const SolutionSection = () => (
  <section className="bg-secondary py-16 sm:py-20">
    <div className="container max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          A Solução: Um Plano de Ação Simples e Direto
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Este ebook não é mais um curso teórico. É um guia prático, um passo a
          passo de 30 dias para você sair do zero e realizar sua primeira venda,
          usando as ferramentas mais poderosas e gratuitas da atualidade:
          Inteligência Artificial e SEO.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-start gap-4">
          <div className="bg-primary text-primary-foreground p-3 rounded-full">
            <Target className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Plano de 30 dias</h3>
            <p className="mt-1 text-muted-foreground">
              Tarefas diárias e objetivas para você saber exatamente o que
              fazer.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="bg-primary text-primary-foreground p-3 rounded-full">
            <BrainCircuit className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">
              Estratégia de Conteúdo com IA
            </h3>
            <p className="mt-1 text-muted-foreground">
              Crie conteúdo de alta qualidade em minutos, sem precisar ser um
              expert.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="bg-primary text-primary-foreground p-3 rounded-full">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">SEO para Tráfego Orgânico</h3>
            <p className="mt-1 text-muted-foreground">
              Atraia pessoas interessadas no seu produto, sem gastar R$1 com
              anúncios.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="bg-primary text-primary-foreground p-3 rounded-full">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">
              Processo Passo a Passo Simples
            </h3>
            <p className="mt-1 text-muted-foreground">
              Linguagem clara e direta, focada na execução para iniciantes.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const WhatYouWillLearnSection = () => {
  const learnings = [
    'Como escolher um nicho lucrativo e com baixa concorrência.',
    'Como criar conteúdo que atrai e engaja usando Inteligência Artificial.',
    'Como otimizar seu perfil e conteúdo para ser encontrado no Google e redes sociais (SEO).',
    'Como atrair um público qualificado e realmente interessado em comprar.',
    'Como converter seguidores em clientes fiéis, construindo um relacionamento sólido.',
    'As melhores ferramentas gratuitas para automatizar e acelerar seu trabalho.',
  ]

  return (
    <section className="py-16 sm:py-20">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            O que você vai aprender na prática:
          </h2>
          <ul className="mt-8 space-y-4">
            {learnings.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <span className="text-lg text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center">
          <img
            src="https://img.usecurling.com/p/600/600?q=digital%20marketing%20growth%20chart"
            alt="Gráfico de crescimento no marketing digital"
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </section>
  )
}

const SocialProofSection = () => (
  <section className="bg-secondary py-16 sm:py-20">
    <div className="container text-center max-w-3xl mx-auto">
      <Award className="h-12 w-12 text-primary mx-auto" />
      <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Um Fato: O Jogo Começa no Orgânico
      </h2>
      <p className="mt-6 text-2xl font-semibold text-foreground">
        "+80% das vendas no digital começam com uma estratégia orgânica bem
        definida."
      </p>
      <p className="mt-4 text-lg text-muted-foreground">
        Antes de investir em anúncios, você precisa validar sua oferta e
        construir uma base sólida. É exatamente isso que o tráfego orgânico faz
        por você: cria autoridade, gera confiança e atrai os primeiros clientes
        sem custos com publicidade.
      </p>
    </div>
  </section>
)

const LeadCaptureSection = () => (
  <section className="py-16 sm:py-20">
    <div className="container max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Quer ir além do ebook?
      </h2>
      <p className="mt-4 text-lg text-muted-foreground">
        Deixe seu email e receba dicas semanais exclusivas sobre marketing
        digital, IA e estratégias de venda para continuar crescendo seu negócio.
      </p>
      <div className="mt-8 flex justify-center">
        <LeadCaptureForm />
      </div>
    </div>
  </section>
)

const GuaranteeSection = () => (
  <section className="bg-secondary py-16 sm:py-20">
    <div className="container flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
      <ShieldCheck className="h-24 w-24 text-primary flex-shrink-0" />
      <div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Sua Compra é 100% Segura
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Você tem uma <strong>Garantia de 7 dias</strong>. Se por qualquer
          motivo você achar que este ebook não é para você, basta pedir o
          reembolso dentro do prazo e você receberá seu dinheiro de volta, sem
          perguntas. O risco é todo meu.
        </p>
      </div>
    </div>
  </section>
)

const FaqSection = () => {
  const faqs = [
    {
      question: 'Preciso de alguma experiência prévia?',
      answer:
        'Não! Este ebook foi desenhado para iniciantes que estão começando do absoluto zero. Toda a linguagem é simples e o passo a passo é fácil de seguir.',
    },
    {
      question: 'Preciso comprar alguma ferramenta?',
      answer:
        'Não. O método ensina a utilizar ferramentas gratuitas ou que possuem versões gratuitas robustas para executar toda a estratégia.',
    },
    {
      question: 'Em quanto tempo terei resultados?',
      answer:
        'O plano é de 30 dias para fazer a primeira venda. No entanto, os resultados dependem da sua dedicação e da aplicação consistente do método.',
    },
    {
      question: 'Terei suporte após a compra?',
      answer:
        'O ebook é um guia completo e autoexplicativo. Para dúvidas sobre a compra, o suporte da Hotmart está disponível para ajudar.',
    },
  ]

  return (
    <section className="py-16 sm:py-20">
      <div className="container max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center">
          Perguntas Frequentes
        </h2>
        <Accordion type="single" collapsible className="w-full mt-8">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index + 1}`} key={index}>
              <AccordionTrigger className="text-lg text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

const FinalCtaSection = ({ onCTAClick }: { onCTAClick: () => void }) => (
  <section
    id="cta"
    className="bg-primary text-primary-foreground py-20 sm:py-24"
  >
    <div className="container text-center max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Está pronto para fazer sua primeira venda?
      </h2>
      <p className="mt-4 text-lg text-primary-foreground/80">
        Chega de procrastinar. Adquira o conhecimento prático e o plano de ação
        que você precisa para finalmente começar a vender online. O seu negócio
        digital começa hoje.
      </p>
      <Button
        size="lg"
        variant="secondary"
        className="mt-8 h-auto flex-col items-center justify-center px-6 py-3 text-center sm:px-8 sm:py-4"
        onClick={onCTAClick}
      >
        <span className="text-base font-semibold leading-tight sm:text-lg">
          Quero Fazer Minha Primeira Venda — Baixar Ebook
        </span>
        <div className="mt-2 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 sm:gap-x-3">
          <span className="text-sm font-normal text-secondary-foreground/80 sm:text-base">
            Valor de: <span className="line-through">59,99</span>
          </span>
          <span className="text-xl font-bold sm:text-2xl">por: R$ 17,98</span>
        </div>
      </Button>
    </div>
  </section>
)

export default Index
