/* global describe, it, before */
const test = require('test');
test.setup();

function testor (mod, prefixer = '') {
  describe(`${prefixer} 测试 built-in/object 功能是否正确`, () => {
    describe('list2keymirror', () => {
      const list2keymirror = mod.object.list2keymirror

      it(`list2keymirror([1, 2, 3]) -> {1: 1, 2: 2, 3: 3}`, () => {
        assert.equal(
          JSON.stringify(list2keymirror([1, 2, 3])),
          `{"1":1,"2":2,"3":3}`
        )
      })

      it(`list2keymirror(['1', 2, '3']) -> {1: '1', 2: '2', 3: '3'}`, () => {
        assert.equal(
          JSON.stringify(list2keymirror(['1', '2', '3'])),
          `{"1":"1","2":"2","3":"3"}`
        )
      })
    })

    describe('foreachObject', () => {
      const foreachObject = mod.object.foreachObject

      it(`foreachObject check`, () => {
        let test = []
        foreachObject({a: 1, b: 2, c: 3}, function (value, key, object) {
          test.push(`${key}:${value}`)
        })
        test = test.join(' ')

        assert.equal(test, `a:1 b:2 c:3`)
      })
    })

    describe('filterObject', () => {
      const filterObject = mod.object.filterObject

      it(`filterObject with dropKeys only 1`, () => {
        let testObj = {a: 1, b: 2, c: 3}
        filterObject(testObj, ['a', 'b'])
        let test = JSON.stringify(testObj)
        assert.equal(test, `{"c":3}`)
      })

      it(`filterObject with dropKeys only 2`, () => {
        let testObj = {a: 1, b: 2, c: 3}
        filterObject(testObj, {dropKeys: ['a', 'b']})
        let test = JSON.stringify(testObj)
        assert.equal(test, `{"c":3}`)
      })

      it(`filterObject with leaveKeys`, () => {
        let testObj = {a: 1, b: 2, c: 3}
        filterObject(testObj, {leaveKeys: ['a']})
        let test = JSON.stringify(testObj)
        assert.equal(test, `{"a":1}`)
      })
    })

    describe('ofObject', () => {
      const ofObject = mod.object.ofObject

      it(`ofObject strictly 1`, () => {
        let result = ofObject(2, {a: 1, b: 2, c: 3})
        assert.equal(result, true)
      })

      it(`ofObject strictly 2`, () => {
        let result = ofObject(4, {a: 1, b: 2, c: 3})
        assert.equal(result, false)
      })

      it(`ofObject instrictly`, () => {
        let result = ofObject('2', {a: 1, b: 2, c: 3}, {strict: false})
        assert.equal(result, true)
      })
    })

    describe('viewObjProps', () => {
      const viewObjProps = mod.object.viewObjProps

      it(`viewObjProps`, () => {
        let testObj = {a: 1, b: 2, c: 3}
        let descriptors = viewObjProps(testObj)
        let test = JSON.stringify(descriptors)
        assert.equal(test, `{"a":{"value":1,"writable":true,"enumerable":true,"configurable":true},"b":{"value":2,"writable":true,"enumerable":true,"configurable":true},"c":{"value":3,"writable":true,"enumerable":true,"configurable":true}}`)

        testObj = {
          a: 1,
          get b () {
            return 2
          },
          set b (val) {}
        }
        descriptors = viewObjProps(testObj)
        assert.equal(descriptors.a.value, 1)
        assert.equal(descriptors.a.writable, true)
        assert.equal(descriptors.a.enumerable, true)
        assert.equal(descriptors.a.configurable, true)

        assert.equal(JSON.stringify(descriptors), `{"a":{"value":1,"writable":true,"enumerable":true,"configurable":true},"b":{"enumerable":true,"configurable":true}}`)
        assert.equal(typeof descriptors.b.get, 'function')
        assert.equal(descriptors.b.writable, undefined)
        assert.equal(descriptors.b.enumerable, true)
        assert.equal(descriptors.b.configurable, true)
      })
    })

    describe('viewObjField/secretObj', () => {
      const viewObjField = mod.object.viewObjField

      it(`viewObjField/secretObj`, () => {
        let testObj = {a: 1, b: 2, c: 3}
        let descriptorA = viewObjField(testObj, 'a')
        let test = JSON.stringify(descriptorA)
        assert.equal(test, `{"value":1,"writable":true,"enumerable":true,"configurable":true}`)

        assert.equal(descriptorA.value, 1)
        assert.equal(descriptorA.writable, true)
        assert.equal(descriptorA.enumerable, true)
        assert.equal(descriptorA.configurable, true)

        const secretObj = mod.object.secretObj
        secretObj(testObj, 'b')
        let descriptorB = viewObjField(testObj, 'b')

        assert.equal(descriptorB.value, 2)
        assert.equal(descriptorB.writable, true)
        assert.equal(descriptorB.enumerable, false)
        assert.equal(descriptorB.configurable, true)

        const solidifyObj = mod.object.solidifyObj
        solidifyObj(testObj, 'c')
        let descriptorC = viewObjField(testObj, 'c')

        assert.equal(descriptorC.value, 3)
        assert.equal(descriptorC.writable, false)
        assert.equal(descriptorC.enumerable, false)
        assert.equal(descriptorC.configurable, false)
      })
    })
  })

  describe(`${prefixer} 测试 built-in/date 功能是否正确`, () => {
    const t_year = '2018'
    const t_month = '05'
    const t_date = '03'
    const t_hours = '00'
    const t_minutes = '00'
    const t_seconds = '00'
    const t_milliseconds = '000'

    const testDateStr = `${t_year}-${t_month}-${t_date}`
    const testDateTimeStr = `${t_year}-${t_month}-${t_date} ${t_hours}:${t_minutes}:${t_seconds}.${t_milliseconds}`

    describe('ensureDate', () => {
      const ensureDate = mod.date.ensureDate

      it(`ensureDate(null) -> undefined`, () => {
        assert.deepEqual(ensureDate(null), undefined)
      })

      it(`ensureDate() -> undefined`, () => {
        assert.deepEqual(ensureDate(), undefined)
      })

      it(`ensureDate(false) -> ensureDate(0)`, () => {
        assert.deepEqual(ensureDate(false).getTime(), ensureDate(0).getTime())
      })

      it(`ensureDate(true) -> ensureDate(1)`, () => {
        assert.deepEqual(ensureDate(true).getTime(), ensureDate(1).getTime())
      })

      it(`ensureDate(new Date) -> ensureDate(Date.now())`, () => {
        assert.deepEqual(ensureDate(new Date).getTime(), Date.now())
      })

      it(`ensureDate('${testDateStr}')`, () => {
        assert.deepEqual(ensureDate(testDateStr).getTime(), new Date(testDateStr).getTime())
      })
    })

    describe('zoneOffsetInfo', () => {
      const zoneOffsetInfo = mod.date.zoneOffsetInfo

      function property_check (zoinfo) {
        assert.isTrue(zoinfo !== null)

        assert.property(zoinfo, 'offset_hours')
        assert.property(zoinfo, 'offset_minutes')
        assert.property(zoinfo, 'offset_seconds')
        assert.property(zoinfo, 'offset_milliseconds')

        const offsetM = (new Date()).getTimezoneOffset()

        assert.deepEqual(zoinfo.offset_hours, offsetM / 60)
        assert.deepEqual(zoinfo.offset_minutes, offsetM)
        assert.deepEqual(zoinfo.offset_seconds, offsetM * 60)
        assert.deepEqual(zoinfo.offset_milliseconds, offsetM * 60 * 1000)
      }

      it('null value', () => {
        assert.isTrue(zoneOffsetInfo(null) === null)
      })

      it('default value', () => {
        const zoinfo = zoneOffsetInfo()
        property_check(zoinfo)
      })

      it('set value', () => {
        const zoinfo = zoneOffsetInfo(testDateStr)
        property_check(zoinfo)
      })
    })

    describe('parseDate', () => {
      const parseDate = mod.date.parseDate

      function property_check (parsedResult) {
        assert.property(parsedResult, 'padded_year')
        assert.deepEqual(parsedResult.padded_year.length, 4)
        assert.property(parsedResult, 'padded_month')
        assert.deepEqual(parsedResult.padded_month.length, 2)
        assert.property(parsedResult, 'padded_date')
        assert.deepEqual(parsedResult.padded_date.length, 2)
        assert.property(parsedResult, 'padded_hours')
        assert.deepEqual(parsedResult.padded_hours.length, 2)
        assert.property(parsedResult, 'padded_minutes')
        assert.deepEqual(parsedResult.padded_minutes.length, 2)
        assert.property(parsedResult, 'padded_seconds')
        assert.deepEqual(parsedResult.padded_seconds.length, 2)
        assert.property(parsedResult, 'padded_milliseconds')
        assert.deepEqual(parsedResult.padded_milliseconds.length, 3)
      }

      it(`result keys`, () => {
        const result = parseDate(testDateStr)
        property_check(result)
      })

      it(`result values`, () => {
        const result_1 = parseDate(testDateStr)
        property_check(result_1)

        assert.deepEqual(result_1.padded_year, t_year)
        assert.deepEqual(result_1.padded_month, t_month)
        assert.deepEqual(result_1.padded_date, t_date)


        const result_2 = parseDate(testDateTimeStr)
        property_check(result_2)

        assert.deepEqual(result_2.padded_year, t_year)
        assert.deepEqual(result_2.padded_month, t_month)
        assert.deepEqual(result_2.padded_date, t_date)
        assert.deepEqual(result_2.padded_hours, t_hours)
        assert.deepEqual(result_2.padded_minutes, t_minutes)
        assert.deepEqual(result_2.padded_seconds, t_seconds)
        assert.deepEqual(result_2.padded_milliseconds, t_milliseconds)
      })

      it(`slashLocalDate`, () => {
        const slashLocalDate = mod.date.slashLocalDate
        assert.deepEqual(slashLocalDate(testDateStr), `${t_year}/${t_month}/${t_date}`)
      })

      it(`kebabLocalDate`, () => {
        const kebabLocalDate = mod.date.kebabLocalDate
        assert.deepEqual(kebabLocalDate(testDateStr), `${t_year}-${t_month}-${t_date}`)
      })
    })
  })
}

testor(require('../lib/cjs').builtIn, '[cjs]');
testor(require('../lib/umd').builtIn, '[umd]');

test.run(console.DEBUG);
