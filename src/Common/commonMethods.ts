import {NoteType} from "../Redux/Reducers/tableReducer";

type MethodType = 'add' | 'delete' | 'setPos' | 'setColor' | 'update'

// Вытаскивает заметки из локал сторадж
export const getNotes = () => {
    let strTables: string | null = localStorage.notes && localStorage.getItem('notes')
    let allNotes: Array<NoteType> = []
    if (strTables) allNotes = JSON.parse(strTables)
    return allNotes
}


// Добавляет, изменяет позиции и удаляет из локал стораджа
export const updLocalStorage = (method: MethodType, id: number, data?: NoteType, pos?: number, direction?: 'up' | 'down') => {
    let allNotes: Array<NoteType> = getNotes()
    switch (method) {
        case "add":
            if (data) {
                allNotes.push(data)
            }
            break
        case "delete":
            allNotes = allNotes.filter(el => el.id !== id)
            break
        case "setPos":
            if (data && pos || data && pos === 0) {
                allNotes = direction === "up" ?
                    [...allNotes.slice(0, pos), data, allNotes[pos], ...allNotes.slice(pos + 2)]
                    :
                    [...allNotes.slice(0, pos - 1), allNotes[pos], data, ...allNotes.slice(pos + 1)]
            }
            break
        case "update":
            if (data) {
                allNotes = allNotes.map( el => el.id === id ? data : el)
            }
            break
        default:
            return allNotes
    }
    // method === 'add' ? allCities = allCities.filter( el => el.id !== id).push(data) : allCities.filter( el => el.id !== id)
    localStorage.setItem('notes', JSON.stringify(allNotes))
}
