import { loadProductFilters } from "@/modules/products/search-params";
import ProductListView from "@/modules/products/ui/views/product-list-view";
import { trpc, getQueryClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs";

interface Props {
  params: Promise<{ subCategory: string }>;
  searchParams: Promise<SearchParams>;
}

const page = async ({ params, searchParams }: Props) => {
  const { subCategory } = await params;
  const filters = await loadProductFilters(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({ category: subCategory, ...filters })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView category={subCategory} />
    </HydrationBoundary>
  );
};

export default page;
