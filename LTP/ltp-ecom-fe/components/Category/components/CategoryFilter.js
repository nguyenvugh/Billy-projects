import useTranslation from "@ltp/hooks/useTranslation";
import CategoryItem from "./CategoryItem";
import WrapperFilter from "./WrapperFilter";

const CategoryFilter = ({ categoryList, slugSelected }) => {
  const { t } = useTranslation();
  return (
    <WrapperFilter title={t("category")}>
      {Array.isArray(categoryList) &&
        categoryList.map((category) => {
          if (category.name)
            return (
              <CategoryItem key={category?.id} category={category} slugSelected={slugSelected} />
            );
        })}
    </WrapperFilter>
  );
};

export default CategoryFilter;
