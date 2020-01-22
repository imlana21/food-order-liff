var LiffId = "1653779273-PnDEDLxm";
/**
 * Cek LIFF ID
 */
function initializeOrLiffDie(myLiffId) {
    if(!myLiffId || myLiffId == '') {
        $('#liffAppContent').addClass('hidden');
        document.write('LIFF ID Kosong');
    } else {
        initializeLiff(myLiffId);
    }
}
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
        $('#liffLoginButton').addClass('hidden');
        $('#liffLogoutButton').removeClass('hidden');
        $('#nextButton').html('<a href="home.html"> Next </a>');
    } else {
        $('#liffLoginButton').removeClass('hidden');
        $('#liffLogoutButton').addClass('hidden');
    }
}

initializeOrLiffDie(LiffId)

//40:F0:2F:64:A2:0B pujikurniawan
