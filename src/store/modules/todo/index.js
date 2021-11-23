import getters from "@/store/modules/todo/getters";
import mutations from "@/store/modules/todo/mutations"

import LIST_FILTER from "@/constants/todo/listFilter";

const state = () => ({
    listFilter: LIST_FILTER.ALL,
    todos: [],
    _sequence: 0
});

// 비동기 처리 
const actions = {

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}