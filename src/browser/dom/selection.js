export function selectElement (element) {
  if (window.getSelection) {
    var sel = window.getSelection()
    sel.removeAllRanges()
    var range = document.createRange()
    range.selectNodeContents(element)
    sel.addRange(range)
  } else if (document.selection) {
    var textRange = document.body.createTextRange()
    textRange.moveToElementText(element)
    textRange.select()
  }
}
