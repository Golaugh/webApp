import   '../types';
import '../assets/css/CategoryBookList.css';
import CategoryBookListItem from './CategoryBookListItem';
import CategoryNav from './CategoryNav';
import  "../types";
import {BookItem} from "../types";
import {useContext, useReducer} from "react";
import {Book} from "../contexts/BookContext";
import {useParams} from "react-router-dom";
import {cartReducer, initialCartState} from "../reducers/CartReducer";


function CategoryBookList() {

    const {id} = useParams();
    const books = useContext<BookItem[]>(Book);

    return (
      <section className="category-main">
          <CategoryNav/>
          <section className="right-sec">
              <section className="selected-reading">
                  <i className="fa-solid fa-arrow-trend-up"></i>
                  <span>{id}</span>
              </section>

              <section className="book-container">
                  <ul className="book-lists">
                      {books.map((item) => <CategoryBookListItem
                          key={item.bookId}
                          bookId={item.bookId}
                          description={item.description}
                          isPublic={item.isPublic}
                          isFeatured={item.isFeatured}
                          price={item.price}
                          title={item.title}
                          author={item.author}
                          categoryId={item.categoryId}/>)}
                  </ul>
              </section>
          </section>
      </section>
  )
}

export default CategoryBookList;
