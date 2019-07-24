import {getUserBaseInfo} from '../utils/request'
export const state = () => ({
  profile:{}
})
export const getters={
  profile: state => state.profile
}
export const mutations = {
  setProfile (state,payload) {
    state.profile=payload
  }
}
export const actions = {
  getProfile({commit}){
    getUserBaseInfo()
  }
}
