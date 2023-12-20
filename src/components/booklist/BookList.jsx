import { Link, useLocation } from "react-router-dom";
import bookimg from "../../assets/fullstack.webp";
import useTheme from "../../hooks/useTheme";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import trash from "../../assets/trash.svg"
import edit from "../../assets/edit.svg"

const BookList = () => {
  const location = useLocation();
  const param = new URLSearchParams(location.search);
  const search = param.get("search");

  const [ error , setError ] = useState('');
  const [ books, setBooks ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    
    let ref = doc(db, "books", id);
    alert("Your Book deleted")
    await deleteDoc(ref)
  }
  
  useEffect(() =>{
    setLoading(true);
    let ref = collection(db, 'books');
    let q = query(ref, orderBy('date', 'desc'));
   
    onSnapshot(q, docs => {

      if(docs.empty) {
        setError('No documents found')
        setLoading(false);
      } else {

        let books = [];
        docs.forEach(doc => {
          let book = { id: doc.id, ...doc.data()}
          books.push(book);
        })
        setBooks(books);
        setLoading(false);
        setError('')

      }
    })
  }, [])

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const { isDark } = useTheme();

  return (
    <>
      {!books && loading && <div>loading...</div>}
      
      {!!books && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4 z-30">
          {books.map((book) => (
            <Link
              to={`/books/${book.id}`}
              className={`border border-1 p-3 rounded-md ${
                isDark ? "bg-dcard border-primary" : ""
              }`}
              key={book.id}
            >
              <div className="overflow-hidden">
                <img
                  src={bookimg}
                  alt=""
                  className=" w-full"
                />
              </div>
              <div className="space-y-2 mt-3">
                <div className="md:flex md:justify-between md:items-center">
                  <h1
                    className={`text-gray-700 ${isDark ? "text-gray-200" : ""}`}
                  >
                    {book.title}
                  </h1>
                  <p className="italic text-sm text-gray-500">
                    Author By - {book.author}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 space-y-2 md:space-y-0">
                  <div className="flex flex-wrap">
                    {book.categories.map((category, index) => (
                      <div key={index}>
                        <span
                          className=" mx-1 my-1 text-white px-2 py-1 bg-primary text-[12px] rounded-lg"
                        >
                          {category}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between md:justify-end space-x-1">
                    <Link to={`/edit/${book.id}`}>
                      <img src={edit} alt="" />
                    </Link>
                    <div onClick={(e) => handleDelete(e, book.id)} className="">
                      <img src={trash} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {books && !books.length && (
        <p className="text-center text-red-500 text-2xl my-20">
          No Search Results Found
        </p>
      )}
    </>
  );
};

export default BookList;
