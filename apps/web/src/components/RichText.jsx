import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

export default function RichText({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false })],
    content: value ?? "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  const btn = (label, action, active) => (
    <button
      type="button"
      className={`tiptap-btn ${active ? "active" : ""}`}
      onClick={action}
    >
      {label}
    </button>
  );

  return (
    <div className="tiptap-wrapper">
      <div className="tiptap-toolbar">
        {btn("G", () => editor.chain().focus().toggleBold().run(), editor.isActive("bold"))}
        {btn("I", () => editor.chain().focus().toggleItalic().run(), editor.isActive("italic"))}
        {btn("H2", () => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive("heading", { level: 2 }))}
        {btn("H3", () => editor.chain().focus().toggleHeading({ level: 3 }).run(), editor.isActive("heading", { level: 3 }))}
        {btn("• Liste", () => editor.chain().focus().toggleBulletList().run(), editor.isActive("bulletList"))}
        {btn("1. Liste", () => editor.chain().focus().toggleOrderedList().run(), editor.isActive("orderedList"))}
        {btn("Lien", () => {
          const url = window.prompt("URL du lien :");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }, editor.isActive("link"))}
        {btn("↩ Retour", () => editor.chain().focus().undo().run(), false)}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}