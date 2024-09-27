import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Checklist App - Clinica Veterinaria',
  description: 'Aplicación de chequeo y trazabilidad de requisitos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">COMPAÑÍA Clinica Veterinaria</h1>
        </header>
        {children}
      </body>
    </html>
  )
}