import {BookItem} from "../types";
import {createContext, ReactNode, useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";


export const Book = createContext<BookItem[] | []>([]);
Book.displayName = 'BookContext';

interface BookContextProps {
    children: ReactNode;
}

function BookContext ({ children }: BookContextProps)  {

    const {id} = useParams();
    const [bookList, setBookList] = useState<BookItem[]>([]);

    useEffect(() => {

        if (id === undefined) {
            axios.get(`http://localhost:8080/JianwenBookstoreReactTransact/api/categories/name/Best Sellers/books`)
                .then((result) => setBookList(result.data ))
                .catch(console.error);
        } else {
            axios.get(`http://localhost:8080/JianwenBookstoreReactTransact/api/categories/name/${id}/books`)
                .then((result) => setBookList(result.data ))
                .catch(console.error);
        }

    }, [id]);

    return (
        <Book.Provider value ={bookList}>{children}</Book.Provider>
    );
}
export default BookContext;