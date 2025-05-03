import {
  createLoader,
  parseAsString,
  parseAsArrayOf,
  parseAsStringLiteral,
} from "nuqs/server";
export const sortValue = ["cuarted", "trending", "hot_and_new"] as const;
const params = {
   sort: parseAsStringLiteral(sortValue).withDefault("cuarted"),
    minPrice: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
    maxPrice: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
    tags: parseAsArrayOf(parseAsString).withOptions({ clearOnDefault: true }).withDefault([]),
};

export const loadProductFilters = createLoader(params);
