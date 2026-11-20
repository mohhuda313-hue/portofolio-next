
"use client";

import { useFormStatus } from "react-dom";

export default function TombolKirim({ teks }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-[#203b60] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#172d49] disabled:cursor-not-allowed disabled:opacity-60"
        >
            {pending ? "Mengirim..." : teks}
        </button>
    );
}
