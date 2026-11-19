
import Link from "next/link";
import Hero from "@/components/Hero";
import ProyekCard from "@/components/ProyekCard";
import SkillCard from "@/components/SkillCard";
import { supabase } from "@/lib/supabase";
import Kartu from "@/components/Kartu";
import { buttonVariants } from "@/components/ui/button";

export const revalidate = 60;

export default async function Home() {
  // Mengambil data keahlian
  const { data: skills, error: errorSkills } = await supabase
    .from("skills")
    .select("*")
    .order("id");

  // Mengambil data proyek terbaru
  const { data: proyekTerbaru, error: errorProyek } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  // Menampilkan error di terminal
  if (errorSkills) {
    console.error("Error Skills:", errorSkills.message);
  }

  if (errorProyek) {
    console.error("Error Proyek:", errorProyek.message);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-10">

      <Hero
        nama="M.Miftakhul Huda"
        tagline="Siswa SMK calon Junior Web Developer di Kelas Industri UBIG"
      />

      {/* Keahlian */}
      <Kartu judul="Keahlian">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {skills && skills.length > 0 ? (
            skills.map((skill) => (
              <SkillCard
                key={skill.id}
                nama={skill.nama}
                level={skill.level}
              />
            ))
          ) : (
            <p>Data keahlian belum tersedia.</p>
          )}
        </div>
      </Kartu>

      {/* Proyek Terbaru */}
      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-bold text-primary">
          Proyek Terbaru
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {proyekTerbaru && proyekTerbaru.length > 0 ? (
            proyekTerbaru.map((item) => (
              <ProyekCard key={item.slug} proyek={item} />
            ))
          ) : (
            <p>Data proyek belum tersedia.</p>
          )}
        </div>

        <Link
          href="/proyek"
          className={buttonVariants({
            size: "lg",
            className: "mt-6",
          })}
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
