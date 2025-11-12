import { CustomSelect } from "@/components/CustomSelect";
import { RadioButtonsGroup } from "@/components/RadioGroup";
import { ProductDto } from "@/shared/dto/product.dto";
import {
  useCalculatePricingMutation,
  useGetProductsBySupplierQuery,
} from "@/store/api/pricingApi";
import { Checkbox, Input, TextField } from "@mui/material";
import { useState } from "react";

export const ProductTable = () => {
  const loggedInSupplierId = "SUPPLIER001";
  const { data, isLoading } = useGetProductsBySupplierQuery(loggedInSupplierId);
  const [
    calculatePricing,
    { data: calculatedData, isLoading: isCalculationLoading, isSuccess },
  ] = useCalculatePricingMutation();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSegment, setSelectedSegment] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectionMode, setSelectionMode] = useState<
    "one" | "multiple" | "all"
  >("multiple");
  const [selectedProducts, setSelectedProducts] = useState<ProductDto[]>([]);
  const [selectAllMode, setSelectAllMode] = useState<"select" | "deselect">(
    "deselect"
  );
  const [basedOn, setBasedOn] = useState("");
  const [adjustmentMode, setAdjustmentMode] = useState<"fixed" | "dynamic">(
    "fixed"
  );
  const [incrementMode, setIncrementMode] = useState<"increase" | "decrease">(
    "increase"
  );
  const [adjustmentValue, setAdjustmentValue] = useState<number>(0);

  const filteredProducts = data?.filter((product: ProductDto) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.skuCode.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory
      ? product.subCategoryId === selectedCategory
      : true;

    const matchesSegment = selectedSegment
      ? product.segmentId === selectedSegment
      : true;

    const matchesBrand = selectedBrand ? product.brand === selectedBrand : true;

    return matchesSearch && matchesCategory && matchesSegment && matchesBrand;
  });

  const handleCalculate = async () => {
    try {
      const result = await calculatePricing({
        productSelected: selectedProducts,
        basedOn,
        adjustmentMode,
        incrementMode,
        adjustmentValue,
      }).unwrap();

      console.log("Calculated pricing:", result);
    } catch (err) {
      console.error("Error calculating pricing:", err);
    }
  };

  if (isLoading) {
    return <div>Loading products...</div>;
  }
  return (
    <div className="pb-12">
      <h2 className="text-xl font-semibold mb-4">
        Products for {loggedInSupplierId}
      </h2>
      <section className="mb-6">
        <RadioButtonsGroup
          options={["One Product", "Multiple Products", "All Products"]}
          label="You are creating a pricing profile for"
          selectedOption={
            selectionMode === "one"
              ? "One Product"
              : selectionMode === "multiple"
                ? "Multiple Products"
                : "All Products"
          }
          onChange={(value) => {
            if (value === "One Product") setSelectionMode("one");
            else if (value === "Multiple Products")
              setSelectionMode("multiple");
            else setSelectionMode("all");

            if (value === "All Products") {
              setSelectedProducts(filteredProducts || []);
            } else {
              setSelectedProducts([]);
            }
          }}
        />
      </section>
      <section className="mb-6 flex items-center gap-4">
        <TextField
          id="outlined-basic"
          label="Search Product/SKU"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CustomSelect
          label={"Category"}
          options={[
            { label: "All", value: "" },
            { label: "Wine", value: "Wine" },
            { label: "Beer", value: "Beer" },
            { label: "Liquor & Spirits", value: "Liquor & Spirits" },
            { label: "Cider", value: "Cider" },
            {
              label: "Premixed & Ready-to-Drink",
              value: "Premixed & Ready-to-Drink",
            },
            { label: "Other", value: "Other" },
          ]}
          handleChange={(event) => setSelectedCategory(event.target.value)}
          selectedOption={selectedCategory}
        />
        <CustomSelect
          label={"Segment"}
          options={[
            { label: "All", value: "" },
            { label: "Red", value: "Red" },
            { label: "White", value: "White" },
            { label: "Rose", value: "Rose" },
            { label: "Orange", value: "Orange" },
            {
              label: "Sparkling",
              value: "Sparkling",
            },
            { label: "Port/Dessert", value: "Port/Dessert" },
          ]}
          handleChange={(event) => setSelectedSegment(event.target.value)}
          selectedOption={selectedSegment}
        />
        <CustomSelect
          label={"Brand"}
          options={[
            { label: "All", value: "" },
            { label: "High Garden", value: "High Garden" },
            { label: "Koyama Wines", value: "Koyama Wines" },
            { label: "Lacourte-Godbillon", value: "Lacourte-Godbillon" },
          ]}
          handleChange={(event) => setSelectedBrand(event.target.value)}
          selectedOption={selectedBrand}
        />
      </section>
      <p className="pb-4">Showing {filteredProducts.length} results</p>
      <section className="mb-6 flex items-center gap-4">
        <RadioButtonsGroup
          options={["Select All", "Deselect All"]}
          selectedOption={
            selectAllMode === "select" ? "Select All" : "Deselect All"
          }
          onChange={(value) => {
            if (value === "Select All") {
              setSelectedProducts(filteredProducts || []);
              setSelectAllMode("select");
            } else {
              setSelectedProducts([]);
              setSelectAllMode("deselect");
            }
          }}
          disabled={selectionMode === "one"}
        />
      </section>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-500">
            <th className="border border-gray-300 px-4 py-2"></th>
            <th className="border border-gray-300 px-4 py-2">Product title</th>
            <th className="border border-gray-300 px-4 py-2">SKU Code</th>
            <th className="border border-gray-300 px-4 py-2">Brand</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Sub-Category</th>
            <th className="border border-gray-300 px-4 py-2">Segment</th>
            <th className="border border-gray-300 px-4 py-2">
              Global Wholesale Price
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts?.map((product: ProductDto) => {
            const isSelected = selectedProducts.some(
              (p) => p.skuCode === product.skuCode
            );

            return (
              <tr key={product.skuCode}>
                <td className="px-4 py-2">
                  <Checkbox
                    checked={isSelected}
                    disabled={
                      selectionMode === "one" &&
                      selectedProducts.length === 1 &&
                      !isSelected
                    }
                    onChange={() => {
                      if (selectionMode === "one") {
                        if (isSelected) {
                          setSelectedProducts([]);
                        } else {
                          setSelectedProducts([product]);
                        }
                      } else if (selectionMode === "multiple") {
                        setSelectedProducts((prev) =>
                          prev.some((p) => p.skuCode === product.skuCode)
                            ? prev.filter((p) => p.skuCode !== product.skuCode)
                            : [...prev, product]
                        );
                      }
                    }}
                  />
                </td>
                <td className="px-4 py-2">{product.title}</td>
                <td className="px-4 py-2">{product.skuCode}</td>
                <td className="px-4 py-2">{product.brand}</td>
                <td className="px-4 py-2">{product.categoryId}</td>
                <td className="px-4 py-2">{product.subCategoryId}</td>
                <td className="px-4 py-2">{product.segmentId}</td>
                <td className="px-4 py-2">
                  ${product.globalWholesalePrice.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="pt-4 pb-8 font-bold">
        You have selected {selectedProducts.length}, these will be added to the
        pricing profile.
      </p>
      <CustomSelect
        label={"Based on"}
        options={[
          { label: "Global wholesale price", value: "Global wholesale price" },
        ]}
        handleChange={(event) => setBasedOn(event.target.value)}
        selectedOption={basedOn}
        className="w-[300px] mb-6"
      />

      <RadioButtonsGroup
        options={["Fixed ($)", "Dynamic (%)"]}
        label="Set Price adjustment mode"
        selectedOption={
          adjustmentMode === "fixed" ? "Fixed ($)" : "Dynamic (%)"
        }
        onChange={(value) =>
          setAdjustmentMode(value === "Fixed ($)" ? "fixed" : "dynamic")
        }
        className="mb-6"
      />
      <br />
      <RadioButtonsGroup
        options={["Increase (+)", "Decrease (-)"]}
        label="Set Price Adjustment increment mode"
        selectedOption={
          incrementMode === "increase" ? "Increase (+)" : "Decrease (-)"
        }
        onChange={(value) =>
          setIncrementMode(value === "Increase (+)" ? "increase" : "decrease")
        }
        className="mb-6"
      />
      <br />
      <label className="block font-medium mb-2">Adjustment Value</label>
      <input
        type="number"
        min={0}
        value={adjustmentValue}
        onChange={(e) => setAdjustmentValue(Number(e.target.value))}
        className="mb-6 border border-gray-300 rounded px-3 py-2 w-[150px]"
      />
      <br />
      <button
        className="bg-[#1976d2] text-white px-3 py-1 rounded my-6"
        onClick={handleCalculate}
        disabled={isCalculationLoading}
      >
        Calculate Adjustment to Selected Products
      </button>
      {isSuccess && calculatedData && (
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-500">
              <th className="border border-gray-300 px-4 py-2">
                Product title
              </th>
              <th className="border border-gray-300 px-4 py-2">SKU Code</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">
                Based on Price
              </th>
              <th className="border border-gray-300 px-4 py-2">Adjustment</th>
              <th className="border border-gray-300 px-4 py-2">New Price</th>
            </tr>
          </thead>
          <tbody>
            {calculatedData.map((product: ProductDto) => (
              <tr key={product.skuCode}>
                <td className="px-4 py-2">{product.title}</td>
                <td className="px-4 py-2">{product.skuCode}</td>
                <td className="px-4 py-2">{product.subCategoryId}</td>
                <td className="px-4 py-2">
                  ${product.globalWholesalePrice.toFixed(2)}
                </td>
                <td className="px-4 py-2">
                  {incrementMode === "increase"
                    ? adjustmentMode === "fixed"
                      ? `+$${adjustmentValue}`
                      : `+${adjustmentValue}%`
                    : adjustmentMode === "fixed"
                      ? `-$${adjustmentValue}`
                      : `-${adjustmentValue}%`}
                </td>
                <td className="px-4 py-2">${product.newPrice?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
