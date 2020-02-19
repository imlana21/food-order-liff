$(document).ready(function() {
	// Event Listener Button Login
	$('#liffLoginButton').on('click', function() {
		//Cek Apakah user sudah login
		if (!liff.isLoggedIn()) {
			//Jika belum maka akan diarahkan ke Line Login
			liff.login();
		}
	});
	// Event Listener Button Login
	$('#liffLogoutButton').on('click', function() {
		if (liff.isLoggedIn() ) {
			liff.logout();
			window.location.reload();
		}
	});
})