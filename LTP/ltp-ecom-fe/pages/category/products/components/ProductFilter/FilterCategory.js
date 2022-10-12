import useTranslation from "@ltp/hooks/useTranslation";
import CategoryItem from "./CategoryItem";
import WrapperFilter from "./WrapperFilter";

const FilterCategory = ({ categoryList, setCategorySelect, categorySelect }) => {
  const { t } = useTranslation();
  return (
    <WrapperFilter title={t("category")}>
      {Array.isArray(categoryList) &&
        categoryList.map((category) => (
          <CategoryItem
            key={category?.id}
            category={category}
            categorySelect={Array.isArray(categorySelect) ? categorySelect : []}
            setCategorySelect={setCategorySelect}
          />
        ))}
    </WrapperFilter>
  );
};

export default FilterCategory;
