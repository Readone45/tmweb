var pesan = document.querySelector('#pesan');
var loading = document.querySelector('#loading');
var container = document.querySelector('#container-view');
var divlogin = document.querySelector('#login-container');
var btnlogout = document.querySelector('#btn-logout');
var email = document.querySelector('#email');
var pass = document.querySelector('#password');


// check user is Signed or not
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    divlogin.style.display = "none";
    btnlogout.style.display = "block";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      showPesan("Sekarang Anda Login. Dengan Email : "+email_id);

    }

  } else {
    // No user is signed in.
    divlogin.style.display = "block";
    btnlogout.style.display = "none";

    showPesan("Silakan Login Dulu Guys");
  }
  stopLoading();
});

//function login()
function login(){
	var emailUser = email.value;
	var passUser = pass.value;

	if(emailUser === ''){
		showPesan("Silakan Isi Email Dulu");	
	}else{
		if(passUser === ''){
			showPesan("Silakan Isi Password Dulu");
		}else{
			firebase.auth().signInWithEmailAndPassword(emailUser, passUser).catch(function(error) {
			    // Handle Errors here.
			    var errorCode = error.code;
			    var errorMessage = error.message;

			    showPesan(errorMessage);

			    // ...
			 });
		}		
	}
}

//firebase logout
function logout(){
  firebase.auth().signOut();
}


function showPesan(text){
	pesan.innerHTML = text;
}

function stopLoading(){
	loading.style.display = "none";
	container.style.display = "block";
}


