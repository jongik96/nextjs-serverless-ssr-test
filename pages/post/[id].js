// post/[id].js
import React, { useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { END } from "redux-saga";
import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";
import { LOAD_POST_REQUEST } from "../../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import wrapper from "../../store/configureStore";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);

  return (
    <AppLayout>
      <Head>
        <title>
          {/* {singlePost.User.nickname} */}
          님의 글
        </title>
      </Head>
      {/* <meta name="description" content={singlePost.content} /> */}
      <meta
        property="og:title"
        // content={`${singlePost.User.nickname}님의 게시글`}
      />
      {/* <meta property="og:description" content={singlePost.content} /> */}
      <meta
        property="og:image"
        // content={
        // singlePost.Images[0]
        // ? singlePost.Images[0].src
        // : "https://nodebird.com/favicon.ico"
        // }
      />
      <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
      {/* <PostCard post={singlePost} /> */}
    </AppLayout>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   async (context) => {
//     const cookie = context.req ? context.req.headers.cookie : "";
//     axios.defaults.headers.Cookie = "";
//     if (context.req && cookie) {
//       axios.defaults.headers.Cookie = cookie;
//     }
//     context.store.dispatch({
//       type: LOAD_MY_INFO_REQUEST,
//     });
//     context.store.dispatch({
//       type: LOAD_POST_REQUEST,
//       data: context.params.id,
//     });

//     context.store.dispatch(END);
//     await context.store.sagaTask.toPromise();
//   }
// );

Post.getInitialProps = (context) => async () => {
  const cookie = context.req ? context.req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: context.params.id,
  });

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
};
export default Post;
