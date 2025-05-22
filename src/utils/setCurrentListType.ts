import { Editor } from "@tiptap/react";

export const setCurrentListType = (
  editor: Editor,
  listNode: "bulletList" | "orderedList",
  listType: string
) => {
  editor.commands.command(({ state, dispatch }) => {
    const { $from } = state.selection;

    for (let depth = $from.depth; depth > 0; depth--) {
      const node = $from.node(depth);
      if (node.type.name === listNode) {
        const pos = $from.before(depth);

        const tr = state.tr.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          listType,
        });
        (dispatch ?? editor.view.dispatch)(tr);
        return true;
      }
    }
    return false;
  });
};

export const switchList = (
  editor: Editor,
  nodeName: "bulletList" | "orderedList",
  listType: string
) => {
  const isSameKind = editor.isActive(nodeName);

  if (isSameKind) {
    setCurrentListType(editor, nodeName, listType);
  } else {
    const chain = editor
      .chain()
      .focus()
      [nodeName === "bulletList" ? "toggleBulletList" : "toggleOrderedList"]()
      .updateAttributes(nodeName, { listType });

    chain.run();
  }
};
