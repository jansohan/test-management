import { useController, Control, FieldValues, Path } from 'react-hook-form';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import './RichTextEditor.css';

import './RichTextEditor.css';

interface RichTextEditorProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  error?: string;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  error,
  placeholder = 'Write something...',
  className = '',
}: RichTextEditorProps<TFieldValues>) {
  const { field } = useController({
    name,
    control,
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: field.value || '',
    onUpdate: ({ editor }) => {
      field.onChange(editor.getHTML());
    },
  });

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <div className={`rich-text-editor ${error ? 'border-red-500' : ''}`}>
        <div className="flex gap-1 p-1 border-b border-gray-200 bg-gray-50 rounded-t-md">
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`px-2 py-1 rounded text-xs font-medium ${
              editor?.isActive('bold') ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Bold
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`px-2 py-1 rounded text-xs font-medium ${
              editor?.isActive('italic') ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Italic
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`px-2 py-1 rounded text-xs font-medium ${
              editor?.isActive('bulletList') ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Bullet List
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={`px-2 py-1 rounded text-xs font-medium ${
              editor?.isActive('orderedList') ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Numbered List
          </button>
        </div>
        <EditorContent
          editor={editor}
          className="prose prose-sm max-w-none p-2 min-h-[120px] focus:outline-none"
        />
      </div>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
