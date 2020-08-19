import {AppStateType, InferActionsTypes} from "../store";
import {ThunkAction} from "redux-thunk";
import {getNotes, updLocalStorage} from "../../Common/commonMethods";

// Типизация экшенов и санок
type ActionTableType = InferActionsTypes<typeof actionsTable>
type ThunkTableType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTableType>

export const actionsTable = {
    addNote: (data: NoteType) => ({type: 'tableReducer/addNote', data} as const),
    deleteNote: (id: number) => ({type: 'tableReducer/deleteNote', id} as const),
    updData: (data: NoteType) => ({type: 'tableReducer/updData', data} as const),
    setPosition: (pos: number, data: NoteType, method: string) => ({type: 'tableReducer/setPosition', pos, data, method} as const),
    uploadNotes: (data: Array<NoteType>) => ({type: 'tableReducer/uploadNotes', data} as const),
    // Флаг загрузки приложения, нужен, чтобы избежать бага с не выгруженными заметками
    setIsInit: () => ({type: 'tableReducer/setInit'} as const),
    setErrors: (err: Array<string>) => ({type: 'tableReducer/setErrors', err} as const)
}

// Добавляет заметку
export const addNoteThunk = (data: NoteType): ThunkTableType => {
    return async (dispatch) => {
        dispatch(actionsTable.addNote(data))
        updLocalStorage('add', data.id, data)
    }
}

// Удаляет заметку
export const deleteNoteThunk = (id: number): ThunkTableType => {
    return async (dispatch) => {
        dispatch(actionsTable.deleteNote(id))
        updLocalStorage('delete', id)
    }
}
// Двигает запись на позицию вверх или вниз
export const setNotePositionThunk = (pos: number, data: NoteType, method: 'up' | 'down'): ThunkTableType => {
    return async (dispatch) => {
        dispatch(actionsTable.setPosition(pos, data, method))
        updLocalStorage("setPos", data.id, data, pos, method)
    }
}
// Выгружает из локал стораджа заметки
export const uploadNotesThunk = (): ThunkTableType => {
    return async (dispatch) => {
        const notes = getNotes()
        dispatch(actionsTable.uploadNotes(notes))
        dispatch(actionsTable.setIsInit())
    }
}

// Обновляет одну из записей
export const updateDataThunk = (data: NoteType): ThunkTableType => {
    return async (dispatch) => {
        dispatch(actionsTable.updData(data))
        updLocalStorage('update', data.id, data)
    }
}


export type NoteType = {
    id: number
    name: string
    type: string
    color: string
}

let initialState = {
    notes: [] as Array<NoteType>,
    tempColor: '',
    isInit: false,
    errors: [] as Array<string>
}

type InitialStateType = typeof initialState

export const tableInstructions = (state = initialState, action: ActionTableType): InitialStateType => {
    switch (action.type) {
        case "tableReducer/addNote":
            return {...state, notes: [...state.notes, action.data]}
        case "tableReducer/uploadNotes":
            return {...state, notes: action.data}
        case "tableReducer/deleteNote":
            return {...state, notes: [...state.notes.filter(el => el.id !== action.id)]}
        case "tableReducer/updData":
            return {...state, notes: [...state.notes.map( el => el.id === action.data.id ? action.data : el)]}
        case "tableReducer/setPosition":
            let newNotes = action.method === 'up' ?
                [...state.notes.slice(0, action.pos), action.data, state.notes[action.pos], ...state.notes.slice(action.pos + 2)]
                :
                [...state.notes.slice(0, action.pos - 1), state.notes[action.pos], action.data, ...state.notes.slice(action.pos + 1)]
            return {...state, notes: newNotes}
        case "tableReducer/setInit":
            return {...state, isInit: true}
        case "tableReducer/setErrors":
            return {...state, errors: action.err}
        default:
            return state
    }
}
