const titleElement = document.getElementById("title");

const titles = {
  "/balances": "Balances",
  "/receive": "Receive cryptos",
  "/payout": "Send"
}

const createTitle = (payload) => {
  const { pathName, queryParams } = payload;
  switch (pathName) {
    case "/payout": {
      return `${titles[pathName]} ${queryParams.crypto ?? "cryptos"}`;
    }
    default: {
      return titles[pathName] ?? "NO_TITLE";
    }
  }
}

const eventListener = window.addEventListener("message", async(event) => {
  const { data: { type, payload } } = event;
  console.log(titleElement)
  switch (type) {
    case "LOCATION_CHANGE": {
      const { pathName } = payload;
      console.log("pathName", pathName)
      titleElement.innerText = createTitle(payload);
      break;
    }
  }
})
