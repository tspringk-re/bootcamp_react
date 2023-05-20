import { PostList } from "@/components/post_list";
import { PostUser } from "@/types";
import { useLoaderData } from "react-router-dom";

import { useState } from "react";

export function AllPosts(): JSX.Element {
  const { posts } = useLoaderData() as { posts: PostUser[] };

  const [filteredPosts, setfilteredPosts] = useState(posts);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.toLowerCase();
    const filteredPosts = posts.filter((post) => {
      return (
        post.user.name.toLowerCase().includes(value) ||
        post.content.toLowerCase().includes(value)
      );
    });
    setfilteredPosts(filteredPosts);
  };

  return (
    <>
      <div className="main posts-index">
        <div className="container">
          <div
            className="searchForm__container"
            style={{ margin: "0 auto 20px" }}
          >
            <form className="searchForm__form" method="POST">
              <input
                type="text"
                className="searchForm__input"
                data-test="search-input"
                onChange={handleSearchInput}
                style={{
                  width: "40%",
                  padding: "0.5em",
                  border: "1px solid #999",
                  color: "#555",
                }}
              />
            </form>
          </div>

          <PostList posts={filteredPosts} />
        </div>
      </div>
    </>
  );
}
