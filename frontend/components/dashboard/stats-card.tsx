import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface Props {
    title: string;
    value: number;
}

export function StatsCard({
    title,
    value,
}: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm">
                    {title}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="text-3xl font-bold">
                    {value}
                </div>
            </CardContent>
        </Card>
    );
}