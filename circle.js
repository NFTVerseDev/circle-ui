
class CircleUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      circle_ui: null,
      cardList:[],
      keyId: 'key1',
      public_key : 'LS0tLS1CRUdJTiBQR1AgUFVCTElDIEtFWSBCTE9DSy0tLS0tCgptUUVOQkY0YzhWZ0JDQUM4QnN6WElCTytiZDZ4VnhLMUdlc3hLK2sybnlpamZ0NDdWa2xnbU80VmpTSmMzQS8yCkljeDNyWFR3S0ZIV282ckJBVUduSVhoK2ZYKzIwZGYwbld6WlNvN3ZNK0ZpMTMzVlpuTG0zalk4cVozdnR5WEMKenhqZnJ5UnlDSncrMlh6cnRGVklYT0RLSEd0RjhUSXZFNUdjdVMxclNmMGlsVUtzOWxUdXlOTEx1bXZJQ2RTeQpCMWQ3MUVCM3VDMUJpekRtaWplMHNFbjB0QXBGS3V0ZnB5aWtsbTZwWm9zWnVnYVUzL1Z3NWNkQTU5VlhHWnFpCjNTWGdzeHU1RE4zc21TU3ZVVkthMUtQd3hackZRZHQ2a3lOVUFuR0lRS3d4b3BjejAyY255R3JvZEdGU3c5TC8KbzlmeHo3Q3FpcnJvL3F6VjJzQmxFMkRvZWVLY09ZVTlzVHRCQUJFQkFBRzBCa05wY21Oc1pZa0JWQVFUQVFnQQpQaFloQlBTc3RXN3o4TkgrWVQ1MGE3S1dkbkdNTUlYQUJRSmVIUEZZQWhzREJRazRaQWtBQlFzSkNBY0NCaFVLCkNRZ0xBZ1FXQWdNQkFoNEJBaGVBQUFvSkVMS1dkbkdNTUlYQXhSQUgvM2xVL1hJbEkrZG5PR2pGRHJCTHMzcUYKN1grV0xsSU5YRmlaNWFuRC9ySnRUbGptb2R2dkhSSmlJTm1GcTRrNi90MURqcTJsdWpXTTFIUmJIaUtxTE56dQovWVJNNG5aL1lGUUd2YktqY3dNWHJDZ1Y1UFNESjZJdTE3MW4vdFFrYXFmRzd0M2ZXQzQzek10VFM4YnV6ZEtGCkQ1ai9yd0VkUjhhOXlsc0luWDdPZXlqekpUeENjQm1udmE1LzhZRFF4NFd4bk1WQWJ4ZnRRSjJzUXNJa0pNQ2MKV1d0TVZwZWlSSExlbWg1cnNhWnBnSkZ5cW1QODJXaDd0aGRkWHd3eVFGcHVUc2x6b1VKMmJaakZyMUxDSjBxRQp3MVJBOFVHaWhPUFB2SVprc2RvdFVDVDhoeXJPYU9GbUtDVUhhV0FQYzRDT3NzdVJpMU5VSGpJUVA0bVUyU0M1CkFRMEVYaHp4V0FFSUFMZFhXTUJaODlQZHFrSVRPWWZlL1pZZko4c2Nudk1PdlovQW1Vb3JpakM4M1VMdjVLbWsKSGpjVXJTR0pFYkpOdDl2NWVpc2RGOFRDNzVwZmhBLzZiOHZCUTVoMU0yT0FoUklYZGlJY1hLaTJyTXhINU9jWQo2YWFkWlVIRFIrYUZWRmtWdm53UnkxVFRDOFNleWs5UDRtd2lrTzl2RGlpMmU1SFl0R1pQcUVEWXVRN05pQnM2CktMRWpHclMwWFpieHg4WVk5enRRTUZKc2ZjdXRJd2lvTy9HcU1ZMFRKdkI0QnVJWTh2TjhPTnVubHZjb2JBYS8KcVRpYVFUcE93T3g2eElPbHB0TkFST1pncUNPZEk2R2NqMjRZRmcycEV4d0h0SjBXOFJpRDBpNEJJU0tEYkZEVAovWmlkMkptZW9vdG0vZXpaNUlDSUZNNk1wOEhDTjB6eWFSMEFFUUVBQVlrQlBBUVlBUWdBSmhZaEJQU3N0Vzd6CjhOSCtZVDUwYTdLV2RuR01NSVhBQlFKZUhQRllBaHNNQlFrNFpBa0FBQW9KRUxLV2RuR01NSVhBdmVJSC9BM1IKOTdlSENUOHdlOUFDUXkxcDJmNk41UFd6QWRaTUtQNm9QTXhpNFlCVUoyK1orNDVibnB2a0ZSdllMVjNwVFRIRApEY0N5cWh4Z0cxdEVGaVUyclZINlFzRStnWldYZkJPZU1lWHhqRkt0U0lzNktQUWViVlMrUHJhOHljK3RPakxOCkZsNlFCRjNGcGJ3YmE5L1pPbk1rbW9yTE1IV241RnJOVy9aZnVLdzhTMHFGQ29nUVNxUUVpbjZnQ0ZEd0gzK0QKQ2JzcDVKMm4xN1pncjBpcGRRYjk4MDJ1bXdDVG9aVGtwL0pwb2t4YzJTZlczaG0xUEc4M1NPUGdMUll0a3JuTApRbURYSmtDdEN6amN3eGQwdnJpVzM4Y29zQko1aVN4WHU5MEZHRWZaaGQ1Y0o4cFpKSkd2VGMrMyt6eE1sWU1HCnZmUjNvUFFoWmtwT2NyRUhlajA9Cj1BT0QzCi0tLS0tRU5EIFBHUCBQVUJMSUMgS0VZIEJMT0NLLS0tLS0K',
      card_number: null,
      card_holder_name: null,
      cvv:null,
      cardDetails:{},
    };
    this.saveUserCard = this.saveUserCard.bind(this);
    this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
    this.handlecardHolderNameChange = this.handlecardHolderNameChange.bind(this)
    this.handleCvvChange = this.handleCvvChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handleAddressLine1Change = this.handleAddressLine1Change.bind(this)
    this.handleAddressLine2Change = this.handleAddressLine2Change.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
    this.handlePostalCodeChange = this.handlePostalCodeChange.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleDistrictChange = this.handleDistrictChange.bind(this)
    this.handleCountryChange = this.handleCountryChange.bind(this)
    this.handleMonthChange = this.handleMonthChange.bind(this)
    this.handleYearChange = this.handleYearChange.bind(this)
    this.addNewCard = this.addNewCard.bind(this)
    this.useSavedCard = this.useSavedCard.bind(this)
    this.create_UUID = this.create_UUID.bind(this)
    this.saveOrMakePayment = this.saveOrMakePayment.bind(this)
    this.makePayment = this.makePayment.bind(this)
    this.setCardDetailsInState = this.setCardDetailsInState.bind(this)
  }
  addNewCard(){
    console.log("click")
    this.state.circle_ui = true
    console.log(this.state.circle_ui)
    this.render()
    // ReactDOM.render(
    //     <CircleUI />,
    //     document.getElementById('circle_ui')
    // );
  }
  useSavedCard(e){
    console.log(this.state.cardDetailsList)
    const card_id = e.currentTarget.getAttribute("data-value1")
    this.state.cardDetailsList.forEach((item,index)=>{
      if(item.cardId === card_id){
        this.state.cardDetails = item
      }
    })
    this.state.circle_ui = true
    this.state.cardDetails.cardNumber = '**** **** **** '+ this.state.cardDetails.last4
    this.setCardDetailsInState(this.state.cardDetails)
    console.log(this.state.cardDetails)
    this.render()
    // ReactDOM.render(
    //     <CircleUI />,
    //     document.getElementById('circle_ui')
    // );
  }
  setCardDetailsInState(cardDetails){
    this.state.expMonth = cardDetails.expMonth
    this.state.expYear = cardDetails.expYear
    this.state.email = cardDetails.email
    this.state.phone = cardDetails.phoneNumber
    this.state.postalCode = cardDetails.postalCode
    this.state.city = cardDetails.city
    this.state.district = cardDetails.district
    this.state.country = cardDetails.country
    this.state.address_line1 = cardDetails.line1
    this.state.address_line2 = cardDetails.line2
    this.state.card_holder_name = cardDetails.name
    this.state.description = cardDetails.description
  }
  handleMonthChange(e){
    this.state.expMonth = e.target.value
  }
  handleYearChange(e){
    this.state.expYear =e.target.value
  }
  handleEmailChange(e){
    this.state.email = e.target.value
  }

  handlePhoneChange(e){
    this.state.phone = e.target.value
  }

  handlePostalCodeChange(e){
    this.state.postalCode = e.target.value
  }

  handleCityChange(e){
    this.state.city = e.target.value
  }

  handleDistrictChange(e){
    this.state.district = e.target.value
  }
  handleCountryChange(e){
    this.state.country = e.target.value
  }
  handleAddressLine1Change(e){
    this.state.address_line1 = e.target.value
  }
  handleAddressLine2Change(e){
    this.state.address_line2 = e.target.value
  }
  handleCvvChange(e) {
    this.state.cvv = e.target.value
  }

  handleCardNumberChange(e) {
    this.state.card_number = e.target.value
  }
  handlecardHolderNameChange(e){
    this.state.card_holder_name = e.target.value
  }
  handleDescriptionChange(e){
    this.state.description = e.target.value
  }

  create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

  async encryptCardDetails(dataToEncrypt) {
    console.log(dataToEncrypt)
    console.log(this.state.public_key)
    var keyId = this.state.keyId
   const decodedPublicKey = await openpgp.readKey({armoredKey: atob(this.state.public_key)})
   const message = await openpgp.createMessage({text: JSON.stringify(dataToEncrypt)})
   return openpgp.encrypt({
     message,
     encryptionKeys: decodedPublicKey,
   }).then((ciphertext) => {
     console.log(btoa(ciphertext))
     return {
       encryptedMessage: btoa(ciphertext),
       keyId,
     }
   })
 }

  saveOrMakePayment(){
    if(this.state.cardDetails.cardId){
      console.log("make payment")
      this.makePayment()

    } else {
      console.log("save card")
      this.saveUserCard()
    }
  }
  makePayment(){
    let paymentPayload = {
      "idempotencyKey": this.create_UUID(),
      "source": {
        "id": this.state.cardDetails.cardId,
        "type": "card"
      },
      "description": this.state.description,
      "channel": null,
      "metadata": {
        "email": this.state.email,
        "phoneNumber": this.state.phoneNumber,
        "sessionId": this.create_UUID()
      },
      "autoCapture": true,
      "verification": "cvv",
      "encryptedData": this.state.cardDetails.encryptedData,
      "keyId": "key1"
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'JRX-USER-AUTH-TOKEN':'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqd3RVc2VyIjoie1wiYXBwSWRcIjpcIm9uam95cmlkZS5zb2xpdGFpcmVcIixcInVzZXJJZFwiOlwiOTIwNTljMmItODQ5NS00MjM0LThlYjQtMDE3ZjdjNDI2NTI1XCJ9IiwiaXNzIjoiYXV0aDAiLCJleHAiOjE2NDg1NDkxMDcsImlhdCI6MTYzMjk5NzEwN30.Tsbzp14PQUACEYQQKTQYA2fViQYDk_lr5zxzpeYlChW0t_H76yCSDUddwFfJkeqg6bOkZE8AEfUEl9HLwMvJBprE4rZAM1S4LW-fi6ZAfj203WrQVssnZD5pG5BldzrlfPd1jaP0stEnn7EQUejWyPhHm5EQVwNj1x_YjaKqXCYXDdQDIpUeG5CsTazW_u5F4sIUw3bwIOjxRT_kffAivs4XXIpwgNdGSeES2-sE1ZEIGMm4pz0P41npM5nKSAhP_cd13ebHVWufHk4K3t-B2bq_ECi2VqAJkJ3IFGnwgGpVUfJ6pYBRUw95OlaPmHKgEPjwNjcJRFNpyLohN3R7kA', 'JRX-APP-ID': 'onjoyride.solitaire' },
      body: JSON.stringify(paymentPayload)
    };
    console.log(JSON.stringify(paymentPayload))
    fetch('http://localhost:9006/wallet/circle/payment/create', requestOptions)
        .then(response => response.json())
        .then(
            (result) => {
              this.state.cardId = result
            },
            (error) => {
              console.log("error")
            }
        )
  }
  async getCardDetails(cardId){
    fetch("http://localhost:9006/wallet/circle/card/"+ cardId + "/details", {
      method: 'GET',
      headers: {
        'JRX-APP-ID': 'onjoyride.solitaire',
        'JRX-USER-AUTH-TOKEN':'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqd3RVc2VyIjoie1wiYXBwSWRcIjpcIm9uam95cmlkZS5zb2xpdGFpcmVcIixcInVzZXJJZFwiOlwiOTIwNTljMmItODQ5NS00MjM0LThlYjQtMDE3ZjdjNDI2NTI1XCJ9IiwiaXNzIjoiYXV0aDAiLCJleHAiOjE2NDg1NDkxMDcsImlhdCI6MTYzMjk5NzEwN30.Tsbzp14PQUACEYQQKTQYA2fViQYDk_lr5zxzpeYlChW0t_H76yCSDUddwFfJkeqg6bOkZE8AEfUEl9HLwMvJBprE4rZAM1S4LW-fi6ZAfj203WrQVssnZD5pG5BldzrlfPd1jaP0stEnn7EQUejWyPhHm5EQVwNj1x_YjaKqXCYXDdQDIpUeG5CsTazW_u5F4sIUw3bwIOjxRT_kffAivs4XXIpwgNdGSeES2-sE1ZEIGMm4pz0P41npM5nKSAhP_cd13ebHVWufHk4K3t-B2bq_ECi2VqAJkJ3IFGnwgGpVUfJ6pYBRUw95OlaPmHKgEPjwNjcJRFNpyLohN3R7kA',
        Accept: 'application/json'
      },})
        .then(res => res.json())
        .then(
            (result) => {
              console.log(result)
              this.state.cardEncryptedData = result.encryptedData
            },
            (error) => {

            }
        )
  }

  async saveUserCard(){
    console.log("Card Number: " + this.state.card_number);
    let card = {
      number: this.state.card_number.trim().replace(/\D/g, ''),
      cvv: this.state.cvv,
    }
    var encryptedCardData = await this.encryptCardDetails(card)
    console.log(encryptedCardData)
    let saveCardPayload = {
      encryptedData: encryptedCardData.encryptedMessage,
      keyId: this.state.keyId,
      idempotencyKey: this.create_UUID(),
      billingDetails: {
        name: this.state.card_holder_name,
        city: this.state.city,
        country: this.state.country,
        line1: this.state.address_line1,
        line2: this.state.address_line2,
        district: this.state.district,
        postalCode: this.state.postalCode
      },
      expMonth: parseInt(this.state.expMonth),
      expYear: parseInt(this.state.expYear),
      metadata:{
        email:this.state.email,
        phoneNumber: this.state.phone,
        sessionId: this.create_UUID()
      },
      description: this.state.description
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'JRX-USER-AUTH-TOKEN':'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqd3RVc2VyIjoie1wiYXBwSWRcIjpcIm9uam95cmlkZS5zb2xpdGFpcmVcIixcInVzZXJJZFwiOlwiOTIwNTljMmItODQ5NS00MjM0LThlYjQtMDE3ZjdjNDI2NTI1XCJ9IiwiaXNzIjoiYXV0aDAiLCJleHAiOjE2NDg1NDkxMDcsImlhdCI6MTYzMjk5NzEwN30.Tsbzp14PQUACEYQQKTQYA2fViQYDk_lr5zxzpeYlChW0t_H76yCSDUddwFfJkeqg6bOkZE8AEfUEl9HLwMvJBprE4rZAM1S4LW-fi6ZAfj203WrQVssnZD5pG5BldzrlfPd1jaP0stEnn7EQUejWyPhHm5EQVwNj1x_YjaKqXCYXDdQDIpUeG5CsTazW_u5F4sIUw3bwIOjxRT_kffAivs4XXIpwgNdGSeES2-sE1ZEIGMm4pz0P41npM5nKSAhP_cd13ebHVWufHk4K3t-B2bq_ECi2VqAJkJ3IFGnwgGpVUfJ6pYBRUw95OlaPmHKgEPjwNjcJRFNpyLohN3R7kA', 'JRX-APP-ID': 'onjoyride.solitaire' },
      body: JSON.stringify(saveCardPayload)
    };
    console.log(JSON.stringify(saveCardPayload))
    fetch('http://localhost:9006/wallet/circle/cards/save', requestOptions)
        .then(response => response.json())
        .then(
            (result) => {
              this.state.cardId = result
            },
            (error) => {
              console.log("error")
            }
        )
  }

  getpublicKey(){
    fetch("http://localhost:9006/wallet/circle/encryption/public/key", {
      method: 'GET',
          headers: {
            'JRX-APP-ID': 'onjoyride.solitaire',
            Accept: 'application/json'
        },})
        .then(res => res.json())
        .then(
            (result) => {
              this.state.keyId = result.data.keyId
              this.state.public_key = result.data.publicKey
              this.setState({
                isLoaded: true,
                items: result
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
        )
  }

  getUserCards(userId){
    fetch("http://localhost:9006/wallet/circle/user/"+userId+"/cards", {
      method: 'GET',
          headers: {
        'JRX-USER-AUTH-TOKEN':'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqd3RVc2VyIjoie1wiYXBwSWRcIjpcIm9uam95cmlkZS5zb2xpdGFpcmVcIixcInVzZXJJZFwiOlwiOTIwNTljMmItODQ5NS00MjM0LThlYjQtMDE3ZjdjNDI2NTI1XCJ9IiwiaXNzIjoiYXV0aDAiLCJleHAiOjE2NDg1NDkxMDcsImlhdCI6MTYzMjk5NzEwN30.Tsbzp14PQUACEYQQKTQYA2fViQYDk_lr5zxzpeYlChW0t_H76yCSDUddwFfJkeqg6bOkZE8AEfUEl9HLwMvJBprE4rZAM1S4LW-fi6ZAfj203WrQVssnZD5pG5BldzrlfPd1jaP0stEnn7EQUejWyPhHm5EQVwNj1x_YjaKqXCYXDdQDIpUeG5CsTazW_u5F4sIUw3bwIOjxRT_kffAivs4XXIpwgNdGSeES2-sE1ZEIGMm4pz0P41npM5nKSAhP_cd13ebHVWufHk4K3t-B2bq_ECi2VqAJkJ3IFGnwgGpVUfJ6pYBRUw95OlaPmHKgEPjwNjcJRFNpyLohN3R7kA',
        'JRX-APP-ID': 'onjoyride.solitaire',
            Accept: 'application/json'
      },})
        .then(res => res.json())
        .then(
            (result) => {
              console.log(result)
              if(result.length > 0) {
                this.state.circle_ui = false
                result.forEach((item,index)=>{
                  console.log(item)
                  var space_id_div = "space_" + item.cardId
                  var card_id_div = "card_" + item.cardId
                  var card_icon = './images/' + item.network + '.png'
                  this.state.cardList.push( <tr key={space_id_div}>
                        <td>&nbsp; </td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                  )
                  this.state.cardList.push( <tr className="card_rows" key={card_id_div} data-value1={item.cardId} onClick={this.useSavedCard}>
                    <td className="first_column row_padding"><img src={card_icon}  className="inline_img"/> &ensp; Visa Credit Card ending with {item.last4} </td>
                    <td className="second_column column_spacing">&nbsp;</td>
                    <td className="third_column">{item.expMonth}/{item.expYear}</td>
                    <td className="fourth_column column_spacing">&nbsp;<img src={'./images/dropdown.png'}  className="inline_img"/></td>
                  </tr>
                  )
                })
                this.state.cardDetailsList = result
              } else {
                this.state.circle_ui = true
                ReactDOM.render(
                    <CircleUI />,
                    document.getElementById('circle_ui')
                );
              }

            },
            (error) => {
              this.state.circle_ui = false
              ReactDOM.render(
                  <CircleUI />,
                  document.getElementById('circle_ui')
              );
            }
        )
  }

  render() {
    let circleUI = null;
    if(this.state.circle_ui === null){
      circleUI = <div className="mb-popup-backdrop" id="mbmodal1">
                  <div className="mb-popup-wrapper">
                    <div className="mb-popup-body mb-modal-body">
                      <div className="container">
                        <div className="loader">
                          <p className="heading">loading...</p>
                        </div>
                      </div>
                    </div>
                  </div>
      </div>
      return <div className="CircleUI">
        {circleUI}
      </div>;
    } else if (this.state.circle_ui === true) {
      circleUI = <div className="mb-popup-backdrop" id="mbmodal1">
                  <div className="mb-popup-wrapper">
                    <div className="mb-popup-body mb-modal-body">
                    <div className="container">
                  <div className="price">
                    <p className="heading">Pay with card</p>
                  </div>
                  <div className="card__container">
                    <div className="card">
                      <p className="heading"> </p>
                      <div className="row cardholder">
                        <div className="info">
                          <label htmlFor="amount">Amount</label><br />
                          <input placeholder="e.g. 7000" id="amount" type="text"/>
                          <input type="hidden" value={this.state.cardDetails.cardId}/>
                        </div>
                      </div>
                      <div className="row number">
                        <div className="info">
                          <label htmlFor="cardnumber">Card number</label><br />
                          <div className="fake-input">
                            <input type="text" id="cardnumber" pattern="[0-9]{16,19}" maxLength="19" placeholder="8888 8888 8888 8888" onChange={this.handleCardNumberChange} value={this.state.cardDetails.cardNumber}/>
                            <img src="./images/amex.png" className="amex_card" />
                            <img src="./images/mastercard.png" className="master_card"  />
                            <img src="./images/visa.png" className="visa_card" />
                          </div>
                        </div>
                      </div>
                      <div className="row details">
                        <div className="left">
                          <label htmlFor="expiry-date">Expiry</label><br />
                          <select id="expiry-date" onChange={this.handleMonthChange}>
                            <option>MM</option>
                            <option value="1">01</option>
                            <option value="2">02</option>
                            <option value="3">03</option>
                            <option value="4">04</option>
                            <option value="5">05</option>
                            <option value="6">06</option>
                            <option value="7">07</option>
                            <option value="8">08</option>
                            <option value="9">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                          </select>
                          <span>/</span>
                          <select id="expiry-date" onChange={this.handleYearChange}>
                            <option>YYYY</option>
                            <option value="2016">2016</option>
                            <option value="2017">2017</option>
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                          </select>
                        </div>
                        <div className="right">
                          <label htmlFor="cvv">CVV</label><br />
                          <input type="text" maxLength="4" placeholder="123" onChange={this.handleCvvChange}/>
                          <span data-balloon-length="medium" data-balloon="The 3 or 4-digit number on the back of your card."
                                data-balloon-pos="up">i</span>
                        </div>
                      </div>
                      <div className="row number">
                        <div className="info">
                          <label htmlFor="description">Description</label><br />
                          <input id="description" type="text" pattern="" maxLength="100"
                                 placeholder="NFT purchase" onChange={this.handleDescriptionChange}/>
                        </div>
                      </div>
                    </div>
                    <div className="card card_right">
                      <p className="heading">Billing Details</p>
                      <div className="row cardholder">
                        <div className="info">
                          <input placeholder="Cardholder name" id="cardholder" type="text" onChange={this.handlecardHolderNameChange} value={this.state.cardDetails.name}/><br />
                          <label htmlFor="cardholder" className="msg">This field is required</label>
                        </div>
                      </div>
                      <div className="row cardholder">
                        <div className="info">
                          <input placeholder="Addressline 1" id="addressline1" type="text" onChange={this.handleAddressLine1Change} value={this.state.cardDetails.line1}/><br />
                          <label htmlFor="addressline1" className="msg">This field is required</label>
                        </div>
                      </div>
                      <div className="row cardholder">
                        <div className="info">
                          <input placeholder="Addressline 2" id="addressline2" type="text" onChange={this.handleAddressLine2Change} value={this.state.cardDetails.line2}/><br />
                        </div>
                      </div>
                      <div className="row cardholder">
                        <div className="info">
                          <input placeholder="Postal Code" id="postalcode" type="text" onChange={this.handlePostalCodeChange} value={this.state.cardDetails.postalCode}/><br />
                          <label htmlFor="postalcode" className="msg">This field is required</label>
                        </div>
                      </div>
                      <div className="row cardholder">
                        <div className="info">
                          <input placeholder="city" id="city" type="text" onChange={this.handleCityChange} value={this.state.cardDetails.city}/><br />
                          <label htmlFor="city" className="msg">This field is required</label>
                        </div>
                      </div>
                      <div className="row cardholder">
                        <div className="info">
                          <input placeholder="District" id="district" type="text" onChange={this.handleDistrictChange} value={this.state.cardDetails.district}/><br />
                          <label htmlFor="district" className="msg">This field is required</label>
                        </div>
                      </div>
                      <div className="row cardholder">
                        <div className="info">
                          <input placeholder="Country" id="country" type="text" onChange={this.handleCountryChange} value={this.state.cardDetails.country}/><br />
                          <label htmlFor="country" className="msg">This field is required</label>
                        </div>
                      </div>
                      <div className="row cardholder">
                        <div className="info">
                          <input placeholder="Phone" id="phone" type="text" onChange={this.handlePhoneChange} value={this.state.cardDetails.phoneNumber}/><br />
                        </div>
                      </div>
                      <div className="row cardholder">
                        <div className="info">
                          <input placeholder="Email" id="email" type="text" onChange={this.handleEmailChange} value={this.state.cardDetails.email}/><br />
                          <label htmlFor="email" className="msg">This field is required</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="button">
                    <button type="submit" onClick={this.saveOrMakePayment}><i className="ion-locked"></i> Confirm and Pay</button>
                  </div>
                </div>
                    </div>
                  </div>
        </div>
      return <div className="CircleUI">
        {circleUI}
      </div>;
    } else {
      let circleSavedCardUI = null;
      circleSavedCardUI = <div className="mb-popup-backdrop" id="mbmodal1">
        <div className="mb-popup-wrapper">
          <div className="mb-popup-body mb-modal-body">
            <div className="container">
              <div className="price">
                <p className="heading">Pay with card</p>
              </div>
              <div className="card__container">
                <div className="saved_card">
                  <div className="row savedcardholder">
                    <div className="info">
                      <label htmlFor="amount">Amount</label><br/>
                      <input placeholder="e.g. 7000" id="amount" type="text"/>
                    </div>
                  </div>

                  <div className="row savedcardholder">
                    <div className="card_info">
                      <table className="table_cls">
                        <tbody>
                        <tr className="card_info">
                          <th className="first_column row_padding">Your saved credit and debit cards</th>
                          <th className="second_column column_spacing">&nbsp;</th>
                          <th className="third_column">Expires</th>
                        </tr>
                        {this.state.cardList}
                        <tr className="card_info">
                          <td className="first_column row_padding">&nbsp;</td>
                          <td className="second_column column_spacing">&nbsp;</td>
                          <td className="third_column">&nbsp;</td>
                        </tr>
                        <tr className="card_info">
                          <td className="first_column row_padding">
                            <div className="button ">
                              <button className="add_card" type="submit" onClick={this.addNewCard}><i className="ion-locked"></i> Add a credit or debit card
                              </button>
                            </div>
                          </td>
                          <td className="second_column column_spacing">&nbsp;</td>
                          <td className="third_column">&nbsp;</td>
                        </tr>

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      return <div className="CircleUI">
        {circleSavedCardUI}
      </div>;
    }
  }
  componentDidMount(){
    this.getpublicKey()
    var userId = "92059c2b-8495-4234-8eb4-017f7c426525"
    this.getUserCards(userId);

  }
}
ReactDOM.render(
    <CircleUI />,
    document.getElementById('circle_ui')
);
