import lodash from 'lodash';
function createData(id, product_parent_category_thumbnail, product_parent_category_code, product_parent_category_name, product_parent_category_feature, product_children_category_count) {
  return { id, product_parent_category_thumbnail, product_parent_category_code, product_parent_category_name, product_parent_category_feature, product_children_category_count };
}

const data = [
  createData(1, 'http://localhost:3000/imgs/mocks/product.svg', 'BBN', 'Bao bì nhựa', false, 5),
  createData(2, 'http://localhost:3000/imgs/mocks/product.svg', 'CNB', 'Hộp nhự khuôn', true, 10),
  createData(3, 'http://localhost:3000/imgs/mocks/product.svg', 'KHN', 'Nhựa khuôn mẫu', true, 15),
  createData(4, 'http://localhost:3000/imgs/mocks/product.svg', 'MTP', 'Nhựa công nghiệp', false, 20),
  createData(5, 'http://localhost:3000/imgs/mocks/product.svg', 'BIZ', 'Nhựa nhập ngoại', false, 25),
  createData(6, 'http://localhost:3000/imgs/mocks/product.svg', 'HUK', 'Nhựa Poly', false, 30),
  createData(7, 'http://localhost:3000/imgs/mocks/product.svg', 'UKL', 'Nhựa Cotome', false, 35),
  createData(8, 'http://localhost:3000/imgs/mocks/product.svg', 'QHE', 'Nhựa cứng', true, 40),
  createData(9, 'http://localhost:3000/imgs/mocks/product.svg', 'NHU', 'Nhựa tranh thỏ', false, 45),
  createData(10, 'http://localhost:3000/imgs/mocks/product.svg', 'QUY', 'Nhựa Xi Chông', true, 50),
];


function createProductChildrenCategoriesData(id, product_children_category_code, product_children_category_name, products_count) {
  return { id, product_children_category_code, product_children_category_name, products_count };
}

const productChildrenCategoriesData = [
  createProductChildrenCategoriesData(1, 'MP', 'Mỹ phẩm', 5),
  createProductChildrenCategoriesData(2, 'MP', 'Mỹ phẩm', 10),
  createProductChildrenCategoriesData(3, 'MP', 'Mỹ phẩm', 15),
  createProductChildrenCategoriesData(4, 'MP', 'Mỹ phẩm', 20),
  createProductChildrenCategoriesData(5, 'MP', 'Mỹ phẩm', 25),
  createProductChildrenCategoriesData(6, 'QA', 'Quần Áo', 30),
  createProductChildrenCategoriesData(7, 'QA', 'Quần Áo', 35),
  createProductChildrenCategoriesData(8, 'QA', 'Quần Áo', 40),
  createProductChildrenCategoriesData(9, 'QA', 'Quần Áo', 45),
  createProductChildrenCategoriesData(10, 'QA', 'Quần Áo', 50),
];

export const getProductParentCategoriesList = () => {
  return {
		totalPages: 1,
		data: data
  }
}

export const getParentCategoryDetail = (id) => {
  const data = getProductParentCategoriesList()["data"];
  const category = lodash.find(data, { id: parseInt(id) });
  return {
    totalPages: 1,
    data: {
      ...category,
      childrens: productChildrenCategoriesData
    }
  }
};