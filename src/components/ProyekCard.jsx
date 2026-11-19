import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card,CardDescription, CardHeader, CardTitle } from "./ui/card";
export default function ProyekCard({ proyek }) {
        return (
            <Link 
                href={`/proyek/${proyek.slug}`}
                className="block overflow-hidden rouunded-xl border border-border bg-card shadow-sm hover:shadow-md"
            >
            <Card className="h-full">
                <Image
                src={proyek.gambar_url}
                alt={`Tangkapan layar ${proyek.judul}`}
                width={640}
                height={420}
                loading="eager"
                className="h-auto w-full"
            />
            <CardHeader>
                <Badge>{proyek.kategori}</Badge>
                <CardTitle className="text-lg text-primary">{proyek.judul}</CardTitle>
                <CardDescription>{proyek.deskripsi}</CardDescription>
            </CardHeader>
            </Card>
        </Link>
    );
}