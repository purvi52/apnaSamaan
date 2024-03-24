import ProductForm from "../features/admin/components/ProductForm";
import Navbar from "../features/navbar/Navbar";
import ProductDetail from "../features/product-list/components/ProductDetail";
function AdminProductFormPage(){
    return(
        <div>
            <Navbar>
                <ProductForm></ProductForm>
            </Navbar>
        </div>
    )
}
export default AdminProductFormPage;