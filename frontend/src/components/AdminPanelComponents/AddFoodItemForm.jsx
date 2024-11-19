import React, { useState } from "react";
import Button from "../SmallComponents/Button/Button";
import ToggleButton from "../SmallComponents/ToggleButton";
import UploadFile from "../SmallComponents/UploadFile";
import NutritionFactsForm from "./AddNutritionFactForm";
import { useAuth } from "../AuthProvider";
import FoodItemTable from "./FoodItemTable";

const AddFoodItemForm = ({ onFoodItemAdded, children }) => {
  const { loggedInUser } = useAuth();
  const [foodItem, setFoodItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    in_stock: false,
    nutrition_fact: {},
  });

  const [isToggleEnabled, setIsToggleEnabled] = useState(false);
  const [isNutFactToggleEnabled, setIsNutFactToggleEnabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleStockChange = () => {
    setFoodItem((prev) => {
      const updatedInStock = !prev.in_stock;
      setIsToggleEnabled(updatedInStock);
      return { ...prev, in_stock: updatedInStock };
    });
  };

  const handleNutritionFactsChange = (nutritionFacts) => {
    setFoodItem((prev) => ({ ...prev, nutrition_fact: nutritionFacts }));
  };

  const handleToggleNutFactChange = () => {
    setIsNutFactToggleEnabled((prev) => !prev);
  };

  const handleAddFoodItem = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:5000/restaurant/${loggedInUser.restaurant_id}/food`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(foodItem),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add food item");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Food item added:", data);
        onFoodItemAdded(); // Call onFoodItemAdded callback here
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="bg-white rounded-lg mt-4">
      <h1 className="text-gray-700 text-2xl mb-4">{children}</h1>
      <form className="space-y-4" onSubmit={handleAddFoodItem}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              required
              name="name"
              onChange={handleChange}
              value={foodItem.name}
              placeholder="Name"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              value={foodItem.description}
              placeholder="Description"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              required
              value={foodItem.price}
              onChange={handleChange}
              name="price"
              placeholder="Do not include dollar sign"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              required
              value={foodItem.category}
              onChange={handleChange}
              name="category"
              placeholder="Category here eg. Salad, Indian"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>

          <div>
            <ToggleButton
              isEnabled={isToggleEnabled}
              handleToggleChange={handleToggleStockChange}
              children="In Stock"
            />
          </div>
          <div>
            <ToggleButton
              isEnabled={isNutFactToggleEnabled}
              handleToggleChange={handleToggleNutFactChange}
              children="Add Nutrition Fact"
            />
          </div>
          <div>
            <UploadFile children="Upload Photo" />
            <Button type="submit" children="Add Item" />
          </div>
          {isNutFactToggleEnabled && (
            <NutritionFactsForm onChange={handleNutritionFactsChange} />
          )}
        </div>
      </form>
    </div>
  );
};

export default AddFoodItemForm;
