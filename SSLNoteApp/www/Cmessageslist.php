<? session_start();

header("Acces-Control-Allow-Origin: *");

	 include 'include/dbopen.php';	 

$loginpid = $_REQUEST["loginpid"];
$pid_receive = $loginpid;



$sql=mysql_query("SELECT * FROM `messages` WHERE `pid_receive` = '$pid_receive' AND `read` = '0'")or die(mysql_error());
$totaal_messages = mysql_num_rows($sql);

$_SESSION['tot_messages'] = $totaal_messages;

$_SESSION['tot_messages2'] = $totaal_messages;



$sql=mysql_query("SELECT * FROM `messages` WHERE `pid_receive` = '$pid_receive' AND `read` = '0'")or die(mysql_error());

$_SESSION['tot_messages'] = mysql_num_rows($sql);



////// end collect

?>

   



<? $read=mysql_query("SELECT * FROM `messages` WHERE `pid_receive` = '$pid_receive' AND `read` = '0' ORDER BY `mdatum` ASC ")or die(mysql_error());

while($qread=mysql_fetch_object($read))
	{
		 $mid = $qread -> mid;
		 $pid_send = $qread -> pid_send;
		 $mdatum = $qread -> mdatum;
		 


$_SESSION['pid_send'] = $pid_send;
		 
///////////////////////
///extract pid_send
//////////////////////
$rgid = substr($pid_send, 0, 2);
$_SESSION['rgid'] = $rgid;
$rpid = substr($pid_send, 2, 2);
$_SESSION['rpid'] = $rpid;


$gid = substr($pid_receive, 0, 2);
$_SESSION['gid'] = $gid;
$pid = substr($pid_receive, 2, 2);
$_SESSION['pid'] = $pid;

$gid = $_SESSION['gid'];
$pid = $_SESSION['pid'];


$sql_rpids=mysql_query("SELECT * FROM `pid_links` WHERE `gid` = '$gid' AND `pid` = '$pid' AND `cgid` = '$rgid' AND `cpid` = '$rpid'")or die(mysql_error());
while($qrpids=mysql_fetch_object($sql_rpids))
	{
		 $cnick = $qrpids -> cnick; 

	
?>      
  
<? $mdatum = date('H:i', strtotime($mdatum)); ?>


<? // do de echp

echo  "

 <li>
 
 <a href='?mid=". $mid ."&cnick=". $cnick ."&mtime=". $mdatum ."&cgid=". $rgid ."&cpid=". $rpid ."' class='Smessages-read-key item-link item-content'><div class='item-media'><i class='icon icon-inbox'></i></div><div class='item-inner'><div class='item-title'>" .$pid_send ." ".  "(" . $cnick . ")" . $mdatum. "</div></div></a></li>";
 
 

  
}} 

//// collect all unread messages ?>


