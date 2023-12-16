import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import bookimg from "../assets/book.png";

const BookDetail = () => {
    const param = useParams();
    const URL = `http://localhost:3000/books/${param.id}`;
    const {data : book, loading, error} = useFetch(URL)
    console.log(book);
  return (
    <div>
        {error && <div className="text-red-500">{ error }</div>}
        {loading && <div>{ loading }</div>}
        {book && 
            <div className="flex md:items-center md:m-14 md:space-x-10">
                <div className="w-[2500px]">
                    <img src={bookimg} alt="" className="w-full" />
                </div>
                <div className="space-y-6">
                    <h1 className="text-[25px] font-bold text-gray-700">{book.title}</h1>
                    <p className="text-gray-500">{book.description}</p>
                    <div className="flex justify-end">
                        <p className="italic text-sm text-gray-500"><span className="text-primary">Author By </span>- {book.author}</p>
                    </div>
                    <Link to='/' className="py-2 px-4 bg-primary rounded-md text-white">Back</Link>
                </div>
            </div>
        }  
    </div>
  );
}

export default BookDetail;
