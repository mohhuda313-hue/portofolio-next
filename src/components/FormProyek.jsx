"use client";

import { useActionState } from "react";

import TombolKirim from "@/components/TombolKirim";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FormProyek({
    aksi,
    proyek,
    teksTombol,
}) {
    const [state, formAction] = useActionState(aksi, {
        proyek,
        error: "",
    });

    const nilai = state?.proyek || proyek;

    const fiturValue = Array.isArray(nilai.fitur)
        ? nilai.fitur.join("\n")
        : nilai.fitur || "";

    return (
        <form
            action={formAction}
            className="w-full space-y-4"
        >
            <input
                type="hidden"
                name="id"
                value={nilai.id || ""}
            />

            {/* JUDUL */}
            <div className="space-y-2">
                <Label htmlFor="judul">
                    Judul
                </Label>

                <Input
                    id="judul"
                    name="judul"
                    defaultValue={nilai.judul || ""}
                    placeholder="Contoh: Website Buku Tamu"
                    required
                    className="w-full"
                />
            </div>

            {/* SLUG */}
            <div className="space-y-2">
                <Label htmlFor="slug">
                    Slug (alamat halaman detail)
                </Label>

                <Input
                    id="slug"
                    name="slug"
                    defaultValue={nilai.slug || ""}
                    placeholder="Contoh: buku-tamu"
                    required
                    className="w-full"
                />

                <p className="text-xs text-muted-foreground">
                    Gunakan huruf kecil dan tanda hubung.
                </p>
            </div>

            {/* KATEGORI */}
            <div className="space-y-2">
                <Label htmlFor="kategori">
                    Kategori
                </Label>

                <Input
                    id="kategori"
                    name="kategori"
                    defaultValue={nilai.kategori || ""}
                    placeholder="HTML, CSS, JavaScript, atau Next.js"
                    required
                    className="w-full"
                />
            </div>

            {/* DESKRIPSI */}
            <div className="space-y-2">
                <Label htmlFor="deskripsi">
                    Deskripsi singkat
                </Label>

                <Textarea
                    id="deskripsi"
                    name="deskripsi"
                    rows={3}
                    defaultValue={nilai.deskripsi || ""}
                    placeholder="Tuliskan deskripsi singkat proyek..."
                    required
                    className="w-full"
                />
            </div>

            {/* FITUR */}
            <div className="space-y-2">
                <Label htmlFor="fitur">
                    Yang saya pelajari (satu baris satu poin)
                </Label>

                <Textarea
                    id="fitur"
                    name="fitur"
                    rows={3}
                    defaultValue={fiturValue}
                    placeholder={"Server Action\nValidasi Form\nCRUD Data"}
                    className="w-full"
                />

                <p className="text-xs text-muted-foreground">
                    Masukkan satu fitur pada setiap baris.
                </p>
            </div>

            {/* GAMBAR */}
            <div className="space-y-2">
                <Label htmlFor="gambar_url">
                    Alamat gambar
                </Label>

                <Input
                    id="gambar_url"
                    name="gambar_url"
                    defaultValue={nilai.gambar_url || ""}
                    placeholder="/proyek/proyek-buku-tamu.png"
                    className="w-full"
                />
            </div>

            {/* PESAN ERROR */}
            {state?.error && (
                <p className="text-sm text-red-600">
                    {state.error}
                </p>
            )}

            {/* TOMBOL */}
            <TombolKirim teks={teksTombol} />
        </form>
    );
}