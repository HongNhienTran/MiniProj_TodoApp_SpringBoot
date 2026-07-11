"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export function TaskCalendar() {

  const [date, setDate] = useState<Date>();

  return (
    <Card className="p-5">

      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
      />

    </Card>
  );
}