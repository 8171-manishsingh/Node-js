import React, { useContext, useEffect, useRef } from "react";
import PostContext from "../context/PostContext";
import { getPost } from "../utils/post.utils";

function Results() {
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      const getdata = async () => {
        try {
          const data = await getPost();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };
      getdata();
    }
  }, []);

  return <p><h1>Posts</h1> </p>;
}

export default Results;
