export const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="border-t bg-background">
      <div className="container flex h-16 items-center justify-center">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {currentYear} Primeira Venda em 30 Dias. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  )
}
