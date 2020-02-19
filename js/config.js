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
	// Event Listener untuk membuka aplikasi di browser
	$('#openExternal').on('click', function() {
		liff.openWindow({
			url : 'http://localhost/git-push/Learning/Dicoding-LineLIFF/Submission/',
			external : true
		});
	});
	// Event Listener Next Button
	$('#nextButton').on('click', function() {
		if (!liff.isLoggedIn() && !liff.isInClient()) {
			alert("Aplikasi dibuka di browser. Silahkan Login dulu.");
		} else {
			const accessToken = liff.getAccessToken();

			$('#nextButton').html('<a href="Javascript:void(0)"> Inisialisasi >></a>');
			
			alert(liff.getAccessToken());
		}
		//window.location.assign('home.html')
	});
	
})