import getters from '@/store/modules/todo/getters';
import mutations from '@/store/modules/todo/mutations'
import state from '@/store/modules/todo/state'


export default {
    namespaced: true,
    state,
    getters,
    actions: {},
    mutations,
}