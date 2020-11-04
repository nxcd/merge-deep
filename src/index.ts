type GenericObject<T> = T | {[key: string]: GenericObject<T>} | GenericObject<T>[]

function mergeDeep <T>(target: GenericObject<T>, source: GenericObject<T>): GenericObject<T> {
  if (!source || !target) {
    return source || target
  }

  if (Array.isArray(target) || Array.isArray(source)) {
    const joinedItemsArray = [
      ...(Array.isArray(target) ? target : [target]),
      ...(Array.isArray(source) ? source : [source])
    ]

    return [
      ...new Set(joinedItemsArray)
    ]
  }

  if (typeof target !== 'object') {
    return source || target
  }

  const targetObject = target as unknown as GenericObject<T>
  const sourceObject = source as unknown as GenericObject<T>

  const mergedKeys = Object.keys({
    ...target,
    ...source
  }) as (keyof GenericObject<T>)[]

  const mergedObject = mergedKeys
    .reduce((mergedObject: {[key: string]: GenericObject<T>}, key: keyof GenericObject<T>) => {
      if (typeof targetObject[key] === 'object') {
        mergedObject[key] = mergeDeep(
          targetObject[key] as unknown as {[key: string]: GenericObject<T>},
          sourceObject[key] as unknown as {[key: string]: GenericObject<T>}
        )

        return mergedObject
      }

      mergedObject[key] = sourceObject[key] as unknown as {[key: string]: T} ||
        targetObject[key] as unknown as {[key: string]: T}

      return mergedObject
    }, {} as {[key: string]: GenericObject<T>})

  return mergedObject
}

export default mergeDeep
module.exports = mergeDeep
