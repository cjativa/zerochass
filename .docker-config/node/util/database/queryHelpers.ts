const QueryHelpers = {

	/** expand(3, 2) returns "($1, $2), ($3, $4), ($5, $6)"  */
	expand: function expand(rowCount: number, columnCount: number, startAt = 1) {
		let index = startAt
		return Array(rowCount).fill(0).map(v => `(${Array(columnCount).fill(0).map(v => `$${index++}`).join(", ")})`).join(", ")
	},

	/** flatten([[1, 2], [3, 4]]) returns [1, 2, 3, 4] */
	flatten: function flatten(arr: any[]) {
		const newArr: any[] = []
		arr.forEach(v => v.forEach((p: any) => newArr.push(p)))
		return newArr
	}
};

export default QueryHelpers;