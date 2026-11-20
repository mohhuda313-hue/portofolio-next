"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

// KIRIM PESAN BUKU TAMU
export async function kirimPesan(stateSebelum, formData) {
    const nama = String(formData.get("nama") || "").trim();
    const pesan = String(formData.get("pesan") || "").trim();

    // VALIDASI
    if (!nama || !pesan) {
        return {
            error: "Nama dan pesan wajib diisi.",
            nama,
            pesan,
        };
    }

    if (nama.length > 100) {
        return {
            error: "Nama maksimal 100 karakter.",
            nama,
            pesan,
        };
    }

    if (pesan.length > 1000) {
        return {
            error: "Pesan maksimal 1000 karakter.",
            nama,
            pesan,
        };
    }

    // SIMPAN KE SUPABASE
    const { error } = await supabaseAdmin
        .from("buku_tamu")
        .insert({
            nama,
            pesan,
        });

    if (error) {
        return {
            error: `Pesan gagal dikirim: ${error.message}`,
            nama,
            pesan,
        };
    }

    // PERBARUI HALAMAN
    revalidatePath("/buku-tamu");
    revalidatePath("/kelola");

    // HASIL BERHASIL
    return {
        berhasil: "Terima kasih, pesanmu sudah tersimpan.",
        nama: "",
        pesan: "",
    };
}