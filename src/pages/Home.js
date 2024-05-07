import { Link } from "react-router-dom";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product-list/components/ProductList";
import Footer from "../features/common/Footer";
function Home(){
    return(
        <div>
            <Navbar>
                <ProductList></ProductList>
            </Navbar>
            <Link to="/admin">Admin</Link>
            <Footer></Footer>
        </div>
    )
}
export default Home;