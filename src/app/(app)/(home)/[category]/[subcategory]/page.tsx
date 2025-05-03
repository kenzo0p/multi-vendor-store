import  { ProductList,
  ProductListSkeleton,
} from "@/modules/products/ui/components/product-list";
import { trpc, getQueryClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  params: Promise<{ subCategory: string }>;
}

const page = async ({params}: Props) => {
  const {subCategory} = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({category:subCategory}));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList category={subCategory} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default page;
