import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import z from 'zod'

import { registerRestaurant } from '@/api/register-restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.email(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()

  const navigate = useNavigate()

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone,
      })

      toast.success('Cadastro criado com sucesso!.', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
    } catch {
      toast.error('Credenciais inválidas.')
    }
  }

  return (
    <div className="p-8">
      <Button variant="ghost" asChild className="absolute top-8 right-8">
        <Link to="/sign-in">Novo estabelecimento</Link>
      </Button>

      <div className="flex w-[320px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criar conta grátis
          </h1>

          <p className="text-muted-foreground text-sm">
            Seja um parceiro e começe suas vendas!
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
          <div className="space-y-2">
            <Label htmlFor="restaurant">Nome do estabelecimento</Label>
            <Input
              id="restaurant"
              type="text"
              {...register('restaurantName')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Seu nome</Label>
            <Input id="name" type="text" {...register('managerName')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input id="email" type="email" {...register('email')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">phone</Label>
            <Input id="phone" type="tel" {...register('phone')} />
          </div>

          <Button disabled={isSubmitting} className="w-full" type="submit">
            Finalizar cadastro
          </Button>

          <p className="text-muted-foreground px-6 text-center text-sm leading-relaxed">
            ao continuar você concorda com nosso{' '}
            <a href="#" className="underline underline-offset-4">
              Termo de serviço
            </a>{' '}
            e{' '}
            <a href="" className="underline underline-offset-4">
              politicas de privacidade
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
