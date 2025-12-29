import React, { useContext } from "react";
import SearchPosts from "./SearchPost";
import Results from "./Results";
import PostContext from "../context/PostContext";

function Header() {
  const { user } = useContext(PostContext);
  return (
    <header>
      <h1>
         Blog 
      </h1>
      <div>
        <Results />
      </div>
      <h1>{user ? user.username : "Name Upload"}</h1>
    </header>
  );
}

export default Header;
