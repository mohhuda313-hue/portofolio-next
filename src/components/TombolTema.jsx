
"use client";

import { useEffect } from "react";

export default function TombolTema() {

    // Mengambil tema yang tersimpan setelah komponen tampil
    useEffect(() => {
        if (localStorage.getItem("tema") === "gelap") {
            document.documentElement.classList.add("dark");
        }
    }, []);

    function gantiTema() {
        const gelap = document.documentElement.classList.toggle("dark");

        localStorage.setItem(
            "tema",
            gelap ? "gelap" : "terang"
        );
    }

    return (
        <button
            type="button"
            onClick={gantiTema}
            className="rounded-lg border border-white px-3 py-1 text-sm font-semibold text-white hover:border-aksen hover:bg-aksen"
        >
            <span className="dark:hidden">
                Mode Gelap
            </span>

            <span className="hidden dark:inline">
                Mode Terang
            </span>
        </button>
    );
}
