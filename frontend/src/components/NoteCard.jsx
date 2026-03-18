import { useState } from "react";

function NoteCard({ note, onDelete, onUpdate }) {

  const [editing,setEditing] = useState(false);
  const [title,setTitle] = useState(note.title);
  const [content,setContent] = useState(note.content);

  const save = () => {

    onUpdate(note._id,{
      title,
      content
    });

    setEditing(false);

  };


  return (

    <div className="border p-4 flex justify-between">

      {editing ? (

        <div className="flex-1">

          <input
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className="border p-2 w-full mb-2"
          />

          <textarea
            value={content}
            onChange={(e)=>setContent(e.target.value)}
            className="border p-2 w-full mb-2"
          />

          <button
            onClick={save}
            className="bg-green-500 text-white px-3 py-1"
          >
            Save
          </button>

        </div>

      ) : (

        <div>

          <h3 className="font-bold">
            {note.title}
          </h3>

          <p>{note.content}</p>

        </div>

      )}

      <div className="flex flex-col gap-2 ml-4">

        <button onClick={()=>setEditing(true)}>
          Edit
        </button>

        <button
          onClick={()=>onDelete(note._id)}
          className="text-red-500"
        >
          Delete
        </button>

      </div>

    </div>

  );

}

export default NoteCard;