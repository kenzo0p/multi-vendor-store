import { DEFAULT_LIMIT } from "@/constants";
import { loadProductFilters } from "@/modules/products/search-params";
import ProductListView from "@/modules/products/ui/views/product-list-view";
import { trpc, getQueryClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs";

interface Props {
  params: Promise<{ subCategory: string }>;
  searchParams: Promise<SearchParams>;
}
export const dynamic = "force-dynamic";
const page = async ({ params, searchParams }: Props) => {
  const { subCategory } = await params;
  const filters = await loadProductFilters(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({ category: subCategory, ...filters, limit: DEFAULT_LIMIT })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView category={subCategory} />
    </HydrationBoundary>
  );
};

export default page;
