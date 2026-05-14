/**
 * Data de nascimento (horário local). Ajuste o ano se necessário.
 * Aniversário: 13 de setembro — usado para calcular a idade na bio.
 */
const BIRTH = new Date(1988, 8, 13);

/**
 * Idade em anos completos em relação a `reference` (padrão: hoje).
 */
export function calculateAge(reference: Date = new Date()): number {
  let age = reference.getFullYear() - BIRTH.getFullYear();
  const monthDiff = reference.getMonth() - BIRTH.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && reference.getDate() < BIRTH.getDate())) {
    age -= 1;
  }
  return age;
}
