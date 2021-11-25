import todoLocalStoragefrom from '@/store/modules/todo/utils/localStorage';

const localStoragePlugin = (store) => {
    
    store.subscribe((mutation, state) => {
    
        const { type } = mutation;

        if(type.startsWith("todo")){
            todoLocalStoragefrom.set(state.todo);
        }
    });
}

export default localStoragePlugin;