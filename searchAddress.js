function searchAddress1() {
    let allTag = document.querySelectorAll('.js-address-all-tag');
    let zipCodeTag = document.querySelector('.js-address-zip-code-tag');
    let roadTag = document.querySelector('.js-address-road-tag');
    let complementTag = document.querySelector('.js-address-complement-tag');
    let districtTag = document.querySelector('.js-address-district-tag');
    let cityTag = document.querySelector('.js-address-city-tag');
    let stateTag = document.querySelector('.js-address-state-tag');
    let ibgeCodeTag = document.querySelector('.js-address-ibge-code-tag');

    if (zipCodeTag) {
        zipCodeTag.addEventListener('keyup', searchHandler);
    } else {
        return console.log("zipCodeTag not found");
    }

    function setTagValue(tag, newValue, readOnlyStatus) {
        if (!tag) {
            return tag + " not found";
        }
        
        tag.value = "";
        disableTagReadOnly(tag);

        if (newValue) {
            tag.value = newValue;
        }

        if (readOnlyStatus) {
            return enableTagReadOnly(tag);
        }
    }

    function disableTagReadOnly(tag) {
        tag.readOnly = false;
    }

    function enableTagReadOnly(tag) {
        tag.readOnly = true;
    }

    function buildHandler(data) {
        let fields = [];

        fields.push({tag: roadTag, value: data.logradouro, readOnly: true});
        fields.push({tag: complementTag, value: data.complemento, readOnly: false});
        fields.push({tag: districtTag, value: data.bairro, readOnly: true});
        fields.push({tag: cityTag, value: data.localidade, readOnly: true});
        fields.push({tag: stateTag, value: data.uf, readOnly: true});
        fields.push({tag: ibgeCodeTag, value: data.ibge, readOnly: true});

        fields.forEach((object) => {
            setTagValue(object.tag, object.value, object.readOnly);
        });     
    }

    function cleanHandler() {
        allTag.forEach((tag) => {
            setTagValue(tag, "", false);
        });
    }

    function searchHandler() {
        var zipCodeValid = /^[0-9]{2}[0-9]{3}-[0-9]{3}$/g;

        if (!zipCodeValid.test(zipCodeTag.value)) {
            return cleanHandler();
        }

        let zipCodeValue = zipCodeTag.value.replace("-", "");

        let url = "https://viacep.com.br/ws/"+ zipCodeValue +"/json/";
        let method = "GET";
    
        let requestOptions = {
          method: method,
        };
    
        fetch(url, requestOptions)
          .then((response) => {
            response.json().then((data) => {
                return buildHandler(data);
            });
          })
          .catch((error) => console.log("error fetch", error));
    }
}

searchAddress1();
