const date = new Date();
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function getCurrentYear()
{
	return date.getFullYear();
}

export function getCurrentDate()
{
    return date.getDate();
}

export function getCurrentMonth()
{
    return month[date.getMonth()];
}

