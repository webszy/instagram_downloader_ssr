import {getUserBaseInfo} from '../utils/request'
export const state = () => ({
  profile:{},
  picInfo:{}
})
export const getters={
  profile: state => state.profile,
  picInfo:state => state.picInfo
}
export const mutations = {
  setProfile (state,payload) {
    state.profile=payload
  },
  setPicInfo (state,payload) {
    state.picInfo=payload
  },
}
export const actions = {
  getProfile({commit}){
    getUserBaseInfo()
  }
}
