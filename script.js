const BASE_AREAS = {
  sedan: 22,
  suv: 28,
  mpv: 31,
  truck: 35,
};

const COVERAGE_RATIO = {
  full: 1,
  roof: 0.16,
  hood: 0.12,
  doors: 0.34,
};

const SCENARIO_FACTOR = {
  color: 1,
  ad: 0.9,
  ppf: 1.08,
};

const SCENARIO_TEXT = {
  color: "Color wraps usually need broad visual coverage with moderate seam planning.",
  ad: "Advertising wraps focus on printable surfaces and are often faster to apply.",
  ppf: "PPF needs tighter edge handling and usually benefits from extra waste allowance.",
};

const form = document.getElementById("wrap-form");
const result = document.getElementById("result");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const vehicleType = document.getElementById("vehicleType").value;
  const filmScenario = document.getElementById("filmScenario").value;
  const coverage = document.getElementById("coverage").value;
  const customRatio = Number.parseFloat(document.getElementById("customRatio").value) || 0.5;
  const rollWidth = Number.parseFloat(document.getElementById("rollWidth").value);
  const waste = Number.parseFloat(document.getElementById("waste").value) / 100;
  const price = Number.parseFloat(document.getElementById("price").value);
  const rollLength = Number.parseFloat(document.getElementById("rollLength").value);

  const baseArea = BASE_AREAS[vehicleType];
  const areaRatio = coverage === "custom" ? Math.min(Math.max(customRatio, 0.1), 1) : COVERAGE_RATIO[coverage];
  const scenarioFactor = SCENARIO_FACTOR[filmScenario];

  const totalArea = baseArea * areaRatio * scenarioFactor * (1 + waste);
  const totalLength = totalArea / rollWidth;
  const rolls = Math.ceil(totalLength / rollLength);
  const totalCost = totalArea * price;

  const difficulty = totalArea > 25 ? "High" : totalArea > 12 ? "Medium" : "Low";
  const timeline = totalArea > 25 ? "2-3 days" : totalArea > 12 ? "1-2 days" : "4-8 hours";

  result.innerHTML = `
    <h3>Estimated Results</h3>
    <p>Effective area required: <strong>${totalArea.toFixed(2)} m²</strong></p>
    <p>Film length required: <strong>${totalLength.toFixed(2)} m</strong></p>
    <p>Recommended roll quantity: <strong>${rolls} roll(s)</strong> (${rollLength} m per roll)</p>
    <p>Estimated material cost: <strong>$${totalCost.toFixed(0)}</strong></p>
    <p>Installation difficulty: <strong>${difficulty}</strong> | Expected timeline: <strong>${timeline}</strong></p>
    <p>Installer note: ${SCENARIO_TEXT[filmScenario]}</p>
  `;
});
