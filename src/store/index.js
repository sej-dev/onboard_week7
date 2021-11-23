import { createStore } from 'vuex';
import todo from '@/store/modules/todo';
import plugins from '@/store/plugins';

/**
 * 로컬스토리지 사용 시점
 * 1. store initialize 되었을 때 데이터 넣기
 * 2. 리스트 mutation 발생 시 저장
 */


export default createStore({
    modules: {
        todo,
    },
    plugins: []
})