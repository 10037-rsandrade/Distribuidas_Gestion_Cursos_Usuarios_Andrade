import { Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'] 
})

export const metadata = {
  title: 'Sistema de Gestión de Cursos',
  description: 'Sistema de gestión de cursos y usuarios',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${poppins.className} bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen`}>
        <Navbar />
        <main className="container mx-auto p-6">
          {children}
        </main>
      </body>
    </html>
  )
}
