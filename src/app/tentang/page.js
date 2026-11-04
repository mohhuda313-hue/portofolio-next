
import Kartu from "@/components/Kartu";

const hobbies = [
  "Bermain voli",
  "Membaca buku",
  "Menulis",
  "Mendengarkan musik",
  "Bermain game",
];

const citaCitas = [
  "Menjadi programmer yang handal",
  "Bekerja di perusahaan teknologi terkemuka",
  "Menjadi guru ngaji",
];

const jadwals = [
  {
    id: "1",
    hari: "Senin",
    jam: "07.00 - 08.00",
    kegiatan: "Memahami modul UBIG",
  },
  {
    id: "2",
    hari: "Selasa",
    jam: "17.00 - 18.00",
    kegiatan: "Mempelajari modul UBIG",
  },
  {
    id: "3",
    hari: "Rabu",
    jam: "09.00 - 10.00",
    kegiatan: "Mempraktikkan modul UBIG",
  },
  {
    id: "4",
    hari: "Kamis",
    jam: "07.00 - 15.00",
    kegiatan: "Mengerjakan modul UBIG",
  },
  {
    id: "5",
    hari: "Jumat",
    jam: "07.00 - 09.00",
    kegiatan: "Membuat video modul UBIG",
  },
];

export const metadata = {
  title: "Tentang Saya",
  description:
    "Cerita, hobi, cita-cita, dan jadwal belajar M.Miftakhul Huda.",
};

export default function Tentang() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-6">

      <h1 className="text-3xl font-bold text-utama md:text-4xl">
        Tentang Saya
      </h1>

      {/* Perkenalan */}
      <Kartu judul="Perkenalan">
        <p className="text-gray-700">
          Halo! Saya M.Miftakhul Huda, seorang siswa SMK yang
          bersemangat dalam dunia pengembangan web. Saat ini,
          saya sedang menempuh pendidikan di jurusan Rekayasa
          Perangkat Lunak (RPL). Saya memiliki minat besar dalam
          pengembangan website dan ingin terus meningkatkan
          kemampuan sebagai calon Junior Web Developer.
        </p>
      </Kartu>

      {/* Hobi dan Cita-cita */}
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

      {/* Jadwal Belajar */}
      <Kartu judul="Jadwal Belajar">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-gray-700">
            <thead>
              <tr className="bg-utama text-white">
                <th className="border border-gray-300 px-4 py-2">
                  Hari
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Waktu
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Kegiatan
                </th>
              </tr>
            </thead>

            <tbody>
              {jadwals.map((jadwal) => (
                <tr key={jadwal.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {jadwal.hari}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {jadwal.jam}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {jadwal.kegiatan}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Kartu>

    </main>
  );
}
