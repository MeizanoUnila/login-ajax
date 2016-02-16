<?php
require("fungsi.php");

// Jika input type tidak ada, diberi nilai NULL
$username_string = isset($_POST['username']) ? mysql_real_escape_string($_POST['username']) : NULL;
$password_string = isset($_POST['password']) ? mysql_real_escape_string($_POST['password']) : NULL;

$sqlakun = "SELECT id FROM users WHERE username='" . $username_string ."' and password='".$password_string."'";
$akun = fetchsql($sqlakun);

/* JSON */
if($akun)
{
    $arr = array("success" => "login is successful","userid" => $akun[0]['id']);

}
else
{
    $arr = array("error" => "username or password is wrong");
}

echo json_encode($arr);
/* JSON */
?>
