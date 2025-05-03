import { parseAsString, useQueryStates } from "nuqs";

export function useProductFilter() {
  return useQueryStates({
    minPrice: parseAsString.withOptions({ clearOnDefault: true }),
    maxPrice: parseAsString.withOptions({ clearOnDefault: true }),
  });
}
