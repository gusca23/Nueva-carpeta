//GLOBALES:
const sexo = "masculino";
const tallaMetro = 1.73;
const talla = 173;
const peso = 75;
const edad = 29;

//FACTORES DE ACTIVIDAD FISICA
const factorActividadFisicaMuyLeve = 1.4;
const actividadFisicaMuyLeve = "muy leve";
const factorActividadFisicaLeveHombres = 1.6;
const factorActividadFisicaLeveMujeres = 1.5;
const actividadfisicaLeve = "leve";
const factorActividadFisicaModeradaHombres = 1.8;
const factorActividadFisicaModeradaMujeres = 1.6;
const actividadFisicaModerada = "moderada";
const factorActividadFisicaIntensaHombres = 2;
const factorActividadFisicaIntensaMujeres = 1.8;
const actividadFisicaIntensa = "intensa";

//OBJETIVO
const objetivo = "perder grasa";

function bmi(peso, talla) {
  return peso / Math.pow(talla, 2);
}
const bmiUsuario = bmi(peso, tallaMetro);

function calcularPesoAdj(sexo, talla, bmi) {
  if (bmi < 25 || bmi > 40) return peso;
  const pesoIdealEstimado = talla - 100 - (talla - 150) / (sexo === "masculino" ? 4 : 2);
  const pesoAjustadoEstimado = (peso - pesoIdealEstimado) / 3 + pesoIdealEstimado;
  return pesoAjustadoEstimado;
}
const pesoAjsutado = calcularPesoAdj(sexo, talla, bmiUsuario);

//GER - GASTO ENERGETICO EN REPOSO DISCRIMINADO POR SEXO - FORMULA DE HARRIS-BENEDICT
function calcularGERConFormulaHB(sexo, peso, talla, edad) {
  return sexo === "masculino" ? 66 + 13.7 * peso + 5 * talla - 6.7 * edad : 655 + 9.7 * peso + 1.8 * talla - 4.9 * edad;
}
const gastoEnergeticoReposo = calcularGERConFormulaHB(sexo, pesoAjsutado, talla, edad);

function calcularGET(actividadFisica, sexo, gastoEnergeticoReposo) {
  switch (actividadFisica) {
    case "muy leve":
      return gastoEnergeticoReposo * factorActividadFisicaMuyLeve;
    case "leve":
      return gastoEnergeticoReposo * sexo === "masculino"
        ? factorActividadFisicaLeveHombres
        : factorActividadFisicaLeveMujeres;
    case "moderada":
      return gastoEnergeticoReposo * sexo === "masculino"
        ? factorActividadFisicaModeradaHombres
        : factorActividadFisicaModeradaMujeres;
    case "intensa":
      return gastoEnergeticoReposo * sexo === "masculino"
        ? factorActividadFisicaIntensaHombres
        : factorActividadFisicaIntensaMujeres;
    default:
      return gastoEnergeticoReposo * factorActividadFisicaMuyLeve;
  }
}
const gastoEnergeticoTotal = calcularGET(actividadFisicaMuyLeve, sexo, gastoEnergeticoReposo);

//CALCULAR KCAL NECESARIAS POR DIA.
function objetivos(objetivo) {
  if (objetivo === "perder grasa") {
    return gastoEnergeticoTotal - 500;
  }
  return gastoEnergeticoTotal;
}
const caloriasDiaria = Math.round(objetivos(objetivo));

//DISTRIBUCION DE MACROS.
function calcularCarboHidratos() {
  return Math.round((caloriasDiaria * 57) / 100 / 4);
}
function calcularProteinas() {
  return Math.round((caloriasDiaria * 18) / 100 / 4);
}
function calcularLipidos() {
  return Math.round((caloriasDiaria * 25) / 100 / 9);
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
