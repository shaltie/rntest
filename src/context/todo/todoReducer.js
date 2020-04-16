import { ADD_TODO , REMOVE_TODO, UPDATE_TODO, SHOW_LOADER, HIDE_LOADER, SHOW_ERROR, CLEAR_ERROR, FETCH_TODOS, APPLY_LIKE, APPLY_DISLIKE} from "../types"

const handlers = {
    [ADD_TODO]: (state, {title}) => ({...state,
        todos: [...state.todos, 
            {
                id: Date.now().toString(),
                title
            }
    ]}),
    [REMOVE_TODO]: (state, {id}) => ({
        ...state,
        todos: state.todos.filter(todo=>todo.id !==id)
    }),
    [UPDATE_TODO]: (state, {title, id}) => ({
        ...state,
        todos: state.todos.map(todo => {
            if(todo.id === id){
                todo.title = title
            }
            return todo
        })
    }),
    [SHOW_LOADER]: state => ({...state, loading: true}),
    [HIDE_LOADER]: state => ({...state, loading: false}),
    [SHOW_ERROR]:  state => ({...state, error: null}),
    [CLEAR_ERROR]: (state, {error}) => ({...state, error}),
    [FETCH_TODOS]: (state, { todos }) => ({...state, todos}),
    /* [APPLY_LIKE]: (state, {id}) => ({
        ...state,
        todos: state.todos.map(todo => {
            if(todo.id === id){
                todo.size = todo.size+1
            }
            return todo
        })
    }),
    [APPLY_DISLIKE]: (state, {id}) => ({
        ...state,
        todos: state.todos.map(todo => {
            if(todo.id === id){
                todo.size = todo.size-1
            }
            return todo
        })
    }), */

    DEFAULT: state => state
}

export const todoReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}