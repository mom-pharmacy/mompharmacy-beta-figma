import apiClient from "@/utils/apiClient";
import { createContext, useContext, useState } from "react";

const MedicineContext = createContext({});

export const MedicineProvider = ({ children }) => {
  const [category, setCategory] = useState([]);
//   const [subcategory123, setsubcategory123] = useState([]);

  const Categories = async () => {
    try {
      const categories = await apiClient("api/medicines/categories");
      console.log("Categories from context", categories);
      if (categories) setCategory(categories);
    } catch (error) {
      console.log("Error in fetching categories", error);
    }
  };


// const SubCategory = async()=>{
//     try{
//         const subCategories = await apiClient(`api/medicines/subcategories/${subcategoryId}/medicines`);
//         console.log("Subcategories from context", subCategories);
//         if(subCategories) setsubcategory123(subCategories);

//     }catch(error){
//         console.log("Error in fetching subcategories", error)

//     }
// }


  return (
    <MedicineContext.Provider value={{ category, Categories }}>
      {children}
    </MedicineContext.Provider>
  );
};

export function useMedicine() {
  const context = useContext(MedicineContext);
  if (!context) throw new Error("Medicine Context not found");
  return context;
}