import SelectScalebb from '../components/SelectScalebb.vue'
import { mapGetters } from 'vuex'
import { getNowData } from '@/utils/format-date'

export default {
  components: {
    SelectScalebb
  },
  computed: {
    ...mapGetters(['enums']),
    dataSource() {
      return this.enums.dataSource.filter(e => {
        return !e.has || e.has.includes(this.type)
      })
    },
    forecastTypes() {
      return this.enums.forecastTypes.filter(e => {
        return !e.excludes || !e.excludes.includes(this.type)
      })
    }
  },
  props: {
    type: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      listLoading: false,
      query: {
        year: getNowData({}),
        start_date: getNowData({
          format: 'YYYYMM',
          month: 2
        }),
        data_source: 'ECMWF',
        forecast_type: 'site_anomaly',
        climate_type: 'precipitation',
        scale_abb: ['month', 'Apr'],
        model_type: '',
        region: ''
      },
      showImg: true
    }
  },
  created() {
    if (['score_ai', 'score_tcc_ai', 'forecast_ai'].includes(this.type)) {
      this.query.model_type = 'CNN'
      this.query.region = 'southchina'
    }
  },
  methods: {
    changeImgTabel() {
      this.showImg = !this.showImg
    },
    onSearch() {
      this.fetchData()
    },
    onChangeScaleabb(scaleabb) {
      this.query.scale_abb = [...scaleabb]
    },
    getParams() {
      const params = Object.assign({}, this.query)
      const { scale_abb } = params
      params.scale_abb = scale_abb[1] ? scale_abb[1] : ''
      return params
    }
  }
}
