import { useUserContext } from "@/context/AuthContext";
import { formatDateString, multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type postCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: postCardProps) => {
  const { user } = useUserContext();

  if (!post.creator) {
    return;
  }

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post?.creator?.imageUrl ||
                "https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-female-4-1024.png"
              }
              alt="creator"
              className="rounded-full w-12 h-12 "
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.creator.name}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {formatDateString(post.creator.$createdAt)}
              </p>
              -
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>
        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}
        >
          <img src="assets/icons/edit.svg" alt="Edit" width={20} height={20} />
        </Link>
      </div>
      <Link to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string) => (
              <li key={post.tag}>#{tag}</li>
            ))}
          </ul>
        </div>
        <img
          src={
            post.imageUrl ||
            "https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-female-4-1024.png"
          }
          alt="PostImage"
          className="post-card_img mt-3"
        />
      </Link>
      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
