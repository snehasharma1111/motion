import regex from "../constants/regex.mjs";

export const validateEmail = (req, res, next) => {
	try {
		const { email } = req.body;
		if (!email)
			return res.status(400).json({ message: "Email is required" });
		// check if email contains @ and .
		if (!/@/.test(email) || !/\./.test(email))
			return res.status(400).json({ message: "Invalid Email" });
		// check if email contains @ and . in correct order
		if (email.indexOf("@") > email.indexOf("."))
			return res.status(400).json({ message: "Invalid Email" });
		// check if email contains atleast one space or tab
		if (/\s|\t/.test(email))
			return res.status(400).json({
				message: "Email should not contain any spaces or tabs",
			});
		// check if email contains atleast one newline or carriage return
		if (/\n|\r/.test(email))
			return res.status(400).json({
				message:
					"Email should not contain any newlines or carriage returns",
			});
		if (!regex.email.test(email))
			return res.status(400).json({
				message: "Invalid Email",
			});
		next();
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const validatePassword = (req, res, next) => {
	try {
		const { password } = req.body;
		if (!password)
			return res.status(400).json({ message: "Password is required" });
		if (password.length < 6)
			return res.status(400).json({
				message: "Password should be atleast 6 characters long",
			});
		// check if password contains atleast one number
		if (!/\d/.test(password))
			return res.status(400).json({
				message: "Password should contain atleast one number",
			});
		// check if password contains atleast one uppercase letter
		if (!/[A-Z]/.test(password))
			return res.status(400).json({
				message: "Password should contain atleast one uppercase letter",
			});
		// check if password contains atleast one lowercase letter
		if (!/[a-z]/.test(password))
			return res.status(400).json({
				message: "Password should contain atleast one lowercase letter",
			});
		// check if password contains atleast one special character
		if (!/[!@#$%^&*]/.test(password))
			return res.status(400).json({
				message:
					"Password should contain atleast one special character",
			});
		// check if password contains atleast one space
		if (/\s/.test(password))
			return res.status(400).json({
				message: "Password should not contain any spaces",
			});
		// check if password contains atleast one tab
		if (/\t/.test(password))
			return res.status(400).json({
				message: "Password should not contain any tabs",
			});
		// check if password contains atleast one newline
		if (/\n/.test(password))
			return res.status(400).json({
				message: "Password should not contain any newlines",
			});
		// check if password contains atleast one carriage return
		if (/\r/.test(password))
			return res.status(400).json({
				message: "Password should not contain any carriage returns",
			});
		next();
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const validatePhone = (req, res, next) => {
	try {
		const { phone } = req.body;
		if (!phone)
			return res.status(400).json({ message: "Phone is required" });
		// check if phone contains only numbers
		if (!/^\d+$/.test(phone))
			return res.status(400).json({ message: "Invalid Phone" });
		// check if phone contains atleast 10 digits
		if (phone.length < 10)
			return res.status(400).json({
				message: "Phone should be atleast 10 digits long",
			});
		// check if phone contains atleast one space or tab
		if (/\s|\t/.test(phone))
			return res.status(400).json({
				message: "Phone should not contain any spaces or tabs",
			});
		next();
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};
