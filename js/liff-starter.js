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
    if (liff.isLoggedIn()) {
        $('#liffLoginButton').hide();
        $('#liffLogoutButton').show();
        $('#nextButton').html('<a href="Javascript:void(0)"> Next >></a>');
    } else {
        $('#liffLoginButton').show();
        $('#liffLogoutButton').hide();
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

    // Next Button
    $('#nextButton').on('click', function() {
        if (!liff.isLoggedIn() && !liff.isInClient()) {
            alert('Anda membuka aplikasi lewat browser. Harap Login dahulu!!!');
        } else {
            $('#welcomewrapper').addClass('hidden');
            $('#homewrapper').removeClass('hidden');

            // Get User Profile
            const idToken = liff.getDecodedIDToken();
            
            // Menampilkan Nama User
            $('#welcomeMsg #userName').html(idToken['name']);
        }
        
    });

    // Button Pesan Menu
    $('#pesanMenu').on('click', function() {
        if (!liff.isInClient()) {
            alert(getPesanan());
            
        } else {
            liff
                .sendMessages([{
                    'type': 'text',
                    'text': getPesanan()
                }])
                .then(function() {
                    window.alert('Message sent');
                })
                .catch(function(error) {
                    window.alert('Error sending message: ' + error);
                });
        }
    });
 });

// Fungsi untuk mengambil data dari Checkbox
function getPesanan() {
    var pesanan = [];

    $.each($('input[name="pesanan"]:checked'), function(index) {
        pesanan.push((index+1) + ". " + $(this).val() + "<br/>");
    })

    return pesanan;
}