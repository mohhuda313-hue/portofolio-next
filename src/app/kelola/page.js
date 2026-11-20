import Link from "next/link";

import FormPin from "@/components/FormPin";
import KonfirmasiHapus from "@/components/KonfirmasiHapus";

import { Badge } from "@/components/ui/badge";

import {
    Button,
    buttonVariants,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { sudahMasuk } from "@/lib/pin";
import { supabaseAdmin } from "@/lib/supabase-admin";

import {
    hapusPesan,
    hapusProyek,
    keluarKelola,
    sematkanPesan,
} from "./actions";

export const metadata = {
    title: "Kelola Data",
};

export default async function Kelola() {
    if (!(await sudahMasuk())) {
        return (
            <main className="mx-auto w-full max-w-md px-4 py-10">
                <h1 className="text-3xl font-bold text-primary">
                    Kelola Data
                </h1>

                <p className="mt-3 text-muted-foreground">
                    Halaman ini khusus pemilik portofolio.
                </p>

                <Card className="mt-6">
                    <CardContent className="pt-6">
                        <FormPin />
                    </CardContent>
                </Card>
            </main>
        );
    }

    // MENGAMBIL DATA PESAN BUKU TAMU
    const {
        data: daftarPesan,
        error: errorPesan,
    } = await supabaseAdmin
        .from("buku_tamu")
        .select("*")
        .order("created_at", { ascending: false });

    // MENGAMBIL DATA PROYEK
    const {
        data: daftarProyek,
        error: errorProyek,
    } = await supabaseAdmin
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <main className="mx-auto w-full max-w-3xl px-4 py-10">

            {/* HEADER */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-primary">
                    Kelola Data
                </h1>

                <form action={keluarKelola}>
                    <Button type="submit" variant="outline">
                        Keluar
                    </Button>
                </form>
            </div>

            {/* DAFTAR PROYEK */}
            <div className="mt-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-primary">
                    Proyek
                </h2>

                <Link
                    href="/kelola/proyek/baru"
                    className={buttonVariants()}
                >
                    Tambah Proyek
                </Link>
            </div>

            {errorProyek && (
                <p className="mt-4 text-sm text-red-600">
                    Gagal mengambil proyek: {errorProyek.message}
                </p>
            )}

            <div className="mt-4 space-y-3">
                {daftarProyek?.length > 0 ? (
                    daftarProyek.map((item) => (
                        <Card key={item.id} size="sm">
                            <CardHeader>
                                <CardTitle>
                                    {item.judul}
                                </CardTitle>

                                <CardDescription>
                                    {item.kategori}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="flex gap-2">
                                <Link
                                    href={`/kelola/proyek/${item.id}`}
                                    className={buttonVariants({
                                        variant: "outline",
                                        size: "sm",
                                    })}
                                >
                                    Ubah
                                </Link>

                                <KonfirmasiHapus
                                    id={item.id}
                                    aksi={hapusProyek}
                                    judul="Hapus proyek ini?"
                                    keterangan={`Proyek ${item.judul} akan dihapus dari halaman Proyek dan Beranda.`}
                                />
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className="text-sm text-muted-foreground">
                        Belum ada proyek.
                    </p>
                )}
            </div>

            {/* DAFTAR PESAN BUKU TAMU */}
            <h2 className="mt-8 text-2xl font-bold text-primary">
                Pesan Buku Tamu
            </h2>

            {errorPesan && (
                <p className="mt-4 text-sm text-red-600">
                    Gagal mengambil pesan: {errorPesan.message}
                </p>
            )}

            <div className="mt-4 space-y-4">
                {daftarPesan?.length > 0 ? (
                    daftarPesan.map((item) => (
                        <Card key={item.id}>
                            <CardHeader>
                                <CardTitle>
                                    {item.nama}
                                </CardTitle>

                                <CardDescription>
                                    {item.pesan}
                                </CardDescription>

                                {item.disematkan && (
                                    <Badge>
                                        Disematkan
                                    </Badge>
                                )}
                            </CardHeader>

                            <CardContent className="flex gap-2">
                                <form action={sematkanPesan}>
                                    <input
                                        type="hidden"
                                        name="id"
                                        value={item.id}
                                    />

                                    <input
                                        type="hidden"
                                        name="sematkan"
                                        value={
                                            item.disematkan
                                                ? "tidak"
                                                : "ya"
                                        }
                                    />

                                    <Button
                                        type="submit"
                                        variant="outline"
                                        size="sm"
                                    >
                                        {item.disematkan
                                            ? "Lepas Sematan"
                                            : "Sematkan"}
                                    </Button>
                                </form>

                                <KonfirmasiHapus
                                    id={item.id}
                                    aksi={hapusPesan}
                                    judul="Hapus pesan ini?"
                                    keterangan={`Pesan dari ${item.nama} akan dihapus permanen dari buku tamu.`}
                                />
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className="text-sm text-muted-foreground">
                        Belum ada pesan buku tamu.
                    </p>
                )}
            </div>
        </main>
    );
}