import PostCard from "@/components/Shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/querysAndMutitations";
import { Models } from "appwrite";

const MainHomePage = () => {
  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">HomeFeed</h2>
          {isPostLoading && !posts ? (
            <img
              src="assets/images/SlowLoader.svg"
              width={50}
              height={50}
              alt=""
            />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.caption} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainHomePage;
