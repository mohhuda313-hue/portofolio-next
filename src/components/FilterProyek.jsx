
"use client";

import { useState } from "react";
import ProyekCard from "@/components/ProyekCard";

const daftarKategori = ["Semua", "HTML", "CSS", "Next.js"];

const tombolBiasa =
  "rounded-full border border-utama dark:border-sky-200 px-4 py-2 text-sm font-semibold text-utama dark:text-sky-200 transition hover:bg-utama hover:text-white";

const tombolAktif =
  "rounded-full border border-aksen bg-aksen px-4 py-2 text-sm font-semibold text-white";

export default function FilterProyek({ proyek = [] }) {
  const [kategori, setKategori] = useState("Semua");
  const [kata, setKata] = useState("");

  // Mengubah kata pencarian menjadi huruf kecil
  const kataKecil = kata.toLowerCase().trim();

  // Filter proyek
  const hasil = proyek.filter((p) => {
    const teknologi = Array.isArray(p.teknologi)
      ? p.teknologi
      : (p.teknologi || "").split(",");

    const daftarTeknologi = teknologi.map((item) =>
      String(item).trim().toLowerCase()
    );

    // Kode 6.5: Pencarian kategori
    const cocokKategori =
      kategori === "Semua" ||
      p.kategori === kategori ||
      daftarTeknologi.includes(kategori.toLowerCase());

    // Kode 6.5: Pencarian judul dan deskripsi
    const judul = String(
      p.judul || p.nama_project || ""
    ).toLowerCase();

    const deskripsi = String(
      p.deskripsi || ""
    ).toLowerCase();

    const cocokJudul = judul.includes(kataKecil);
    const cocokDeskripsi = deskripsi.includes(kataKecil);

    const cocokKata = cocokJudul || cocokDeskripsi;

    return cocokKategori && cocokKata;
  });

  return (
    <div className="mt-8">

      {/* Filter Kategori */}
      <div className="flex flex-wrap gap-2">
        {daftarKategori.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKategori(k)}
            className={
              kategori === k ? tombolAktif : tombolBiasa
            }
          >
            {k}
          </button>
        ))}
      </div>

      {/* Kotak Pencarian */}
      <div className="mt-6">
        <label
          htmlFor="cari"
          className="block font-semibold"
        >
          Cari proyek
        </label>

        <input
          id="cari"
          type="text"
          value={kata}
          onChange={(e) => setKata(e.target.value)}
          placeholder="Cari judul atau deskripsi proyek..."
          className="mt-2 w-full max-w-md rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-3 outline-none focus:border-blue-500"
        />

        {/* Kode 6.6: Tombol Hapus Pencarian */}
        {kata !== "" && (
          <button
            type="button"
            onClick={() => setKata("")}
            className="mt-2 text-sm font-semibold text-aksen dark:text-red-300 hover:underline"
          >
            Hapus pencarian
          </button>
        )}
      </div>

      {/* Kode 6.7: Jumlah Hasil */}
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Menampilkan {hasil.length} dari {proyek.length} proyek
      </p>

      {/* Daftar Proyek */}
      {hasil.length > 0 ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hasil.map((item) => (
            <ProyekCard
              key={
                item.slug ||
                item.id_project ||
                item.id
              }
              proyek={item}
            />
          ))}
        </div>
      ) : (
        <p className="mt-6 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 p-6 text-center text-gray-500">
          Belum ada proyek yang cocok.
        </p>
      )}

    </div>
  );
}
