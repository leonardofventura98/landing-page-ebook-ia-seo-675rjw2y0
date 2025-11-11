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
import { captureLead } from '@/services/leads'

const formSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um email válido.' }),
})

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
    try {
      const result = await captureLead(values.email)

      if (result.message) {
        toast({
          title: 'Quase lá!',
          description: 'Seu email já está na nossa lista. Obrigado!',
        })
      } else {
        toast({
          title: 'Inscrição recebida!',
          description:
            'Obrigado! Fique de olho na sua caixa de entrada para dicas exclusivas.',
        })
      }
      form.reset()
    } catch (error: any) {
      console.error('Failed to submit lead:', error)
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado.',
        description:
          error.message ||
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
