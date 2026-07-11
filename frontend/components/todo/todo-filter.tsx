"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  keyword: string;
  setKeyword: (value: string) => void;
}

export function TodoFilter({
  keyword,
  setKeyword,
}: Props) {
  return (
    <div className="flex gap-3">

      <Input
        placeholder="Search todo..."
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
      />

      <Button>
        Search
      </Button>

    </div>
  );
}