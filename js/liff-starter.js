/************************
 ************************
 *  Inisialisasi LiFF   *
 ************************
 ***********************/

 $(document).ready(function() {
    var myLiffId = "1653865072-pW0LzAQ9";

    if(!myLiffId || myLiffId == '') {
        $('#liffLoginContent').addClass('hidden');
        $('#liffAppContent').addClass('hidden');
        $('#liffIdKosong').removeClass('hidden');
    } else {
        initializeLiff(myLiffId);
    }
 })

//Inisialisasi
function initializeLiff(myLiffId) {
    liff
        .init({
            liffId : myLiffId
        })
        .then(() => {
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
        $('#nextButton').html('<a href="Javascript:void(0)"> Next >></a>');
    } else {
        $('#liffLoginButton').show();
        $('#liffLogoutButton').hide();
    }
}