var user_id = '1111';
var user_fullname = 'John';
var lng = -122.08;
var lat = 37.38;

function init() {
	document.querySelector('#login-form-btn').addEventListener('click',
			onSessionInvalid);
	document.querySelector('#register-form-btn').addEventListener('click',
			showRegisterForm);

	document.querySelector('#login-btn').addEventListener('click', login);
	validateSession();
}

function validateSession() {
	onSessionInvalid();

	// The request parameters
	var url = './login';
	var req = JSON.stringify();

	// display loading message
	showLoadingMessage('Validating session...');

	// make AJAX call
	ajax('GET', url, req,
	// session is still valid
	function(res) {
		var result = JSON.parse(res);

		if (result.status === 'OK') {
			// case2: session validate
			onSessionValid(result);
		}
	}, function() {
		// case1: session invalid
		console.log('session is invalid');
	});
}

function onSessionInvalid() {
	var loginForm = document.querySelector('#login-form');
	var registerForm = document.querySelector('#register-form');
	var itemNav = document.querySelector('#item-nav');
	var itemList = document.querySelector('#item-list');
	var avatar = document.querySelector('#avatar');
	var welcomeMsg = document.querySelector('#welcome-msg');
	var logoutBtn = document.querySelector('#logout-link');

	hideElement(itemNav);
	hideElement(itemList);
	hideElement(avatar);
	hideElement(logoutBtn);
	hideElement(welcomeMsg);
	hideElement(registerForm);

	clearLoginError();
	showElement(loginForm);
}

function onSessionValid(result) {
	user_id = result.user_id;
	user_fullname = result.name;

	var loginForm = document.querySelector('#login-form');
	var registerForm = document.querySelector('#register-form');
	var itemNav = document.querySelector('#item-nav');
	var itemList = document.querySelector('#item-list');
	var avatar = document.querySelector('#avatar');
	var welcomeMsg = document.querySelector('#welcome-msg');
	var logoutBtn = document.querySelector('#logout-link');

	welcomeMsg.innerHTML = 'Welcome, ' + user_fullname;

	showElement(itemNav);
	showElement(itemList);
	showElement(avatar);
	showElement(welcomeMsg);
	showElement(logoutBtn, 'inline-block');
	hideElement(loginForm);
	hideElement(registerForm);
}

function login() {
	var username = document.querySelector('#username').value;
	var password = document.querySelector('#password').value;
	password = md5(username + md5(password));

	// The request parameters
	var url = './login';
	var req = JSON.stringify({
		user_id : username,
		password : password,
	});

	ajax('POST', url, req,
	// successful callback
	function(res) {
		var result = JSON.parse(res);

		// successfully logged in
		if (result.status === 'OK') {
			onSessionValid(result);
		}
	},
	// error
	function() {
		showLoginError();
	});
}

function showRegisterForm() {
	var loginForm = document.querySelector('#login-form');
	var registerForm = document.querySelector('#register-form');
	var itemNav = document.querySelector('#item-nav');
	var itemList = document.querySelector('#item-list');
	var avatar = document.querySelector('#avatar');
	var welcomeMsg = document.querySelector('#welcome-msg');
	var logoutBtn = document.querySelector('#logout-link');

	hideElement(itemNav);
	hideElement(itemList);
	hideElement(avatar);
	hideElement(logoutBtn);
	hideElement(welcomeMsg);
	hideElement(loginForm);

	clearRegisterResult();
	showElement(registerForm);
}

init();
