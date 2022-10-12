export const baseURL = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_BASE_URL_VERSION;

// product category
export const getProductCategory = '/admin/product-category?page=%s&limit=%s&is_sub=-1';
export const getChildProductCategory = '/admin/product-category?page=%s&limit=%s&is_sub=1&parent=%s';
export const deleteProductCategory = '/admin/product-category/%s';
export const deleteProductCategories = '/admin/product-category?';
export const productCate = '/admin/product-category';
export const getAllChildProductCategory = '/admin/product-category?page=1&limit=50&is_sub=1';
export const productCategoryOrders = '/admin/product-category/orders';

// products
export const getProducts = '/admin/product?page=%s&limit=%s';
export const getProductsAxios = '/admin/product';
export const getAllFeaturedProducts = '/admin/product?page=1&limit=%s&is_feature=1';
export const getProductDetail = '/admin/product/%s';
export const deleteProduct = '/admin/product/%s';
export const deleteProducts = '/admin/product?';
export const addProduct = '/admin/product';

// media upload
export const uploadImg = '/admin-media-upload';
export const uploadImgs = '/admin-media-upload/files';
export const deleteImg = '/admin-media-upload/%s';

// news category
export const getAllNewsCategory = '/admin/news-category';
export const postNewsCategory = '/admin/news-category';
export const updateNewsCategory = '/admin/news-category/%s';
export const deleteNewsCategory = '/admin/news-category/delete?';

// news
export const getNews = '/admin/news?page=%s&limit=%s';
export const createNews = '/admin/news';
export const updateNews = '/admin/news/%s';
export const deleteNews = '/admin/news/delete?';
export const sendEmailNews = "/admin/send-email/news"

// admin account
export const getAdminAccount = '/admin/admin?page=%s&limit=%s';
export const getAdminDetail = '/admin/admin/%s';
export const createAdminAccount = '/admin/admin';
export const updateAdminAccount = '/admin/admin/%s';
export const deleteAdminAccount = '/admin/admin/delete';

// customer management
export const getAllCustomers = '/admin/customers?page=%s&limit=%s';
export const activateCustomer = '/admin/customers/activate/%s';
export const deactivateCustomer = '/admin/customers/deactivate/%s';
export const customerDetail = '/admin/customers/%s';
export const orderByCustomer = '/admin/customers/%s/orders?page=%s&limit=%s';
export const deleteOrders = '/admin/orders/delete';
export const updateOrderDetail = '/admin/orders/%s';

// customer address
export const getListCity = '/customer/city?country=1';
export const getListDistrict = '/customer/district?city=%s';
export const getListWard = '/customer/ward?district=%s';

// admin profile
export const getAdminProfile = '/admin/users/profile';
export const updateAdminProfile = '/admin/users/profile';
export const getAdminGroup = '/admin/group';
