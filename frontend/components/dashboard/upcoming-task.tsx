"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Todo } from "@/types/todo";
import { PriorityBadge } from "./priority-badge";

interface Props {
    todos: Todo[];
}

export function UpcomingTask({
    todos,
}: Props) {

    return (

        <Card>

            <CardHeader>

                <CardTitle>

                    Upcoming Tasks

                </CardTitle>

            </CardHeader>

            <CardContent className="space-y-3">

                {
                    todos.length === 0 && (

                        <p className="text-muted-foreground">

                            No upcoming tasks

                        </p>

                    )

                }

                {
                    todos.map(todo => (

                        <div
                            key={todo.id}
                            className="border rounded-lg p-3"
                        >

                            <div className="font-medium">

                                {todo.title}

                            </div>

                            <PriorityBadge
                                priority={todo.priority}
                            />
                            <div className="text-xs text-muted-foreground">

                                Due

                                {" "}

                                {todo.dueDate}

                            </div>

                        </div>


                    ))
                }

            </CardContent>

        </Card>

    )

}