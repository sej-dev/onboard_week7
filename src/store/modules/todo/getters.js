import TODO_STATUS_FILTER from "@/constants/todo/todoStatusFilter";
import TODO_STATUS from "@/constants/todo/todoStatus";

const activePredicate = todo => todo.status === TODO_STATUS.ACTIVE;
const completedPredicate = todo => todo.status === TODO_STATUS.COMPLETED;

const getters = {
    hasTodos: (state) => {
        return state.todos.length > 0
    },

    getTodoById: (state) => (id) => {
        return state.todos.find(todo => todo.id === id);
    },

    getTodosByStatusFilter: (state) => (filter) => {
        switch (filter) {
            case TODO_STATUS_FILTER.ALL: return state.todos;
            case TODO_STATUS_FILTER.ACTIVE: return state.todos.filter(activePredicate);
            case TODO_STATUS_FILTER.COMPLETED: return state.todos.filter(completedPredicate);
            default: return [];
        }
    },
    getTodosCountByStatusFilter: (state, getters) => (filter) => {
        return getters.getTodosByStatusFilter(filter).length;
    },
};

/**
 * 기존 코드의 문제점
 * - 필터 수가 늘어날 때마다 getters에 추가해야 한다
 * - 캐싱이 되지 않는다
 * - 컴포넌트에서 가져와야 할 getter 수가 늘어난다
 * 
 * 1차 개선안 : 메서드 형식으로 작성
 * 
 * 2차 개선안 : 리터럴로 정의하고 가공이 필요한 부분은 함수로 따로 분리해서 적용
 * 
 * 결론 : 필터링할 때 getters를 어떻게 작성해야 하는지 모르겠다...
*/

function postGetters(getters){
    const filterPredicateMap = {
        [TODO_STATUS_FILTER.ALL]: () => true,
        [TODO_STATUS_FILTER.ACTIVE]: activePredicate,
        [TODO_STATUS_FILTER.COMPLETED]: completedPredicate,
    }

    const toLowerWithSuffix = (name, suffix) => name.toLowerCase() + suffix;

    for(const filter in filterPredicateMap){
        const predicate = filterPredicateMap[filter];
        getters[toLowerWithSuffix(filter, 'Todos')] = (state) => state.todos.filter(predicate);
    }
    
    getters.getTodosCountByStatusFilter = (state) => (filter) => {
        return state[toLowerWithSuffix(filter, 'Todos')];
    }

    return getters;
}

export default getters;