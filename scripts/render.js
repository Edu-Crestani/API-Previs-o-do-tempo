const date = new Date();
const days = [
    'Domingo', 'Segunda', 'Terça', 'Quarta',
    'Quinta', 'Sexta', 'Sabado'
];


const dias = []

for(let i = 1; i<8; i++){
    const dia = document.querySelector(`#day${i}_h2`)
    if(dia){
        dia.textContent = dayx(i)
        dias.push(dia)
    }
}

    function dayx(x) {
        return days[(date.getDay() + x-1) % 7];
    }

export default dias;