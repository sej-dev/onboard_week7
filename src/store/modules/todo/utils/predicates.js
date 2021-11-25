import TODO_STATUS from "@/constants/todo/todoStatus";

export const activePredicate = todo => todo.status === TODO_STATUS.ACTIVE;
export const completedPredicate = todo => todo.status === TODO_STATUS.COMPLETED;