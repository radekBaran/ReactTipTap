import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";

export interface ListAttrs {
  listType: string;
}

export const CustomBulletList = BulletList.extend<ListAttrs>({
  addAttributes() {
    return {
      listType: {
        default: "disc",
        parseHTML: (el) => el.getAttribute("data-list-type") || "disc",
      },
    };
  },
  renderHTML({ node, HTMLAttributes }) {
    const listType = (node.attrs as ListAttrs).listType;
    const styleMap: Record<string, string> = {
      disc: "disc",
      circle: "circle",
      "green-check": "none",
      "black-check": "none",
    };
    return [
      "ul",
      {
        ...HTMLAttributes,
        "data-list-type": listType,
        style: `list-style-type:${styleMap[listType] ?? "disc"};`,
      },
      0,
    ];
  },
});

export const CustomOrderedList = OrderedList.extend<ListAttrs>({
  addAttributes() {
    return {
      listType: {
        default: "decimal",
        parseHTML: (el) => el.getAttribute("data-list-type") || "decimal",
      },
    };
  },
  renderHTML({ node, HTMLAttributes }) {
    const listType = (node.attrs as ListAttrs).listType;
    const style = listType === "alpha" ? "lower-alpha" : "decimal";
    return [
      "ol",
      {
        ...HTMLAttributes,
        "data-list-type": listType,
        style: `list-style-type:${style};`,
      },
      0,
    ];
  },
});
