/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ProductDetailComponent from '@/entities/product/product-details.vue';
import ProductClass from '@/entities/product/product-details.component';
import ProductService from '@/entities/product/product.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Product Management Detail Component', () => {
    let wrapper: Wrapper<ProductClass>;
    let comp: ProductClass;
    let productServiceStub: SinonStubbedInstance<ProductService>;

    beforeEach(() => {
      productServiceStub = sinon.createStubInstance<ProductService>(ProductService);

      wrapper = shallowMount<ProductClass>(ProductDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { productService: () => productServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundProduct = { id: 123 };
        productServiceStub.find.resolves(foundProduct);

        // WHEN
        comp.retrieveProduct(123);
        await comp.$nextTick();

        // THEN
        expect(comp.product).toBe(foundProduct);
      });
    });
  });
});
