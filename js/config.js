function buttonHandlers() {
	$('#liffLoginButton').on('click', function() {
		if(!liff.isLoggedIn()) {
			liff.login();
		}
	});
}

//Memanggul fungsi buttonHandlers
buttonHandlers();

//https://developers.line.biz/en/reference/liff/