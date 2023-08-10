
class Validator{
    constructor(){
        this.validations = [
            'data-required',
            'data-equal',
            'data-password-validate',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-only-letters'
        ]
    }

    //Iniciar validação dos campos
    validate(form){

        //Resgatar todas as validações
        let currentValidations = document.querySelectorAll('form .error-valid');
        if(currentValidations.length > 0){
            this.cleanValidations(currentValidations);
        };

        //pegar os inputs
        let inputs = form.getElementsByTagName('input');

        //Transforma o que foi recebido em Array
        let inputsArray = [...inputs];

        //Loop nos inputs e validação mediante ao que for encontrado
        inputsArray.forEach(function(input){
            for(let i=0;this.validations.length > i; i++){

                //Verifica se a validação atual existe no input
                if(input.getAttribute(this.validations[i]) != null){

                    //Limpando a string para virar um método
                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    //Valor do input
                    let value = input.getAttribute(this.validations[i]);

                    //Invocar o método
                    this[method] (input,value);
                };
            };
        },this);
    };

    //Verificar se o input tem um número mínimo de caracteres
    minlength(input, minValue){
        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter pelo menos que ${minValue} caracteres`;

        if(inputLength < minValue){
            this.printMessage(input, errorMessage);
        };
    };

    //Verifica se um input passou do limite de caracteres
    maxlength(input, maxValue){
        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;
        
        if(inputLength > maxValue){
            this.printMessage(input,errorMessage);
        };
    };

    //Verifica e-mails
    emailvalidate(input){
        let re = /\S+@\S+\.\S+/;
        let email = input.value;
        let errorMessage = 'Insira um e-mail no padrão exemplo@gmail.com';

        if(!re.test(email)){
            this.printMessage(input, errorMessage);
        };
    };

    //Validar se os campos tem apenas letras
    onlyletters(input){

        //usando rejex (re de regular expressions)
        let re = / ^[A-Za-z] + $ /;
        let inputValue = input.value;
        let errorMessage = `Esse campo aceita somente letras`;

        if(!re.test(inputValue)){
            this.printMessage(input, errorMessage);
        };
    };

    //Valida o campo de senha
    passwordvalidate(input){
        let charArr = input.value.split("");
        let uppercases = 0;
        let numbers = 0;

        for (let i=0; charArr.length > i; i++){
            if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))){
                uppercases++;
            }else if(!isNaN(parseInt(charArr[i]))){
                numbers++;
            };
        };

        if(uppercases === 0 || numbers === 0){
            let errorMessage = `A senha precisa ter pelo menos um caractere maiúsculo e um número`;

            this.printMessage(input, errorMessage);
        };
    };

    //Verifica se os campos de senha estão iguais
    equal(input, inputName){
        let inputToCompate = document.getElementsByName(inputName)[0];
        let errorMessage = `As senhas não estão iguais`;

        if(input.value != inputToCompate.value){
            this.printMessage(input, errorMessage);
        };
    };

    //Método para imprimir mensagens de erro na tela
    printMessage(input, msg){

        //Quantidade de erros
        let errorQtd = input.parentNode.querySelector('.error-valid');

        if(errorQtd === null){
            let template = document.querySelector('.error-valid').cloneNode(true);
            template.textContent = msg;
            let inputParent = input.parentNode;
            template.classList.remove('template');
            inputParent.appendChild(template);
        };
    };

    //Verificar se o input é obrigatório
    required(input){
        let inputValue = input.value;

        if(inputValue === ''){
            let errorMessage = `Este campo precisa ser preenchido antes de prosseguir.`;

            this.printMessage(input, errorMessage);
        };
    };

    cleanValidations(validations){
        validations.forEach(el => el.remove())
    };
};

//Pegar os dados do formulário e do botão
let form = document.getElementById("cadastro-form");
let submit = document.getElementById("btn-cadastro");

//Iniciando o objeto Validator
let validator = new Validator();

//Evento que vai disparar as validações
submit.addEventListener('click', function(e){
    e.preventDefault();
    validator.validate(form);
});