import * as types from "@/store/modules/todo/mutation-types";

import TODO_STATUS from "@/constants/todo/todoStatus";
import { activePredicate, completedPredicate } from "@/store/modules/todo/utils/predicates";

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
        state.todoStatusFilter = payload;
    }
};

export default mutations;