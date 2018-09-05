import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import App from './App.vue';

describe('App.vue', () => {
  let Constructor;
  let vm;

  const routerView = {
    render: r => r('div', 'mocked component'),
  };


  beforeEach((done) => {
    Vue.use(Vuex);
    Vue.use(Vuetify);

    Constructor = Vue.extend(App);
    vm = new Constructor({
      mounted: () => done(),

      components: { routerView },
      store: new Vuex.Store({
        modules: {
          async: {
            namespaced: true,
            actions: {
              syncLoopback() {},
            },
          },
        },
      }),

    });
    vm.$mount();
  });

  afterEach(() => vm.$destroy());


  it('should render router component', () => {
    expect(vm.$el.innerHTML).toContain('mocked component');
    expect(vm.$el.getAttribute('id')).toEqual('app');
  });
});
