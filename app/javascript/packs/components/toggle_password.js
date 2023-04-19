document.addEventListener("turbo:load", () => {
  const passwordInput = document.getElementById('password_signin');
  const togglePasswordSignin = document.getElementById('toggle-password-signin');
  const togglePasswordSignup = document.getElementById('toggle-password-signup');
  const passwordSignup = document.getElementById('password_signup')
  const passwordConfirmation = document.getElementById('password_confirmation')

  if (togglePasswordSignin) togglePasswordSignin.addEventListener("click", togglePasswordSigninVisibility)
  function togglePasswordSigninVisibility() {
    if (togglePasswordSignin.checked) {
      passwordInput.type = "text"
    } else {
      passwordInput.type = "password"
    }
  }

  if (togglePasswordSignup) togglePasswordSignup.addEventListener("click", togglePasswordSignupVisibility)
  function togglePasswordSignupVisibility() {
    if (togglePasswordSignup.checked) {
      passwordSignup.type = "text"
      passwordConfirmation.type = "text"
    } else {
      passwordSignup.type = "password"
      passwordConfirmation.type = "password"
    }
  }
})
