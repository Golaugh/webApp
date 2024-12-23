import {CategoryItem} from "../types";
import {createContext, ReactNode, useEffect, useState} from "react";
import axios from "axios";

export const Category = createContext<CategoryItem[] | []>([]);
Category.displayName = 'CategoryContext';

interface CategoryContextProps {
    children: ReactNode;
}

function CategoryContext ({ children }: CategoryContextProps)  {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/JianwenBookstoreReactTransact/api/categories')
            .then((result) => setCategories(result.data ))
            .catch(console.error);
    }, []);

    return (
        <Category.Provider value ={categories}>{children}</Category.Provider>
    );
}
export default CategoryContext;