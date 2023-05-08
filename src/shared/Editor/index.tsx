import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface TinyMCEInputProps {
  value: string;
  onEditorChange: (content: string) => void;
}

const TinyMCEInput = forwardRef<HTMLTextAreaElement, TinyMCEInputProps>(({ value, onEditorChange }, ref) => {
  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  useImperativeHandle(ref, () => editorRef.current as HTMLTextAreaElement);

  return (
    <Editor
      textareaName="description"
      value={value}
      onEditorChange={onEditorChange}
      init={{
        height: 300,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help",
      }}
      onInit={(evt, editor) => (editorRef.current = editor.getElement() as HTMLTextAreaElement)}
    />
  );
});

export default TinyMCEInput;
