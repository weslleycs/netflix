import { useAuthStore } from "@/entities/session/model/auth.store"
import { useNavigate } from "react-router-dom"
import { loginSchema, type LoginFormValues } from "../schema/loginSchema"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginUser } from "../../api/auth"
import { useState } from "react"

export function useLoginForm() {
   const navigate = useNavigate()
   const [successMessage, setSuccessMessage] = useState<string | null>(null);
   const setAuth = useAuthStore((s) => s.setAuth)

   const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
     resolver: zodResolver(loginSchema),
   })

   const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    
     try {
       const data = await loginUser(values)  
       setAuth({ token: data.token, user: { id: data.id, name: data.name, email: data.email } })
       setSuccessMessage('Login in')
       navigate('/movies')
     } catch (err: any) {
       if (err?.response?.status === 401) {
         setError('root', { message: 'Email or password invalids' })
       } else {
         setError('root', { message: 'Something went wrong. Please try again.' })
       }
     }
    }

   return { register, handleSubmit, errors, isSubmitting, onSubmit,successMessage }
 }