// you use curly brackets when something has multiple exports
// get items from local storage
export const  getItem = (key) => {
    //if localStorage has the key you're looking for
    if (localStorage.getItem(key)){
        // return the data after parsing with JSON so it's a readable object for us
        return JSON.parse(localStorage.getItem(key))
    }
    //otherwise return null
    return null;
}

// set items that are already in local storage
export const setItem = (key, data) => {
    //return the data after you set the data
    return localStorage.setItem(key, JSON.stringify(data))
}

// remove items from local storage
export const removeItem = (key) => {
    // remove all associated data as well
    return localStorage.removeItem(key)
}