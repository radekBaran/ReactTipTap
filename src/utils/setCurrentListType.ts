import { Editor } from "@tiptap/react";

export const setCurrentListType = (
  editor: Editor,
  listNodeName: "bulletList" | "orderedList",
  listType: string
) => {
  editor
    .chain()
    .command(({ state, tr }) => {
      const { $from } = state.selection;
      for (let depth = $from.depth; depth >= 0; depth--) {
        const node = $from.node(depth);
        if (node.type.name === listNodeName) {
          tr.setNodeMarkup($from.before(depth), undefined, {
            ...node.attrs,
            listType,
          });
          return true;
        }
      }
      return false;
    })
    .run();
};
