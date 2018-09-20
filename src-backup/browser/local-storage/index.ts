let { localStorage } = window

export default class Storage {
  constructor (dbName, options) {
    if (!localStorage) {
      return
    }

    let { syncInterval = 2000 } = options || {}

    dbName = dbName || 'default'

    this.hasChanged = false
    this.store = {}
    this.dbName = 'localStorageORM/' + dbName

    if (typeof localStorage === 'object') {
      this.hasLocalStorage = true

      // delayed storage read
      setTimeout(() => this.update(), 1)

      // save interval
      setInterval(() => {
        if (this.hasChanged) {
          this.sync()
          this.syncEnd()
        }
      }, syncInterval)
    }

    return this
  }

  update () {
    let db = localStorage.getItem(this.dbName)
    if (db) {
      this.store = JSON.parse(db)
    }
    return this.store
  }

  syncStart () {
    this.hasChanged = true
  }

  sync () {
    localStorage.setItem(this.dbName, JSON.stringify(this.store))
  }

  syncEnd () {
    this.hasChanged = false
  }

  get (key) {
    return key ? this.store[key] : this.store
  }

  set (key, data) {
    this.store[key] = data
    this.syncStart()
  }

  delete (key) {
    if (this.store.hasOwnProperty(key)) {
      delete this.store[key]
      this.syncStart()
    }
  }

  find (attribute, value) {
    let i, iMax, result

    result = []

    for (i = 0, iMax = this.store.length; i < iMax; i++) {
      if (this.store[i][attribute] && this.store[i][attribute] === value) {
        result.push(this.store[i])
      }
    }

    return result
  }

  each (callback) {
    let key

    for (key in this.store) {
      if (this.store.hasOwnProperty(key)) {
        callback.bind(this, key, this.store[key])
      }
    }
  }
}

/*******************
 Usage
 *******************/

// // Initiate
// let users = new localStorageORM("users" /* database name */, 1000 /* save interval in ms */)
//
// // Set value to key
// users.set("eva" /* key */, {hair: "brown", eyes: "green"} /* value */)
//
// // Get value by key
// eva = users.get("eva" /*key */)
//
// // Get an array of documents by attribute.
// brownHairedPeople = users.find("hair" /* attribute */, "brown" /* value */)
//
// // For each document, call a function
// users.each(function(key, data) {
//   console.log(key, data)
// })
