import { useState } from "react";
import { useParams } from "react-router-dom";
import useFirestore from "../../hooks/useFirestore";

const NoteForm = () => {

    const { id } = useParams()

    const [ body, setBody ] = useState('')

    const { AddCollection } = useFirestore()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            body,
            bookUid: id,
        }

        if(body) {
            await AddCollection('notes', data)
            setBody('')
        } else {
            alert("Please fill in notes")
        }


    }
  return (
    <form onSubmit={handleSubmit}>
        <h1 className="font-bold text-center text-primary text-2xl my-5">My Notes</h1>
        <textarea value={body} onChange={e => setBody(e.target.value)} id="" cols="30" rows="5" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"></textarea>
        <button type="submit" className="text-white bg-primary px-3 py-1 rounded-lg flex items-center gap-1">
            Add Note
        </button>
    </form>
  );
}

export default NoteForm;
