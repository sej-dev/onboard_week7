import TODO_STATUS_FILTER from "@/constants/todo/todoStatusFilter";

import { activePredicate, completedPredicate } from "@/store/modules/todo/utils/predicates";

const getters = {
    hasTodos: (state) => {
        return state.todos.length > 0
    },

    getTodoById: (state) => (id) => {
        return state.todos.find(todo => todo.id === id);
    },

    activeTodos: (state) => {
        return state.todos.filter(activePredicate);
    },
    completedTodos: (state) => {
        return state.todos.filter(completedPredicate);
    },

    getTodosByStatusFilter: (state, getters) => (filter) => {
        switch (filter) {
            case TODO_STATUS_FILTER.ALL: return state.todos;
            case TODO_STATUS_FILTER.ACTIVE: return getters.activeTodos;
            case TODO_STATUS_FILTER.COMPLETED: return getters.completedTodos;
            default: return [];
        }
    },
    getTodosCountByStatusFilter: (state, getters) => (filter) => {
        return getters.getTodosByStatusFilter(filter).length;
    },
};

export default getters;