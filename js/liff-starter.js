/*************************
 *       LIFF Init       *
 ************************/
$(document).ready(function() {
    var myLiffId = "1653865072-pW0LzAQ9";

    if(!myLiffId || myLiffId == '') {
        $('#liffLoginContent').addClass('hidden');
        $('#liffAppContent').addClass('hidden');
        $('#liffIdKosong').removeClass('hidden');
    } else {
        initializeLiff(myLiffId);
    }
});

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
    if (!liff.isInClient()) {
        if (liff.isLoggedIn()) {
            $('#liffLoginButton').addClass('hidden');
            $('#liffLogoutButton').removeClass('hidden');
            $('#nextButton').html('<a href="Javascript:void(0)"> Next >></a>');
        } else {
            $('#liffLoginButton').removeClass('hidden');
            $('#liffLogoutButton').addClass('hidden');
        }
    } else {
        $('#nextButton').html('<a href="Javascript:void(0)"> Next >></a>');
    }
    
}



/*************************
 *   Button Controller   *
 ************************/
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

    // Event Listener Next Button
    $('#nextButton').on('click', function() {
        if (!liff.isLoggedIn() && !liff.isInClient()) {
            alert('Anda membuka aplikasi lewat browser. Harap Login dahulu!!!');
        } else {
            $('#welcomewrapper').addClass('hidden');
            $('#homewrapper').removeClass('hidden');
            $('body').css('overflow','auto');

            // Get User Profile
            const idToken = liff.getDecodedIDToken();
            
            // Menampilkan Nama User
            $('#welcomeMsg #userName').html(idToken['name']);
        }
        
    });

    //Event Listener CLose Button
    $('#liffExitButton').on('click', function() {
        if (!liff.isInClient()) {
            alert('Anda membuka aplikasi lewat browser. Tekan OK untuk Close Window!!!');
            window.close();
        } else {
            liff.closeWindow();
        }
    });

    // Button Pesan Menu
    $('#pesanMenu').on('click', function() {
        if (!liff.isInClient()) {
            alert('Buka aplikasi lewat LINE');
        } else {
            if (!liff.isLoggedIn()) {
                liff
                    .sendMessages([{
                        'type': 'text',
                        'text': "Berikut pesanan anda : \n\n" + getPesanan() + "\n\n Mohon tunggu sebentar yah :)."
                    }])
                    .then(function() {
                        window.alert('Message sent');
                    })
                    .catch(function(error) {
                        window.alert('Error sending message: ' + error);
                    });
            } else {
                alert('Silahkan login terlebih dahulu');
            }

        }
    });
 });

// Fungsi untuk mengambil data dari Checkbox
function getPesanan() {
    var pesanan = [];

    $.each($('input[name="pesanan"]:checked'), function(index) {
        pesanan.push($(this).val());
    })

    return pesanan;
}