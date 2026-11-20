"use client";

import { useActionState } from "react";
import { toast } from "sonner";

import { kirimPesan } from "@/app/buku-tamu/actions";

import TombolKirim from "@/components/TombolKirim";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// MEMBUNGKUS AKSI KIRIM PESAN DENGAN NOTIFIKASI
async function kirimDanBeritahu(stateSebelum, formData) {
    const hasil = await kirimPesan(stateSebelum, formData);

    if (hasil?.berhasil) {
        toast.success(hasil.berhasil);
    }

    if (hasil?.error) {
        toast.error(hasil.error);
    }

    return hasil;
}

export default function FormBukuTamu() {
    const [state, formAction] = useActionState(
        kirimDanBeritahu,
        {
            error: "",
            berhasil: "",
        }
    );

    return (
        <form
            action={formAction}
            className="w-full space-y-4"
        >
            {/* NAMA */}
            <div className="space-y-2">
                <Label htmlFor="nama">
                    Nama
                </Label>

                <Input
                    id="nama"
                    name="nama"
                    type="text"
                    placeholder="Contoh: Budi Santoso"
                    defaultValue={state?.nama || ""}
                    required
                    className="w-full"
                />
            </div>

            {/* PESAN */}
            <div className="space-y-2">
                <Label htmlFor="pesan">
                    Pesan
                </Label>

                <Textarea
                    id="pesan"
                    name="pesan"
                    rows={4}
                    placeholder="Tulis kesan atau sapaanmu..."
                    defaultValue={state?.pesan || ""}
                    required
                    className="w-full"
                />
            </div>

            {/* PESAN ERROR */}
            {state?.error && (
                <p className="text-sm text-red-600">
                    {state.error}
                </p>
            )}

            {/* PESAN BERHASIL */}
            {state?.berhasil && (
                <p className="text-sm text-green-600">
                    {state.berhasil}
                </p>
            )}

            {/* TOMBOL KIRIM */}
            <TombolKirim teks="Kirim Pesan" />
        </form>
    );
}