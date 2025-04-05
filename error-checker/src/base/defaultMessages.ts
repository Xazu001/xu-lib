// [.] stands for replacement for name

const stringDefaults = {
    min: "[.] must be at least [min] characters long",
    max: "[.] must be at most [max] characters long",
    email: "[.] must be a valid email address",
    eq: "[.] must be equal to [value]",
    neq: "[.] must not be equal to [value]",
    regex: "[.] must match the pattern [pattern]",
    includes: "[.] must include [value]",
    startsWith: "[.] must start with [value]",
    endsWith: "[.] must end with [value]",
    url: "[.] must be a valid URL",
    uuid: "[.] must be a valid UUID"
}

const numberDefaults = {
    min: "[.] must be at least [min]",
    max: "[.] must be at most [max]",
    positive: "[.] must be positive",
    negative: "[.] must be negative",
    int: "[.] must be an integer",
    decimal: "[.] must have exactly [places] decimal places",
    multipleOf: "[.] must be a multiple of [factor]",
    range: "[.] must be between [min] and [max]",
    base: "[.] must be a number"
}

const boolDefaults = {
    base: "[.] must be a boolean"
}

const arrayDefaults = {
    minLength: "[.] must have at least [length] items",
    maxLength: "[.] must have at most [length] items",
    base: "[.] must be an array",
    item: "Item at index [index]: [message]"
}

const objectDefaults = {
    base: "[.] must be an object",
    field: "Field '[field]': [message]"
}

const defaultMessages = {
    string: stringDefaults,
    number: numberDefaults,
    bool: boolDefaults,
    array: arrayDefaults,
    object: objectDefaults,
    any: {}
}


export default defaultMessages
