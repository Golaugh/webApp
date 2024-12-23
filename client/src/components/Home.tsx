
import HomeCategoryList from './HomeCategoryList';
import '../assets/css/global.css';
import '../assets/css/Home.css'
import { Link } from 'react-router-dom';


function Home() {


    return (

        <section className="home-pages">
            <section className="banner">
                <i className="fa-solid fa-book"></i>
                <span className="cta"><Link to ={`/categories/Best%20Sellers`}>GO Reading!</Link></span>
                <i className="fa-solid fa-book-open"></i>
            </section>

            <section className="suggested-reading">
                <i className="fa-regular fa-sun"></i>
                <span>Suggested reading</span>
            </section>

            <section className="category-images container">
                <HomeCategoryList/>
            </section>
        </section>
    )
}

export default Home;
