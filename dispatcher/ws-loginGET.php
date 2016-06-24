<?php
require("fungsi.php");

// Jika input type tidak ada, diberi nilai NULL
$username_string = isset($_GET['login']) ? mysqli_real_escape_string($_GET['login']) : NULL;
$password_string = isset($_GET['passwd']) ? mysqli_real_escape_string($_GET['passwd']) : NULL;

$sqlakun = "SELECT id FROM akun WHERE login='" . $username_string ."' and password=MD5('".$password_string."')";
$akun = fetchsql($sqlakun);

/* JSON */
if($akun)
{
    $arr = array("berhasil" => "Mohon tunggu sebentar","userid" => $akun[0]['id']);

}
else
{
    $arr = array("gagal" => "Mohon ulang");
}

echo json_encode($arr);
/* JSON */
?>
