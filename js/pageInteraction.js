/* Ensure number input in menu field */
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)){
      return false;
    }
    return true;
    }
  /* Toggle sections */
function toggleSection(btnCall,idTag) {
    let elmt = document.getElementById(idTag);
    if (elmt.style.display === "none") {
      elmt.style.display = "block";
      btnCall.innerHTML = "<i class=\"fa-solid fa-chevron-up\"></i>";
    } else {
      elmt.style.display = "none";
      btnCall.innerHTML = "<i class=\"fa-solid fa-chevron-down\"></i>"
    }
}

