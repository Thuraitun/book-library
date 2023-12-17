import { Link, useLocation } from "react-router-dom";
import bookimg from "../../assets/book.png"
import useFetch from "../../hooks/useFetch";
import useTheme from "../../hooks/useTheme";

const BookList = () => {

    const location = useLocation();
    const param = new URLSearchParams(location.search);
    const search = param.get('search');

    const { data : books, loading, error } = useFetch(`http://localhost:3000/books${search ? `?q=${search}` : ''}`)

    if(error) {
        return <p className="text-red-500">{error}</p>
    }

    const {isDark} = useTheme()

  return (
    <>
        {books === null && loading && <div>loading...</div>}
        
        {!!books && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
                {books.map(book => (
                <Link to={`/books/${book.id}`} className={`border border-1 p-3 ${isDark ? 'bg-dcard border-primary' : ''}`} key={book.id}>
                    <div className="overflow-hidden">
                        <img src={bookimg} alt="" className=" w-full hover:scale-150 transition duration-300" />
                    </div>
                    <div className="space-y-2 mt-3">
                        <div className="md:flex md:justify-between md:items-center">
                            <h1 className={`text-gray-700 ${isDark ? 'text-gray-200' : ''}`}>{book.title}</h1>
                            <p className="italic text-sm text-gray-500">Author By - {book.author}</p>
                        </div>
                        <div className="flex flex-wrap">
                            {book.categories.map((category, index) => (
                            <span key={index} className="mx-1 my-1 text-white px-2 py-1 bg-primary text-[12px] rounded-lg">{category}</span>
                            ))}
                        </div>
                    </div>
                </Link>
                ))}
            </div>
        )}

        {books && !books.length && !loading && (
        <p className="text-center text-red-500 text-2xl my-20">No Search Results Found</p>
        )}
    </>
  );
}

export default BookList;
