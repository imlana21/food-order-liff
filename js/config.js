/************************
 ************************
 *    Button Config     *
 ************************
 ***********************/


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
			url : 'https://dicoding-pesanmakan.herokuapp.com/',
			external : true
		});
	});	

	// Next Button
	$('#nextButton').on('click', function() {
		if (!liff.isLoggedIn() && !liff.isInClient()) {
			alert('Anda membuka aplikasi lewat browser. Harap Login dahulu!!!');
		} else {
			$('#welcomewrapper').addClass('hidden');
			$('#homewrapper').removeClass('hidden');

			const accessToken = liff.getAccessToken();

			liff.init(() => {
    			const idToken = liff.getDecodedIDToken();
    			console.log(idToken) // print decoded idToken object
			});
		}
		
	});
})