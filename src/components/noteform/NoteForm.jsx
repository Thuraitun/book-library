import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFirestore from "../../hooks/useFirestore";

// eslint-disable-next-line react/prop-types
const NoteForm = ({type = 'create', setEditNote, editNote}) => {

    const { id } = useParams()

    const [ body, setBody ] = useState('')

    const { AddCollection, UpdateDocument } = useFirestore()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            body,
            bookUid: id,
        }

        if(type === 'create') {
            if(body) {
                await AddCollection('notes', data)
                setBody('')
            } else {
                alert("Please fill in notes")
            }
        } {
            // eslint-disable-next-line react/prop-types
            editNote.body = body
            // eslint-disable-next-line react/prop-types
            await UpdateDocument('notes', editNote.id, editNote, false)
            setEditNote(null)
        }
    }

    useEffect(() => {
        if(type === 'update') {
            // eslint-disable-next-line react/prop-types
            setBody(editNote.body)
        }
    }, [type, editNote])


  return (
    <form onSubmit={handleSubmit}>
        
        <textarea value={body} onChange={e => setBody(e.target.value)} id="" cols="30" rows="5" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"></textarea>
        <div className="flex space-x-3">
            <button type="submit" className="text-white bg-primary px-3 py-1 rounded-lg flex items-center gap-1">
                {type === 'create' ? 'Add' : 'Update'} Note
            </button>
            {type === 'update' && <button type="submit" onClick={() => setEditNote(null)} className="text-red-500 border border-red-500 px-3 py-1 rounded-lg flex items-center gap-1">
                Cancel
            </button>}
        </div>
    </form>
  );
}

export default NoteForm;
