"use client"
import { useEffect, useState } from 'react'
import { UserAuthForm } from '@/components/use-auth-form'
import { useAuth } from '@/contexts/auth-context';
import { AuthProvider } from '@/contexts/auth-context';


export default function SignIn() {
  return (
    <div className='relative w-full h-screen'>
      <div
        className='absolute inset-0 flex items-center justify-center p-10 text-white bg-muted'
        style={{
          backgroundImage: "url('./image.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-tl from-slate-800 to-slate-950 opacity-70' />

        <div className='relative z-20 flex flex-col h-full mx-auto w-100'>

          {/* Centered Auth Form */}
          <div className='flex items-center justify-center flex-grow'>
            <AuthProvider>
              <UserAuthForm />
            </AuthProvider>

          </div>

        </div>
      </div>
    </div>
  )
}