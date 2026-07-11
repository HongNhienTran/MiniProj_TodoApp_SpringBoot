import { Badge } from "@/components/ui/badge";

interface Props {

    priority: string;

}

export function PriorityBadge({

    priority,

}: Props) {

    const variant =

        priority === "HIGH"
            ? "destructive"
            : priority === "MEDIUM"
                ? "secondary"
                : "outline";

    return (

        <Badge variant={variant}>

            {priority}

        </Badge>

    )

}