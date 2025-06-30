document.addEventListener('DOMContentLoaded',function (){

  // Calculator buttons
    const equation = document.getElementById('equation');
    const buttons =document.querySelectorAll('button');

    buttons.forEach((btn)=>{
        btn.addEventListener('click', ()=> handleButtonClick(btn.id,btn.textContent));    /* it will listen the event click from the buttons and it will pass values of each button including the id and textconent to handleButton Click function */
    });

    
    function handleButtonClick(id,value){
        switch (id){
            case 'C':
                equation.value = '';
                break;
            case 'equals':
                try{
                    equation.value = eval(equation.value);
                }
                catch{
                    equation.value = 'Error';
                }
                break;
            case 'percent':
                equation.value = parseFloat(equation.value)/100;
                break;
            case 'positiveNegative':
                equation.value = parseFloat(equation.value)*-1;
                break;

                default:
                    // prevent multiple dots
                    if(id === 'dot' && equation.value.slice(-1) === '.') return;
                    equation.value +=value.trim();
                break;   
        }
    }
});