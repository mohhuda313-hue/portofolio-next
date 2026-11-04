export default function Footer() {
    const tahun = new Date().getFullYear();

    return (
        <footer className="mt-auto bg-utama p-6 text-center text-latar">
            <p>&copy; {tahun} M.Miftakhul Huda. Di buat dengan Next.js di kelas Industri Ubig.</p>
        </footer>
    );
}