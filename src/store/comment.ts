import { User } from "@/types/auth";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CommontItemType } from "@/request/home";

export interface CommentContext {
  commentList: CommontItemType[];
}

const initialState: CommentContext = {
  commentList: [],
};

export const commentSlice = createSlice({
  name: "CommentContext",
  initialState,
  reducers: {
    changeCommentList: (state, action: PayloadAction<CommontItemType[]>) => {
      const commentList = [...state.commentList];
      const commentListLength = commentList.length;
      const inCommingListLength = action.payload.length;
      // 初始状态，直接赋值
      if (commentListLength === 0) {
        state.commentList = action.payload;
        return;
      }
      // 新增评论，这是排过顺序的，直接找到新增的那个就好
      if (commentListLength < inCommingListLength) {
        state.commentList = [
          ...action.payload.slice(0, inCommingListLength - commentListLength),
          ...commentList,
        ];
        return;
      }
      // 删除了评论，那么这里需要找到删除的那个评论
      commentList.forEach((comment, cur) => {
        const { commentId } = comment;
        const index = action.payload.findIndex(
          (item) => item.commentId === commentId
        );
        if (index === -1) {
          // 删除没有找到的评论
          commentList.splice(cur, 1);
        }
        state.commentList = commentList;
      });
    },
    mergeCommentListByChildrenId: (
      state,
      action: PayloadAction<{
        childrenId: number;
        children: CommontItemType[];
      }>
    ) => {
      // 合并 children
      const commitList = [...state.commentList];
      const childrenComment = commitList.find(
        (comment) => comment.commentId === action.payload.childrenId
      )!;
      childrenComment.children = action.payload.children;
      state.commentList = commitList;
    },
  },
});

export const { changeCommentList, mergeCommentListByChildrenId } =
  commentSlice.actions;

export default commentSlice.reducer;
