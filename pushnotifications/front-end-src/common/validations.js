export const validEmailExp = new RegExp(
	"^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
);
export const validPasswordExp = new RegExp(
	"^(?=.*?[A-Za-z])(?=.*[!@#$%^&*_])(?=.*?[0-9]).{8,}$"
);
export const validDomainExp = new RegExp(
	"^(((?!-))(xn--)?[a-z0-9-_]{0,61}[a-z0-9]{1,1}.)*(xn--)?([a-z0-9-]{1,61}|[a-z0-9-]{1,30}).[a-z]{2,}$"
);
//export const validDomainExp = new RegExp('(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?');
export const validateImage = (obj, h, w) => {
	const reader = new FileReader();
	let returnvalue = false;
	reader.readAsDataURL(obj);
	reader.onload = (e) => {
		const image = new Image();
		image.src = e.target.result;
		image.onload = (e) => {
			var c = false;
			const height = e.target.height;
			const width = e.target.width;
			if (height == h && width == w) {
				return true;
			} else {
				return false;
			}
		};
	};
};
