document.addEventListener("DOMContentLoaded", searchAddress1);

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
    }

    function buildHandler(data) {
        let fields = [];

        fields.push({tag: roadTag, value: data.logradouro});
        fields.push({tag: complementTag, value: data.complemento});
        fields.push({tag: districtTag, value: data.bairro});
        fields.push({tag: cityTag, value: data.localidade});
        fields.push({tag: stateTag, value: data.uf});
        fields.push({tag: ibgeCodeTag, value: data.ibge});

        fields.forEach((object) => {
            if (!object.tag) {
                return false;
            }
    
            if (object.value) {
                object.tag.value = object.value;
            } else {
                object.tag.value = "";
            }
        });     
    }

    function cleanHandler() {
        allTag.forEach((tag) => {
            tag.value = "";
        });
    }

    function searchHandler() {
        var zipCodeValid = /^[0-9]{2}[0-9]{3}-[0-9]{3}$/g;

        if (!zipCodeValid.test(zipCodeTag.value)) {
            return cleanHandler();
        }

        fetch("https://viacep.com.br/ws/"+ zipCodeTag.value +"/json/", "GET")
        .then(response => {
            response.json().then(data => {
                return buildHandler(data);
            });
        })
        .catch(error => console.log('error', error));
    }
}
