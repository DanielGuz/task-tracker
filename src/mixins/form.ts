import moment from 'moment'
import { formUtils } from '@/helpers/formUtilities'

export const formatDateMixin = {
  methods: {
    formatDate: (date: any, hour: any) => formUtils.formatDate(date, hour)
  }
}

export const diffDateMixin = {
  methods: {
    diffBeetweenDates(dateIni: any, dateEnd: any, lapse: any) {
      return moment(dateEnd).diff(moment(dateIni), lapse)
    }
  }
}

export default {}
