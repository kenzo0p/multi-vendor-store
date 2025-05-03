import Footer from "@/modules/home/ui/components/Footer";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchFilters, SearchFiltersLoading } from "@/modules/home/ui/components/search-filters";
import { getQueryClient, trpc } from "@/trpc/server";
import { Suspense } from "react";
import Navbar from "@/modules/home/ui/components/navbar";

interface Props {
  children: React.ReactNode;
}

const layout = async ({ children }: Props) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());
  return (
    <div className="flex flex-col min-h-screen border">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersLoading/>}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
