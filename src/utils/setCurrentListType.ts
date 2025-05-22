import { Editor } from "@tiptap/react";

export function switchList(
  editor: Editor,
  nodeName: "bulletList" | "orderedList",
  listType: string
): void {
  const handled = editor
    .chain()
    .focus()
    .command(({ state, dispatch }) => {
      const { $from } = state.selection;
      const schema = state.schema;

      // 1) Spróbuj znaleźć najbliższą listę (depth > 0)
      for (let depth = $from.depth; depth > 0; depth--) {
        const node = $from.node(depth);
        if (
          node.type.name === "bulletList" ||
          node.type.name === "orderedList"
        ) {
          const pos = $from.before(depth);
          const isSameKind = node.type.name === nodeName;
          const newType = isSameKind ? node.type : schema.nodes[nodeName];

          // Zmieniamy typ node’a i/lub jego listType
          const tr = state.tr.setNodeMarkup(pos, newType, {
            ...node.attrs,
            listType,
          });
          dispatch?.(tr);
          return true;
        }
      }

      return false; // nie znaleziono listy
    })
    .run();

  if (!handled) {
    // 2) Nie było listy ⇒ zakładamy nową i ustawiamy listType
    const chain = editor.chain().focus();
    if (nodeName === "bulletList") {
      chain.toggleBulletList();
    } else {
      chain.toggleOrderedList();
    }
    chain.updateAttributes(nodeName, { listType }).run();
  }
}
