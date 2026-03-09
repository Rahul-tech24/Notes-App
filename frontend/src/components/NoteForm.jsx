import { useState } from "react";

function NoteForm({ onCreate }) {

  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");

  const submit = (e) => {

    e.preventDefault();

    onCreate({
      title,
      content
    });

    setTitle("");
    setContent("");

  };

  return (

    <form onSubmit={submit} className="mb-6">

      <input
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 w-full mb-2"
      />

      <textarea
        value={content}
        onChange={(e)=>setContent(e.target.value)}
        placeholder="Content"
        className="border p-2 w-full mb-2"
      />

      <button className="bg-black text-white px-4 py-2">
        Create Note
      </button>

    </form>

  );

}

export default NoteForm;