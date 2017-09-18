const checkboxes = document.querySelectorAll(`input[type="checkbox"]`);
let lastClickedCheckbox
function handleCheck(e) {
    let inBetween = false;
    if (e.shiftKey && this.checked){
        checkboxes.forEach(checkbox => {
            if (checkbox === this || checkbox === lastClickedCheckbox){
                inBetween = ! inBetween;
            }
            if (inBetween) {
                checkbox.checked = true;
            }
        });
    }
    if(this.checked === true)
    lastClickedCheckbox = this;
}
checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));