import request from '@/utils/request'

export function getForecast(type, data) {
  return request.get(`/largescale/forecast_png/${type}`, data)
}

export function getScore(type, data) {
  return request.get(`/largescale/score/${type}`, data)
}
export function getNewForecast(type, data) {
  return request.get(`/largescale/${type}`, data)
}

export function getNewScore(type, data) {
  return request.get(`/largescale/${type}`, data)
}
