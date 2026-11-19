
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
        <Button 
            variant="outline"
            onClick={gantiTema}
            className="borderwhite bg-transparent text-white hover:bg-aksen hover:text-white"
        >
            {gelap ? "Mode Terang" : "Mode Gelap"}
        </Button>
    );
}
