export const ADD = 'ADD';
export const TOGGLE = 'TOGGLE';
export const DEL =  'DEL';

export function add(from) {
    return {
        type: ADD,
        payload: from,
    };
}

export function toggle(id) {
    return {
        type: TOGGLE,
        payload: id,
    };
}

export function del(id) {
    return {
        type: DEL,
        payload: id,
    };
}


export function toggleTodo(from) {
    return (dispatch, getState) => {
        // const { todo } = getState();
        dispatch(toggle(from));
    };
}
export function addTodo(from) {
    return (dispatch, getState) => {
        // const { todo } = getState();
        // console.log(todo,'x')
        dispatch(add(from));
    };
}
export function delTodo(from) {
    return (dispatch, getState) => {
        // const { todo } = getState();
        dispatch(del(from));
    };
}

