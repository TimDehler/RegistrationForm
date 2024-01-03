const showPassword = (element) => {
  const passwordInput = document.getElementById(element);
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
};

const setErrorMessage = (errorMessage) => {
  const errorP = document.getElementById("error");

  if (errorMessage !== "") {
    errorP.classList.remove("hidden");
    errorP.textContent = errorMessage;
  } else {
    errorP.classList.add("hidden");
  }
};

const toggleInfo = (event) => {
  const infoContainerID = `${event.target.id}-info`;
  const infoContainer = document.getElementById(infoContainerID);
  infoContainer.classList.toggle("hidden");
};

const submitForm = (event) => {
  event.preventDefault();

  if (!validiereVorUndZuName()) {
    setErrorMessage("Vor- oder Zuname sind nicht valide");
    return;
  }

  if (!validiereEmail()) {
    setErrorMessage("Email ist nicht valide");
    return;
  }

  if (!validiereTelefonNummer()) {
    setErrorMessage("Telefonnummer ist nicht valide");
    return;
  }

  if (!validierePasswort()) {
    setErrorMessage("Password ist nicht valide");
    return;
  }

  if (!validiereWiederholtesPasswort()) {
    setErrorMessage(
      "Das wiederholte Password stimmt nicht mit dem ursprünglichen Passwort überein"
    );
    return;
  }

  if (!validiereAGB()) {
    setErrorMessage("Die AGBs müssen akzeptiert werden");
    return;
  }
  setErrorMessage("");

  console.info("Submitted");
};

const validiereVorUndZuName = () => {
  const vorname = document.getElementById("vorname");
  const nachname = document.getElementById("nachname");

  const checkNameLength = (name) => {
    return name.length >= 3 && name.length <= 20;
  };

  return checkNameLength(vorname.value) && checkNameLength(nachname.value);
};

const validiereEmail = () => {
  const email = document.getElementById("email").value;

  const hasAt = email.includes("@");
  const endsWith = email.endsWith(".com") || email.endsWith(".de");

  return hasAt && endsWith;
};

const validiereTelefonNummer = () => {
  const telefon = document.getElementById("telefon").value;
  return telefon.length === 15;
};

const validierePasswort = () => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*0-9]).{8,}$/;
  const passwort = document.getElementById("passwort").value;
  const vorname = document.getElementById("vorname").value;
  const nachname = document.getElementById("nachname").value;
  return (
    passwordRegex.test(passwort) &&
    !passwort.includes(vorname) &&
    !passwort.includes(nachname)
  );
};

const validiereWiederholtesPasswort = () => {
  const passwort = document.getElementById("passwort").value;
  const wpasswort = document.getElementById("w-passwort").value;
  return passwort === wpasswort;
};

const validiereAGB = () => {
  const agbCheckbox = document.getElementById("agb");
  return agbCheckbox.checked;
};
