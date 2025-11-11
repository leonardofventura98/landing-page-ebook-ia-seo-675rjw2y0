import { Button } from '@/components/ui/button'
import { BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { getVariant, getVariantLink, trackClick } from '@/lib/ab-test'

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCTAClick = () => {
    const variant = getVariant()
    trackClick(variant, 'Header')
    const link = getVariantLink(variant)
    window.open(link, '_blank')
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-transparent transition-all duration-300',
        {
          'border-border/40 bg-background/95 backdrop-blur-sm': isScrolled,
        },
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-bold">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="hidden sm:inline">Primeira Venda em 30 Dias</span>
        </a>
        <Button onClick={handleCTAClick}>Quero o Ebook Agora</Button>
      </div>
    </header>
  )
}
