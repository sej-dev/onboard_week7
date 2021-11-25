import { createStore } from 'vuex';
import todo from '@/store/modules/todo';
import todoLocalStoragePlugin from '@/store/plugins/todoLocalStoragePlugin';

export default createStore({
    modules: {
        todo,
    },
    plugins: [todoLocalStoragePlugin]
})