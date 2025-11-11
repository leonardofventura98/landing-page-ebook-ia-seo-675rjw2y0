import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts'
import { corsHeaders } from '../_shared/cors.ts'

const leadSchema = z.object({
  email: z.string().email({ message: 'Invalid email format.' }),
})

const sendWelcomeEmail = async (email: string) => {
  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    const senderEmail = Deno.env.get('SENDER_EMAIL')
    const senderName = Deno.env.get('SENDER_NAME')

    if (!resendApiKey || !senderEmail || !senderName) {
      console.warn(
        'Email sending environment variables are not set. Skipping welcome email.',
      )
      return
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: `${senderName} <${senderEmail}>`,
        to: [email],
        subject: 'Bem-vindo(a) à nossa comunidade!',
        html: `
          <div style="font-family: sans-serif; line-height: 1.6;">
            <h2>Olá!</h2>
            <p>Obrigado por se inscrever. Estamos felizes em ter você conosco.</p>
            <p>Em breve, você receberá dicas exclusivas sobre marketing digital, IA e estratégias de venda para alavancar seus resultados.</p>
            <p>Atenciosamente,<br>Equipe Primeira Venda em 30 Dias</p>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      const errorBody = await response.json()
      console.error('Failed to send welcome email via Resend:', errorBody)
    } else {
      console.log(`Welcome email sent successfully to ${email}`)
    }
  } catch (error) {
    console.error('An unexpected error occurred while sending email:', error)
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const validationResult = leadSchema.safeParse(body)

    if (!validationResult.success) {
      return new Response(
        JSON.stringify({ error: validationResult.error.flatten().fieldErrors }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        },
      )
    }

    const { email } = validationResult.data

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const { error } = await supabaseAdmin.from('leads').insert({ email })

    if (error) {
      if (error.code === '23505') {
        return new Response(
          JSON.stringify({ message: 'Email already subscribed.' }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          },
        )
      }
      throw error
    }

    await sendWelcomeEmail(email)

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
