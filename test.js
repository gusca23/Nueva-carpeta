//GLOBALES:
const sexo = 'masculino'
const tallaMetro = 1.73;
const talla = 173
const peso = 75;
const edad = 29;

//FACTORES DE ACTIVIDAD FISICA
const factorActividadFisicaMuyLeve = 1.4;
const actividadFisicaMuyLeve = 'muy leve';
const factorActividadFisicaLeveHombres = 1.6;
const factorActividadFisicaLeveMujeres = 1.5;
const actividadfisicaLeve = 'leve';
const factorActividadFisicaModeradaHombres = 1.8;
const factorActividadFisicaModeradaMujeres = 1.6;
const actividadFisicaModerada = 'moderada';
const factorActividadFisicaIntensaHombres = 2;
const factorActividadFisicaIntensaMujeres = 1.8;
const actividadFisicaIntensa = 'intensa';

//OBJETIVO
const objetivo = 'perder grasa';



//CALCULO DEL IMC/BMI 
function bmi(peso, talla){
    const bmi = peso / Math.pow(talla, 2);
    return bmi;
}
const bmiUsuario = bmi(peso, tallaMetro);

//tambien se puede calcular el PPI(%) es otro parametro que mide la desviacion del PI
/*
formula = peso real / peso ideal * 100
        PPI(%)      | Situacion Nutricional
        <   60 %    |   Malnutricion Grave
        60 - 90 %   |   Malnutricion Moderada
        91 - 110 %  |   Eutrofico
        111 - 120 % |   Sobre Peso
        >  120 %    |   Obesidad
*/

//CALCULAR PESO IDEAL
function calcularPesoAjustado(sexo, talla){
    if(bmiUsuario >= 25 && sexo === 'masculino' || bmi <= 40 && sexo === 'masculino'){
        const pesoIdealEstimado = talla - 100 - ((talla - 150) / 4);

        const pesoAjustadoEstimado = (peso - pesoIdealEstimado) / 3 + pesoIdealEstimado;
        
        return pesoAjustadoEstimado

    }else if(bmiUsuario >= 25 && sexo === 'femenino' || bmi <= 40 && sexo === 'femenino'){
        const pesoIdealEstimado = talla - 100 - ((talla - 150) / 2);
        
        const pesoAjustadoEstimado = (peso - pesoIdealEstimado) / 3 + pesoIdealEstimado;
        
        return pesoAjustadoEstimado
    }else{
        return peso;
    }
}
const pesoAjsutado = calcularPesoAjustado(sexo, talla);

//GER - GASTO ENERGETICO EN REPOSO DISCRIMINADO POR SEXO - FORMULA DE HARRIS-BENEDICT
function calcularGERConFormulaHB(sexo, peso, talla, edad){
    if(sexo === 'masculino'){
        const harrisBenedictHombres = 66 + (13.7 * peso) + (5 * talla) - (6.7 * edad);
        return harrisBenedictHombres;
    
    }else{
        const harrisBenedictMujeres = 655 + (9.7 * peso) + (1.8 * talla) - (4.9 * edad);
        return harrisBenedictMujeres;
    }
}
const gastoEnergeticoReposo = calcularGERConFormulaHB(sexo, pesoAjsutado, talla, edad);

//GET - GASTO ENERGETICO TOTAL DISCRIMINADO POR SEXO

/*FACTOR DE ACTIVIDAD FISICA - DATOS OBTENIDOS DE LA FAO/OMS
A.F. MUY LEVE = 1,4
EJEMPLOS DE A.F. MUY LEVE = Actividades en posicion sentada y de pie: pintar, manejar, trabajo de laboratorio, oficinista, confeccionista, cocinar.

A.F. LEVE = 1.6 (HOMBRES) /  1.5(MUJERES)
Personas que pasan varias horas al día en actividades sedentarias, que no practican regularmente deportes, que usan el coche para los desplazamientos, que pasan la mayor parte del tiempo de ocio viendo la TV, leyendo, usando el ordenador o videojuegos. Ej.: Estar sentado o de pie la mayor parte del tiempo, pasear en terreno llano, realizar trabajos ligeros del hogar, jugar a las cartas, coser, cocinar, estudiar, conducir, escribir a
máquina, empleados de oficina, etc.

Actividad ligera o moderada 2 o 3 veces por semana.

A.F. MODERADA = 1.8 (HOMBRES) /  1.6(MUJERES)
Ej.: Pasear a 5 km/h, realizar trabajos pesados de la casa (limpiar cristales, barrer, etc.), carpinteros, obreros de la construcción (excepto trabajos duros), industria química, eléctrica, tareas agrícolas mecanizadas, golf, cuidado de niños, etc. Aquellas actividades en las que se desplacen o se manejen objetos de forma moderada.

Más de 30 minutos/día de actividad moderada y 20 minutos/semana de actividad vigorosa.

A.F. INTENSA = 2 (HOMBRES) /  1.8(MUJERES)
Personas que diariamente andan largas distancias, usan la bicicleta para desplazarse, desarrollan actividades vigorosas o practican deportes que requieren un alto nivel de esfuerzo durante varias horas. Ej: Tareas agrícolas no mecanizadas, mineros, forestales, cavar, cortar leña, segar a mano, escalar, montañismo, jugar al fútbol, tenis, jogging, bailar, esquiar, etc.

Actividad moderada o vigorosa todos los días.*/

function calcularGET(actividadFisica, sexo){ //tb se puede agregar un callback como parametro
    if(actividadFisica === 'muy leve' && sexo === 'masculino' || actividadFisica === 'muy leve' && sexo === 'femenino'){
    //  return callback(sexo, pesoAjsutado, talla, edad) * factorActividadFisicaMuyLeve;
        return gastoEnergeticoReposo * factorActividadFisicaMuyLeve;
    }else if(actividadFisica === 'leve' && sexo === 'masculino'){
        return gastoEnergeticoReposo * factorActividadFisicaLeveHombres;
    }else if(actividadFisica === 'leve' && sexo === 'femenino'){
        return gastoEnergeticoReposo * factorActividadFisicaLeveMujeres;
    }else if(actividadFisica === 'moderada' && sexo === 'masculino'){
        return gastoEnergeticoReposo * factorActividadFisicaModeradaHombres;
    }else if(actividadFisica === 'moderada' && sexo === 'femenino'){
        return gastoEnergeticoReposo * factorActividadFisicaModeradaMujeres;
    }else if(actividadFisica === 'intensa' && sexo === 'masculino'){
        return gastoEnergeticoReposo *  factorActividadFisicaIntensaHombres;
    }else if(actividadFisica === 'intensa' && sexo === 'femenino'){
        return gastoEnergeticoReposo *  factorActividadFisicaIntensaMujeres;
    }
}
const gastoEnergeticoTotal = calcularGET(actividadFisicaMuyLeve, sexo);

//CALCULAR KCAL NECESARIAS POR DIA.
function objetivos(objetivo){
    if(objetivo === 'perder grasa'){
        const perderGrasa = gastoEnergeticoTotal - 500;
        return perderGrasa;
    }else if(objetivo === 'mantener peso'){
        return gastoEnergeticoTotal;
    }
}
const caloriasDiaria = Math.round(objetivos(objetivo));

//DISTRIBUCION DE MACROS.
function calcularCarboHidratos(){
    const gramosCH = ((caloriasDiaria * 57 / 100) / 4);
    return Math.round(gramosCH)
}
function calcularProteinas(){
    const gramosProt = ((caloriasDiaria * 18 / 100) / 4);
    return gramosProt
    // const gKgPesoDia = gramosProt / pesoAjsutado;
    // return gKgPesoDia; 1,2g/kgpeso/dia
}
function calcularLipidos(){
    const gramosLip = ((caloriasDiaria * 25 / 100) / 9);
    return Math.round(gramosLip);
}

calcularCarboHidratos();
calcularProteinas();
calcularLipidos();

//despues de esto también se puede hacer una pequeña distribución por refección(desayuno, media mañana, almuerzo, merienda, colación,cena)
/*
calorias diarias (100%)      |      distribución
    10% de las cal totales  |      desayuno - merienda
    5% de las cal totales   |      media mañana - colación
    25% de las cal totales  |      almuerzo - cena

    total 100%

*/