<!DOCTYPE html>
<html lang="en"> 
<head> 
<title>chainz</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Chainz communotary posting video" />
<link rel="stylesheet" type="text/css" href="css/style.css" media="screen" />
<link rel="stylesheet" type="text/css" href="css/ddd9b74.css" media="screen" />
<link rel="stylesheet" type="text/css" href="css/e25a9c0.css" media="screen" />
<link rel="stylesheet" type="text/css" href="css/bootstrap.css" media="screen" />

</head>
<body>
<!-- Google analytics -->
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-56743223-1', 'auto');
ga('send', 'pageview');
</script>


<div id="wrapper">
	<div id="header">
		<img class="imgTop backround-image-bottom" src="images/backround-site.jpg"  alt="logo" />
		<div class="clearfix">
			<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
				<div class="navbar-bg">
				<div class="container">
					<div class="navbar-header">
					  <h1><a class="navbar-brand" href="index.php"><img src="images/logo.png"  alt="logo" /></a></h1>
					</div>
					<div class="navbar-collapse">
					  <ul class="nav navbar-nav">
						<li class="active"><a href="index.php">Home</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
						<li><a href="#comment-ca-marche">Comment ça marche</a>&nbsp;&nbsp;&nbsp;</li>
						<li><a href="#lequipe">L’équipe</a></li>
						<li><a href="#contacter">Nous contacter</a></li>
						<li class="monCompte hidden"><a href="acount.html">Mon Compte</a></li>
					  </ul>
					</div><!--/.navbar-collapse -->
				</div>
				</div>
			</div>
		</div>
	</div>
</div>
		<section class="login-box" id="content">
        <div class="block">
            <div class="inner width-2">
                <div class="box-login">
                    <div class="head">
                        <h2 class="heading-title">Connectez vous</h2>
                        <p align="center"><em>Avec votre compte facebook</em></p>
                    </div>
                    <div class="socialconnect">
                    	<div id="fb-root"></div>
                    	<div class="fb-login-button" data-max-rows="1" data-size="xlarge" data-show-faces="false" data-auto-logout-link="true"></div>
						<div id="status"></div>
                    </div>
				
                </div>
            </div>
        </div>

    </section>
	</div><!-- #header -->
	<div id="main">
		<div class="content" id="comment-ca-marche">
			<div class="container">
				<h2><span>Comment ça marche ?</span></h2>
				<div class="row top-height">
					<div class="col-lg-6">
						<img src="images/big-img.png"  alt="" />
					</div>
					<div class="marche-box col-lg-6">
						<ul>
							<li><h3>Mobiles</h3></li>
							<li><a href="">- Créer tes chaines</a></li>
							<li><a href="">- Participe au chaines près de toi</a></li>
						</ul>
						<ul>
							<li><h3>Ordinateurs</h3></li>
							<li><a href="">- Regarde toutes les chaines terminées</a></li>
						</ul>
					</div>
				</div>	
				<div class="row top-height ">
					<div class="mobils-box col-lg-4">
						<img src="images/mobils-img.png"  alt="" />
						<a href="#"><img src="images/play-icon.png"  alt="" /></a>
						<p>Prendre une video perso ou suivant un thème</p>
					</div>
					<div class="mobils-box col-lg-4">
						<img src="images/mobils-img.png"  alt="" />
						<a href="#"><img src="images/share-icon.png"  alt="" /></a>
						<p>Participez aux événements de la communauté, eux aux votres</p>
					</div>
					<div class="mobils-box col-lg-4">
						<img class="desktop-icon" src="images/desktop-img.png"  alt="" />
						<a href="#"><img src="images/look_video-icon.png"  alt="" /></a>
						<p>Regardez le résulat quand la chaine est finie ! </p>
					</div>
				</div>
			</div>
		</div>
			<div class="content" id="lequipe">
				<div class="container">
				<h2><span>L’équipe</span></h2>
				<div class="row">
					<div class="lequipe-box col-lg-12">
						<ul>
							<li>Thibaut<img src="images/round-img.png"  alt="" /></li>
							<li>Jean-Yves<img src="images/round-img.png"  alt="" /></li>
							<li>Alexandre<img src="images/round-img.png"  alt="" /></li>
							<li>Jean-Christophe<img src="images/round-img.png"  alt="" /></li>
							<li>Alexis<img src="images/round-img.png"  alt="" /></li>
						</ul>
					</div>
				</div>	
			</div>
		</div>	
		<div id="contacter" >
				<div class="container">
				<h2><span>Nous contacter</span></h2>
				<div class="contact">
					<div class="row">
					<?php 
									$error_contactus = false;
									if (!empty($_POST) && isset($_POST['location']) && $_POST['location']=="contactus") {
									$fields=array(
										"votre_prenom",
										"votre_mail",
										"votre_message_ici"					
									);

									$required = array(
										"votre_prenom",
										"votre_mail",
										"votre_message_ici"	
									);

					$error_message = "";
					foreach ($required as $element) {
						if (!isset($_POST[$element]) || $_POST[$element]=="") {
							$error_contactus = true;
							$error_message .= "Please fill in your <b>".ucwords(str_replace("_"," ",$element))."</b>.<br />";
						}
					}

					if (!$error_contactus) {
					$email_message="";
					foreach ($fields as $element) {
						if (isset($_POST[$element]) && $_POST[$element]!="") {
							$email_message .= "<b>".ucwords(str_replace("_"," ",$element)).":</b> ".$_POST[$element]."<br />";
							if ($element=="email_address") $email_message .= "<br />";
						}
					}
					$email_message.="</body></html>";
					$to = "info@example.com";
					$from = "chainz";
					$headers  = 'MIME-Version: 1.0' . "\n";
					$headers .= 'Content-type: text/html; charset=\"iso-8859-1\"' . "\n";
					// Additional headers
					$headers .= 'From: '.$from . "\n";
					$subject = "Contact Trinity Beach Holiday Rental";
					mail($to,$subject,$email_message,$headers, "-f".$from);
					}
					}

					?>

					<?php if (!isset($_POST) || empty($_POST) || $error_contactus) { ?>
						<form id="contactForm" action="http://<?php echo $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"]; ?>" method="post">
					<?php if ($error_contactus) { ?>
						<div class="contact-error"><label class="errors"><?php echo $error_message; ?></label></div>
					<?php } ?>
						<div class="col-lg-6">
							  <div class="form-group">
							<input type="text" class="form-control" name="votre_prenom" placeholder="Votre prénom" value=""/>
							</div>
						</div>
						<div class="col-lg-6">
							<div class="form-group">
								<input type="email" class="form-control" id="email" name="votre_mail" placeholder="Votre mail" value=""/>
							</div>
						</div>
						<div class="col-lg-12">
							<div class="form-group textarea-group">
								<textarea class="form-control" col="2" rows="0" placeholder="Votre message ici" name="votre_message_ici"></textarea>
								
								 
							</div> 
							<input type="submit" class="btn btn-default submit" value="Submit"/>
								 <input type="hidden" name="location" value="contactus"/>
						</div>
						</form>
							<?php } else  { ?>
								<p class="thank_you"><strong>Merci</strong> pour <strong>l'intérêt</strong> que vous portez à notre application Chainz!&nbsp; <strong>Nous vous contacterons dans les plus brefs délais</strong> </p>
							<?php } ?>
					</div>
				</div>	
			</div>
		</div>
	</div><!-- #main -->
	<div id="footer">
		
	</div><!-- #footer -->
</div><!-- #wrapper -->

<script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="js/jquery.validate.js"></script>
<script type="text/javascript" src="js/fbConnect.js"></script>



</body>
</html>