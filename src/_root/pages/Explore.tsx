import { useState , useEffect} from "react";
import { Input } from "@/components/ui/input";
import GridPostList from "@/components/Shared/GridPostList";
import {
  useGetPosts,
  useSearchPosts,
} from "@/lib/react-query/querysAndMutitations";
import useDebounce from "@/hooks/useDebounce";
import SearchResults from "@/components/Shared/SearchResults";

import { useInView } from "react-intersection-observer"

const Explore = () => {
  const {ref , inView} = useInView()
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedValue);
  
    useEffect(()=>{
      if (inView && !searchValue) fetchNextPage() 
    },[inView , searchValue])

  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <img src="assets/images/loader.svg" alt="" />
      </div>
    );
  }

  const showShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !showShowSearchResults &&
    posts?.pages.every((item) => item?.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full ">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="assets/icons/search.svg"
            alt="search"
            width={24}
            height={24}
          />
          <Input
            className="explore-search"
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          ></Input>
        </div>
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium">All </p>
          <img
            src="assets/icons/filter.svg"
            alt="filter"
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className="flex flex-warp gap-9 w-full max-w-5xl">
        {showShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full"></p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-9">
          <img className="w-10 h-10"  src="assets/images/loader.svg" alt="" />
        </div>
      )}
    </div>
  );
};

export default Explore;
