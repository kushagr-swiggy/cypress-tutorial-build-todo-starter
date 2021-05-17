export const filterTodos = (todos, param) => {
    return param ? (
        param === "active" ? todos.filter(t => !t.isComplete) : 
        param === "completed" ? todos.filter(t => t.isComplete) : []
    ) : todos
}