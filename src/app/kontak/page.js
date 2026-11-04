
export const metadata = {
  title: "Kontak",
  description:
    "Hubungi M.Miftakhul Huda melalui form kontak, email, atau GitHub.",
};

export default function Kontak() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">

      <h1 className="text-3xl font-bold text-utama md:text-4xl">
        Hubungi Saya
      </h1>

      <p className="mt-3 text-gray-700">
        Punya pertanyaan atau ingin bekerja sama?
        Isi form berikut.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">

        {/* Form Kontak */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:col-span-2">

          <form className="space-y-4">

            {/* Nama */}
            <div>
              <label htmlFor="nama" className="block font-semibold">
                Nama lengkap
              </label>

              <input
                type="text"
                id="nama"
                name="nama"
                placeholder="Contoh: M.Miftakhul Huda"
                required
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-semibold">
                Email
              </label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="nama@email.com"
                required
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500"
              />
            </div>

            {/* Nomor HP */}
            <div>
              <label htmlFor="hp" className="block font-semibold">
                Nomor HP
              </label>

              <input
                type="tel"
                id="hp"
                name="hp"
                placeholder="081234567890"
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500"
              />
            </div>

            {/* Keperluan */}
            <div>
              <label htmlFor="keperluan" className="block font-semibold">
                Keperluan
              </label>

              <select
                id="keperluan"
                name="keperluan"
                required
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500"
              >
                <option value="">-- Pilih keperluan --</option>
                <option value="Kerja sama">Kerja sama</option>
                <option value="Pertanyaan">Pertanyaan</option>
                <option value="Proyek website">Proyek website</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            {/* Pesan */}
            <div>
              <label htmlFor="pesan" className="block font-semibold">
                Pesan
              </label>

              <textarea
                id="pesan"
                name="pesan"
                rows={5}
                maxLength={300}
                placeholder="Tulis pesanmu di sini..."
                required
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500"
              />
            </div>

            {/* Tombol */}
            <button
              type="button"
              className="rounded-lg bg-red-700 px-5 py-2 font-semibold text-white hover:bg-red-800"
            >
              Kirim Pesan
            </button>

            <p className="text-sm text-gray-500">
              Form ini belum mengirim pesan. Pengiriman pesan
              akan dibuat di Minggu 15.
            </p>

          </form>
        </div>

        {/* Temukan Saya */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="mb-4 text-xl font-bold text-utama">
            Temukan Saya di
          </h2>

          <div className="space-y-4">

            <div>
              <p className="font-semibold text-gray-700">
                GitHub
              </p>

              <a
                href="https://github.com/mohhuda313-hue/portofolio-next.git"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-red-700 hover:underline"
              >
                Kunjungi GitHub
              </a>
            </div>

            <div>
              <p className="font-semibold text-gray-700">
                Email
              </p>

              <a
                href="mailto:mohhuda313@gmail.com"
                className="text-sm text-red-700 hover:underline"
              >
                mohhuda313@gmail.com
              </a>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
