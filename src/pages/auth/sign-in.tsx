import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  email: z.email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  async function handleSignIn(data: SignInForm) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success('Enviamos um link de authenticação para o seu e-mail.', {
        action: {
          label: 'Reenviar',
          onClick: () => handleSignIn(data),
        },
      })
    } catch {
      toast.error('Credenciais inválidas.')
    }
  }

  return (
    <div className="p-8">
      <Button variant="ghost" asChild className="absolute top-8 right-8">
        <Link to="/sign-up">Novo estabelecimento</Link>
      </Button>

      <div className="flex w-[320px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar painel
          </h1>

          <p className="text-muted-foreground text-sm">
            Acompanhe suas vendas pelo painel do parceiro!
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
          <div className="space-y-2">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input id="email" type="email" {...register('email')} />
          </div>

          <Button disabled={isSubmitting} className="w-full" type="submit">
            Acessar painel
          </Button>
        </form>
      </div>
    </div>
  )
}
