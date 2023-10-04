export function saveLocal<T>(key: string, data: T){
    const stringData = JSON.stringify(data)
    localStorage.setItem(key, stringData)
}


export function saveSimpleData(key: string, data: string){
    localStorage.setItem(key, data)
}

export function getSimpleData(key: string){
    return localStorage.getItem(key)
}


export function getLocalData<T>(key: string){
    const data = localStorage.getItem(key)
    if(data == null) return null

    return JSON.parse(data) as T
}

export function deleteLocalData(key: string){
    localStorage.removeItem(key)
}