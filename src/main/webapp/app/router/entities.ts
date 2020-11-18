import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// prettier-ignore
const Category = () => import('@/entities/category/category.vue');
// prettier-ignore
const CategoryUpdate = () => import('@/entities/category/category-update.vue');
// prettier-ignore
const CategoryDetails = () => import('@/entities/category/category-details.vue');
// prettier-ignore
const Product = () => import('@/entities/product/product.vue');
// prettier-ignore
const ProductUpdate = () => import('@/entities/product/product-update.vue');
// prettier-ignore
const ProductDetails = () => import('@/entities/product/product-details.vue');
// prettier-ignore
const Customer = () => import('@/entities/customer/customer.vue');
// prettier-ignore
const CustomerUpdate = () => import('@/entities/customer/customer-update.vue');
// prettier-ignore
const CustomerDetails = () => import('@/entities/customer/customer-details.vue');
// prettier-ignore
const Address = () => import('@/entities/address/address.vue');
// prettier-ignore
const AddressUpdate = () => import('@/entities/address/address-update.vue');
// prettier-ignore
const AddressDetails = () => import('@/entities/address/address-details.vue');
// prettier-ignore
const WishList = () => import('@/entities/wish-list/wish-list.vue');
// prettier-ignore
const WishListUpdate = () => import('@/entities/wish-list/wish-list-update.vue');
// prettier-ignore
const WishListDetails = () => import('@/entities/wish-list/wish-list-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/category/new',
    name: 'CategoryCreate',
    component: CategoryUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/category/:categoryId/edit',
    name: 'CategoryEdit',
    component: CategoryUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/category/:categoryId/view',
    name: 'CategoryView',
    component: CategoryDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product/new',
    name: 'ProductCreate',
    component: ProductUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product/:productId/edit',
    name: 'ProductEdit',
    component: ProductUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product/:productId/view',
    name: 'ProductView',
    component: ProductDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/customer',
    name: 'Customer',
    component: Customer,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/customer/new',
    name: 'CustomerCreate',
    component: CustomerUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/customer/:customerId/edit',
    name: 'CustomerEdit',
    component: CustomerUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/customer/:customerId/view',
    name: 'CustomerView',
    component: CustomerDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/address',
    name: 'Address',
    component: Address,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/address/new',
    name: 'AddressCreate',
    component: AddressUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/address/:addressId/edit',
    name: 'AddressEdit',
    component: AddressUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/address/:addressId/view',
    name: 'AddressView',
    component: AddressDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/wish-list',
    name: 'WishList',
    component: WishList,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/wish-list/new',
    name: 'WishListCreate',
    component: WishListUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/wish-list/:wishListId/edit',
    name: 'WishListEdit',
    component: WishListUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/wish-list/:wishListId/view',
    name: 'WishListView',
    component: WishListDetails,
    meta: { authorities: [Authority.USER] },
  },
  // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
];
