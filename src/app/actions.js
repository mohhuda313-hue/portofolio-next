
"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function kirimPesan(stateSebelum, formData) {
    const nama = (formData.get("nama") || "").trim();
    const pesan = (formData.get("pesan") || "").trim();

    // Validasi isian
    if (nama === "" || pesan === "") {
        return {
            error: "Nama dan pesan wajib diisi.",
            nama,
            pesan,
        };
    }

    // Simpan pesan ke Supabase
    const { error } = await supabase
        .from("buku_tamu")
        .insert({ nama, pesan });

    if (error) {
        return {
            error: `Pesan gagal disimpan: ${error.message}`,
            nama,
            pesan,
        };
    }

    // Perbarui halaman Buku Tamu
    revalidatePath("/buku-tamu");

    return {
        berhasil: `Terima kasih, ${nama}! Pesanmu sudah tersimpan.`,
    };
}
