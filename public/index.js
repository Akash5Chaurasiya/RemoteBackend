/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./db.ts":
/*!***************!*\
  !*** ./db.ts ***!
  \***************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.connection = void 0;\nconst mongoose = __importStar(__webpack_require__(/*! mongoose */ \"mongoose\"));\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)();\nconst url = process.env.MONGO_URL;\nif (!url) {\n    throw new Error('MongoDB connection URL is not defined in the environment variables.');\n}\nexports.connection = mongoose.connect(url).then(() => {\n    console.log(\"Connected to MongoDB\");\n}).catch((error) => {\n    console.log(error);\n});\n\n\n//# sourceURL=webpack://backend/./db.ts?");

/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst db_1 = __webpack_require__(/*! ./db */ \"./db.ts\");\nconst skills_route_1 = __importDefault(__webpack_require__(/*! ./routes/skills/skills.route */ \"./routes/skills/skills.route.ts\"));\nconst user_routes_1 = __importDefault(__webpack_require__(/*! ./routes/users/user.routes */ \"./routes/users/user.routes.ts\"));\nconst cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\nconst cors = __webpack_require__(/*! cors */ \"cors\");\nconst express = __webpack_require__(/*! express */ \"express\");\nconst app = express();\napp.use(express.json());\napp.use(cors({ origin: 'http://localhost:3000', credentials: true }));\napp.options('*', cors({ origin: 'http://localhost:3000', credentials: true }));\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)();\napp.use(cookieParser());\napp.use('/users', user_routes_1.default);\napp.use(`/skills`, skills_route_1.default);\napp.listen(process.env.PORT, async () => {\n    try {\n        await db_1.connection;\n        console.log(\"listening to port\", process.env.PORT);\n    }\n    catch (error) {\n        console.log(error);\n    }\n});\n\n\n//# sourceURL=webpack://backend/./index.ts?");

/***/ }),

/***/ "./middleware/auth.middleware.ts":
/*!***************************************!*\
  !*** ./middleware/auth.middleware.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.auth = void 0;\nconst jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\nconst catchErrorAsync_1 = __importDefault(__webpack_require__(/*! ../utils/catchErrorAsync */ \"./utils/catchErrorAsync.ts\"));\nconst dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ \"dotenv\"));\nconst user_model_1 = __importDefault(__webpack_require__(/*! ../model/user.model */ \"./model/user.model.ts\"));\ndotenv_1.default.config();\nexports.auth = (0, catchErrorAsync_1.default)(async (req, res, next) => {\n    const { token } = req.cookies;\n    console.log(token);\n    const jwtSecret = process.env.secret;\n    try {\n        if (!jwtSecret) {\n            throw new Error(\"JWT secret is not defined\");\n        }\n        if (!token) {\n            return res.status(401).json({ msg: \"Unauthorized: Token missing\" });\n        }\n        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);\n        console.log(decoded);\n        if (!decoded) {\n            return res.status(401).json({ msg: \"Unauthorized: Invalid token\" });\n        }\n        const data = await user_model_1.default.findById(decoded.user);\n        if (!data) {\n            return res.status(404).json({\n                success: false,\n                message: \"Employee not found in middleware.\",\n            });\n        }\n        console.log(data);\n        if (data.firstName == 'Admin') {\n            req.admin = data;\n            return next();\n        }\n        else {\n            return res.status(500).json({ msg: \"Login with Admin\" });\n        }\n    }\n    catch (error) {\n        return res.status(500).json({ error: error.message });\n    }\n});\n\n\n//# sourceURL=webpack://backend/./middleware/auth.middleware.ts?");

/***/ }),

/***/ "./model/skills.model.ts":
/*!*******************************!*\
  !*** ./model/skills.model.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst skillsSchema = new mongoose_1.Schema({\n    name: {\n        type: String,\n        required: true,\n        unique: true,\n    },\n});\nconst Skill = (0, mongoose_1.model)('Skill', skillsSchema);\nexports[\"default\"] = Skill;\n\n\n//# sourceURL=webpack://backend/./model/skills.model.ts?");

/***/ }),

/***/ "./model/user.model.ts":
/*!*****************************!*\
  !*** ./model/user.model.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst userSchema = new mongoose_1.Schema({\n    firstName: {\n        type: String,\n        required: true,\n    },\n    lastName: {\n        type: String,\n        required: true,\n    },\n    phoneNumber: String,\n    email: {\n        type: String,\n        required: true,\n        unique: true,\n    },\n    skills: [{\n            type: mongoose_1.Schema.Types.ObjectId,\n            ref: 'Skill',\n        }],\n    professionalExperience: [{\n            companyName: {\n                type: String,\n                required: true,\n            },\n            techStack: String,\n            skillsUsed: [{\n                    type: mongoose_1.Schema.Types.ObjectId,\n                    ref: 'Skill',\n                }],\n            timePeriod: String,\n        }],\n    educationalExperience: [{\n            degreeName: {\n                type: String,\n                required: true,\n            },\n            schoolName: {\n                type: String,\n                required: true,\n            },\n            timePeriod: String,\n        }],\n    password: {\n        type: String,\n        required: true,\n    },\n});\nconst User = (0, mongoose_1.model)('User', userSchema);\nexports[\"default\"] = User;\n\n\n//# sourceURL=webpack://backend/./model/user.model.ts?");

/***/ }),

/***/ "./routes/skills/skills.controller.ts":
/*!********************************************!*\
  !*** ./routes/skills/skills.controller.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getAllSkills = exports.deleteSkill = exports.addSkill = void 0;\nconst catchErrorAsync_1 = __importDefault(__webpack_require__(/*! ../../utils/catchErrorAsync */ \"./utils/catchErrorAsync.ts\"));\nconst skills_model_1 = __importDefault(__webpack_require__(/*! ../../model/skills.model */ \"./model/skills.model.ts\"));\nconst bcrypt = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)();\nexports.addSkill = (0, catchErrorAsync_1.default)(async (req, resp, next) => {\n    try {\n        const { name } = req.body;\n        const newSkill = new skills_model_1.default({ name });\n        await newSkill.save();\n        resp.status(201).json({ message: 'Skill created successfully', skill: newSkill });\n    }\n    catch (error) {\n        console.error(error);\n        resp.status(500).json({ message: 'Internal Server Error' });\n    }\n});\nexports.deleteSkill = (0, catchErrorAsync_1.default)(async (req, res, next) => {\n    try {\n        const skillId = req.params.id;\n        const skillToDelete = await skills_model_1.default.findById(skillId);\n        if (!skillToDelete) {\n            res.status(404).json({ message: 'Skill not found' });\n            return;\n        }\n        await skills_model_1.default.deleteOne({ _id: skillToDelete._id });\n        res.status(200).json({ message: 'Skill deleted successfully', skill: skillToDelete });\n    }\n    catch (error) {\n        console.error(error);\n        res.status(500).json({ message: 'Internal Server Error' });\n    }\n});\nexports.getAllSkills = (0, catchErrorAsync_1.default)(async (req, res, next) => {\n    try {\n        const skills = await skills_model_1.default.find({});\n        res.status(200).json({ skills });\n    }\n    catch (error) {\n        console.error(error);\n        res.status(500).json({ message: 'Internal Server Error' });\n    }\n});\n\n\n//# sourceURL=webpack://backend/./routes/skills/skills.controller.ts?");

/***/ }),

/***/ "./routes/skills/skills.route.ts":
/*!***************************************!*\
  !*** ./routes/skills/skills.route.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst auth_middleware_1 = __webpack_require__(/*! ../../middleware/auth.middleware */ \"./middleware/auth.middleware.ts\");\nconst skills_controller_1 = __webpack_require__(/*! ./skills.controller */ \"./routes/skills/skills.controller.ts\");\nconst express = __webpack_require__(/*! express */ \"express\");\nconst skill = express.Router();\nskill.route(`/createSkills`).post(auth_middleware_1.auth, skills_controller_1.addSkill);\nskill.route(`/skills/:id`).post(auth_middleware_1.auth, skills_controller_1.deleteSkill);\nskill.get(`/`, skills_controller_1.getAllSkills);\nexports[\"default\"] = skill;\n\n\n//# sourceURL=webpack://backend/./routes/skills/skills.route.ts?");

/***/ }),

/***/ "./routes/users/user.controller.ts":
/*!*****************************************!*\
  !*** ./routes/users/user.controller.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.onBoardDeveloper = exports.loginDeveloper = exports.getAllDeveloper = exports.signUpDeveloper = void 0;\nconst catchErrorAsync_1 = __importDefault(__webpack_require__(/*! ../../utils/catchErrorAsync */ \"./utils/catchErrorAsync.ts\"));\nconst sendCookies_1 = __webpack_require__(/*! ../../utils/sendCookies */ \"./utils/sendCookies.ts\");\nconst user_model_1 = __importDefault(__webpack_require__(/*! ../../model/user.model */ \"./model/user.model.ts\"));\nconst bcrypt = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)();\nexports.signUpDeveloper = (0, catchErrorAsync_1.default)(async (req, resp, next) => {\n    const { firstName, lastName, phoneNumber, email, password } = req.body;\n    try {\n        const user = await user_model_1.default.findOne({ email });\n        if (user) {\n            return next(new Error(`User Already Exists`));\n        }\n        const hashedPass = await bcrypt.hash(password, 10);\n        console.log(hashedPass);\n        const newUser = new user_model_1.default({\n            firstName,\n            lastName,\n            phoneNumber,\n            email,\n            password: hashedPass\n        });\n        await newUser.save();\n        resp.status(201).json({ message: 'User registered successfully' });\n    }\n    catch (error) {\n        console.error('Error during sign-up:', error);\n        resp.status(500).json({ error: 'Internal server error' });\n    }\n});\nexports.getAllDeveloper = (0, catchErrorAsync_1.default)(async (req, resp, next) => {\n    const { token } = req.cookies;\n    console.log(\"hii\", token);\n    let user = await user_model_1.default.find({});\n    resp.status(201).json({\n        success: true,\n        message: \"Getting All Developers successfully.\",\n        user,\n    });\n});\nexports.loginDeveloper = (0, catchErrorAsync_1.default)(async (req, resp, next) => {\n    const { email, password } = req.body;\n    console.log(email, password);\n    try {\n        const jwtKey = process.env.secret;\n        const user = await user_model_1.default.findOne({ email });\n        if (!user || !(await bcrypt.compare(password, user.password))) {\n            return resp.status(401).json({ success: false, message: 'Invalid credentials' });\n        }\n        (0, sendCookies_1.sendAdminCookie)(resp, user, `Welcome Back,${user.firstName}`, jwtKey.toString(), 200);\n    }\n    catch (error) {\n        return resp.status(500).json({ success: false, message: error.message });\n    }\n});\nexports.onBoardDeveloper = (0, catchErrorAsync_1.default)(async (req, resp, next) => {\n    const { email, skills, professionalExperience, educationalExperience, password } = req.body;\n    try {\n        const jwtKey = process.env.secret;\n        const user = await user_model_1.default.findOne({ email });\n        if (!user || !(await bcrypt.compare(password, user.password))) {\n            return resp.status(401).json({ error: 'Invalid credentials' });\n        }\n        (0, sendCookies_1.sendAdminCookie)(resp, user, `Welcome Back,${user.firstName}`, jwtKey.toString(), 200);\n        if (skills) {\n            user.skills = skills;\n        }\n        if (professionalExperience) {\n            user.professionalExperience = professionalExperience;\n        }\n        if (educationalExperience) {\n            user.educationalExperience = educationalExperience;\n        }\n        await user.save();\n        resp.status(200).json({ message: 'Developer onboarding details saved successfully' });\n    }\n    catch (error) {\n        console.error('Error during onboarding:', error);\n        resp.status(500).json({ success: false, message: 'Internal server error', error: error.message });\n    }\n});\n\n\n//# sourceURL=webpack://backend/./routes/users/user.controller.ts?");

/***/ }),

/***/ "./routes/users/user.routes.ts":
/*!*************************************!*\
  !*** ./routes/users/user.routes.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst auth_middleware_1 = __webpack_require__(/*! ../../middleware/auth.middleware */ \"./middleware/auth.middleware.ts\");\nconst user_controller_1 = __webpack_require__(/*! ./user.controller */ \"./routes/users/user.controller.ts\");\nconst express = __webpack_require__(/*! express */ \"express\");\nconst userRouter = express.Router();\nuserRouter.route(`/dev`).get(auth_middleware_1.auth, user_controller_1.getAllDeveloper);\nuserRouter.post(`/dev/signup`, user_controller_1.signUpDeveloper);\nuserRouter.route(`/dev/login`).post(user_controller_1.loginDeveloper);\nuserRouter.post(`/dev/onBoard`, user_controller_1.onBoardDeveloper);\nexports[\"default\"] = userRouter;\n\n\n//# sourceURL=webpack://backend/./routes/users/user.routes.ts?");

/***/ }),

/***/ "./utils/catchErrorAsync.ts":
/*!**********************************!*\
  !*** ./utils/catchErrorAsync.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst catchErrorAsync = (func) => (req, resp, next) => {\n    Promise.resolve(func(req, resp, next)).catch(next);\n};\nexports[\"default\"] = catchErrorAsync;\n\n\n//# sourceURL=webpack://backend/./utils/catchErrorAsync.ts?");

/***/ }),

/***/ "./utils/sendCookies.ts":
/*!******************************!*\
  !*** ./utils/sendCookies.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.sendAdminCookie = void 0;\nconst jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\nconst sendAdminCookie = (resp, user, message, jwtKey, statusCode = 200) => {\n    try {\n        console.log(user);\n        const token = jsonwebtoken_1.default.sign({ user: user._id }, jwtKey);\n        console.log(token);\n        return resp.status(statusCode).cookie(\"token\", token, {\n            maxAge: 5 * 60 * 60 * 60 * 1000,\n            httpOnly: true,\n            secure: true,\n            sameSite: \"none\"\n        }).json({\n            success: true,\n            message,\n            user\n        });\n    }\n    catch (error) {\n        return resp.status(500).json({\n            success: false,\n            error: error.message,\n            message: \"Error while creating and sending the cookie.\",\n        });\n    }\n};\nexports.sendAdminCookie = sendAdminCookie;\n\n\n//# sourceURL=webpack://backend/./utils/sendCookies.ts?");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ })()
;