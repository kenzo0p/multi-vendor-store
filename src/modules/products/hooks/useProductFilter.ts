import {
  useQueryStates,
  parseAsString,
  parseAsArrayOf,
  parseAsStringLiteral,
} from "nuqs";

const sortValue = ["cuarted", "trending", "hot_and_new"] as const;

const params = {
  sort: parseAsStringLiteral(sortValue).withDefault("cuarted"),
  minPrice: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  maxPrice: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  tags: parseAsArrayOf(parseAsString).withOptions({ clearOnDefault: true }).withDefault([]),
};
export function useProductFilter() {
  return useQueryStates(params);
}
