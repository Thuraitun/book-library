import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import useTheme from "../hooks/useTheme";
import useFirestore from "../hooks/useFirestore";
import NoteForm from "../components/noteform/NoteForm";
import NoteList from "../components/notelist/NoteList";

const BookDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    
    const { GetDocument } = useFirestore()
    const { error, data: book, loading} = GetDocument('books', id)


    useEffect(() => {
        if(error) {
            setTimeout(() => {
                navigate('/')
            }, 2000)
        }
    }, [error, navigate])

    const {isDark} = useTheme()

    
  return (
    <div className="">
        {error && <div className="text-red-500 my-40 text-center text-[20px]">{ error }</div>}
        {loading && <div>{ loading }</div>}
        {book && 
            <>
                <div className="md:flex md:items-center m-4 md:m-14 md:space-x-10">
                    <div className="md:w-[1300px]">
                        <img src={book.cover} alt="" className="w-full" />
                    </div>
                    <div className="mt-4 md:mt-0 space-y-3">
                        <h1 className={`text-[25px] font-bold text-gray-700 ${isDark ? 'text-white' : ''}`}>{book.title}</h1>
                        <div className="flex flex-wrap gap-1">
                            {book.categories.map((category, index) => (
                                <span key={index} className="text-white px-2 py-1 bg-primary text-sm rounded-lg">{category}</span>
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-[1800px]">{book.description}</p>
                        <div className="flex justify-end">
                            <p className="italic text-sm text-gray-500"><span className="text-primary">Author By </span>- {book.author}</p>
                        </div>
                        <div className="my-3 md:my-0">
                            <Link to='/' className="py-2 px-4 bg-primary rounded-md text-white">Back</Link>
                        </div>
                    </div>
                </div>

                <div className="">

                    <NoteForm />
                    <NoteList />
                    
                </div>
            </>
        }  
    </div>
  );
}

export default BookDetail;
