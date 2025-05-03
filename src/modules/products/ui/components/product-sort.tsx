"use client";
import { useProductFilter } from "../../hooks/useProductFilter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ProductSort = () => {
  const [filters, setFilters] = useProductFilter();
  return (
    <div className="flex items-center gap-2">
      <Button
        size={"sm"}
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "cuarted" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        onClick={() => setFilters({ sort: "cuarted" })}
        variant={"secondary"}
      >
        Curated
      </Button>
      <Button
        size={"sm"}
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "trending" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        onClick={() => setFilters({ sort: "trending" })}
        variant={"secondary"}
      >
        Trending
      </Button>
      <Button
        size={"sm"}
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "hot_and_new" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        onClick={() => setFilters({ sort: "hot_and_new" })}
        variant={"secondary"}
      >
        Hot And New
      </Button>
    </div>
  );
};
