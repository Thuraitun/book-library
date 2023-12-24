import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const useFirestore = () => {
    const GetCollection = (colName) => {

        const [ error , setError ] = useState('');
        const [ data, setData ] = useState([]);
        const [ loading, setLoading ] = useState(false);

        useEffect(() =>{
            setLoading(true);
            let ref = collection(db, colName);
            let q = query(ref, orderBy('date', 'desc'));
           
            onSnapshot(q, docs => {
        
              if(docs.empty) {
                setError('No documents found')
                setLoading(false);
              } else {
        
                let collectionDatas = [];
                docs.forEach(doc => {
                  let document = { id: doc.id, ...doc.data()}
                  collectionDatas.push(document);
                })
                setData(collectionDatas);
                setLoading(false);
                setError('')
        
              }
            })
          }, [colName])

          return { error, data, loading}
    }

    const GetDocument = (colName, id) => {
        
        const [ error , setError ] = useState('');
        const [ data, setData ] = useState(null);
        const [ loading, setLoading ] = useState(false);

        useEffect(() => {
            setLoading(true);
            let ref = doc(db, colName, id)
            onSnapshot(ref, doc => {
                if(doc.exists()) {
                    let document = {id: doc.id, ...doc.data()};
                    setData(document);
                    setLoading(false);
                    setError('')
                } else {
                    setError('no document found');
                    setLoading(false);
                }
                
            })
        }, [colName, id])

        return { error, data, loading }
    }

    const DeleteDocument = async (colName, id) => {
        let ref = doc(db, colName, id);
        alert("Your Book deleted")
        return deleteDoc(ref)
    }

    const AddCollection = async (colName, data) => {
        const ref = collection(db, colName)
        return addDoc(ref, data)
    }

    const UpdateDocument = async (colName, id, data) => {
        let ref = doc(db, colName, id);
        return updateDoc(ref, data)
    }
 
    return { GetCollection, GetDocument, DeleteDocument, AddCollection, UpdateDocument }
}

export default useFirestore;
