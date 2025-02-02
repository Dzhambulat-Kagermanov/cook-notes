export const roundToNearestNonZero = (num: number): number => {
	if (Number.isInteger(num)) {
		return num
	}

	const numStr = num.toString()
	const decimalIndex = numStr.indexOf('.')
	if (decimalIndex === -1) {
		return num
	}

	let stop = false
	let index = decimalIndex + 1
	let temp = ''
	let result = ''
	let isRemainder = false

	while (!stop) {
		if (numStr[index] === '0' && !isRemainder && index <= numStr.length - 1) {
			result += numStr[index]
		} else {
			if (!isRemainder) isRemainder = true
			if (isRemainder) {
				temp += numStr[index]
			}
		}
		if (index >= numStr.length - 1) {
			stop = true
		} else {
			index++
		}
	}

	result += Math.round(Number(+`0.${+temp}` * 10))

	return Number(`${numStr.substring(0, decimalIndex)}.${result}`)
}
