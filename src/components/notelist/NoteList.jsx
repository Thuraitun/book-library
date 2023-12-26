import { useParams } from "react-router-dom";
import useFirestore from "../../hooks/useFirestore";
import moment from "moment";
import { useState } from "react";

const NoteList = () => {

    const { id } = useParams()
    
    const { GetCollection } = useFirestore()
    const { data: notes } = GetCollection('notes', ['bookUid', '==', id])

    const [noteVisibility, setNoteVisibility] = useState({});

    const toggleVisibility = (noteId) => {
        setNoteVisibility((prevVisibility) => ({
        ...prevVisibility,
        [noteId]: !prevVisibility[noteId],
        }));
    };


  return (
    <div>
        {!!notes.length && <div >
            {notes.map(note => (
                <div className="my-4 border p-4 rounded-md" key={note.id}>
                    <div className="flex justify-between">
                       <div className="flex space-x-2">
                            <img src="https://avatars.githubusercontent.com/u/118127700?v=4" alt="" className="w-12 h-12 rounded-full" />
                            <div className="">
                                <h1 className="text-primary">Thurai</h1>
                                <p className="text-gray-400">{moment(note?.date?.seconds*1000).fromNow()}</p>
                            </div>
                       </div>
                       <div className="relative">
                            <div onClick={() => toggleVisibility(note.id)} className="">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                </svg>
                            </div>
                            {noteVisibility[note.id] && <div className="absolute p-2 bg-gray-200 top-5 right-[10px]">
                                <p onClick={} className="text-primary cursor-pointer">Edit</p>
                                <p className="text-red-500 cursor-pointer">Delete</p>
                            </div>}
                       </div>
                        
                    </div>
                    <div className="text-gray-500 py-2">
                        <p>{note.body}</p>
                    </div>
                </div>
            ))}
        </div>}
    </div>
  );
}

export default NoteList;
