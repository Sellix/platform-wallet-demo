
import axios from "axios"

const a = axios.create({
  baseURL: "http://localhost:9999"
})

const getWalletUrl = (target = "local") => {
  if (target === "local") {
    return "http://localhost:5173"
  } else if (target === "staging") {
    return "https://wallet.sellix-staging.io"
  } else if (target === "production") {
    return "https://wallet.sellix.io"
  }
}

const walletUrl = getWalletUrl("local")

const signupButton = document.querySelector('#signup_button')
const signUp = async() => {
  const email = document.querySelector('#signup_email').value;
  const name = document.querySelector('#signup_name').value;

  const res = await a.post("/createMerchant", {
    email,
    name
  })

  if (res.status !== 200) {
    throw new Error(res.data)
  } else {
    const form = document.querySelector('#signup_form')
    form.className = "hidden"
    const { token } = res.data
    const app = document.querySelector('#app')
    app.innerHTML = `
      <iframe
        src="${walletUrl}/setup?token=${token}"
        width="100%"
        height="605px"
        class="border border-black border-dashed"
        sandbox="allow-scripts allow-same-origin allow-downloads allow-popups"
        allow=""
        referrerpolicy="no-referrer"
      >
      </iframe>

    `
  }

}


signupButton.addEventListener("click", signUp)
