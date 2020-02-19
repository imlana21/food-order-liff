/**
 * Cek LIFF ID
 */
 $(document).ready(function() {
    var myLiffId = "1653865072-pW0LzAQ9";

    if(!myLiffId || myLiffId == '') {
        $('#liffAppContent').addClass('hidden');
        $('#idNotAvailable').removeClass('hidden');
    } else {
        initializeLiff(myLiffId);
    }
 })
/**
 * Inisialisasi LIFF
 */
function initializeLiff(myLiffId) {
    liff
        .init({
            liffId : myLiffId
        })
        .then(() => {
            //Memanggil Fungsi LIFF API
            initializeApp();
        })
        .catch((err) => {
            $('#errorCode').append(err);
            $('#liffAppContent').addClass('hidden');
            $('#liffIdErrorMessage').removeClass('hidden');
        });
}

function initializeApp() {
    if (liff.isLoggedIn()) {
        $('#liffLoginButton').hide();
        $('#liffLogoutButton').show();
    } else {
        $('#liffLoginButton').show();
        $('#liffLogoutButton').hide();
    }
}