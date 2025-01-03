import Link from "next/link";

export default function Footer() {
  return (
    <footer className="pt-8 pb-4 bg-green-50 text-green-800 border-t-2 border-green-700">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-start gap-8 px-4">
        <div className="flex-1 min-w-[200px]">
          <h2 className="text-lg font-semibold mb-4">Links Rápidos</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-green-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/sobre" className="hover:text-green-600 transition">
                Sobre
              </Link>
            </li>
            <li>
              <Link
                href="/contatos"
                className="hover:text-green-600 transition"
              >
                Contatos
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex-1 min-w-[200px]">
          <h2 className="text-lg font-semibold mb-4">Contato</h2>
          <p className="mb-2">
            <span className="font-medium">Email:</span> exemplo@exemplo.com
          </p>
          <p>
            <span className="font-medium">Telefone:</span> (00) 90000-0000
          </p>
        </div>
      </div>
      <div className="text-center mt-6 bg-green-50 py-4">
        <p className="text-sm font-medium">
          &copy; {new Date().getFullYear()} Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
