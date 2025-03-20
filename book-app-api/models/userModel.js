
const mongoose = require('mongoose');


let user = [
	{
		username: "admin",
		password: "admin123", // En production, il faudrait hacher les mots de passe
	},
];

// const userSchema = new mongoose.Schema(
//     { 
//         username: "admin",
// 		password: "admin123", // En production, il faudrait hacher les mots de passe
//     }
// ); 
// const User = mongoose.model("Author", userSchema);
// module.exports = User;