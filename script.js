document.addEventListener('DOMContentLoaded', function () {
    const equation = document.getElementById('equation');
    const buttons = document.querySelectorAll('button');

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => handleButtonClick(btn.id, btn.textContent));

    })

    function handleButtonClick(id, value) {
        switch (id) {
            case 'C':
                equation.value = '';
                break;

            case 'equals':
                try {
                    equation.value = new Function(`return ${equation.value}`)();

                } catch {
                    equation.value = 'Error';
                }
                break;

            case 'percent':
                if (equation.value) {
                    equation.value = parseFloat(equation.value) / 100;
                }
                break;
            case 'positiveNegative':
                if (equation.value) {
                    equation.value = parseFloat(equation.value) * -1;
                }
                break;

            default:
                if (id === 'dot' && equation.value.slice(-1) === '.') return;
                equation.value += value.trim();
                break;

        }


    }
});