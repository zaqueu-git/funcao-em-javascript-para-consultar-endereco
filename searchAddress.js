function searchAddress1() {
    let formAddressTag = document.querySelector('.js-form-address-tag');

    if (!formAddressTag) {
        return false;
    }

    let allTag = formAddressTag.querySelectorAll('.js-all-tag');
    let zipCodeTag = formAddressTag.querySelector('.js-zip-code-tag');
    let roadTag = formAddressTag.querySelector('.js-road-tag');
    let complementTag = formAddressTag.querySelector('.js-complement-tag');
    let districtTag = formAddressTag.querySelector('.js-district-tag');
    let cityTag = formAddressTag.querySelector('.js-city-tag');
    let stateTag = formAddressTag.querySelector('.js-state-tag');
    let ibgeCodeTag = formAddressTag.querySelector('.js-ibge-code-tag');

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