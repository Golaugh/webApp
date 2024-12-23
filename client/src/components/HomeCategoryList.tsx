import '../assets/css/HomeCategoryList.css';
import HomeCategoryListItem from "./HomeCategoryListItem";
import {useContext} from "react";
import {BookItem} from "../types";
import {Book} from "../contexts/BookContext";



function HomeCategoryList(){

    const books = useContext<BookItem[]>(Book);

    return(

        <section className="container">
            <ul className="book-list">
                {books.map((item) => <HomeCategoryListItem
                    key={item.bookId}
                    bookId={item.bookId}
                    description={item.description}
                    isPublic={item.isPublic}
                    isFeatured={item.isPublic}
                    price={item.price}
                    title={item.title}
                    author={item.author}
                    categoryId={item.categoryId}/>)}
            </ul>
        </section>

    )
}

export default HomeCategoryList;
