import { Form, useParams } from "react-router-dom";
import { 
    createProductAsync, 
    selectBrands, 
    selectCategories, 
    selectProductById,
    fetchProductByIdAsync, 
    updateProductAsync,
    clearSelectedProduct} from "../../product-list/ProductListSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { loginUserAsync } from "../../auth/authSlice";
import { useEffect, useState } from "react";
import Modal from "../../common/Modal";
function ProductForm(){
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
      } = useForm();

    const categories=useSelector(selectCategories);
    const brands=useSelector(selectBrands);
    const dispatch= useDispatch();
    const params=useParams();
    const selectedProduct=useSelector(selectProductById)
    const [openModal,setOpenModal]=useState(null);

    useEffect(() => {
        if (params.id) {
          dispatch(fetchProductByIdAsync(params.id));
        } 
        else {
          dispatch(clearSelectedProduct());
        }
      }, [params.id, dispatch]);

      useEffect(() => {
        if (selectedProduct && params.id) {
          setValue('title', selectedProduct.title);
          setValue('description', selectedProduct.description);
          setValue('price', selectedProduct.price);
          setValue('discountPercentage', selectedProduct.discountPercentage);
          setValue('thumbnail', selectedProduct.thumbnail);
          setValue('stock', selectedProduct.stock);
          setValue('image1', selectedProduct.images[0]);
          setValue('image2', selectedProduct.images[1]);
          setValue('image3', selectedProduct.images[2]);
          setValue('brand', selectedProduct.brand);
          setValue('category', selectedProduct.category);
        }
      }, [selectedProduct, params.id, setValue]);

      const handleDelete = () =>{
        const product = {...selectedProduct};
        product.deleted = true;
        dispatch(updateProductAsync(product));
      }

    return (
      <>
<form
noValidate
      onSubmit={handleSubmit((data) => {
        console.log(data);
        const product = { ...data };
        product.images = [
          product.image1,
          product.image2,
          product.image3,
          product.thumbnail,
        ];
        product.rating = 0;
        delete product['image1'];
        delete product['image2'];
        delete product['image3'];
        product.price = +product.price;
        product.stock = +product.stock;
        product.discountPercentage = +product.discountPercentage;
        console.log(product);
        
        if (params.id) {
          product.id = params.id;
          product.rating = selectedProduct.rating || 0;
          dispatch(updateProductAsync(product));
          reset();
        } else {
          dispatch(createProductAsync(product));
          reset();
          //TODO:  on product successfully added clear fields and show a message
        }
      }
      )}>
  <div class="space-y-12 bg-white p-12">
    <div class="border-b border-gray-900/10 pb-12">
      <h2 class="text-base font-semibold leading-7 text-gray-900">Add Product</h2>

      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      {selectedProduct?.deleted && <h2 className="text-red-500 sm:col-span-6">This product is deleted</h2>}
        <div class="sm:col-span-6">
          <label for="title" class="block text-sm font-medium leading-6 text-gray-900">
          Product Name
          </label>
          <div class="mt-2">
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
              <input type="text" 
              {...register('title',{
                required:'name is required',
                })} 
                id="title" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
            </div>
          </div>
        </div>

        <div class="col-span-full">
          <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
          <div class="mt-2">
            <textarea id="description" 
            {...register('description',{
                required:'description is required',
                })} 
            rows={3} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
          </div>
          <p class="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about product.</p>
        </div>

        <div class="col-span-full">
          <label for="brand" class="block text-sm font-medium leading-6 text-gray-900">Brand</label>
          <div class="mt-2">
          <select
                  {...register('brand')}
                >
                  <option value="">--choose brand--</option>
                  {brands.map((brand) => (
                    <option key={brand.value} value={brand.value}>{brand.label}</option>
                  ))}
                </select>
          </div>
        </div>

        <div class="col-span-full">
          <label for="category" class="block text-sm font-medium leading-6 text-gray-900">Brand</label>
          <div class="mt-2">
          <select
                  {...register('category', {
                    required: 'category is required',
                  })}
                >
                  <option value="">--choose category--</option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>{category.label}</option>
                  ))}
                </select>
          </div>
          
        </div>

        <div class="sm:col-span-2">
          <label for="price" class="block text-sm font-medium leading-6 text-gray-900">
          Price
          </label>
          <div class="mt-2">
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
              <input type="number" 
              {...register('price',{
                required:'price is required',
                min:1,
                max:1000
                })} 
              id="price" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
            </div>
          </div>
        </div>

        <div class="sm:col-span-2">
          <label for="discountPercentage" class="block text-sm font-medium leading-6 text-gray-900">
          Discount
          </label>
          <div class="mt-2">
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
              <input type="number" 
              {...register('discountPercentage',{
                required:'discountPercentage is required',
                min:0,
                max:100
                })} 
              id="discountPercentage" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
            </div>
          </div>
        </div>

        <div class="sm:col-span-2">
          <label for="stock" class="block text-sm font-medium leading-6 text-gray-900">
          Stock
          </label>
          <div class="mt-2">
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
              <input type="number" 
              {...register('stock',{
                required:'stock is required',
                min:0
                })} 
              id="stock" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
            </div>
          </div>
        </div>

        <div class="sm:col-span-6">
          <label for="thumbnail" class="block text-sm font-medium leading-6 text-gray-900">
          Thumbnail
          </label>
          <div class="mt-2">
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
              <input type="text" 
              {...register('thumbnail',{
                required:'thumbnail is required'
                })} 
              id="thumbnail" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
            </div>
          </div>
        </div>

        <div class="sm:col-span-6">
          <label for="image1" class="block text-sm font-medium leading-6 text-gray-900">
          Image 1
          </label>
          <div class="mt-2">
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
              <input type="text" 
              {...register('image1',{
                required:'image1 is required'
                })} 
              id="image1"  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
            </div>
          </div>
        </div>

        <div class="sm:col-span-6">
          <label for="image2" class="block text-sm font-medium leading-6 text-gray-900">
          Image 2
          </label>
          <div class="mt-2">
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
              <input type="text" 
              {...register('image2',{
                required:'image2 is required'
                })}  
              id="image2"  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
            </div>
          </div>
        </div>

        <div class="sm:col-span-6">
          <label for="image3" class="block text-sm font-medium leading-6 text-gray-900">
          Image 3
          </label>
          <div class="mt-2">
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
              <input type="text" 
              {...register('image3',{
                required:'image3 is required'
                })} 
              id="image3" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
            </div>
          </div>
        </div>


        
        
      </div>
    </div>


    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Extra</h2>
     

      <div className="mt-10 space-y-10">
        <fieldset>
          <legend class="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
          <div class="mt-6 space-y-6">
            <div class="relative flex gap-x-3">
              <div class="flex h-6 items-center">
                <input id="comments" name="comments" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              </div>
              <div class="text-sm leading-6">
                <label for="comments" class="font-medium text-gray-900">Comments</label>
                <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
              </div>
            </div>
            <div class="relative flex gap-x-3">
              <div class="flex h-6 items-center">
                <input id="candidates" name="candidates" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              </div>
              <div class="text-sm leading-6">
                <label for="candidates" class="font-medium text-gray-900">Candidates</label>
                <p class="text-gray-500">Get notified when a candidate applies for a job.</p>
              </div>
            </div>
            <div class="relative flex gap-x-3">
              <div class="flex h-6 items-center">
                <input id="offers" name="offers" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              </div>
              <div class="text-sm leading-6">
                <label for="offers" class="font-medium text-gray-900">Offers</label>
                <p class="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
              </div>
            </div>
          </div>
        </fieldset>

      </div>
    </div>
  </div>

  <div className="mt-6 flex items-center justify-end gap-x-6">
    <button 
        type="button" 
        className="text-sm font-semibold leading-6 text-gray-900">
        Cancel
    </button>

    {selectedProduct && !selectedProduct.deleted && (<button 
        onClick={(e)=>{e.preventDefault(); setOpenModal(true)}}
        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Delete
    </button>)}

    <button 
        type="submit" 
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Save
    </button>
   
  </div>
</form>
<Modal
      title={`Delete ${selectedProduct?.title}`}
      message="Are you sure you want to delete this Product item ?"
      dangerOption="Delete"
      cancelOption="Cancel"
      dangerAction={handleDelete}
      cancelAction={()=>setOpenModal(null)}
      showModal={openModal}
  ></Modal>
</>
    );
}
export default ProductForm;