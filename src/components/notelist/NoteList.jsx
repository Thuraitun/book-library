import { useParams } from "react-router-dom";
import useFirestore from "../../hooks/useFirestore";
import moment from "moment";
import trash from "../../assets/trash.svg";
import edit from "../../assets/edit.svg";
import { useState } from "react";
import NoteForm from '../noteform/NoteForm';

const NoteList = () => {

    const { id } = useParams()
    
    const { GetCollection, DeleteDocument } = useFirestore()
    const { data: notes } = GetCollection('notes', ['bookUid', '==', id])

    const [editNote, setEditNote] = useState(null)

    const handleDelete = async (id) => {
        await DeleteDocument('notes', id)
    }

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
                       <div className="flex space-x-1">
                            <img onClick={() => setEditNote(note)} src={edit} className="w-[20px] cursor-pointer" alt="" />
                            <img onClick={() => handleDelete(note.id)} src={trash} className="w-[20px] cursor-pointer" alt="" />
                       </div>
                        
                    </div>
                    <div className="text-gray-500 py-2">
                        <p>{editNote?.id !== note.id && note.body}</p>
                        {editNote?.id === note.id && <NoteForm type = 'update' setEditNote = {setEditNote} editNote = {editNote} />}
                    </div>
                </div>
            ))}
        </div>}
    </div>
  );
}

export default NoteList;
