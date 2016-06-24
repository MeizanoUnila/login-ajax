<?php
require("fungsi.php");

$sqlartikel = "SELECT judul, isi FROM artikel";
$artikel = fetchsql($sqlartikel);

/* JSON */
$arr = array();

/* JSON */
if($artikel)
{
    $arr = array("berhasil" => "Mohon tunggu sebentar","judul" => $artikel[0]['judul'],"isi" => $artikel[0]['isi']);

}
else
{
    $arr = array("gagal" => "Mohon ulang");
}

//echo  xmlrpc_encode($arr);
echo  json_encode($arr);
/* JSON */
?>
