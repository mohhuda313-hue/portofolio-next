## Tabel `buku_tamu`

Pesan publik dari halaman Buku Tamu. Dibuat dengan SQL `create
table` di SQL Editor.

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | `int8` | Primary key, nomor otomatis 1, 2, 3, ... |
| `created_at` | `timestamptz` | Waktu baris dibuat, terisi otomatis dengan `now()` |
| `nama` | `text` | Nama pengirim (wajib) |
| `pesan` | `text` | Isi pesan (wajib) |
| `disematkan` | `bool` | `true` jika pesan disematkan di atas,bawaan `false` |

RLS aktif. Policy `Pengunjung boleh membaca buku tamu` (`select`)
dan `Pengunjung boleh menulis buku tamu`
(`insert`) untuk peran `anon`. Mengubah dan menghapus pesan hanya
lewat halaman `/kelola` dengan secret key.