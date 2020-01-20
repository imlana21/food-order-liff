function buttonHandlers() {
	$('#liffLoginButton').on('click', function() {
		if(!liff.isLoggedIn()) {
			liff.login();
		}
	});
	$('liffLogoutButton').on('click', function() {
		if (liff.isLoggedIn()) {
			liff.logout();
		}
	});
}

//Memanggul fungsi buttonHandlers
buttonHandlers();

//https://developers.line.biz/en/reference/liff/