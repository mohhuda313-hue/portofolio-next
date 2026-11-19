import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Kartu({ judul, children }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold textprimary">{judul}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}