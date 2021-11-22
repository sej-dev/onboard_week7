import TODO_STATUS from "@/constants/todo/todoStatus";
import LIST_FILTER from "@/constants/todo/listFilter";
import * as types from "@/store/modules/todo/mutation-types";

const activePredicate = todo => todo.status === TODO_STATUS.ACTIVE;
const completedPredicate = todo => todo.status === TODO_STATUS.COMPLETED;

const state = () => ({
    listFilter: LIST_FILTER.ALL,
    todos: [
        
    ],
    _sequence: 0
});

// 속성 유형 접근   - 캐싱 O
// 메서드 유형 접근 - 캐싱 X
const getters = {
    hasTodos: (state) => {
        return state.todos.length > 0
    },

    getTodoById: (state) => (id) => {
        return state.todos.find(todo => todo.id === id);
    },

    getTodosByFilter: (state) => (filter) => {
        switch (filter) {
            case LIST_FILTER.ALL: return state.todos;
            case LIST_FILTER.ACTIVE: return state.todos.filter(activePredicate);
            case LIST_FILTER.COMPLETED: return state.todos.filter(completedPredicate);
            default: return [];
        }
    },
    getTodosCountByFilter: (state, getters) => (filter) => {
        return getters.getTodosByFilter(filter).length;
    },
};

// 비동기 처리 
const actions = {

};

// 동기 처리
const mutations = {
    [types.ADD_TODO](state, payload){
        const content = payload;
        state.todos.push({ 
            id : state._sequence++, 
            status: TODO_STATUS.ACTIVE,
            content 
        });
    },
    
    [types.UPDATE_TODO_BY_ID](state, payload){
        const {id, content, status} = payload;
        
        const targetTodo = state.todos.find(todo => todo.id === id);
        
        if(!targetTodo) return;

        targetTodo.content = content;
        targetTodo.status = status;
    },

    [types.TOGGLE_ALL_TODOS_STATUS](state){
        const totalCount = state.todos.length;
        const completedTodos = state.todos.filter(completedPredicate);
        
        if(totalCount === completedTodos.length){
            completedTodos.forEach(todo => todo.status = TODO_STATUS.ACTIVE);
            return;
        } 
        
        state.todos.forEach(todo => todo.status = TODO_STATUS.COMPLETED);
    },

    [types.DELETE_TODO_BY_ID](state, payload){
        const id = payload;
        state.todos = state.todos.filter(todo => todo.id !== id);
    },
    [types.DELETE_ALL_COMPLETED_TODOS](state){
        state.todos = state.todos.filter(activePredicate)
    },

    [types.CHANGE_LIST_FILTER](state, payload){
        state.listFilter = payload;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}