export const validate = (err: string): boolean => {
    if (err.length > 0) return false
    return true
}

export const disableSubmit = (obj: any): boolean => {
    for (const key in obj) {
        console.log(obj[key])
        if (obj[key].length > 0) return true
    }
    return false
}