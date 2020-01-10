import OrderPointer from './../index.vue';

export default {
  components: {
    OrderPointer
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    order: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    },
    list() {
      return this.order.detailEntities;
    },
    userName() {
      return this.$store.state.user.info.orgName;
    }
  }
};
