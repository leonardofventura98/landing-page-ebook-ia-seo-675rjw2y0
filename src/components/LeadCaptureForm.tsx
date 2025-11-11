import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { Mail, Loader2 } from 'lucide-react'

const formSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um email válido.' }),
})

const SUPABASE_LEAD_CAPTURE_URL = import.meta.env.VITE_SUPABASE_LEAD_CAPTURE_URL

export const LeadCaptureForm = () => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    console.log('Submitting lead to Supabase function:', values)

    if (!SUPABASE_LEAD_CAPTURE_URL) {
      console.error('Supabase lead capture URL is not configured in .env file.')
      toast({
        variant: 'destructive',
        title: 'Erro de Configuração',
        description:
          'O serviço de captura de leads não está configurado. Por favor, contate o suporte.',
      })
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(SUPABASE_LEAD_CAPTURE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        toast({
          title: 'Inscrição recebida!',
          description:
            'Obrigado! Fique de olho na sua caixa de entrada para dicas exclusivas.',
        })
        form.reset()
      } else {
        const errorData = await response.json().catch(() => ({}))
        console.error('API Error:', response.status, errorData)
        toast({
          variant: 'destructive',
          title: 'Ops! Algo deu errado.',
          description:
            errorData.message ||
            'Não foi possível completar sua inscrição. Por favor, tente novamente.',
        })
      }
    } catch (error) {
      console.error('Failed to submit to Supabase function:', error)
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado.',
        description:
          'Não foi possível completar sua inscrição. Por favor, tente novamente mais tarde.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Seu melhor email"
                    {...field}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Enviando...' : 'Quero Receber Dicas'}
        </Button>
      </form>
    </Form>
  )
}
