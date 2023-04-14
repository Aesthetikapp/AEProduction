// 👇️ if you need to capitalize first and lowercase rest
export const capitalizeFirstLowercaseRest = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
