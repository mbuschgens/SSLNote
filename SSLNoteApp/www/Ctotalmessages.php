<? session_start();  

include 'include/dbopen.php';	 

$pid_receive = $_REQUEST['loginpid'];	

$sql=mysql_query("SELECT * FROM `messages` WHERE `pid_receive` = '$pid_receive' AND `read` = '0'")or die(mysql_error());

$total_messages2 = mysql_num_rows($sql);



$_SESSION['tot_messages2'] = $total_messages2;

;

echo $total_messages2;


?>



