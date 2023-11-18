import { Models } from "appwrite";
import GridPostList from "./GridPostList";

type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];
};

const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultsProps) => {
  if (isSearchFetching) {
    return (
      <div className="flex justify-center items-center">
        <img src="assets/images/loader.svg" alt="" />
      </div>
    );
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    console.log("Searched Result", searchedPosts);
    return (
      <>
        <GridPostList posts={searchedPosts.documents} />
      </>
    );
  } else {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    );
  }
};

export default SearchResults;
