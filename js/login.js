function redirect(url) {
    var ua = navigator.userAgent.toLowerCase(),
        isIE = ua.indexOf('msie') !== -1,
        version = parseInt(ua.substr(4, 2), 10);

    // Internet Explorer 8 and lower
    if (isIE && version < 9) {
        var link = document.createElement('a');
        link.href = url;
        document.body.appendChild(link);
        link.click();
    }

    // All other browsers can use the standard window.location.href (they don't lose HTTP_REFERER like IE8 & lower does)
    else {
        window.location.href = url;
    }
}

$(document).ready(function () {
    $("form#loginForm").submit(function () { // tombol submit pada loginForm ditekan
        var username = $('[name="username"]').val(); // mendapatkan nilai username
        var password = $('[name="password"]').val(); // mendapatkan nilai password
        // var rememberMe = $('[name="remember"]').val(); // mendapatkan nilai remember

        if (username && password) { // Hanya dijalankan jika nilai tidak kosong
            $.ajax({
                dataType: "json",
                type: "POST", //type bisa GET atau POST

                // jika pakai GET, pakai:
                // url: "dispatcher/ws-login-GET.php", // URL dari web service JSON, dalam hal ini dilayani skrip PHP
//                data: "login=" + username + "&passwd=" + password,
                // Mengirim login dengan nilai username dan passwd dengan nilai password sebagai parameter ke skrip PHP

                // jika pakai POST, pakai:
                url: "dispatcher/ws-login-POST.php", // URL dari web service JSON, dalam hal ini dilayani skrip PHP
                data: {login: username, passwd: password},
                // Mengirim login dengan nilai username dan passwd dengan nilai password sebagai parameter ke skrip PHP

                // Jika web service tidak merespon/gagal
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $('div#hasilLogin').text("responseText: " + XMLHttpRequest.responseText +
                                             ", textStatus: " + textStatus +
                                             ", errorThrown: " + errorThrown);
                    $('div#hasilLogin').removeClass();
                    $('div#hasilLogin').addClass("alert alert-warning");
                }, // error

                // Jika web service merespon
                // data yang mengandung nilai JSON akan dikembalikan oleh skrip PHP
                success: function (data) {
                    if (data.gagal) { // key gagal dikembalikan
                        $('div#hasilLogin').removeAttr("style");
                        $('div#hasilLogin').removeClass();
                        $('div#hasilLogin').text("data.gagal: " + data.gagal);
                        $('div#hasilLogin').addClass("alert alert-warning");
                    } else { // login berhasil
                        $('div#loginPanel').hide(); // menyembunyikan login panel
                        $('div#hasilLogin').removeAttr("style");
                        $('div#hasilLogin').removeClass();
                        $('div#hasilLogin').text("data.berhasil: " + data.berhasil +
                                                 ", data.userid: " + data.userid); // key berhasil dan userid dikembalikan
                        $('div#hasilLogin').addClass("alert alert-success");
                        // if ($rememberMe.is(":checked")) {
                        // Agar user tidak perlu login berikutnya, disini buat cookie
                        // }
                        setTimeout(function () {
                            redirect('dashboard.html');
                        }, 1000); // mengarahkan ke dashboard setelah 1 detik
                        // window.location.reload(); // Jika SPA, gunakan ini
                    }
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
