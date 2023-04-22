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
    resetCommentList: (state) => {
      state.commentList.length = 0;
    },
    changeCommentList: (state, action: PayloadAction<CommontItemType[]>) => {
      state.commentList = action.payload;
    },
    mergeCommentListByChildrenId: (
      state,
      action: PayloadAction<{
        childrenId: number;
        children: CommontItemType[];
      }>
    ) => {
      // 合并 children
      const childrenComment = state.commentList.find(
        (comment) => comment.commentId === action.payload.childrenId
      )!;
      childrenComment.children = action.payload.children;
    },

    // 添加父级评论
    addParentComment: (state, action: PayloadAction<CommontItemType>) => {
      state.commentList.push(action.payload);
    },

    // 添加子评论
    addChildrenComment: (state, action: PayloadAction<CommontItemType>) => {
      const targetComment = state.commentList.find(
        (comment) => comment.commentId === action.payload.parentId
      );
      targetComment?.children?.push(action.payload);
    },
  },
});

export const {
  changeCommentList,
  mergeCommentListByChildrenId,
  resetCommentList,
  addParentComment,
  addChildrenComment,
} = commentSlice.actions;

export default commentSlice.reducer;
