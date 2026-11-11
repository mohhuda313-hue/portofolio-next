import Link from "next/link";
import Hero from "@/components/Hero";
import ProyekCard from "@/components/ProyekCard";
import SkillCard from "@/components/SkillCard";
import { proyek } from "@/data/proyek";
import Kartu from "@/components/Kartu";

const skills = [
  { nama: "HTML", level: "Menengah" },
  { nama: "CSS", level: "Menengah" },
  { nama: "Git dan GitHub", level: "Dasar" },
  { nama: "Desain poster dengan Canva", level: "Mahir" },
  { nama: "JavaScript", level: "Dasar" },
];

const proyekTerbaru = proyek.slice(-3);

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-10">

      <Hero
        nama="M.Miftakhul Huda"
        tagline="Siswa SMK calon Junior Web Developer di Kelas Industri UBIG"
      />

      {/* Keahlian */}
      <Kartu judul="Keahlian">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {skills.map((skill, index) => (
            <SkillCard
              key={index}
              nama={skill.nama}
              level={skill.level}
            />
          ))}
        </div>
      </Kartu>

      {/* Proyek Terbaru */}
      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-bold text-utama dark:text-sky-200">
          Proyek Terbaru
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {proyekTerbaru.map((item) => (
            <ProyekCard key={item.slug} proyek={item} />
          ))}
        </div>

        <Link
          href="/proyek"
          className="mt-6 inline-block rounded-lg bg-utama px-5 py-2 font-semibold text-white"
        >
          Lihat Semua Proyek
        </Link>
      </section>

    </main>
  );
}

export const metadata = {
  title: "Beranda",
  description: "Portofolio M.Miftakhul Huda, calon Junior Web Developer.",
};
