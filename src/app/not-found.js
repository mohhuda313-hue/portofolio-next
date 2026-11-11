
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] flex-col items-center justify-center px-4 text-center">

      <h1 className="text-7xl font-extrabold text-red-600 md:text-8xl">
        404
      </h1>

      <h2 className="mt-3 text-2xl font-bold text-utama dark:text-sky-200 md:text-3xl">
        Halaman tidak ditemukan
      </h2>

      <p className="mt-3 max-w-md text-gray-600 dark:text-gray-400">
        Maaf, halaman yang kamu cari tidak ada atau sudah dipindahkan.
        Silakan periksa kembali alamat halaman yang kamu buka.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-utama px-6 py-3 font-semibold text-white transition hover:opacity-80"
      >
        Kembali ke Beranda
      </Link>

    </main>
  );
}
