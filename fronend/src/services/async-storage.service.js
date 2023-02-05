export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    removeForWishList,
    save
}

function query(entityType, delay = 500) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

function get(entityType, entityId) {

    return query(entityType).then(entities => {
        const entity = entities.find(entity => entity._id === entityId)
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        return entity
    })
}

function post(entityType, newEntity) {
    newEntity = JSON.parse(JSON.stringify(newEntity))
    newEntity._id = _makeId()
    return query(entityType).then(entities => {
        entities.push(newEntity)
        save(entityType, entities)
        return newEntity
    })
}

function put(entityType, updatedEntity) {
    console.log(updatedEntity)
    updatedEntity = JSON.parse(JSON.stringify(updatedEntity))
    console.log(updatedEntity)
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => {
            return entity._id === updatedEntity._id
        })
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`)

        entities.splice(idx, 1, updatedEntity)
        save(entityType, entities)
        console.log(updatedEntity)
        return updatedEntity
    })
}

function remove(entityType, entityId) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === entityId)
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1)
        save(entityType, entities)

    })
}


function removeForWishList(entityType, userEntity, stayIdToRemove) {

    return query(entityType).then(entities => {
        // find the connected user
        const idxUser = entities.findIndex(entity => entity._id === userEntity._id)
        if (idxUser < 0) throw new Error(`Update failed, cannot find entity with id: ${userEntity._id} in: ${entityType}`)
        const objUsers = { ...entities }
        const valuesOfObjUsers = Object.values(objUsers)
        const wishListUser = valuesOfObjUsers[idxUser].wishList

        const idxInWishList = wishListUser.findIndex(entity => entity === stayIdToRemove)

        wishListUser.splice(idxInWishList, 1)

        save(entityType, entities)

        return entities

    })
}

// Private functions

function save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}