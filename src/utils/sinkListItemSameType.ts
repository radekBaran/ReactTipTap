import { Editor } from "@tiptap/react";

export const sinkListItemSameType = (editor: Editor) => {
  const { state } = editor;
  const { $from } = state.selection;

  let nested = 0;
  for (let depth = $from.depth; depth >= 0; depth--) {
    const n = $from.node(depth);
    if (n.type.name === "bulletList" || n.type.name === "orderedList") {
      if (++nested > 1) return;
    }
  }

  const parentList = $from.node($from.depth - 1);
  const parentType = parentList?.attrs.listType;

  if (!editor.can().sinkListItem("listItem")) return;

  editor
    .chain()
    .sinkListItem("listItem")
    .updateAttributes("bulletList", { listType: parentType })
    .updateAttributes("orderedList", { listType: parentType })
    .run();
};
