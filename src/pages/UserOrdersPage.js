import UserOrders from "../features/user/components/UserOrders";
import Navbar from "../features/navbar/Navbar";
function UserOrdersPage(){
    return (
        <div>
        <Navbar>
            <h1 className="mx-auto text-2xl">My Orders</h1>
            <UserOrders></UserOrders>
        </Navbar>
    </div>

    )

}
export default UserOrdersPage;
