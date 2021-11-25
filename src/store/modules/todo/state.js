import todoLocalStoragefrom from '@/store/modules/todo/utils/localStorage';
import TODO_STATUS_FILTER from '@/constants/todo/todoStatusFilter';

const INITIAL_STATE = {
    todoStatusFilter: TODO_STATUS_FILTER.ALL,
    todos: [],
    _sequence: 0
};

const state = () => {
    const stateInLocalStorage = todoLocalStoragefrom.get();
    
    if(stateInLocalStorage) {
        return {
            ...INITIAL_STATE,
            ...stateInLocalStorage,
        }
    }
    return INITIAL_STATE;
} 

export default state;