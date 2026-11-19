import FormKontak from "@/components/FormKontak";

export const metadata = {
  title: "Kontak",
  description:
    "Hubungi M.Miftakhul Huda melalui form kontak, email, atau GitHub.",
};

export default function Kontak() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold text-primary md:text-4xl">
        Hubungi Saya
      </h1>

      <p className="mt-3 text-muted-foreground">
        Punya pertanyaan atau ingin bekerja sama?
        Isi form berikut.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm md:col-span-2">
          <FormKontak />
        </section>

        <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-primary">
            Temukan Saya di
          </h2>

          <div className="space-y-4">
            <div>
              <p className="font-semibold text-muted-foreground">GitHub</p>
              <a
                href="https://github.com/mohhuda313-hue"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-red-700 hover:underline"
              >
                Kunjungi GitHub
              </a>
            </div>

            <div>
              <p className="font-semibold text-muted-foreground">Email</p>
              <a
                href="mailto:mohhuda313@gmail.com"
                className="text-sm text-red-700 hover:underline"
              >
                mohhuda313@gmail.com
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}