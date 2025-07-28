import React from "react";
import {useState} from "react";

const allCategorys = ["all", "quote", "memo"];

const CategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  return (
    <div className="category">
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        {allCategorys.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
