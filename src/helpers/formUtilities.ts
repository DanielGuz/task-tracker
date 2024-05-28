import moment from 'moment'
import FileSaver from 'file-saver'
import { dateformat } from '@/constants/common'

class FormUtils {
  formatNumber(numero: any, decimals = 2) {
    numero = parseFloat(numero)
    if (isNaN(numero)) {
      return (numero = 0)
    }
    numero = '' + numero.toFixed(decimals).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
    return numero
  }
  formatDate(date: any, withHour: any, format = dateformat.DEFAULT) {
    if (withHour) {
      return moment(date).format(dateformat.BACK_DATE_TIME)
    }
    return moment(date).format(format)
  }
  stringToDate(date: any, withHour: any, format = dateformat.BACK_DEFAULT) {
    if (withHour) {
      return moment(date, dateformat.BACK_DATE_TIME).toDate()
    }
    return moment(date, format).toDate()
  }
  convertModelToFormData(model: any, form: any, prefix = '', sendNulls = false) {
    const formData = form || new FormData()
    for (const propertyName of Object.keys(model)) {
      const formkey = prefix ? prefix + '_' + propertyName : propertyName
      if (model[propertyName] || sendNulls) {
        if (Array.isArray(model[propertyName])) {
          formData.append(formkey, JSON.stringify(model[propertyName]))
        } else {
          formData.append(formkey, model[propertyName])
        }
      }
    }
    return formData
  }

  forceFileDownload(response: any) {
    const headers = response.headers
    const blob = new Blob([response.data], { type: headers['content-type'] })
    let fileName = this.getFileNameFromHeader(headers['content-disposition'])
    fileName = fileName ? fileName : 'archivo'
    this.downloadFile(blob, fileName)
  }

  getFileNameFromHeader(header: any) {
    if (!header) {
      return null
    }
    const result = header.split(';')[1].trim().split('=')[1]
    return result.replace(/"/g, '')
  }

  downloadFile(blob: any, fileName: any) {
    FileSaver.saveAs(blob, fileName)
  }

  openLink(link: any) {
    window.open(link, '_blank')
  }

  utf8ToBase64(str: string): string {
    return btoa(decodeURIComponent(encodeURIComponent(str)))
  }

  base64ToUtf8(str: string): string {
    return decodeURIComponent(encodeURIComponent(atob(str)))
  }

  shortString(str: any, end = 40) {
    if (parseInt(str.length, 10) > end) {
      str = str.substring(0, end) + '...'
    }
    return str
  }
}

export const formUtils = new FormUtils()
