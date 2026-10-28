import Hero from '@/components/Hero';
import SkillCard from '@/components/SkillCard';
import Kartu from '@/components/Kartu';

const hobbies = [
  "volly",
  "membaca buku",
  "menulis",
  "mendengarkan musik",
  "bermain game",

];

const citaCitas = [
  "Menjadi programmer yang handal",
  "Bekerja di perusahaan teknologi terkemuka",
  "Guru ngaji"
];

const jadwals = [
  {id:"1", hari:"Senin", jam:"07.00 - 08.00", kegitan:"memahami modul UBIG"},
  {id:"2", hari:"Selasa", jam:"17.00 - 18.00", kegitan:"mempelajari modul UBIG"},
  {id:"3", hari:"Rabu", jam:"09.00 - 10.00", kegitan:"mempraktikkan modul UBIG"},
  {id:"4", hari:"Kamis", jam:"07.00 - 15.00", kegitan:"mengerjakan modul UBIG"},
  {id:"5", hari:"Jumat", jam:"07.00 - 09.00", kegitan:"membuat video modul UBIG"},
]

const skills = [
  {nama: "HTML", level: "Menengah"},
  {nama: "CSS", level: "Menengah"},
  {nama: "Git dan Githup", level: "Dasar"},
  {nama: "Desain poster dengan canva", level: "Mahir"},
  {nama: "JavaScript", level: "Dasar"},
];

export default function Home () {
  return ( 
    <main className="mx-auto max-w-5xl px-4 py-10 gap-10">
      <Hero
        nama="M.Miftakhul Huda"
        tagline="Siswa kelas IX SMK, calon Junior Web Developer di Kelas Industri UBIG"
      />

      <Kartu judul="Tentang Saya">
        <p className="text-gray-700">
          Halo! Saya M.Miftakhul Huda, seorang siswa SMK yang bersemangat dalam dunia pengembangan web. Saat ini, saya sedang menempuh pendidikan di kelas IX dan memiliki minat yang besar dalam mengembangkan keterampilan saya sebagai calon Junior Web Developer. Saya senang belajar hal-hal baru dan selalu berusaha untuk meningkatkan kemampuan saya dalam bidang ini.
        </p>
      </Kartu>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Kartu judul="Hobi">
          <ul className="list-disc pl-5 text-gray-700">
            {hobbies.map((hobi, index) => (
              <li key={index}>{hobi}</li>
            ))}
          </ul>
        </Kartu>

        <Kartu judul="Cita-cita">
          <ul className="list-disc pl-5 text-gray-700">
            {citaCitas.map((cita, index) => (
              <li key={index}>{cita}</li>
            ))}
          </ul>
        </Kartu>
      </div>

      <Kartu judul="Keahlian">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {skills.map((skill, index) => (
            <SkillCard key={index} nama={skill.nama} level={skill.level} />
          ))}
        </div>
      </Kartu>

        <Kartu judul="Jadwal Kegiatan">
          <table className="w-full border-collapse border border-gray-300 text-gray-700">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Hari</th>
                <th className="border border-gray-300 px-4 py-2">Jam</th>
                <th className="border border-gray-300 px-4 py-2">Kegiatan</th>
              </tr>
            </thead>
            <tbody>
              {jadwals.map((jadwal) => (
                <tr key={jadwal.id}>
                  <td className="border border-gray-300 px-4 py-2">{jadwal.hari}</td>
                  <td className="border border-gray-300 px-4 py-2">{jadwal.jam}</td>
                  <td className="border border-gray-300 px-4 py-2">{jadwal.kegitan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Kartu>  
    </main>
  );
}