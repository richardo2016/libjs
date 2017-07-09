export function curry (fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args)
  }
  return function curriedFn (...__in_args) {
    // if (!__in_args.length) return curriedFn
    // console.info('fix_args 2016', fn.length, args.length, __in_args.length)
    // console.info('fix_args 2017', ...args, ...__in_args)

    if (args.length >= fn.length) {
      return fn(...args)
    }

    let new_args = [...args, ...__in_args]

    // console.info('fix_args 2018', fn.length, new_args.length, __in_args.length)
    // console.info('fix_args 2019', ...new_args, ...__in_args)
    if (new_args.length >= fn.length) {
      return fn(...new_args)
    }

    return (...fix_args) => curry(fn, ...new_args, ...fix_args)
  }
}
