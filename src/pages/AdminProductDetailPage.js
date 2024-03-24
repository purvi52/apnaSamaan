import Navbar from "../features/navbar/Navbar";
import ProductDetail from "../features/product-list/components/ProductDetail";
function AdminProductDetailPage(){
    return(
        <div>
            <Navbar>
                <ProductDetail></ProductDetail>
            </Navbar>
        </div>
    )
}
export default AdminProductDetailPage;