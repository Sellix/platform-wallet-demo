
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

const walletUrl = getWalletUrl("production")

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
    console.log(res.data)
    const app = document.querySelector('#app')

    const qs = new URLSearchParams({
      token,
      platform_id: encodeURIComponent("platform-demo"),
      setup_finish_link: "http://localhost:9998/login.html"
    })

    app.innerHTML = `
      <iframe
        src="${walletUrl}/setup?${qs.toString()}"
        width="580px"
        height="605px"
        sandbox="allow-scripts allow-same-origin allow-downloads allow-popups allow-top-navigation"
        allow=""
        referrerpolicy="unsafe-url"
      >
      </iframe>

    `
  }

}

const loginButton = document.querySelector('#login_button')
const login = async() => {
  const email = document.querySelector('#login_email').value;

  const res = await a.post("/getMerchantDashboard", {
    email
  })

  if (res.status !== 200) {
    throw new Error(res.data)
  } else {
    const form = document.querySelector('#login_form')
    form.className = "hidden"
    const { token } = res.data
    console.log(res.data)
    const app = document.querySelector('#app')

    const qs = new URLSearchParams({
      token,
      platform_id: encodeURIComponent("platform-demo"),
      redirect_uri: "http://localhost:9998/complete-concordium-setup.html",
      setup_finish_link: "http://localhost:9998/login.html"
    })

    app.innerHTML = `
      <iframe
        src="${walletUrl}/balances?${qs.toString()}"
        width="780px"
        height="605px"
        sandbox="allow-forms allow-scripts allow-same-origin allow-downloads allow-popups allow-top-navigation"
        allow=""
        referrerpolicy="no-referrer"
      >
      </iframe>
    `
  }
}


const ccdButton = document.querySelector('#ccd_button')
const ccd = async() => {
  const email = document.querySelector('#ccd_email').value;

  const res = await a.post("/getMerchantDashboard", {
    email
  })

  if (res.status !== 200) {
    throw new Error(res.data)
  } else {
    const form = document.querySelector('#ccd_form')
    form.className = "hidden"
    const { token } = res.data
    console.log(res.data)
    const app = document.querySelector('#app')

    const qs = new URLSearchParams({
      token,
      platform_id: encodeURIComponent("platform-demo"),
      url: encodeURIComponent(window.location.toString().split("#")[1]),
      setup_finish_link: "http://localhost:9998/login.html"
    })


    app.innerHTML = `
      <iframe
        src="${walletUrl}/complete-concordium-setup?${qs.toString()}"
        width="780px"
        height="605px"
        sandbox="allow-forms allow-scripts allow-same-origin allow-downloads allow-popups allow-top-navigation"
        allow=""
        referrerpolicy="no-referrer"
      >
      </iframe>
    `
  }
}



signupButton?.addEventListener("click", signUp)
loginButton?.addEventListener("click", login)
ccdButton?.addEventListener("click", ccd)


