import {
  Box,
  Divider,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import React from "react";

import {
  AddLink,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatListNumberedRtl,
  FormatUnderlined,
  RadioButtonUnchecked,
  TextFields,
  Title,
} from "@mui/icons-material";

import { Editor } from "@tiptap/react";
import { type HeadingLevel, headingLevels } from "../types/heading";
import { switchList } from "../utils/setCurrentListType";
import { sinkListItemSameType } from "../utils/sinkListItemSameType";

interface Props {
  editor: Editor | null;
}

const colors = ["#000000", "#808080", "#ff0000", "#ff9800", "#2196f3"] as const;

export const Toolbar: React.FC<Props> = ({ editor }) => {
  if (!editor) return null;

  const applyColor = (c: string) => editor.chain().focus().setColor(c).run();
  const applySize = (s: string) =>
    editor.chain().focus().setMark("fontSize", { fontSize: s }).run();
  const toggleHead = (lv: HeadingLevel) =>
    editor.chain().focus().toggleHeading({ level: lv }).run();

  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Wprowadź URL", prev ?? "https://");
    if (url === null) return;
    url === ""
      ? editor.chain().focus().extendMarkRange("link").unsetLink().run()
      : editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: url })
          .run();
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Box>
          <Tooltip title="Pogrubienie">
            <IconButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              color={editor.isActive("bold") ? "primary" : "default"}
            >
              <FormatBold />
            </IconButton>
          </Tooltip>
          <Tooltip title="Kursywa">
            <IconButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              color={editor.isActive("italic") ? "primary" : "default"}
            >
              <FormatItalic />
            </IconButton>
          </Tooltip>
          <Tooltip title="Podkreślenie">
            <IconButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              color={editor.isActive("underline") ? "primary" : "default"}
            >
              <FormatUnderlined />
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Kolor tekstu">
            <ToggleButtonGroup exclusive size="small">
              {colors.map((c) => (
                <ToggleButton
                  key={c}
                  value={c}
                  selected={editor.isActive("textStyle", { color: c })}
                  onClick={() => applyColor(c)}
                  sx={{ p: 0.5 }}
                >
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      bgcolor: c,
                      borderRadius: 0.5,
                    }}
                  />
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Nagłówki">
            <ToggleButtonGroup exclusive size="small">
              {headingLevels.map((lvl) => (
                <ToggleButton
                  key={lvl}
                  value={lvl}
                  selected={editor.isActive("heading", { level: lvl })}
                  onClick={() => toggleHead(lvl)}
                >
                  <Title fontSize="small" />
                  {`H${lvl}`}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Tooltip>
          <ToggleButtonGroup exclusive size="small">
            {["16px", "12px"].map((sz) => (
              <Tooltip
                title={sz === "16px" ? "Duża czcionka" : "Mała czcionka"}
              >
                <ToggleButton
                  key={sz}
                  value={sz}
                  selected={editor.isActive("fontSize", { fontSize: sz })}
                  onClick={() => applySize(sz)}
                >
                  <TextFields fontSize="small" />
                  {sz.replace("px", "")}
                </ToggleButton>
              </Tooltip>
            ))}
          </ToggleButtonGroup>
        </Box>
        <Box>
          {/* bullet: kropka */}
          <Tooltip title="Lista punktowana (kropka)">
            <IconButton
              onClick={() => switchList(editor, "bulletList", "disc")}
              color={
                editor.isActive("bulletList", { listType: "disc" })
                  ? "primary"
                  : "default"
              }
            >
              <FormatListBulleted />
            </IconButton>
          </Tooltip>

          {/* bullet: kółko */}
          <Tooltip title="Lista punktowana (kółko)">
            <IconButton
              onClick={() => switchList(editor, "bulletList", "circle")}
              color={
                editor.isActive("bulletList", { listType: "circle" })
                  ? "primary"
                  : "default"
              }
            >
              <RadioButtonUnchecked />
            </IconButton>
          </Tooltip>

          {/* bullet: zielony check */}
          <Tooltip title="Lista – zielony check">
            <IconButton
              onClick={() => switchList(editor, "bulletList", "green-check")}
              color={
                editor.isActive("bulletList", { listType: "green-check" })
                  ? "primary"
                  : "default"
              }
            >
              <CheckCircle sx={{ color: "green" }} />
            </IconButton>
          </Tooltip>

          {/* bullet: czarny check */}
          <Tooltip title="Lista – czarny check">
            <IconButton
              onClick={() => switchList(editor, "bulletList", "black-check")}
              color={
                editor.isActive("bulletList", { listType: "black-check" })
                  ? "primary"
                  : "default"
              }
            >
              <CheckCircle sx={{ color: "black" }} />
            </IconButton>
          </Tooltip>

          {/* ordered: decimal */}
          <Tooltip title="Lista numerowana (liczby)">
            <IconButton
              onClick={() => switchList(editor, "orderedList", "decimal")}
              color={
                editor.isActive("orderedList", { listType: "decimal" })
                  ? "primary"
                  : "default"
              }
            >
              <FormatListNumbered />
            </IconButton>
          </Tooltip>

          {/* ordered: alpha */}
          <Tooltip title="Lista numerowana (alfabetyczna)">
            <IconButton
              onClick={() => switchList(editor, "orderedList", "alpha")}
              color={
                editor.isActive("orderedList", { listType: "alpha" })
                  ? "primary"
                  : "default"
              }
            >
              <FormatListNumberedRtl />
            </IconButton>
          </Tooltip>

          {/* Indent / Outdent */}
          <Tooltip title="Zwiększ wcięcie">
            <IconButton onClick={() => sinkListItemSameType(editor)}>
              <ArrowRight />
            </IconButton>
          </Tooltip>
          <Tooltip title="Zmniejsz wcięcie">
            <IconButton
              onClick={() =>
                editor.chain().focus().liftListItem("listItem").run()
              }
            >
              <ArrowLeft />
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Hiperlink">
            <IconButton
              onClick={setLink}
              color={editor.isActive("link") ? "primary" : "default"}
            >
              <AddLink />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
    </Box>
  );
};
