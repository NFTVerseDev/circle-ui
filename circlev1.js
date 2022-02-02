var BASE_URL = "http://localhost:9006/wallet/circle"
var BASE_IMG_URL = "https://facthunt-test.s3.ap-south-1.amazonaws.com/images"
var savedCardList = []
var publicKey = ''
var keyId = ''
var activecardDetails = {}
var cardNumber = ''


window.addEventListener('load', function() {
    console.log("on load event fire")
    var userId = "92059c2b-8495-4234-8eb4-017f7c426525"
    getSavedCreditCards(userId)
    getpublicKey()
})

document.getElementById("circle_pay_button").addEventListener("click", openCircleUI);

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}


async function getSavedCreditCards(userId){
    console.log("loading saved cards");
    fetch(BASE_URL + "/user/"+userId+"/cards",{
        method: 'GET',
        headers: {
            'JRX-USER-AUTH-TOKEN':'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqd3RVc2VyIjoie1wiYXBwSWRcIjpcIm9uam95cmlkZS5zb2xpdGFpcmVcIixcInVzZXJJZFwiOlwiOTIwNTljMmItODQ5NS00MjM0LThlYjQtMDE3ZjdjNDI2NTI1XCJ9IiwiaXNzIjoiYXV0aDAiLCJleHAiOjE2NDg1NDkxMDcsImlhdCI6MTYzMjk5NzEwN30.Tsbzp14PQUACEYQQKTQYA2fViQYDk_lr5zxzpeYlChW0t_H76yCSDUddwFfJkeqg6bOkZE8AEfUEl9HLwMvJBprE4rZAM1S4LW-fi6ZAfj203WrQVssnZD5pG5BldzrlfPd1jaP0stEnn7EQUejWyPhHm5EQVwNj1x_YjaKqXCYXDdQDIpUeG5CsTazW_u5F4sIUw3bwIOjxRT_kffAivs4XXIpwgNdGSeES2-sE1ZEIGMm4pz0P41npM5nKSAhP_cd13ebHVWufHk4K3t-B2bq_ECi2VqAJkJ3IFGnwgGpVUfJ6pYBRUw95OlaPmHKgEPjwNjcJRFNpyLohN3R7kA',
            'JRX-APP-ID': 'onjoyride.solitaire',
            Accept: 'application/json'
        },}).then(res => res.json())
        .then(
            (result) => {
        // The API call was successful!
        savedCardList = result
        console.log('success!', savedCardList);
                var ui = '';
                if(savedCardList.length === 0){
                    ui = getNewCardForm();
                } else {
                    ui = getSavedCardListUI(savedCardList);
                }

                document.getElementById("circle_ui").innerHTML = ui;
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
}
async function getpublicKey(){
    fetch(BASE_URL +"/encryption/public/key", {
        method: 'GET',
        headers: {
            'JRX-APP-ID': 'onjoyride.solitaire',
            Accept: 'application/json'
        },})
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                keyId = result.data.keyId
                publicKey = result.data.publicKey
            },
            (error) => {
            }
        )
}
async function encryptCardDetails(dataToEncrypt) {
    console.log(dataToEncrypt)
    console.log(publicKey)
    const decodedPublicKey = await openpgp.readKey({armoredKey: atob(publicKey)})
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
async function saveUserCard(){
    let card = {
        number: document.getElementById("circle_cardnumber").value.trim().replace(/\D/g, ''),
        cvv: document.getElementById("circle_card_cvv").value,
    }
    var encryptedCardData = await this.encryptCardDetails(card)
    console.log(encryptedCardData)
    let saveCardPayload = {
        encryptedData: encryptedCardData.encryptedMessage,
        keyId: encryptedCardData.keyId,
        idempotencyKey: this.create_UUID(),
        billingDetails: {
            name: document.getElementById("circle_cardholder").value,
            city: document.getElementById("circle_city").value,
            country: document.getElementById("circle_country").value,
            line1: document.getElementById("circle_addressline1").value,
            line2: document.getElementById("circle_addressline2").value,
            district: document.getElementById("circle_district").value,
            postalCode: document.getElementById("circle_postalcode").value
        },
        expMonth: parseInt(document.getElementById("circle_expiry_month").value),
        expYear: parseInt(document.getElementById("circle_expiry_year").value),
        metadata:{
            email:document.getElementById("circle_email").value,
            phoneNumber: document.getElementById("circle_phone").value,
            sessionId: this.create_UUID()
        },
        description: document.getElementById("circle_description").value
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'JRX-USER-AUTH-TOKEN':'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqd3RVc2VyIjoie1wiYXBwSWRcIjpcIm9uam95cmlkZS5zb2xpdGFpcmVcIixcInVzZXJJZFwiOlwiOTIwNTljMmItODQ5NS00MjM0LThlYjQtMDE3ZjdjNDI2NTI1XCJ9IiwiaXNzIjoiYXV0aDAiLCJleHAiOjE2NDg1NDkxMDcsImlhdCI6MTYzMjk5NzEwN30.Tsbzp14PQUACEYQQKTQYA2fViQYDk_lr5zxzpeYlChW0t_H76yCSDUddwFfJkeqg6bOkZE8AEfUEl9HLwMvJBprE4rZAM1S4LW-fi6ZAfj203WrQVssnZD5pG5BldzrlfPd1jaP0stEnn7EQUejWyPhHm5EQVwNj1x_YjaKqXCYXDdQDIpUeG5CsTazW_u5F4sIUw3bwIOjxRT_kffAivs4XXIpwgNdGSeES2-sE1ZEIGMm4pz0P41npM5nKSAhP_cd13ebHVWufHk4K3t-B2bq_ECi2VqAJkJ3IFGnwgGpVUfJ6pYBRUw95OlaPmHKgEPjwNjcJRFNpyLohN3R7kA', 'JRX-APP-ID': 'onjoyride.solitaire' },
        body: JSON.stringify(saveCardPayload)
    };
    console.log(JSON.stringify(saveCardPayload))
    fetch(BASE_URL + '/cards/save', requestOptions)
        .then(response => response.json())
        .then(
            (result) => {
                this.showSuccessUI()
            },
            (error) => {
                console.log("error")
            }
        )
}

function  showSuccessUI(){
    var ui = getSuccessUI()
    document.getElementById("circle_ui").innerHTML = ui;
}
function closeCirclePopup(){
    var ui = ''
    document.getElementById("circle_ui").innerHTML = ui;
}
function getSuccessUI(){
    var ui ='<div class="mb-popup-backdrop" id="mbmodal1">\n' +
        '                  <div class="mb-popup-wrapper">\n' +
        '                    <div class="mb-popup-body mb-modal-body">\n' +
        '                      <div class="suc_container">\n' +
        '                        <div class="loader">\n' +
        '                          <p class="heading">Payment Sucessfull.</p>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '<button class="login-btn theme-btn" onclick="closeCirclePopup()">Close</button>'+
        '                    </div>\n' +
        '                  </div>\n' +
        '      </div>'
    return ui;
}
function getLoaderUI(){
    var ui ='<div class="mb-popup-backdrop" id="mbmodal1">\n' +
        '                  <div class="mb-popup-wrapper">\n' +
        '                    <div class="mb-popup-body mb-modal-body">\n' +
        '                      <div class="suc_container">\n' +
        '                        <div class="loader">\n' +
        '                          <p class="heading">Loading...</p>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '<button class="login-btn theme-btn" onclick="closeCirclePopup()">Close</button>'+
        '                    </div>\n' +
        '                  </div>\n' +
        '      </div>'
    return ui;
}
async function openCircleUI() {
    var ui = getLoaderUI();
    document.getElementById("circle_ui").innerHTML = ui;
    var userId = "92059c2b-8495-4234-8eb4-017f7c426525"
    await getpublicKey()
    await getSavedCreditCards(userId)
    console.log("circle UI")
    console.log(savedCardList)
}
function addNewCard(){
    ui = getNewCardForm();
    document.getElementById("circle_ui").innerHTML = ui;
}
function selectSavedCard(card_id){
    let element = document.getElementById("card_" + card_id);
    element.classList.toggle('circle_active_card');
    var ui =   '<button class="continue_card" type="submit" onClick="useSavedCard(&#34;'+card_id+'&#34;)"><i class="ion-locked"></i> Continue\n' +
        '</button>\n'
    document.getElementById("circle_saved_card_continue").innerHTML = ui;
}
function useSavedCard(card_id){
    console.log("saved card " + card_id)
    savedCardList.forEach((item,index)=>{
        if(item.cardId === card_id){
            activecardDetails = item
        }
    })
    if(activecardDetails.line2 === undefined){
        activecardDetails.line2 =''
    }
    if(activecardDetails.description === undefined){
        activecardDetails.description =''
    }
    cardNumber = '**** **** **** '+ activecardDetails.last4
    ui = getSavedCardForm(cardNumber, activecardDetails);
    document.getElementById("circle_ui").innerHTML = ui;

}

function makePayment(){
    let paymentPayload = {
        "idempotencyKey": this.create_UUID(),
        "source": {
            "id": activecardDetails.cardId,
            "type": "card"
        },
        "description": document.getElementById("circle_description").value,
        "channel": null,
        "metadata": {
            "email": document.getElementById("circle_email").value,
            "phoneNumber": document.getElementById("circle_phone").value,
            "sessionId": this.create_UUID()
        },
        "autoCapture": true,
        "verification": "cvv",
        "encryptedData": activecardDetails.encryptedData,
        "keyId": activecardDetails.keyId
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'JRX-USER-AUTH-TOKEN':'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqd3RVc2VyIjoie1wiYXBwSWRcIjpcIm9uam95cmlkZS5zb2xpdGFpcmVcIixcInVzZXJJZFwiOlwiOTIwNTljMmItODQ5NS00MjM0LThlYjQtMDE3ZjdjNDI2NTI1XCJ9IiwiaXNzIjoiYXV0aDAiLCJleHAiOjE2NDg1NDkxMDcsImlhdCI6MTYzMjk5NzEwN30.Tsbzp14PQUACEYQQKTQYA2fViQYDk_lr5zxzpeYlChW0t_H76yCSDUddwFfJkeqg6bOkZE8AEfUEl9HLwMvJBprE4rZAM1S4LW-fi6ZAfj203WrQVssnZD5pG5BldzrlfPd1jaP0stEnn7EQUejWyPhHm5EQVwNj1x_YjaKqXCYXDdQDIpUeG5CsTazW_u5F4sIUw3bwIOjxRT_kffAivs4XXIpwgNdGSeES2-sE1ZEIGMm4pz0P41npM5nKSAhP_cd13ebHVWufHk4K3t-B2bq_ECi2VqAJkJ3IFGnwgGpVUfJ6pYBRUw95OlaPmHKgEPjwNjcJRFNpyLohN3R7kA', 'JRX-APP-ID': 'onjoyride.solitaire' },
        body: JSON.stringify(paymentPayload)
    };
    console.log(JSON.stringify(paymentPayload))
    fetch(BASE_URL + '/payment/create', requestOptions)
        .then(response => response.json())
        .then(
            (result) => {
                showSuccessUI()
            },
            (error) => {
                console.log("error")
            }
        )
}
function getSavedCardListUI(savedCardList){
    var cardList = ''
    savedCardList.forEach((item,index)=>{
        console.log(item)
        var space_id_div = "space_" + item.cardId
        var card_id_div = "card_" + item.cardId
        var card_icon = BASE_IMG_URL + '/' + item.network.toLowerCase() + '.png'
        cardList += '<tr key='+space_id_div+'>\n' +
            '                <td>&nbsp; </td>\n' +
            '                <td>&nbsp;</td>\n' +
            '                <td>&nbsp;</td>\n' +
            '                <td>&nbsp;</td>\n' +
            '            </tr>'

        cardList += '<tr class="card_rows" key='+card_id_div+'  id="'+card_id_div+'" data-value1='+item.cardId+' onClick="selectSavedCard(&#34;'+item.cardId+'&#34;)">\n' +
            '                <td class="first_column row_padding circle_round"><input class="circle_checkbox" type="checkbox" id="checkbox_'+card_id_div+'"><label for="checkbox_'+card_id_div+'"> <img src="'+card_icon+'"  class="inline_img"/> &ensp; Visa Credit Card ending with '+item.last4+'</label></td>\n' +
            '                <td class="second_column column_spacing">&nbsp;</td>\n' +
            '                <td class="third_column">'+item.expMonth+'/'+item.expYear+'</td>\n' +
            '                <td class="fourth_column column_spacing">&nbsp;<img src="'+BASE_IMG_URL+'/dropdown.png"  class="inline_img circle_card_drop"/></td>\n' +
            '            </tr>'

    })

    var ui = '<div class="mb-popup-backdrop" id="mbmodal1">\n' +
        '        <div class="mb-popup-wrapper">\n' +
        '          <div class="mb-popup-body mb-modal-body">\n' +
        '            <div class="container">\n' +
        '              <div class="price">\n' +
        '                <p class="heading">Pay with card</p>\n' +
        '              </div>\n' +
        '              <div class="card__container">\n' +
        '                <div class="saved_card">\n' +
        '                  <div class="row savedcardholder">\n' +
        '                    <div class="info">\n' +
        '                      <label htmlFor="amount">Amount</label><br/>\n' +
        '                      <input placeholder="e.g. 7000" id="amount" type="text"/>\n' +
        '                    </div>\n' +
        '                  </div>\n' +
        '\n' +
        '                  <div class="row savedcardholder">\n' +
        '                    <div class="card_info">\n' +
        '                      <table class="table_cls">\n' +
        '                        <tbody>\n' +
        '                        <tr class="card_info">\n' +
        '                          <th class="first_column row_padding">Your saved credit and debit cards</th>\n' +
        '                          <th class="second_column column_spacing">&nbsp;</th>\n' +
        '                          <th class="third_column">Expires</th>\n' +
        '                        </tr>\n' + cardList +
        '                        <tr class="card_info">\n' +
        '                          <td class="first_column row_padding">\n' +
        '                            <div class="button ">\n' +
        '                              <button class="add_card" type="submit" onClick="addNewCard()"><i class="ion-locked"></i> Add a credit or debit card\n' +
        '                              </button>\n' +
        '                            </div>\n' +
        '                          </td>\n' +
        '                          <td class="second_column column_spacing">&nbsp;</td>\n' +
        '                          <td class="third_column">&nbsp;</td>\n' +
        '                        </tr>\n' +
        '\n' +
        '                        </tbody>\n' +
        '                      </table>\n' +
        '                        <div class="continue_circle">\n' +
        '                            <div class="button" id="circle_saved_card_continue">\n' +

        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                  </div>\n' +
        '                </div>\n' +
        '\n' +
        '              </div>\n' +
        '            </div>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '      </div>'
    return ui
}


function getNewCardForm(){
   var circleUI = '<div class="mb-popup-backdrop" id="mbmodal1">\n' +
        '                  <div class="mb-popup-wrapper">\n' +
        '                    <div class="mb-popup-body mb-modal-body">\n' +
        '                    <div class="container">\n' +
        '                  <div class="price">\n' +
        '                    <p class="heading">Pay with card</p>\n' +
        '                  </div>\n' +
        '                  <div class="card__container">\n' +
        '                    <div class="circle_card">\n' +
        '                      <p class="heading"> </p>\n' +
        '                      <div class="row cardholder">\n' +
        '                        <div class="info">\n' +
        '                          <label htmlFor="amount">Amount</label><br />\n' +
        '                          <input placeholder="e.g. 7000" id="amount" type="text"/>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                      <div class="row number circle_top">\n' +
        '                        <div class="info">\n' +
        '                          <label htmlFor="circle_cardnumber">Card number</label><br />\n' +
        '                          <div class="fake-input">\n' +
        '                            <input type="text" id="circle_cardnumber" pattern="[0-9]{16,19}" maxLength="19" placeholder="8888 8888 8888 8888"/>\n' +
        '                            <img src="'+BASE_IMG_URL+'/amex.png" class="amex_card" />\n' +
        '                            <img src="'+BASE_IMG_URL+'/mastercard.png" class="master_card"  />\n' +
        '                            <img src="'+BASE_IMG_URL+'/visa.png" class="visa_card" />\n' +
        '                          </div>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                      <div class="row details circle_top">\n' +
        '                        <div class="left">\n' +
        '                          <label htmlFor="circle_expiry_month">Expiry</label><br />\n' +
        '                          <select id="circle_expiry_month" >\n' +
        '                            <option>MM</option>\n' +
        '                            <option value="1">01</option>\n' +
        '                            <option value="2">02</option>\n' +
        '                            <option value="3">03</option>\n' +
        '                            <option value="4">04</option>\n' +
        '                            <option value="5">05</option>\n' +
        '                            <option value="6">06</option>\n' +
        '                            <option value="7">07</option>\n' +
        '                            <option value="8">08</option>\n' +
        '                            <option value="9">10</option>\n' +
        '                            <option value="11">11</option>\n' +
        '                            <option value="12">12</option>\n' +
        '                          </select>\n' +
        '                          <span>/</span>\n' +
        '                          <select id="circle_expiry_year" >\n' +
        '                            <option>YYYY</option>\n' +
        '                            <option value="2022">2022</option>\n' +
        '                            <option value="2023">2023</option>\n' +
        '                            <option value="2024">2024</option>\n' +
        '                            <option value="2025">2025</option>\n' +
        '                            <option value="2026">2026</option>\n' +
        '                            <option value="2027">2027</option>\n' +
        '                            <option value="2028">2028</option>\n' +
        '                            <option value="2029">2029</option>\n' +
        '                            <option value="2030">2030</option>\n' +
        '                          </select>\n' +
        '                        </div>\n' +
        '                        <div class="right">\n' +
        '                          <label htmlFor="circle_card_cvv">CVV</label><br />\n' +
        '                          <input type="text" maxLength="4" id="circle_card_cvv" placeholder="123" />\n' +
        '                          <span data-balloon-length="medium" data-balloon="The 3 or 4-digit number on the back of your card."\n' +
        '                                data-balloon-pos="up">i</span>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                      <div class="row number circle_top">\n' +
        '                        <div class="info">\n' +
        '                          <label htmlFor="circle_description">Description</label><br />\n' +
        '                          <input id="circle_description" type="text" pattern="" maxLength="100"\n' +
        '                                 placeholder="NFT purchase" />\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                    </div>\n' +
        '                    <div class="circle_card card_right">\n' +
        '                      <p class="heading">Billing Details</p>\n' +
        '                      <div class="row cardholder">\n' +
        '                        <div class="info">\n' +
        '                          <input placeholder="Cardholder name" id="circle_cardholder" type="text" />\n' +
        '                          <label htmlFor="circle_cardholder" class="msg">This field is required</label>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                      <div class="row cardholder">\n' +
        '                        <div class="info">\n' +
        '                          <input placeholder="Addressline 1" id="circle_addressline1" type="text"/>\n' +
        '                          <label htmlFor="circle_addressline1" class="msg">This field is required</label>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                      <div class="row cardholder">\n' +
        '                        <div class="info">\n' +
        '                          <input placeholder="Addressline 2" id="circle_addressline2" type="text"/>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                      <div class="row cardholder">\n' +
        '                        <div class="info">\n' +
        '                          <input placeholder="Postal Code" id="circle_postalcode" type="text" />\n' +
        '                          <label htmlFor="circle_postalcode" class="msg">This field is required</label>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                      <div class="row cardholder">\n' +
        '                        <div class="info">\n' +
        '                          <input placeholder="city" id="circle_city" type="text" />\n' +
        '                          <label htmlFor="circle_city" class="msg">This field is required</label>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                      <div class="row cardholder">\n' +
        '                        <div class="info">\n' +
        '                          <input placeholder="District" id="circle_district" type="text" />\n' +
        '                          <label htmlFor="circle_district" class="msg">This field is required</label>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                      <div class="row cardholder">\n' +
        '                        <div class="info">\n' +
        '                          <input placeholder="Country" id="circle_country" type="text" />\n' +
        '                          <label htmlFor="circle_country" class="msg">This field is required</label>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                      <div class="row cardholder">\n' +
        '                        <div class="info">\n' +
        '                          <input placeholder="Phone" id="circle_phone" type="text" />\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                      <div class="row cardholder">\n' +
        '                        <div class="info">\n' +
        '                          <input placeholder="Email" id="circle_email" type="text" />\n' +
        '                          <label htmlFor="circle_email" class="msg">This field is required</label>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                    </div>\n' +
        '                  </div>\n' +
        '                  <div class="button">\n' +
        '                    <button type="submit" onClick="saveUserCard()"><i class="ion-locked"></i> Confirm and Pay</button>\n' +
        '                  </div>\n' +
        '                </div>\n' +
        '                    </div>\n' +
        '                  </div>\n' +
        '        </div>';
   return circleUI
}

function getSavedCardForm(cardNumber, activecardDetails){
    var circleUI = '<div class="mb-popup-backdrop" id="mbmodal1">\n' +
        '                  <div class="mb-popup-wrapper">\n' +
        '                    <div class="mb-popup-body mb-modal-body">\n' +
        '                    <div class="container">\n' +
        '                  <div class="price">\n' +
        '                    <p class="heading">Pay with card</p>\n' +
        '                  </div>\n' +
        '                  <div class="card__container">\n' +
        '                    <div class="circle_card">\n' +
        '                      <p class="heading"> </p>\n' +
        '                      <div class="row cardholder">\n' +
        '                        <div class="info">\n' +
        '                          <label htmlFor="amount">Amount</label><br />\n' +
        '                          <input placeholder="e.g. 7000" id="amount" type="text"/>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                      <div class="row number circle_top">\n' +
        '                        <div class="info">\n' +
        '                          <label htmlFor="circle_cardnumber">Card number</label><br />\n' +
        '                          <div class="fake-input">\n' +
        '                            <input type="text" id="circle_cardnumber" pattern="[0-9]{16,19}" maxLength="19" placeholder="8888 8888 8888 8888" value="'+cardNumber+'"/>\n' +
        '                            <img src="'+BASE_IMG_URL+'/amex.png" class="amex_card" />\n' +
        '                            <img src="'+BASE_IMG_URL+'/mastercard.png" class="master_card"  />\n' +
        '                            <img src="'+BASE_IMG_URL+'/visa.png" class="visa_card" />\n' +
        '                          </div>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                      <div class="row details circle_top">\n' +
        '                        <div class="left">\n' +
        '                          <label htmlFor="circle_expiry_month">Expiry</label><br />\n' +
        '                          <select id="circle_expiry_month" >\n' +
        '                            <option>MM</option>\n' +
        '                            <option value="1">01</option>\n' +
        '                            <option value="2">02</option>\n' +
        '                            <option value="3">03</option>\n' +
        '                            <option value="4">04</option>\n' +
        '                            <option value="5">05</option>\n' +
        '                            <option value="6">06</option>\n' +
        '                            <option value="7">07</option>\n' +
        '                            <option value="8">08</option>\n' +
        '                            <option value="9">10</option>\n' +
        '                            <option value="11">11</option>\n' +
        '                            <option value="12">12</option>\n' +
        '                          </select>\n' +
        '                          <span>/</span>\n' +
        '                          <select id="circle_expiry_year" >\n' +
        '                            <option>YYYY</option>\n' +
        '                            <option value="2022">2022</option>\n' +
        '                            <option value="2023">2023</option>\n' +
        '                            <option value="2024">2024</option>\n' +
        '                            <option value="2025">2025</option>\n' +
        '                            <option value="2026">2026</option>\n' +
        '                            <option value="2027">2027</option>\n' +
        '                            <option value="2028">2028</option>\n' +
        '                            <option value="2029">2029</option>\n' +
        '                            <option value="2030">2030</option>\n' +
        '                          </select>\n' +
        '                        </div>\n' +
        '                        <div class="right">\n' +
        '                          <label htmlFor="circle_card_cvv">CVV</label><br />\n' +
        '                          <input type="text" maxLength="4" id="circle_card_cvv" placeholder="123" />\n' +
        '                          <span data-balloon-length="medium" data-balloon="The 3 or 4-digit number on the back of your card."\n' +
        '                                data-balloon-pos="up">i</span>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                      <div class="row number circle_top">\n' +
        '                        <div class="info">\n' +
        '                          <label htmlFor="circle_description">Description</label><br />\n' +
        '                          <input id="circle_description" type="text" pattern="" maxLength="100"\n' +
        '                                 placeholder="NFT purchase" value="'+activecardDetails.description+'"/>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                    </div>\n' +
        '                    <div class="circle_card card_right">\n' +
        '                      <p class="heading">Billing Details</p>\n' +
        '                      <div class="row cardholder">\n' +
        '                        <div class="info">\n' +
        '                          <input placeholder="Cardholder name" id="circle_cardholder" type="text" value="'+activecardDetails.name+'"/>\n' +
        '                          <label htmlFor="circle_cardholder" class="msg">This field is required</label>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                      <div class="row cardholder">\n' +
        '                        <div class="info">\n' +
        '                          <input placeholder="Addressline 1" id="circle_addressline1" type="text" value="'+activecardDetails.line1+'"/>\n' +
        '                          <label htmlFor="circle_addressline1" class="msg">This field is required</label>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                      <div class="row cardholder">\n' +
        '                        <div class="info">\n' +
        '                          <input placeholder="Addressline 2" id="circle_addressline2" type="text" value="'+activecardDetails.line2+'"/>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                      <div class="row cardholder">\n' +
        '                        <div class="info">\n' +
        '                          <input placeholder="Postal Code" id="circle_postalcode" type="text" value="'+activecardDetails.postalCode+'"/>\n' +
        '                          <label htmlFor="circle_postalcode" class="msg">This field is required</label>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                      <div class="row cardholder">\n' +
        '                        <div class="info">\n' +
        '                          <input placeholder="city" id="circle_city" type="text" value="'+activecardDetails.city+'"/>\n' +
        '                          <label htmlFor="circle_city" class="msg">This field is required</label>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                      <div class="row cardholder">\n' +
        '                        <div class="info">\n' +
        '                          <input placeholder="District" id="circle_district" type="text" value="'+activecardDetails.district+'"/>\n' +
        '                          <label htmlFor="circle_district" class="msg">This field is required</label>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                      <div class="row cardholder">\n' +
        '                        <div class="info">\n' +
        '                          <input placeholder="Country" id="circle_country" type="text" value="'+activecardDetails.country+'"/>\n' +
        '                          <label htmlFor="circle_country" class="msg">This field is required</label>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                      <div class="row cardholder">\n' +
        '                        <div class="info">\n' +
        '                          <input placeholder="Phone" id="circle_phone" type="text" value="'+activecardDetails.phoneNumber+'"/>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                      <div class="row cardholder">\n' +
        '                        <div class="info">\n' +
        '                          <input placeholder="Email" id="circle_email" type="text" value="'+activecardDetails.email+'"/>\n' +
        '                          <label htmlFor="circle_email" class="msg">This field is required</label>\n' +
        '                        </div>\n' +
        '                      </div>\n' +
        '                    </div>\n' +
        '                  </div>\n' +
        '                  <div class="button">\n' +
        '                    <button type="submit" onClick="makePayment()"><i class="ion-locked"></i> Confirm and Pay</button>\n' +
        '                  </div>\n' +
        '                </div>\n' +
        '                    </div>\n' +
        '                  </div>\n' +
        '        </div>';
    return circleUI
}
