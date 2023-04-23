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

    // 根据 commentId 删除评论
    deleteCommentList: (state, action: PayloadAction<CommontItemType>) => {
      const { commentId, parentId } = action.payload;
      // 如果是一级评论
      if (parentId === -1) {
        const comment = state.commentList.findIndex(
          (comment) => comment.commentId === commentId
        );
        state.commentList.splice(comment, 1);
      } else {
        // 找到父级评论
        const parentComment = state.commentList.find(
          (comment) => comment.commentId === parentId
        );
        console.log(parentComment?.commentId);

        // 找到子评论 
        const childrenCommentIndex = parentComment?.children?.findIndex(
          (comment) => comment.commentId === commentId
        );
        // 删除
        parentComment?.children?.splice(childrenCommentIndex!, 1);
      }
    },
  },
});

export const {
  changeCommentList,
  mergeCommentListByChildrenId,
  resetCommentList,
  addParentComment,
  addChildrenComment,
  deleteCommentList,
} = commentSlice.actions;

export default commentSlice.reducer;
