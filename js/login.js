$(document).ready(function(){
    $("form#loginForm").submit(function() { // tombol submit pada loginForm ditekan
        var username = $('[name="username"]').val(); // mendapatkan nilai username
        var password = $('[name="password"]').val(); // mendapatkan nilai password
        // var rememberMe = $('[name="remember"]').val(); // mendapatkan nilai remember

        if (username && password) { // Hanya dijalankan jika nilai tidak kosong
            $.ajax({
                type: "POST",
                url: "dispatcher/ws-login.php", // URL dari web service JSON, dalam hal ini dilayani skrip PHP
                dataType: "json",

                // Mengirim login dengan nilai username dan passwd dengan nilai password sebagai parameter ke skrip PHP
                // jika pakai POST
                data: {login: username, passwd: password},
                // jika pakai GET
                // data: "username=" + username + "&password=" + password,

                // Jika web service tidak merespon/gagal
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    $('div#hasilLogin').text("responseText: " + XMLHttpRequest.responseText
                                             + ", textStatus: " + textStatus
                                             + ", errorThrown: " + errorThrown);
                    $('div#hasilLogin').removeClass();
                    $('div#hasilLogin').addClass("alert alert-warning");
                }, // error

                // Jika web service merespon
                // data yang mengandung nilai JSON akan dikembalikan oleh skrip PHP
                success: function(data){
                    if (data.gagal) { // key gagal dikembalikan
                        $('div#hasilLogin').removeClass();
                        $('div#hasilLogin').text("data.gagal: " + data.gagal);
                        $('div#hasilLogin').addClass("alert alert-warning");
                    } // if
                    else { // login berhasil
                        $('div#loginPanel').hide(); // menyembunyikan login panel
                        $('div#hasilLogin').removeClass();
                        $('div#hasilLogin').text("data.berhasil: " + data.berhasil
                                                 + ", data.userid: " + data.userid); // key berhasil dan userid dikembalikan
                        $('div#hasilLogin').addClass("alert alert-success");
                        // if ($rememberMe.is(":checked")) {
                            // Agar user tidak perlu login berikutnya, disini buat cookie
                        // }
                        setTimeout("location.href = 'dashboard.html';",1000); // mengarahkan ke dashboard setelah 1 detik
                        // window.location.reload(); // Jika SPA, gunakan ini
                    } //else
                } // success
            }); // ajax
        } // if
        else {
            $('div#hasilLogin').removeClass();
            $('div#hasilLogin').text("Masukkan username dan password"); //keterangan jika input ada yang kosong
            $('div#hasilLogin').addClass("alert alert-warning");
        } // else
        $('div#hasilLogin').fadeIn();
        return false;
    });
});
