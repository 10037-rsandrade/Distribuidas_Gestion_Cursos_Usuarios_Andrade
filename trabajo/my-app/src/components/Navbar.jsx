import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-white shadow-lg">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-3">
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Sistema de Cursos
                        </span>
                    </Link>
                    <div className="flex space-x-6">
                        <Link 
                            href="/usuarios" 
                            className="px-4 py-2 text-gray-900 hover:text-blue-700 font-semibold transition-colors duration-200"
                        >
                            Usuarios
                        </Link>
                        <Link 
                            href="/cursos" 
                            className="px-4 py-2 text-gray-900 hover:text-blue-700 font-semibold transition-colors duration-200"
                        >
                            Cursos
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
} 