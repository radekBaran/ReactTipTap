import { Box, GlobalStyles } from "@mui/material";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { FontSize } from "../extensions/fontSize";
import { CustomBulletList, CustomOrderedList } from "../extensions/lists";
import { Toolbar } from "./Toolbar";

export const TipTapEditor: React.FC = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ bulletList: false, orderedList: false }),
      Underline,
      TextStyle,
      FontSize,
      Color.configure({ types: [TextStyle.name] }),
      Link.configure({ openOnClick: false }),
      CustomBulletList,
      CustomOrderedList,
    ],
    content: "",
  });

  return (
    <>
      <GlobalStyles
        styles={{
          "ul, ol": {
            margin: 0,
            padding: 0,
            marginLeft: "1.5em",
            listStylePosition: "outside",
          },

          "ul[data-list-type='green-check'], ul[data-list-type='black-check']":
            {
              listStyle: "none",
            },

          "ul[data-list-type='green-check'] > li, ul[data-list-type='black-check'] > li":
            {
              position: "relative",
            },

          "ul[data-list-type='green-check'] > li::before": {
            content: '"✔"',
            color: "green",
            position: "absolute",
            left: "-1.5em",
            width: "1.5em",
            textAlign: "center",
          },
          "ul[data-list-type='black-check'] > li::before": {
            content: '"✔"',
            color: "black",
            position: "absolute",
            left: "-1.5em",
            width: "1.5em",
            textAlign: "center",
          },

          ".ProseMirror, .ProseMirror:focus": {
            outline: "none",
            border: "none",
          },
        }}
      />
      <Toolbar editor={editor} />
      <Box
        onClick={() => editor?.commands.focus()}
        role="presentation"
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          p: 2,
          minHeight: 200,
          cursor: "text",
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </>
  );
};
