"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { sudahMasuk } from "@/lib/pin";
import { supabaseAdmin } from "@/lib/supabase-admin";

// MEMBACA DATA PROYEK DARI FORM
function bacaProyek(formData) {
    return {
        judul: String(formData.get("judul") || "").trim(),
        slug: String(formData.get("slug") || "")
            .trim()
            .toLowerCase(),
        kategori: String(formData.get("kategori") || "").trim(),
        deskripsi: String(formData.get("deskripsi") || "").trim(),
        fitur: String(formData.get("fitur") || "")
            .split("\n")
            .map((item) => item.trim())
            .filter((item) => item !== ""),
        gambar_url: String(formData.get("gambar_url") || "").trim(),
    };
}

// VALIDASI DATA PROYEK
function cekProyek(proyek) {
    if (
        !proyek.judul ||
        !proyek.slug ||
        !proyek.kategori ||
        !proyek.deskripsi
    ) {
        return "Judul, slug, kategori, dan deskripsi wajib diisi.";
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(proyek.slug)) {
        return "Slug tidak boleh memakai spasi. Gunakan tanda hubung, contoh: buku-tamu.";
    }

    return "";
}

// MEMPERBARUI HALAMAN
function perbaruiHalaman(slug) {
    revalidatePath("/");
    revalidatePath("/proyek");
    revalidatePath("/kelola");
    revalidatePath("/buku-tamu");

    if (slug) {
        revalidatePath(`/proyek/${slug}`);
    }
}

// LOGIN PIN
export async function masukKelola(stateSebelum, formData) {
    const pin = String(formData.get("pin") || "");

    if (!process.env.ADMIN_PIN) {
        return {
            error: "ADMIN_PIN belum diatur di environment.",
        };
    }

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
    redirect("/kelola");
}

// KELUAR DARI HALAMAN KELOLA
export async function keluarKelola() {
    const kue = await cookies();

    kue.delete("pin_admin");

    revalidatePath("/kelola");
    redirect("/kelola");
}

// =====================================
// TAMBAH PROYEK
// =====================================
export async function tambahProyek(stateSebelum, formData) {
    const proyek = bacaProyek(formData);

    if (!(await sudahMasuk())) {
        return {
            error: "Masukkan PIN terlebih dahulu di halaman Kelola.",
            proyek,
        };
    }

    const error = cekProyek(proyek);

    if (error) {
        return {
            error,
            proyek,
        };
    }

    const { error: errorSimpan } = await supabaseAdmin
        .from("projects")
        .insert(proyek);

    if (errorSimpan) {
        if (errorSimpan.code === "23505") {
            return {
                error: "Slug sudah digunakan proyek lain.",
                proyek,
            };
        }

        return {
            error: `Proyek gagal disimpan: ${errorSimpan.message}`,
            proyek,
        };
    }

    perbaruiHalaman(proyek.slug);

    redirect("/kelola");
}

// =====================================
// UBAH PROYEK
// =====================================
export async function ubahProyek(stateSebelum, formData) {
    const id = String(formData.get("id") || "");
    const proyek = bacaProyek(formData);

    if (!(await sudahMasuk())) {
        return {
            error: "Masukkan PIN terlebih dahulu di halaman Kelola.",
            proyek: { ...proyek, id },
        };
    }

    if (!id) {
        return {
            error: "ID proyek tidak ditemukan.",
            proyek: { ...proyek, id },
        };
    }

    const error = cekProyek(proyek);

    if (error) {
        return {
            error,
            proyek: { ...proyek, id },
        };
    }

    // Ambil slug lama
    const { data: proyekLama, error: errorLama } = await supabaseAdmin
        .from("projects")
        .select("slug")
        .eq("id", id)
        .single();

    if (errorLama || !proyekLama) {
        return {
            error: "Proyek tidak ditemukan.",
            proyek: { ...proyek, id },
        };
    }

    // Update data proyek
    const { error: errorUbah } = await supabaseAdmin
        .from("projects")
        .update(proyek)
        .eq("id", id);

    if (errorUbah) {
        if (errorUbah.code === "23505") {
            return {
                error: "Slug sudah digunakan proyek lain.",
                proyek: { ...proyek, id },
            };
        }

        return {
            error: `Proyek gagal diubah: ${errorUbah.message}`,
            proyek: { ...proyek, id },
        };
    }

    // Perbarui cache slug lama dan baru
    perbaruiHalaman(proyekLama.slug);
    perbaruiHalaman(proyek.slug);

    redirect("/kelola");
}

// =====================================
// HAPUS PROYEK
// =====================================
export async function hapusProyek(formData) {
    if (!(await sudahMasuk())) {
        return;
    }

    const id = String(formData.get("id") || "");

    if (!id) return;

    const { data: proyek } = await supabaseAdmin
        .from("projects")
        .select("slug")
        .eq("id", id)
        .single();

    const { error } = await supabaseAdmin
        .from("projects")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(`Proyek gagal dihapus: ${error.message}`);
    }

    perbaruiHalaman(proyek?.slug);
}

// =====================================
// SEMATKAN PESAN BUKU TAMU
// =====================================
export async function sematkanPesan(formData) {
    if (!(await sudahMasuk())) {
        return;
    }

    const id = String(formData.get("id") || "");
    const sematkan = formData.get("sematkan") === "ya";

    if (!id) return;

    const { error } = await supabaseAdmin
        .from("buku_tamu")
        .update({ disematkan: sematkan })
        .eq("id", id);

    if (error) {
        throw new Error(`Pesan gagal diperbarui: ${error.message}`);
    }

    revalidatePath("/kelola");
    revalidatePath("/buku-tamu");
}

// =====================================
// HAPUS PESAN BUKU TAMU
// =====================================
export async function hapusPesan(formData) {
    if (!(await sudahMasuk())) {
        return;
    }

    const id = String(formData.get("id") || "");

    if (!id) return;

    const { error } = await supabaseAdmin
        .from("buku_tamu")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(`Pesan gagal dihapus: ${error.message}`);
    }

    revalidatePath("/kelola");
    revalidatePath("/buku-tamu");
}