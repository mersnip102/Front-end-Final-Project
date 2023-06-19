/*
Template Name: Fonik - Admin & Dashboard Template
Author: Themesbrand
Version: 3.1.0
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Session Timeout
*/


$.sessionTimeout({
	keepAliveUrl: 'pages-blank.html',
	logoutButton: 'Logout',
	logoutUrl: 'pages-login.html',
	redirUrl: 'pages-lock-screen.html',
	warnAfter: 3000,
	redirAfter: 30000,
	countdownMessage: 'Redirecting in {timer} seconds.'
});

$('#session-timeout-dialog  [data-dismiss=modal]').attr("data-bs-dismiss", "modal");

