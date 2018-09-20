export class clearMapValue {
  _destroy () {}
}

export class clearMap extends Map {
  // clear () {
  //   for (let value of this.values()) {
  //     if (typeof value._destroy === 'function') {
  //       value._destroy()
  //     }

  //     value = null
  //   }
  //   super.clear()
  // }
}
