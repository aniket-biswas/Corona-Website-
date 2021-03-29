 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyBWAA14zxznRlhap3YjbyImvk5dk3GmZ7M",
    authDomain: "corona-website-e74b4.firebaseapp.com",
    databaseURL: "https://corona-website-e74b4-default-rtdb.firebaseio.com",
    projectId: "corona-website-e74b4",
    storageBucket: "corona-website-e74b4.appspot.com",
    messagingSenderId: "914658885836",
    appId: "1:914658885836:web:1eaa18660972b664c18269"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var UserInputsRef = firebase.database().ref("UserInputs");
document.getElementById("testForm").addEventListener("submit", submitForm);

function submitForm(e) {
	e.preventDefault();
	var fname = getValue("firstname");
	var lname = getValue("lastname");
	var mobile = getValue("mobile");
	var profession = getValue("profession");
	var email = getValue("email");
	var emailStatus = checkEmail(email); //true / false
	var dateofBirth = getValue("dateofbirth");
	var state = getValue("state");
	state = state.toLowerCase();
	readState(state);
	var selectedOption = document.querySelector("input[name=option]:checked")
		.value;
	var symptoms = getCheckboxValue("symptoms");

	if (emailStatus) {
		saveData(
			fname + " " + lname,
			mobile,
			profession,
			email,
			dateofBirth,
			state,
			selectedOption,
			symptoms
		);
	}
}

function getValue(id) {
	return document.getElementById(id).value;
}
function checkEmail(email) {
	if (
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
			email
		)
	) {
		return true;
	}
	alert("You have entered an invalid email address!");
	return false;
}

function getCheckboxValue() {
	var checkboxes = document.querySelectorAll("input[name=symptoms]:checked");
	let values = [];
	checkboxes.forEach((item) => {
		values.push(item.value);
	});
	return values;
}

function readState(state) {
	var centers;
	var ref = firebase.database().ref(state);
	ref.on("value", (data) => {
		centers = data.val();
		document.getElementById("result").innerHTML = "<br>" + centers.toUpperCase();
	});
}

function saveData(
	name,
	mobile,
	profession,
	email,
	dateofBirth,
	state,
	selectedOption,
	symptoms
) {
	var newUserInputsRef = UserInputsRef.push();
	newUserInputsRef.set({
		name: name,
		mobile: mobile,
		profession: profession,
		email: email,
		dateofBirth: dateofBirth,
		state: state,
		travel: selectedOption,
		symptoms: symptoms
	});
	alert("Thank you, Find the list of centers below");
}
