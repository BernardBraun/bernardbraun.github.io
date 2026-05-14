/**
 * Métricas de carreira derivadas das datas do currículo (alinhado a experiences.json).
 * Anos exibidos: soma dos dias em cada período e conversão com teto (ceil) em anos civis médios,
 * para não subestimar frações — conforme pedido de arredondar para cima.
 */
const DAYS_PER_YEAR = 365.25;
const DAY_MS = 86400000;

/** Início do dia local (evita drift de fuso em comparações). */
function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Intervalo [start, end] com end inclusivo = último dia trabalhado. */
function inclusiveDays(start: Date, end: Date): number {
  const a = startOfDay(start).getTime();
  const b = startOfDay(end).getTime();
  if (b < a) return 0;
  return Math.floor((b - a) / DAY_MS) + 1;
}

function daysToYearsCeiled(days: number): number {
  if (days <= 0) return 0;
  return Math.ceil(days / DAYS_PER_YEAR);
}

function sumDays(periods: readonly { start: Date; end: Date }[], asOf: Date): number {
  const cap = startOfDay(asOf);
  let total = 0;
  for (const { start, end } of periods) {
    const e = startOfDay(end) <= cap ? end : cap;
    if (startOfDay(start) > cap) continue;
    total += inclusiveDays(start, e);
  }
  return total;
}

/** Desenvolvimento de software (Villela, Philips, Wipro). */
const DEV_PERIODS = [
  { start: new Date(2021, 9, 1), end: new Date(2021, 11, 31) }, // Out–Dez/2021
  { start: new Date(2022, 0, 1), end: new Date(2023, 4, 31) }, // Jan/2022 – Mai/2023
  { start: new Date(2024, 5, 1), end: null as Date | null }, // Jun/2024 – hoje (preenchido em runtime)
] as const;

/** Somente frontend na Wipro / HP. */
const FRONTEND_PERIODS = [{ start: new Date(2024, 5, 1), end: null as Date | null }] as const;

/**
 * Infraestrutura / operações de TI (suporte, servidores, ambientes corporativos).
 * Excluídos: vendas, operador de central, arte-finalista, entregador.
 */
const INFRA_PERIODS = [
  { start: new Date(2012, 7, 1), end: new Date(2013, 2, 31) }, // GSR – Técnico TI
  { start: new Date(2013, 3, 1), end: new Date(2013, 6, 31) }, // Tinta e Cor
  { start: new Date(2014, 7, 1), end: new Date(2018, 4, 31) }, // SMS Metais
  { start: new Date(2018, 5, 1), end: new Date(2019, 7, 31) }, // FCC
  { start: new Date(2019, 8, 1), end: new Date(2020, 8, 30) }, // IPM (até 30/set)
  { start: new Date(2021, 3, 1), end: new Date(2021, 9, 31) }, // Suntex – Analista de TI
] as const;

function resolveOpenEnd(
  periods: readonly { start: Date; end: Date | null }[],
  asOf: Date,
): { start: Date; end: Date }[] {
  const today = startOfDay(asOf);
  return periods.map((p) => ({
    start: p.start,
    end: p.end ? startOfDay(p.end) : today,
  }));
}

export type CareerStats = {
  /** Soma Villela + Philips + Wipro (dias), convertida em anos (ceil). */
  yearsTotalDev: number;
  /** Apenas Wipro / frontend em produto global (dias), anos (ceil). */
  yearsFrontend: number;
  /** Papéis de infra / operações de TI (dias), anos (ceil). */
  yearsInfraTI: number;
};

export function getCareerStats(asOf: Date = new Date()): CareerStats {
  const today = startOfDay(asOf);

  const devResolved = resolveOpenEnd([...DEV_PERIODS], today);
  const frontResolved = resolveOpenEnd([...FRONTEND_PERIODS], today);

  const devDays = sumDays(devResolved, today);
  const frontDays = sumDays(frontResolved, today);
  const infraDays = sumDays([...INFRA_PERIODS], today);

  return {
    yearsTotalDev: daysToYearsCeiled(devDays),
    yearsFrontend: daysToYearsCeiled(frontDays),
    yearsInfraTI: daysToYearsCeiled(infraDays),
  };
}
