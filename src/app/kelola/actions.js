
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { sudahMasuk } from "@/lib/pin";
import { supabaseAdmin } from "@/lib/supabase-admin";

// Login menggunakan PIN
export async function masukKelola(stateSebelum, formData) {
    const pin = formData.get("pin");

    if (pin !== process.env.ADMIN_PIN) {
        return {
            error: "PIN salah. Coba lagi.",
        };
    }

    const kue = await cookies();

    kue.set("pin_admin", pin, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60,
        path: "/",
        secure: process.env.NODE_ENV === "production",
    });

    revalidatePath("/kelola");

    return {};
}

// Keluar dari halaman kelola
export async function keluarKelola() {
    const kue = await cookies();

    kue.delete("pin_admin");

    revalidatePath("/kelola");
}

// Sematkan atau lepas sematan pesan
export async function sematkanPesan(formData) {
    if (!(await sudahMasuk())) {
        return;
    }

    const id = formData.get("id");
    const sematkan = formData.get("sematkan") === "ya";

    await supabaseAdmin
        .from("buku_tamu")
        .update({ disematkan: sematkan })
        .eq("id", id);

    revalidatePath("/kelola");
    revalidatePath("/buku-tamu");
}

// Menghapus pesan
export async function hapusPesan(formData) {
    if (!(await sudahMasuk())) {
        return;
    }

    const id = formData.get("id");

    await supabaseAdmin
        .from("buku_tamu")
        .delete()
        .eq("id", id);

    revalidatePath("/kelola");
    revalidatePath("/buku-tamu");
}
