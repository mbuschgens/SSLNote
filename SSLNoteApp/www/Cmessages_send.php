<? $url=$_SERVER['REQUEST_URI'];


session_start();  
$timer_refresh =  $_SESSION['timer_refresh']; 
$now = time();
$timer_session =  $_SESSION['timer_session'] ; 
header("Refresh: ".$timer_refresh."; URL=" . $url); // redirect in 120 seconds 
echo '<meta http-equiv="refresh" content="'.$timer_refresh . '; url='. $site . '/apps/kill-session.php?id='.$_SESSION['gid'] . $_SESSION['pid']. '"  />';
$time="2";
$now = time(); // checking the time now when home page starts

		
			if ($now > $_SESSION['expire']) {

session_destroy(); 



echo "<script>";
 echo "window.location.href= '". $site . "/apps/kill-session.php?id=".$_SESSION['gid'] . $_SESSION['pid']."'";
echo "</script>";

}

	//start logged in time
		$_SESSION['start'] = time();
		// ending a session in 2 minutes from the starting time
		$_SESSION['expire'] = $_SESSION['start'] +  ($timer_session);
		
		
if ($_SESSION['login'] != "1") {


echo "<script>";
echo "window.location.href= '". $site . "/apps/kill-session.php?id=".$_SESSION['gid'] . $_SESSION['pid']."'";
echo "</script>";
			}

//////////////////// check session


			

$header_img = "messages";
?>





<!DOCTYPE html>


<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <meta charset="utf-8" />
    
    <meta name="HandheldFriendly" content="True" />
    <meta name="MobileOptimized" content="320" />
    <meta name="viewport" content="width=device-width" />                                                     <link rel="shortcut icon" href="<? echo $site; ?>/favicon.ico" type="image/x-icon">
		<link rel="icon" href="<? echo $site; ?>/favicon.ico" type="image/x-icon">
		
    
    <title><? echo $site_txt; ?></title>
    
    <link href="assets/css/style.css" rel="stylesheet" type="text/css" />
    
    <script async src="assets/js/jquery-1.7.2.js"></script>
    
   
  


<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

<script type="text/javascript">
$(window).load(function() {
	$(".loader").fadeOut("slow");
})
</script>


<script type='text/javascript'>
function showadve() {
    if (document.getElementById('hiddenadve').style.display == 'none') {
        document.getElementById('hiddenadve').style.display = 'block';
    } else {
        document.getElementById('hiddenadve').style.display = 'none';
    }
}
</script>

</head>

<body>

<div class="loader"></div>

<div id="hiddenadve" class="loader" ></div>


<div class="wrapper2">
<div class="page">


 <?

 
 include('header.php');   
 
 ?>
<? 
$cgid = $_REQUEST['cgid'] ;

$cpid = $_REQUEST['cpid'] ;

$cnick = $_REQUEST['cnick'] ;

$pid_send = $cgid . $cpid ;
$_SESSION['pid_send'] = $pid_send;

?>

<div id="main">
    <div class="content">
        Message To <? echo $cgid . $cpid . "(" . $cnick . ")" ?>
        
        
 <?  if (isset($_SESSION['chatkey'][$pid_send])) {
	
	echo "<img src='images/OK.gif' border=0 height=12 weight=12> KEY";
	
}

?>
        

                
<form action="<? echo $site; ?>/apps/include/encrypt" method="post" accept-charset="utf-8" class="formValidation" >  
        
        <input name="cgid" type="hidden" value="<? echo $cgid ; ?>">    
        <input name="cpid" type="hidden" value="<? echo $cpid ; ?>">     
        <input name="cnick" type="hidden" value="<? echo $cnick ; ?>">  
        <input name="message_old" type="hidden" value="<? echo $_SESSION['decrypted'] ; ?>">  
 
<? // unset($_SESSION['decrypted']); ?>
 
 
<textarea class="validate[required]" name="message" /></textarea>
<br>

<?


if (isset($_SESSION['chatkey'][$pid_send])) {
	
	//echo "<img src='images/OK.gif' border=0 height=12 weight=12> KEY STORED !<br><br>";
	
}

else { 
?>


<input type="password" class="validate[required]" name="key"  placeholder="*** KEY  REQUIRED ***"  maxlength="25" />
<br>


<? } ?>


  
 <input type="submit" onclick="showadve()" value="SEND" id="SEND"/> 
 
 <? echo $_SESSION['decrypted'] ?>
 <br>

  <input name = "CANCEL"  type="submit" onclick="showadve()" value="CANCEL" id="CANCEL" />

        </form>    
        
        
        
        </div>
</div>	




</div>	
</div>


<div class="footer">
   <?
 
 include('menu.php');   
 
 ?>
</div>

</div>
    
    
    
    
    
    
	</body>

</html>

