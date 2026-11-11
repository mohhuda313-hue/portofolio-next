
"use client";

import { useState } from "react";

const kelasInput =
  "mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2";

export default function FormKontak() {
  // Kode 6.8: State semua isian
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const [pesan, setPesan] = useState("");
  const [error, setError] = useState({});
  const [berhasil, setBerhasil] = useState(false);

  function kirim(e) {
    e.preventDefault();

    const errorBaru = {};

    // Pemeriksaan Nama
    if (nama.trim() === "") {
      errorBaru.nama = "Nama wajib diisi.";
    }

    // Pemeriksaan Email
    if (!email.includes("@")) {
      errorBaru.email =
        "Email harus memuat tanda @, contoh nama@gmail.com.";
    }

    // Kode 6.10: Pemeriksaan tambahan
    if (hp.length < 10) {
      errorBaru.hp = "Nomor HP minimal 10 angka.";
    }

    if (keperluan === "") {
      errorBaru.keperluan = "Pilih salah satu keperluan.";
    }

    if (pesan.trim().length < 10) {
      errorBaru.pesan = "Pesan minimal 10 karakter.";
    }

    setError(errorBaru);

    setBerhasil(Object.keys(errorBaru).length === 0);
  }

  return (
    <form
      onSubmit={kirim}
      noValidate
      className="space-y-4"
    >
      {/* Nama */}
      <div>
        <label htmlFor="nama" className="block font-semibold">
          Nama lengkap
        </label>

        <input
          type="text"
          id="nama"
          name="nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Contoh: M.Miftakhul Huda"
          className={kelasInput}
        />

        {error.nama && (
          <p className="mt-1 text-sm text-aksen dark:text-red-300">
            {error.nama}
          </p>
        )}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nama@gmail.com"
          className={kelasInput}
        />

        {error.email && (
          <p className="mt-1 text-sm text-aksen dark:text-red-300">
            {error.email}
          </p>
        )}
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
          value={hp}
          onChange={(e) => setHp(e.target.value)}
          placeholder="081234567890"
          className={kelasInput}
        />

        {error.hp && (
          <p className="mt-1 text-sm text-aksen dark:text-red-300">
            {error.hp}
          </p>
        )}
      </div>

      {/* Keperluan - Kode 6.9 */}
      <div>
        <label htmlFor="keperluan" className="block font-semibold">
          Keperluan
        </label>

        <select
          id="keperluan"
          name="keperluan"
          value={keperluan}
          onChange={(e) => setKeperluan(e.target.value)}
          className={kelasInput}
        >
          <option value="">-- Pilih keperluan --</option>
          <option value="bertanya">Bertanya</option>
          <option value="kerja-sama">Kerja sama proyek</option>
          <option value="lainnya">Lainnya</option>
        </select>

        {error.keperluan && (
          <p className="mt-1 text-sm text-aksen dark:text-red-300">
            {error.keperluan}
          </p>
        )}
      </div>

      {/* Pesan */}
      <div>
        <label htmlFor="pesan" className="block font-semibold">
          Pesan
        </label>

        <textarea
          id="pesan"
          name="pesan"
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          rows={5}
          maxLength={300}
          placeholder="Tulis pesanmu di sini..."
          className={kelasInput}
        />

        {error.pesan && (
          <p className="mt-1 text-sm text-aksen dark:text-red-300">
            {error.pesan}
          </p>
        )}
      </div>

      {/* Tombol */}
      <button
        type="submit"
        className="rounded-lg bg-red-700 px-5 py-2 font-semibold text-white hover:bg-red-800"
      >
        Kirim Pesan
      </button>

      <p className="text-sm text-gray-500">
        Form ini belum mengirim pesan. Pengiriman pesan
        akan dibuat di Minggu 15.
      </p>

      {/* Kode 6.11: Pesan berhasil */}
      {berhasil && (
        <p className="rounded-lg bg-green-100 p-3 text-green-800 dark:bg-green-900 dark:text-green-100">
          Terima kasih, {nama}! Pesanmu sudah lolos pemeriksaan.
        </p>
      )}
    </form>
  );
}
