<? session_start();

header("Acces-Control-Allow-Origin: *");

	 include 'include/dbopen.php';	 

$loginpid = $_REQUEST["loginpid"];
$pid_receive = $loginpid;

$sql=mysql_query("SELECT * FROM `messages` WHERE `pid_receive` = '$pid_receive' AND `read` = '0'")or die(mysql_error());
$totaal_messages = mysql_num_rows($sql);
$_SESSION['tot_messages'] = $totaal_messages;
$_SESSION['tot_messages2'] = $totaal_messages;//////////////////////////////////////

?>

<?



$id = substr($loginpid, 0, 4);
$_SESSION['id'] = $id;

$gid = substr($loginpid, 0, 2);
$_SESSION['gid'] = $gid;

$pid = substr($loginpid, 2, 2);
$_SESSION['pid'] = $pid;


//// CHECK COBI OKE

$sql4=mysql_query("SELECT * FROM `pid_links` WHERE `gid` = '$gid' AND `pid` = '$pid'")or die(mysql_error());

while($q4=mysql_fetch_object($sql4)){
		 
		 $cgid = $q4 -> cgid;
		 $cpid = $q4 -> cpid;
		 $cnick = $q4 -> cnick;
		 
		  
echo"<li><a href='Smessages-send.html?cgid=". $cgid . "&cpid=". $cpid . "&cnick=". $cnick . "' class='item-link item-content'><div class='item-media'><i class='icon icon-outbox'></i></div><div class='item-inner'><div class='item-title'>". $cgid . $cpid . " (". $cnick . ") send mess.</div></div></a></li>";
 

}

?>
<? //echo  "<li><div id='" . $cgid . $cpid ."'><a href='messages_send?cgid=". $cgid . "&cpid=". $cpid . "&cnick=". $cnick . "' onclick='showadve()'><span class='list-icon offline'></span>". $cgid . $cpid . " (". $cnick . ") send mess. <span class='more'></span> </a></div></li>";	
?>

