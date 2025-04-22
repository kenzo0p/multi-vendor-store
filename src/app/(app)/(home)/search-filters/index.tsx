
import { Categories } from "./categories";
import { SearchInput } from "./SearchInput";

interface Props {
  data: any;
}

export const SearchFilters = ({ data }: Props) => {
  return (
    <div className="px-4 lg:px-12 py-8 flex flex-col gap-4 w-full">
        <SearchInput/>
        <Categories data={data}/>
    </div>
  );
};
