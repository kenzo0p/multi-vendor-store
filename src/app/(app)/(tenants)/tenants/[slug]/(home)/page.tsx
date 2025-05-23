import type { SearchParams } from "nuqs/server";
import { loadProductFilters } from "@/modules/products/search-params";
import ProductListView from "@/modules/products/ui/views/product-list-view";
import { trpc, getQueryClient } from "@/trpc/server";
import { DEFAULT_LIMIT } from "@/constants";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
interface Props {
  searchParams: Promise<SearchParams>;
  params: Promise<{ slug: string }>;
}
export const dynamic = "force-dynamic";
const page = async ({ searchParams, params }: Props) => {
  const { slug } = await params;
  const filters = await loadProductFilters(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      tenantSlug: slug,
      ...filters,
      limit: DEFAULT_LIMIT,
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView tenantSlug={slug} narrowView />
    </HydrationBoundary>
  );
};

export default page;
