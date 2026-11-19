
"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export default function TombolTema() {
const [gelap, setGelap] = useState(false);
    

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
            { gelap ? "Mode Terang" : "Mode Gelap"}
        </Button>
    );
}
