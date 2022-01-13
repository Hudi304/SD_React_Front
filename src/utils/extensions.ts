//@ts-ignore
declare interface String {
    loading(): string
    fulfilled(): string
    failed(): string
}

String.prototype.loading = function (this: string): string {
    return `${this}_LOADING`
}

String.prototype.fulfilled = function (this: string): string {
    return `${this}_FULFILLED`
}

String.prototype.failed = function (this: string): string {
    return `${this}_FAILED`
}
