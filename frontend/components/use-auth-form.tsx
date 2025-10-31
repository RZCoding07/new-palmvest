"use client";
import type React from "react"
import { useState, useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"; // Changed from react-router-dom
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/custom/button"
import { PasswordInput } from "@/components/custom/password-input"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "react-hot-toast"
import { Card } from "@/components/ui/card"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const formSchema = z.object({
  identifier: z.string().min(1, {
    message: "Please enter your email or username",
  }),
  password: z
    .string()
    .min(1, {
      message: "Please enter your password",
    })
    .min(7, {
      message: "Password must be at least 7 characters long",
    }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useRouter(); // Changed from useHistory to useRouter

  const [formattedDate, setFormattedDate] = useState('')
  const [formattedTime, setFormattedTime] = useState('')

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date()
      setFormattedDate(
        currentTime.toLocaleDateString('id-ID', { dateStyle: 'full' })
      )
      setFormattedTime(
        currentTime.toLocaleTimeString('id-ID', { timeStyle: 'medium' })
      )
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  })

  const onSubmit = useCallback(
    async (data: z.infer<typeof formSchema>) => {
      setIsLoading(true)
      try {
        await login(data.identifier, data.password)
        toast.success("Login successful")
        navigate.push("/") // Navigate to the dashboard-on-farm page after successful login
      } catch (error) {
        console.error("Login error:", error)
        form.setError("root", { message: "Invalid email or password" })
      } finally {
        setIsLoading(false)
      }
    },
    [login, navigate, form],
  )

  return (
    <Card className="dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-950 bg-white shadow-md shadow-sky-500 border border-cyan-700 dark:border-cyan-500  min-w-[400px]">

      <div className='p-7'>
        <div className='flex flex-col justify-center w-full mx-auto space-y-1'>
          <div
            className={`mb-5 flex items-center justify-center gap-1 align-middle -ml-5`}
          >
            <img className='' src='./logosgn.png' alt='logo' style={{ width: '55px' }} />
            <div
              className={`visible flex w-auto flex-col justify-end truncate`}
            >
              <span className='text-[12px] md:text-lg font-semibold' > PICA Sinergi Gula Nusantara</span>
              <span className='text-[10px] md:text-[13px]'>Problem Identification & Corrective Actions</span>
            </div>
          </div>
          <div className='flex flex-col space-y-2'>


            <p className='text-xs text-muted-foreground'>
              Silahkan masuk dengan akun yang telah terdaftar
            </p>
          </div>
          <div className={cn("grid gap-6 text-sm", className)} {...props}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="identifier"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-sm">Username</FormLabel>
                        <FormControl>
                          <Input className="text-sm" placeholder="210******* " {...field} />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-sm">Password</FormLabel>
                        <FormControl>
                          <PasswordInput className="text-sm" placeholder="********" {...field} />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />
                  <Button className="my-2 text-sm" loading={isLoading}>
                    Login
                  </Button>
                </div>
                {form.formState.errors.root && (
                  <p className="mt-2 text-sm text-red-500">{form.formState.errors.root.message}</p>
                )}
              </form>
            </Form>
          </div>

          <div className='mt-auto text-center'>
            <blockquote className=''>
              <footer className='text-xs'>
                <div className='mt-2 text-xs font-normal text-muted-foreground'>
                  &copy; 2025 PT. Sinergi Gula Nusantara
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </Card>


  )
}