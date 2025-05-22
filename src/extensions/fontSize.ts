import TextStyle from "@tiptap/extension-text-style";

export const FontSize = TextStyle.extend({
  name: "fontSize",
  addAttributes() {
    return {
      fontSize: {
        default: "16px",
        parseHTML: (el) => el.style.fontSize || "16px",
        renderHTML: (attrs) => ({ style: `font-size:${attrs.fontSize}` }),
      },
    };
  },
});
